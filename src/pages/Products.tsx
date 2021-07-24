import React, { ChangeEvent } from 'react';
import { CommonPageContainer } from '../components/CommonPageContainer';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useAsyncData } from '../hooks/useAsyncData';
import { IPaginatedData, IProduct } from '../models';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import { range } from 'lodash';

const PER_PAGE_OPTIONS = [3, 4, 6, 8, 12];

interface IPageParams {
    page?: number | string;
    per_page?: number | string;
}

const ProductsPage: React.FC = () => {
    const history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const page = params.get('page');
    const perPageFromUrl = params.get('per_page');
    const [currentPage, setCurrentPage] = React.useState(page ?? 1);
    const [perPage, setPerPage] = React.useState(perPageFromUrl ?? 4);
    const [productsData, getProducts] = useAsyncData<IPaginatedData<IProduct>>('https://reqres.in/api/products', { per_page: perPage });

    const maxPageCount = React.useMemo(() => !!productsData.data && productsData.data.total_pages, [productsData.data]);

    React.useEffect(() => {
        getProducts({ per_page: perPage, page })
    }, [getProducts, page, perPage]);

    const redirectWithParams = React.useCallback((params: IPageParams = {}) => {
        const { page: pageFromArgs, per_page: perPageFromArgs } = params;
        history.push(`/products?page=${pageFromArgs ?? currentPage}&per_page=${perPageFromArgs ?? perPage}`);
    }, [currentPage, history, perPage]);

    const handlePageChange = React.useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const val = +event.target.value;
        setCurrentPage(val);
        redirectWithParams({ page: val });
    }, [redirectWithParams]);

    const handlePerPageChange = React.useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const val = +event.target.value;
        setPerPage(val);
        redirectWithParams({ per_page: val });
    }, [redirectWithParams]);

    return (
        <CommonPageContainer>
            {productsData.loading && (
                <LoadingSpinner/>
            )}
            {productsData.error && (
                <h4 className="text-danger">Error occurred...</h4>
            )}
            {productsData.data && !productsData.loading && (
                <>
                    <Row>
                        {productsData.data.data.map(({ name, color, year, id }) => (
                            <Col className="mt-3" xs={6} key={id}>
                                <Card>
                                    <CardHeader>
                                        {name}
                                    </CardHeader>
                                    <CardBody>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Year: {year}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                Color: <span
                                                style={{
                                                    borderRadius: '50%',
                                                    backgroundColor: color,
                                                    width: '32px',
                                                    height: '32px',
                                                    display: 'inline-block',
                                                    marginLeft: '12px'
                                                }}
                                            />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-3">
                        <Col xs={4}>
                            <select className="form-control" value={`${currentPage}`} onChange={handlePageChange}>
                                {!!maxPageCount && range(1, maxPageCount + 1).map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </Col>
                        <Col xs={4}>
                            <select className="form-control" value={`${perPage}`} onChange={handlePerPageChange}>
                                {PER_PAGE_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                </>
            )}
        </CommonPageContainer>
    )
}

export default ProductsPage;
