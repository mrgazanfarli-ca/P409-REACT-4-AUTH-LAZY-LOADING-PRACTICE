import React, { ChangeEvent } from 'react';
import { AuthPageContainer } from '../../components/AuthPageContainer';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import axios from 'axios';
import { ILoginResponse } from '../../models';
import { APP_ROUTES, ELocalStorageItem } from '../../consts';
import { useHistory } from 'react-router-dom';

interface IFormData {
    email: string;
    password: string;
}

enum EFormField {
    EMAIL = 'email',
    PASSWORD = 'password'
}

const initialFormData: IFormData = {
    email: '',
    password: ''
}

const LoginPage: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = React.useState<IFormData>(initialFormData);

    const handleInputChange = React.useCallback((event: ChangeEvent<HTMLInputElement>, type: EFormField) => {
        setFormData(prevValue => ({ ...prevValue, [type]: event.target.value }));
    }, []);

    const handleLogin = React.useCallback(() => {
        axios.post<IFormData, { data: ILoginResponse }>('http://localhost:3001/token', formData).then(res => {
            const { data } = res;

            localStorage.setItem(ELocalStorageItem.TOKEN, data.token);
            history.push(APP_ROUTES.DASHBOARD.PATH);
        });
    }, [formData, history]);

    return (
        <AuthPageContainer>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10} md={7} lg={4}>
                        <h3 className="text-primary mb-3 text-center">Login</h3>
                        <Input
                            className="mb-3"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(event) => handleInputChange(event, EFormField.EMAIL)}
                        />
                        <Input
                            className="mb-3"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(event) => handleInputChange(event, EFormField.PASSWORD)}
                        />
                        <Button className="w-100" onClick={handleLogin}>Login</Button>
                    </Col>
                </Row>
            </Container>
        </AuthPageContainer>
    )
}

export default LoginPage;
