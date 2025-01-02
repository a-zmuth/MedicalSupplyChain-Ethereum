import Web3 from 'web3';
import {
    ORDER_ACTION,
    ORDER_ACTION_SUCCESS,
    ORDER_CREATION,
    ORDER_CREATION_SUCCESS,
    ORDERS_LOAD,
    ORDERS_LOAD_SUCCESS
} from '../constants/action';

import api from '../lib/api';
import { isAddress } from 'web3-validator';

export const createOrder = ({ title, description, deliveryCompany, customer }) =>
    async (dispatch, getState) => {
        dispatch({ type: ORDER_CREATION });

        const state = getState();
        const web3 = new Web3(window.ethereum);

        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            let accounts = await web3.eth.getAccounts();
            console.log('Accounts:', accounts); // Log accounts for debugging
            let fromAddress = accounts[0];

            // Check if account is available
            if (!fromAddress) {
                throw new Error('No accounts found after requesting access.');
            }

            // Validate deliveryCompany and customer addresses
            if (!isAddress(deliveryCompany) || !isAddress(customer)) {
                throw new Error('Invalid delivery company or customer address.');
            }

            // Assuming contract instance is available in the state
            const contract = state.web3.contract;
            if (!contract) {
                throw new Error('Contract instance is not available. Ensure it is correctly initialized.');
            }

            console.log('Sending transaction from:', fromAddress); // Debugging log

            // Call the contract method to create an order
            contract.methods.createOrder(title, description, deliveryCompany, customer)
                .send({ from: fromAddress })
                .on('transactionHash', (hash) => {
                    console.log('Transaction Hash:', hash);
                })
                .on('receipt', () => {
                    dispatch({
                        type: ORDER_CREATION_SUCCESS,
                        newOrderTx: fromAddress
                    });
                })
                .on('error', (error) => {
                    console.error('Transaction error:', error);
                    alert('Transaction failed: ' + error.message); // Notify user
                });
        } catch (error) {
            console.error('Error in createOrder:', error);
        }
    };

export const getOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDERS_LOAD });

    const contract = getState().web3.contract;
    let orders = await api.getOrders(getState().account.address);

    orders = await Promise.all(orders.map(order => contract.methods.getOrder(order.index).call()));

    dispatch({
        type: ORDERS_LOAD_SUCCESS,
        orders
    });
};

export const startDelivering = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const fromAddress = getState().account.address;
    getState().web3.contract.methods.startDeliveringOrder(index)
        .send({ from: fromAddress })
        .on('receipt', () => {
            dispatch({ type: ORDER_ACTION_SUCCESS });
        })
        .on('error', (error) => {
            console.error('Error starting delivery:', error);
            alert('Error starting delivery: ' + error.message); // Notify user
        });
};

export const stopDelivering = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const fromAddress = getState().account.address;
    getState().web3.contract.methods.stopDeliveringOrder(index)
        .send({ from: fromAddress })
        .on('receipt', () => {
            dispatch({ type: ORDER_ACTION_SUCCESS });
        })
        .on('error', (error) => {
            console.error('Error stopping delivery:', error);
            alert('Error stopping delivery: ' + error.message); // Notify user
        });
};

export const accept = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const fromAddress = getState().account.address;
    getState().web3.contract.methods.acceptOrder(index)
        .send({ from: fromAddress })
        .on('receipt', () => {
            dispatch({ type: ORDER_ACTION_SUCCESS });
        })
        .on('error', (error) => {
            console.error('Error accepting order:', error);
            alert('Error accepting order: ' + error.message); // Notify user
        });
};

export const decline = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const fromAddress = getState().account.address;
    getState().web3.contract.methods.declineOrder(index)
        .send({ from: fromAddress })
        .on('receipt', () => {
            dispatch({ type: ORDER_ACTION_SUCCESS });
        })
        .on('error', (error) => {
            console.error('Error declining order:', error);
            alert('Error declining order: ' + error.message); // Notify user
        });
};

// Listen for account changes
window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
    } else {
        console.log('Account changed to:', accounts[0]);
    }
});