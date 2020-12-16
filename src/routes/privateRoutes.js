import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const loginSession = useSelector(state => state.loginSession || false);
    return (
        <Route  {...rest} render={
            (props) => {

                return loginSession ? <Component {...props} /> : <Redirect to={
                    {
                        pathname: '/',
                        state: {
                            from: props.location
                        }
                    }
                } />
            }
        } />
    )
}

export default PrivateRoutes;