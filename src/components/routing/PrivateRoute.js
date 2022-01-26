import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route, Redirect } from 'react-router-dom'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext
    return (
      <Route
        render={props =>
          !isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
}

export default PrivateRoute
