import {
    ReducerFactory,
    Assign
} from '../lib/util';
import {
    ORDER_CREATION,
    ORDER_CREATION_SUCCESS
} from '../constants/action';
import { LOCATION_CHANGE } from 'react-router-redux';

const DState =  {
    newOrderTx: null,
    pending: false
};

const Actions = {
    [ORDER_CREATION]:
     state => 
        Assign(state, {pending: true}),

    [ORDER_CREATION_SUCCESS]:
     (state, {newOrderTx}) => 
        Assign (state, {newOrderTx, pending: false}),

    [LOCATION_CHANGE]:
     state => 
        Assign(state, {newOrderTx: null})
};

export default ReducerFactory(DState, Actions);