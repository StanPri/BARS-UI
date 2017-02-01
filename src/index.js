import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './css/style.less';
import configureStore from './store/configureStore';
import {authUser} from './actions/authActions';
import {empDir} from './actions/empDirActions';

const store = configureStore();
// if (!store.getState().authUser.isAuthenticated) { // TODO: for now always gets token, need to check timestamp overdue or somthing...
  store.dispatch(authUser());
// }
store.dispatch(empDir());

render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
</Provider>, document.getElementById('app'));
