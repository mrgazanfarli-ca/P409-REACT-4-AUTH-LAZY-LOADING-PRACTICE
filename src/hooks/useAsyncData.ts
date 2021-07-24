import React from 'react';
import { IAsyncData } from '../models';
import { INITIAL_ASYNC_DATA } from '../consts';
import axios from 'axios';

export function useAsyncData<T>(url: string, defaultParams?: any): [IAsyncData<T>, (params?: any) => void] {
    const [data, setData] = React.useState<IAsyncData<T>>(INITIAL_ASYNC_DATA);

    const getData = React.useCallback((params?: any) => {
        if (!!url) {
            setData(oldData => ({ ...oldData, loading: true }));
            axios.get<T>(url, { params: params ?? defaultParams }).then(({ data }) => {
                setData(oldData => ({ ...oldData, loading: false, data, error: undefined }));
            }).catch((error) => {
                setData({ data: undefined, loading: false, error: error.toString() });
            });
        }
    }, [url]);

    React.useEffect(() => {
        getData();
    }, [getData]);

    return [data, getData];
}
