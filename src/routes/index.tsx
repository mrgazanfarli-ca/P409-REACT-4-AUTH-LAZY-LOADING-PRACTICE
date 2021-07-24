import * as React from 'react';

import { IRoute } from '../models';
import { APP_ROUTES } from '../consts';

// Auth-related pages
const LoginPage = React.lazy(() => import('../pages/auth/Login'));

// Dashboard
const DashboardPage = React.lazy(() => import('../pages/Dashboard'));

//Products
const ProductsPage = React.lazy(() => import('../pages/Products'));

export const authProtectedRoutes: IRoute[] = [
    { path: APP_ROUTES.PRODUCTS.PATH, component: ProductsPage },
    { path: APP_ROUTES.DASHBOARD.PATH, component: DashboardPage },
];

export const publicRoutes: IRoute[] = [
    { path: APP_ROUTES.AUTH.LOGIN.PATH, component: LoginPage },
];
