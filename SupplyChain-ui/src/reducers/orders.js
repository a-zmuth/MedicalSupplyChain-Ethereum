import {
    ReducerFactory,
    Assign
} from '../lib/util';
import {
    ORDER_CREATION,
    ORDER_CREATION_SUCCESS,
    ORDERS_LOAD,
    ORDERS_LOAD_SUCCESS,
    ORDER_ACTION,
    ORDER_ACTION_SUCCESS,
    ACCOUNT_CHANGED // Import the ACCOUNT_CHANGED action type
} from '../constants/action';
import { LOCATION_CHANGE } from 'react-router-redux';

const DState = {
    newOrderTx: null,
    pending: false,
    orders: [],
    loading: false,
    updating: false
};

const Actions = {
    [ORDER_CREATION]:
        state => Assign(state, { pending: true }),

    [ORDER_CREATION_SUCCESS]:
        (state, { newOrderTx }) => Assign(state, { newOrderTx, pending: false }),

    [LOCATION_CHANGE]:
        state => Assign(state, { newOrderTx: null }),

    [ORDERS_LOAD]:
        state => Assign(state, { loading: true }),

    [ORDERS_LOAD_SUCCESS]:
        (state, { orders }) => Assign(state, { orders, loading: false }),

    [ORDER_ACTION]:
        state => Assign(state, { updating: true }),

    [ORDER_ACTION_SUCCESS]:
        state => Assign(state, { updating: false }),

    [ACCOUNT_CHANGED]: 
        (state) => {
        
            return Assign(state, { orders: [] }); 
        }
};

export default ReducerFactory(DState, Actions);