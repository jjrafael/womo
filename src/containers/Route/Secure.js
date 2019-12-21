import React, { lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

const DefaultLayout = lazy(() => import('@components/Layout/Default/Default'));
const Logout = lazy(() => import('@containers/Logout/Logout'));
const Home = lazy(() => import('@containers/Home'));

const SecureRoute = (props) => {
  return (
    <Switch>
      <Route path="/home">
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      </Route>
      <Route path="/logout">
        <DefaultLayout>
          <Logout />
        </DefaultLayout>
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};

export default SecureRoute;