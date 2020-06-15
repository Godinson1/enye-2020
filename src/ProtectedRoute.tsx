import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';


//Configure protected route checking state for current logged in user
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    //const { user } = useContext(AuthContext);
    return <Route
        { ...rest }
        render = {(props: any) => 
            !!localStorage.getItem('authUser') ? <Component {...props} />  : <Redirect to="/" />}
        />
}

export default ProtectedRoute;
