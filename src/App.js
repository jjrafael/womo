import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';

import '@assets/styles/global/index.scss';

const PublicRoute = lazy(() => import('@containers/Route/Public'));
const SecureRoute = lazy(() => import('@containers/Route/Secure'));

class App extends Component {
  render () {
    let routes = (
      <PublicRoute />
    );

    if (this.props.isAuthenticated) {
      // Set user routes for authenticated users
      routes = <SecureRoute />;
    }

    return routes;
  }
}

const stateToProps = (state) => {
  const { user } = state;
  return {
    isAuthenticated: user.isLoggedIn === true
  };
};

export default connect(stateToProps)(App);