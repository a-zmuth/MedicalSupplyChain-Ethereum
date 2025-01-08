import Web3 from 'web3';
import contractABI from '../config/SupplyChain.abi.json';
import config from '../config';
import {
    ORDER_ACTION,
    ORDER_ACTION_SUCCESS,
    ORDER_CREATION,
    ORDER_CREATION_SUCCESS,
    ORDERS_LOAD,
    ORDERS_LOAD_SUCCESS,
    ACCOUNT_CHANGED
} from '../constants/action';

import { isAddress } from 'web3-validator';

let web3; 

const initializeWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
            } else {
                console.log('Account changed to:', accounts[0]);
                dispatch({ type: ACCOUNT_CHANGED, address: accounts[0] });
            }
        });
    } else {
        console.error("Please install MetaMask!");
    }
};

initializeWeb3();

export const createOrder = ({ title, description, deliveryCompany, customer }) =>
    async (dispatch, getState) => {
        dispatch({ type: ORDER_CREATION });

        try {
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

            // Initialize the contract instance using the ABI and address from config
            const contract = new web3.eth.Contract(contractABI, config.address);
            if (!contract) {
                throw new Error('Contract instance is not available. Ensure it is correctly initialised.');
            }

            console.log('Sending transaction from:', fromAddress); // Debugging log

            // Call the contract method to create an order
            const receipt = await contract.methods.createOrder(title, description, deliveryCompany, customer)
                .send({ from: fromAddress });

            const index = receipt.events.OrderCreated.returnValues.index; // Assuming the event returns the index

            dispatch({
                type: ORDER_CREATION_SUCCESS,
                newOrderTx: 'Order created successfully',
                index // Include the index of the newly created order
            });

            // Get the total number of orders
            const ordersCountBigInt = await contract.methods.getOrdersCount().call();
            const totalOrdersCount = Number(ordersCountBigInt); // Convert BigInt to Number
            
            console.log('Total Orders Count:', totalOrdersCount); // Log the total orders count

            // Get the orders for the specific account
            const userOrders = await contract.methods.getSelfOrders(fromAddress).call();
            console.log('User Orders:', userOrders); // Log the fetched user orders

            // Map the fetched orders to a more usable format
            const formattedOrders = userOrders.map((order, idx) => ({
                index: idx, // The index in the user's order list
                title: order.title,
                description: order.description,
                supplier: order.supplier,
                deliveryCompany: order.deliveryCompany,
                customer: order.customer,
                status: order.status,
            }));

            dispatch({
                type: ORDERS_LOAD_SUCCESS,
                orders: formattedOrders,
                totalOrdersCount // Include total orders count
            });
        } catch (error) {
            console.error('Error in createOrder:', error);
            alert('Error creating order: ' + error.message); // Notify user
        }
    };

export const getOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDERS_LOAD });

    const state = getState(); // Now we use getState
    console.log('Current state:', state); // Log current state for debugging

    try {
        const contract = new web3.eth.Contract(contractABI, config.address);

        // Get the total number of orders using the new function
        const ordersCountBigInt = await contract.methods.getOrdersCount().call();
        const ordersCount = Number(ordersCountBigInt); // Convert BigInt to Number
        console.log('Total Orders:', ordersCount); // Debugging log

        const orders = await Promise.all(
            Array.from({ length: ordersCount }, (_, index) =>
                contract.methods.getOrder(index).call()
            )
        );

        dispatch({
            type: ORDERS_LOAD_SUCCESS,
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message); // Log specific error message
        alert('Error fetching orders: ' + error.message); // Notify user
    }
};

export const startDelivering = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const state = getState();
    const fromAddress = state.account.address; // Get the account address

    try {
        const contract = new web3.eth.Contract(contractABI, config.address); // Initialise the contract

        await contract.methods.startDeliveringOrder(index)
            .send({ from: fromAddress })
            .on('receipt', () => {
                dispatch({ type: ORDER_ACTION_SUCCESS });
            })
            .on('error', (error) => {
                console.error('Error starting delivery:', error);
                alert('Error starting delivery: ' + error.message); // Notify user
            });
    } catch (error) {
        console.error('Error in startDelivering:', error);
    }
};

export const stopDelivering = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const state = getState();
    const fromAddress = state.account.address; // Get the account address

    try {
        const contract = new web3.eth.Contract(contractABI, config.address); // Initialise the contract

        await contract.methods.stopDeliveringOrder(index)
            .send({ from: fromAddress })
            .on('receipt', () => {
                dispatch({ type: ORDER_ACTION_SUCCESS });
            })
            .on('error', (error) => {
                console.error('Error stopping delivery:', error);
                alert('Error stopping delivery: ' + error.message); // Notify user
            });
    } catch (error) {
        console.error('Error in stopDelivering:', error);
    }
};

export const accept = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const state = getState();
    const fromAddress = state.account.address; // Get the account address

    try {
        const contract = new web3.eth.Contract(contractABI, config.address); // Initialise the contract

        await contract.methods.acceptOrder(index)
            .send({ from: fromAddress })
            .on('receipt', () => {
                dispatch({ type: ORDER_ACTION_SUCCESS });
            })
            .on('error', (error) => {
                console.error('Error accepting order:', error);
                alert('Error accepting order: ' + error.message); // Notify user
            });
    } catch (error) {
        console.error('Error in accept:', error);
    }
};

export const decline = index => async (dispatch, getState) => {
    dispatch({ type: ORDER_ACTION });

    const state = getState();
    const fromAddress = state.account.address; // Get the account address

    try {
        const contract = new web3.eth.Contract(contractABI, config.address); // Initialise the contract

        await contract.methods.declineOrder(index)
            .send({ from: fromAddress })
            .on('receipt', () => {
                dispatch({ type: ORDER_ACTION_SUCCESS });
            })
            .on('error', (error) => {
                console.error('Error declining order:', error);
                alert('Error declining order: ' + error.message); // Notify user
            });
    } catch (error) {
        console.error('Error in decline:', error);
    }
};

export const getSelfOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDERS_LOAD });

    const state = getState();
    const account = state.account.address; // Get the connected account address
    console.log('Account Address:', account); // Log the account address

    try {
        const contract = new web3.eth.Contract(contractABI, config.address);
        console.log('Contract instance:', contract); // Log the contract instance

        // Call the getSelfOrders function
        const orders = await contract.methods.getSelfOrders(account).call();
        console.log('Fetched orders:', orders); // Log fetched orders

        if (orders.length === 0) {
            console.log('No orders found for this account.');
        }

        // Map the fetched orders to a more usable format
        const formattedOrders = orders.map((order, idx) => ({
            index: idx, // The index in the user's order list
            title: order.title,
            description: order.description,
            supplier: order.supplier,
            deliveryCompany: order.deliveryCompany,
            customer: order.customer,
            status: order.status,
        }));

        dispatch({
            type: ORDERS_LOAD_SUCCESS,
            orders: formattedOrders
        });
    } catch (error) {
        console.error('Error fetching self orders:', error); // Log the entire error object
        alert('Error fetching orders: ' + error.message);
    }
};