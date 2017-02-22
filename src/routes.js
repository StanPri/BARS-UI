import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App from './components/App';
import ListsPage from './containers/lists/_Lists-Page';
import AboutPage from './components/about/_About-Page';
import WizardPage from './containers/wizard/_Wizard-Page';
import FormPage from './containers/form/_Form-Page';
import SearchPage from './containers/search/_Search-Page';

// TODO: change all componetns to containers...
export default(
  <Route path="/" component={App}>
    <IndexRoute component={ListsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="wizard" component={WizardPage}/>
    <Route path="form" component={FormPage}/>
    <Route path="search" component={SearchPage}/>
    <Redirect from="*" to="/"/>
  </Route>
);
