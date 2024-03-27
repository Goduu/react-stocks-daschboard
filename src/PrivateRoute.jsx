import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { checkPermission } from './shared/functions/requests.js';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const user = useSelector(state => state.auth.email)
    const token = useSelector(state => state.auth.token)
    const userRoles = useSelector(state => state.auth.roles)
    let permited = userRoles.filter(r => roles.includes(r)).length > 0 ? true : false


    checkPermission(user, token, roles)
        .then(res => permited = res.permited)
    // const dispatch = useDispatch()

    if (!permited) {
        // not logged in so redirect to login page with the return url
        return (
            <Route  {...rest}>
                <Navigate to={{ pathname: '/', state: { from: rest.location } }} />
            </Route>
        )

    } else {
        // authorised so return component
        return (
            <Route  {...rest}>
                <Component {...rest} />
            </Route>
        )
    }



}

export default PrivateRoute