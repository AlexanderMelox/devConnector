import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Destructure props. ...rest is the rest of the props
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  // Return a Route component
  <Route 
    // Spread the rest of the props
    {...rest}
    // If the user is authenticated then render the component for that route
    render = {props => 
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : ( 
        // Else redirect to login
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);