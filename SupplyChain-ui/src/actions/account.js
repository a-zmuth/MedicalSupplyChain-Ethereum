import {
    ACCOUNT_LOAD_ADDRESS,
    ACCOUNT_LOAD_ADDRESS_SUCCESS
} from '../constants/action';

export function getAddress() {
    return async (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_LOAD_ADDRESS
        });

        const web3 = getState().web3.instance;

        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        dispatch ({
            type: ACCOUNT_LOAD_ADDRESS_SUCCESS,
            address
        })
    }
}