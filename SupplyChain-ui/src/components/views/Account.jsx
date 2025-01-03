import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { compose } from '../../lib/util'; 
import { connect } from 'react-redux';
import { getAddress } from '../../actions/account';
import { CircularProgress } from '@material-ui/core';

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

class Account extends React.Component {
    componentDidMount() {
        this.props.getAddress();
    }

    render() {
        const { classes, address, loading } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    {loading ? <CircularProgress /> 
                     :
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {address ? address : "No account connected"}
                        </Typography>
                    }
                </CardContent>
            </Card>
        );
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(
        state => ({
            address: state.account.address, 
            loading: state.account.loading
        }),
        dispatch => ({
            getAddress: () => dispatch(getAddress())
        })
    )
)(Account);