import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { compose } from '../../lib/util'; 
import { connect } from 'react-redux';
import { 
    startDelivering,
    stopDelivering,
    accept,
    decline
} from '../../actions/orders';

const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Orders extends React.Component {
    
    handleStartDelivering = (e) => {
        e.preventDefault();
        this.props.startDelivering(this.props.index);
    };

    handleStopDelivering = (e) => {
        e.preventDefault();
        this.props.stopDelivering(this.props.index);
    };

    handleAccept = (e) => {
        e.preventDefault();
        this.props.accept(this.props.index);
    };

    handleDecline = (e) => {
        e.preventDefault();
        this.props.decline(this.props.index);
    };

    render() {
        const { 
            classes, orders, index, account 
        } = this.props;

        const order = orders[index];

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {order[0]}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {order[1]}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {order[5]}
                    </Typography>
                </CardContent>

                {order[2] === 0 && order[3] === account && (
                    <Button onClick={this.handleStartDelivering}>
                        Start Delivering
                    </Button>
                )}

                {order[2] === 1 && order[3] === account && (
                    <Button onClick={this.handleStopDelivering}>
                        Stop Delivering
                    </Button>
                )}

                {order[2] === 2 && order[4] === account && (
                    <Button onClick={this.handleAccept}>
                        Accept
                    </Button>
                )}

                {order[2] === 3 && order[4] === account && ( 
                    <Button onClick={this.handleDecline}>
                        Decline
                    </Button>
                )}
            </Card>
        );
    }
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    account: PropTypes.string.isRequired,
    startDelivering: PropTypes.func.isRequired,
    stopDelivering: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    decline: PropTypes.func.isRequired,
};

export default compose(
    withStyles(styles),
    connect(
        (state, ownProps) => ({
            index: ownProps.params.index,
            orders: state.orders.orders,
            account: state.account.address,
            updating: state.orders.updating
        }),
        dispatch => ({
            startDelivering: index => dispatch(startDelivering(index)), 
            stopDelivering: index => dispatch(stopDelivering(index)),
            accept: index => dispatch(accept(index)),
            decline: index => dispatch(decline(index)),
        })
    )
)(Orders);