import React from 'react';
import 'antd/dist/antd.css';
import { Route, Switch } from "react-router-dom";
import routes from '../routes';

const MainLayout = () => {
    return (
        <React.Fragment>
            <Switch>
                {routes.map((route, index) => {
                    return route.Component ? (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={props => <route.Component {...props} />}
                        />
                    ) : null;
                })}
            </Switch>
        </React.Fragment>
    )
};


export default MainLayout;
