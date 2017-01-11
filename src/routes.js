import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import App from './components/App';
import MainPage from './components/BARS/_MainPage';
import AboutPage from './components/about/_AboutPage';
import FormPage from './components/BARS/FormPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="about" component={AboutPage} />
    <Route path="form" component={FormPage} />
    <Redirect from="*" to="/" />
  </Route>
);
