import React from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import './App.css';
import { LoadingSpinner } from './components/LoadingSpinner';
import { authProtectedRoutes, publicRoutes } from './routes';
import AppRoute from './routes/AppRoute';

function App() {
    return (
        <Router>
            <React.Suspense
                fallback={(
                    <div className="pt-3">
                        <LoadingSpinner />
                    </div>
                )}
            >
                <Switch>
                    {publicRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            component={route.component}
                            key={idx}
                            isAuthProtected={false}
                        />
                    ))}

                    {authProtectedRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            component={route.component}
                            key={idx}
                            isAuthProtected={true}
                        />
                    ))}

                    <Redirect from="*" to="/dashboard" />
                </Switch>
            </React.Suspense>
        </Router>
    );
}

export default App;
