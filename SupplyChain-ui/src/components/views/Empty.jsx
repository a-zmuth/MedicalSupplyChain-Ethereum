import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from '../../lib/util';
import Img from 'react-image'
import Logo from '../../assets/logo.png';

const styleSheet = {
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logo: {
    width: '25%',
    maxWidth: 200,
    filter: 'invert(10%)'
  }
};

const Empty = ({classes}) => (
  <div className={ classes.main }>
    <Img src={ Logo } className={ classes.logo } alt="asd"/>
  </div>
);

Empty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styleSheet)
)(Empty);