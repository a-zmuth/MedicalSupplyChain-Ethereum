import {
    ORDER_CREATION,
    ORDER_CREATION_SUCCESS
} from '../constants/action';

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