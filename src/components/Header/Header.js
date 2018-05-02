import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
// import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
    };
  }
  
  loggedOut = () => { 
    this.props.loggedOut()
  }
  handleLogin = () =>{
    this.setState({auth: true}) 
  }
  handleLogout = () => {
    console.log("auth", this.state.auth)
    this.setState({auth: false})
    this.loggedOut()
  }
  
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  }
  render(){
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    // this.props.loggedIn ? this.setState({auth:this.props.loggedIn}):""
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Nextsteps
            </Typography>
            {/* {!auth && (<Button color="inherit">Signup</Button>)} */}
            {/* {!auth && (<Button color="inherit" onClick={this.handleLogin}>Login</Button>)} */}
            {/*auth && (<Button color="inherit" onClick={this.handleLogout}>Logout</Button>) */}
            { this.props.loggedIn && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);