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
    
    return (
        <List className={classes.root} subheader={<li />}>
            {orders.map((order, index) => (
                <li key={ `section-${index}` } className={classes.listSection}>
                    <ul className={classes.ul}>
                            <ListItem key={ `item-${index}` }>
                                <ListItemText primary={ `Order ${index} : ${order[0]}` }
                                OnClick={History.push.bind(History, '/orders/${index)')}
                                />
                            </ListItem>
                    </ul>
                </li>
            ))}
        </List>
    );
};

OrderList.propTypes = {
    classes: PropTypes.object.isRequired,
    orders: PropTypes.array, // Add type for orders if needed
};

export default withStyles(styles)(OrderList);