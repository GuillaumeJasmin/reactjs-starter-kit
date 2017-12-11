import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainLayout from 'components/Layouts/Main.jsx';
import Home from 'pages/Home';
import About from 'pages/About';

export default () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);
