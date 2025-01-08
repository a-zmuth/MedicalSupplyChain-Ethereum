import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { History } from '../../store/index';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

const OrderList = ({ classes, orders }) => {
    // Log the orders received by OrderList
    console.log('Orders received by OrderList:', orders);

    return (
        <List className={classes.root} subheader={<li />}>
            {orders.length === 0 ? (
                <ListItem>
                    <ListItemText primary="No orders found." />
                </ListItem>
            ) : (
                orders.map((order, index) => (
                    <li key={`section-${index}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListItem key={`item-${index}`}>
                                <ListItemText
                                    primary={`Order ${index}: ${order.title}`} 
                                    onClick={() => History.push(`/orders/${index}`)} 
                                />
                            </ListItem>
                        </ul>
                    </li>
                ))
            )}
        </List>
    );
};

OrderList.propTypes = {
    classes: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired, 
};

// Default props to avoid potential errors
OrderList.defaultProps = {
    orders: [],
};

export default withStyles(styles)(OrderList);