import Web3 from 'web3';
import {
    ACCOUNT_LOAD_ADDRESS,
    ACCOUNT_LOAD_ADDRESS_SUCCESS
} from '../constants/action';

export function getAddress() {
    return async (dispatch) => {
        dispatch({ type: ACCOUNT_LOAD_ADDRESS });

        // Initialize web3 instance
        const web3 = new Web3(window.ethereum);

        // Request account access
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];

            dispatch({
                type: ACCOUNT_LOAD_ADDRESS_SUCCESS,
                address
            });
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };
}