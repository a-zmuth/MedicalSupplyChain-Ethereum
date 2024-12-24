import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/List';
import ListItemText from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/core/icons/List';

import Screen from '../../lib/screen';
import { withStyles } from '@material-ui/core/styles';
import { compose } from '../../lib/util';
import { History } from '../../store';

const drawerWidth = 250;
const styles = theme => ({
  root: {
    width: '100%',
    height: Screen.height,
    display: 'flex',
  },
  contentRoot: {
    width: `calc(100% - ${drawerWidth + 2 * theme.spacing.unit + 1}px)`,
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth + 1}px)`
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit,
    paddingTop: 64 + theme.spacing.unit,
    height: Screen.height - 80
  },
});

const Bar = ({classes}) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <Typography variant='title' color='inherit' noWrap>Medical Supply Chain</Typography>
    </Toolbar>
  </AppBar>
);

const Pane = ({classes}) => (
  <Drawer variant='permanent' classes={{ paper: classes.drawerPaper }}>
    <div>
      <div className={classes.toolbar}/>
      <Divider/>
      <MenuList>
        <MenuItem onClick={ History.push.bind(History, '/account') }>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={ History.push.bind(History, '/createOrder') }>
          <ListItemIcon>
            <CreateIcon/>
          </ListItemIcon>
          <ListItemText>Create Order</ListItemText>  
        </MenuItem>
        <MenuItem onClick={ History.push.bind(History, '/orders') }>
          <ListItemIcon>
            <ListIcon/>
          </ListItemIcon>
          <ListItemText>Orders</ListItemText>  
        </MenuItem>
      </MenuList>
    </div>
  </Drawer>
);

class Main extends React.Component {

  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <Pane classes={classes}/>
        <Bar classes={classes}/>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles)
)(Main);