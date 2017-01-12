import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App from './components/App';
import ListsPage from './components/lists/_ListsPage';
import AboutPage from './components/about/_AboutPage';
import FormPage from './components/form/_FormPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={ListsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="form" component={FormPage}/>
    <Redirect from="*" to="/"/>
  </Route>
);
