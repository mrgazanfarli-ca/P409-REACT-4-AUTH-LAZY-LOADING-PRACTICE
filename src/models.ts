export interface IAsyncData<T> {
    error?: string;
    data?: T;
    loading?: boolean;
}

export interface IProduct {
    id: number;
    name: string;
    color: string;
    year: number;
}

export interface IPaginatedData<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T[];
}

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
}

export interface ILoginResponse {
    token: string;
    user: IUser;
}

export interface IRoute {
    component: any;
    path: string;
}
