import React from 'react';
import OrderForm from '../components/OrderForm';
import { compose } from '../../lib/util'; 
import { connect } from 'react-redux';
import { createOrder } from '../../actions/orders';
import { CircularProgress, Typography } from '@material-ui/core';

const CreateOrder = ({newOrderTx, pending, createOrder}) =>
    (pending ?
        <CircularProgress/> :
        <div>
            <OrderForm onSubmit = {createOrder}/>
            {
                ((!!newOrderTx) ? <Typography>order { newOrderTx }</Typography> : <p/>)
            }
        </div>
    );        

export default compose(
    connect(
        state => ({
            newOrderTx: state.orders.newOrderTx,
            pending: state.orders.pending
        }),
        dispatch => ({
            CreateOrder: order => dispatch(createOrder(order))
        })
    )
)(CreateOrder);