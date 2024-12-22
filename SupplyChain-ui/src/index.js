import 'normalize.css';
import 'core-js/es6/map';
import 'core-js/es6/set';

import './lib/api';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './store/index';

import Main from './components/containers/Main';
import Account from './components/views/Account';
import CreateOrder from './components/views/CreateOrder';
import Empty from './components/views/Empty';

// This is an example of a basic auth check
const requireAuth = () => {
  // Add your authentication logic here if needed
};

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} onEnter={requireAuth}>
          <Route index element={<Account />} />
          <Route path="account" element={<Account />} />
          <Route path="CreateOrder" element={<CreateOrder />} />
          <Route path="*" element={<Empty />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);
