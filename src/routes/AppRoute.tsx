import * as React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { ELocalStorageItem, APP_ROUTES } from '../consts';

interface IProps {
    component: any;
    isAuthProtected: boolean;
    path: string;
}

const AppRoute: React.FC<IProps> = ({ component: Component, isAuthProtected, ...rest }) => {
    const location = useLocation();

    return (
        <Route
            {...rest}
            exact
            render={(props) => {
                if (isAuthProtected) {
                    if (!localStorage.getItem(ELocalStorageItem.TOKEN)) {
                        return (
                            <Redirect to={{ pathname: APP_ROUTES.AUTH.LOGIN.PATH, state: { from: location } }} />
                        );
                    } else {
                        return <Component {...props} />;
                    }
                } else {
                    if (localStorage.getItem(ELocalStorageItem.TOKEN)) {
                        return (
                            <Redirect to={{ pathname: APP_ROUTES.DASHBOARD.PATH }} />
                        );
                    }
                    return <Component {...props} />
                }
            }}
        />
    );
};

AppRoute.displayName = 'AppRoute';

export default AppRoute;
