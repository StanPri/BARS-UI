import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App from './components/App';
import ListsPage from './components/lists/_ListsPage';
import AboutPage from './components/about/_AboutPage';
import WizardPage from './containers/wizard/_Wizard-Page';
import SearchPage from './components/search/_SearchPage';

// TODO: change all componetns to containers...
export default(
  <Route path="/" component={App}>
    <IndexRoute component={ListsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="wizard" component={WizardPage}/>
    <Route path="search" component={SearchPage}/>
    <Redirect from="*" to="/"/>
  </Route>
);
