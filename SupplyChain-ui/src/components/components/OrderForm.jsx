import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 

const styles = _theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap', 
    },
    textField: {
        marginBottom: 16, 
    },
});

class OrderForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            deliveryCompany: '',
            customer: '',
        };
    }   

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        const { classes, onSubmit } = this.props; 

        return (
            <form className={classes.container} noValidate autoComplete='off'>
                <TextField
                    label='Title'
                    name='title'
                    fullWidth
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <TextField
                    label='Description'
                    name='description'
                    fullWidth
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <TextField
                    label='Delivery Company'
                    name='deliveryCompany'
                    fullWidth
                    className={classes.textField}
                    value={this.state.deliveryCompany}
                    onChange={this.handleChange}
                />
                <TextField
                    label='Customer'
                    name='customer'
                    fullWidth
                    className={classes.textField}
                    value={this.state.customer}
                    onChange={this.handleChange}
                />
                <Button 
                    type="button" // Prevent default form submission
                    onClick={e => {
                        e.preventDefault();
                        if (onSubmit) {
                            onSubmit(this.state);
                            this.setState({ // Clear the form after submission
                                title: '',
                                description: '',
                                deliveryCompany: '',
                                customer: '',
                            });
                        }
                    }}
                >
                    CREATE
                </Button>
            </form>    
        );
    }
}

OrderForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired, 
};

export default withStyles(styles)(OrderForm);