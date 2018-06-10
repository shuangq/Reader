import React from 'react';
import { Route, Link } from 'react-router-dom';
import { checkIfAuth } from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            checkIfAuth() ? (
                <Component {...props} />
            ): (
                <div className="unauth-screen">
                    <p>Please <Link to="/login">login</Link> to see your saved articles.</p>
                </div>
            )
        }
    />
);

export default PrivateRoute;
