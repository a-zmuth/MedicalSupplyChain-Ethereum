import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSelfOrders } from '../../actions/orders'; 
import OrderList from './OrderList'; 

const OrdersContainer = ({ getSelfOrders, orders }) => {
    useEffect(() => {
        // Fetch orders when the component mounts
        getSelfOrders();
    }, [getSelfOrders]);

    // Log the orders being passed to OrderList
    console.log('Orders being passed to OrderList:', orders);

    return <OrderList orders={orders} />;
};

// Map state to props, logging the current orders in state
const mapStateToProps = (state) => {
    console.log('Current orders in Redux state:', state.orders.orders); // Log orders
    return {
        orders: state.orders.orders,
    };
};

export default connect(mapStateToProps, { getSelfOrders })(OrdersContainer);