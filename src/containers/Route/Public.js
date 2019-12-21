import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const DefaultLayout = lazy(() => import('@components/Layout/Default/Default'));
const Login = lazy(() => import('@containers/Login/Login'));
const Home = lazy(() => import('@containers/Home'));

const PublicRoute = (props) => {
  return (
    <Switch>
      <Route path="/login">
        <DefaultLayout>
          <Login />
        </DefaultLayout>
      </Route>
      <Route path="/home">
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};

export default PublicRoute;