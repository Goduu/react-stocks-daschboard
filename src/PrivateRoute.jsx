import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { checkPermission } from './shared/functions/requests.js';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const userRoles = useSelector(state => state.auth.roles)
    let permited = userRoles.filter(r => roles.includes(r)).length > 0 ? true : false
    

    checkPermission(user, token, roles)
        .then(res => permited = res.permited)
    // const dispatch = useDispatch()
    return (
        <Route {...rest} render={props => {
            // let permited = true
            // checkPermission(user, token, roles)
            //     .then(res => {
            //         // res.permited ? permited = true : permited = false
            //     });
                if (!permited) {
                    // not logged in so redirect to login page with the return url
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                } else {
                    // authorised so return component
                    return <Component {...props} />
                }

        }} />
    )
}

export default PrivateRoute