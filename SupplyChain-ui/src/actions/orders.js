import {
    ORDER_ACTION_SUCCESS,
    ORDER_CREATION,
    ORDER_CREATION_SUCCESS
} from '../constants/action';

import api from '../lib/api';

export const createOrder = ({title, description, deliveryCompany, customer}) => 
    async (dispatch, getState) => {
        dispatch({
            type: ORDER_CREATION
        });

        getState().web3.contract.methods.createOrder(title, description, deliveryCompany, customer)
        .send({
            from: getState().account.address
        }, (err, res) => {
            dispatch({
                type: ORDER_CREATION_SUCCESS,
                newOrderTx: res
            })
        });
    };

export const getOrders = () => 

    async (dispatch, getState) => {
        dispatch({
            types: ORDERS_LOAD
        });

        const contract = getState().web3.contract;
        let orders = await api.getOrders(getState().account.address);

        orders = await Promise.all(orders.map(order => contract.methods.getOrder(order.index).call()));

        dispatch ({
            type: ORDERS_LOAD_SUCCESS,
            orders
        })
    }; 

export const startDelivering = index => 
    async (dispatch, getState) => {
        dispatch({
            type: ORDER_ACTION
        })

        getState().web3.contract.methods.startDeliveringOrder(index)
        .send({
            from: getState().account.address
        }, (err, res) => {
            dispatch({
                type: ORDER_ACTION_SUCCESS,
            })
        });
    };

export const stopDelivering = index => 
    async (dispatch, getState) => {
        dispatch({
            type: ORDER_ACTION
        })

        getState().web3.contract.methods.stopDeliveringOrder(index)
        .send({
            from: getState().account.address
        }, (err, res) => {
            dispatch({
                type: ORDER_ACTION_SUCCESS,
            })
        });
    };

export const accept = index => 
    async (dispatch, getState) => {
        dispatch({
            type: ORDER_ACTION
        })

        getState().web3.contract.methods.acceptOrder(index)
        .send({
            from: getState().account.address
        }, (err, res) => {
            dispatch({
                type: ORDER_ACTION_SUCCESS,
            })
        });
    };

export const decline = index => 
    async (dispatch, getState) => {
        dispatch({
            type: ORDER_ACTION
        })

        getState().web3.contract.methods.declineOrder(index)
        .send({
            from: getState().account.address
        }, (err, res) => {
            dispatch({
                type: ORDER_ACTION_SUCCESS,
            })
        });
    };