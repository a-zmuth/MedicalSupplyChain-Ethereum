// src/store/index.js
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'; // Use legacy_createStore
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RPersist from '../lib/redux-persist-state';
import reducers from '../reducers';

const { preloadedState, persistState } = RPersist(['address', 'aliases']);

// Create the Redux store using legacy_createStore to avoid deprecation warning
export const Store = createStore(
  combineReducers(reducers),
  preloadedState,
  applyMiddleware(
    logger,
    thunk,
    persistState
  )
);

// Keep the history setup
export const History = syncHistoryWithStore(hashHistory, Store);

export default Store;


/*import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import {
  hashHistory
} from 'react-router';

import {
  syncHistoryWithStore
} from 'react-router-redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RPersist from '../lib/redux-persist-state';
import reducers from '../reducers';

const {preloadedState, persistState} = RPersist(['address', 'aliases']);

export const Store = createStore(
  combineReducers(reducers),
  preloadedState,
  applyMiddleware(
    logger,
    thunk,
    persistState
  )
);
export const History = syncHistoryWithStore(hashHistory, Store);

export default Store; */