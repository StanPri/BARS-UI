/*eslint-disable import/default */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './css/style.less';
import configureStore from './store/configureStore';
import {auth} from './actions/authActions';

const store = configureStore();
store.dispatch(auth());

render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
</Provider>, document.getElementById('app'));
