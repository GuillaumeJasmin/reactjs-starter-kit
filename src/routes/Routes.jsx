import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from 'components/Layouts/Main.jsx';
import Home from 'pages/Home';
import About from 'pages/About';
import history from './history';

export default () => (
  <Router history={history}>
    <MainLayout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Redirect to="/home" />
      </Switch>
    </MainLayout>
  </Router>
);
