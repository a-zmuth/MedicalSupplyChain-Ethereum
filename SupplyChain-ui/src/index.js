import 'normalize.css';
import 'core-js/es6/map';
import 'core-js/es6/set';

import 'lib/api';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { Store, History } from './store/index';


import Main from './components/containers/Main';
import Empty from './components/views/Empty';
import Account from './components/views/Account';
import CreateOrder from './components/views/CreateOrder';
import Orders from './components/views/Orders';
import OrderView from './components/views/OrderView';


const requireAuth = () => {
};

History.push('/');

ReactDOM.render(
  <Provider store={ Store }>
    <Router history={ History }>
      <Route path='/' onEnter={ requireAuth } component={ Main }>
        <IndexRoute component={ Account }/>
        <Route path='account' component={ Account }/>
        <Route path='createOrder' component={ CreateOrder }/>
        <Route path='orders' component={ Orders }/>
        <Route path='orders/:index' component={ OrderView }/>
        <Route path='*' component={ Empty } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);