import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App from './components/App';
import ListsPage from './components/lists/_ListsPage';
import AboutPage from './components/about/_AboutPage';
import FormPage from './components/form/_FormPage';
import SearchPage from './components/search/_SearchPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={SearchPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="form" component={FormPage}/>
    <Route path="search" component={SearchPage}/>
    <Redirect from="*" to="/"/>
  </Route>
);
