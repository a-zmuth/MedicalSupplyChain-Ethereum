import { routerReducer } from 'react-router-redux';
import web3 from './web3';
import account from './account';
import orders from './orders';

export default {
  routing: routerReducer,
  web3,
  account,
  orders
};