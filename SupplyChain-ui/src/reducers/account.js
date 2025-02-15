import {
    ReducerFactory,
    Assign
} from '../lib/util';
import {
    ACCOUNT_LOAD_ADDRESS,
    ACCOUNT_LOAD_ADDRESS_SUCCESS,
    ACCOUNT_CHANGED 
} from '../constants/action';

const DState = {
    loading: false,
    address: ''
};

const Actions = {
    [ACCOUNT_LOAD_ADDRESS]:
        state => Assign(state, { loading: true }),

    [ACCOUNT_LOAD_ADDRESS_SUCCESS]:
        (state, { address }) => Assign(state, { address, loading: false }),

    [ACCOUNT_CHANGED]: 
        (state, { address }) => Assign(state, { address }) 
};

export default ReducerFactory(DState, Actions);