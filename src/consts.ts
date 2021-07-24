
import { IAsyncData } from './models';

export const APP_ROUTES = {
    AUTH: {
        LOGIN: {
            PATH: '/login'
        }
    },
    PRODUCTS: {
        PATH: '/products'
    },
    DASHBOARD: {
        PATH: '/'
    }
}

export const INITIAL_ASYNC_DATA: IAsyncData<any> = {
    data: null,
    error: undefined,
    loading: undefined
}

export enum ELocalStorageItem {
    TOKEN = 'token'
}
