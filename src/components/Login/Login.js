import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { FormGroup } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3, }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    margin:"8% 30%",
    boxShadow:"0 0 5px gray"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  button: {
    margin: theme.spacing.unit,
    width:200
  },
  input: {
    display: 'none',
  },
});



class LoginAndRegister extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      username: "",
      password: "",
      email: "", 
      showLoginError: false
    };
  }
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  updateUsername = event => {
    this.setState({username:event.target.value})
  }
  updatePassword = event => {
    this.setState({password:event.target.value})
  }
  updateEmail = event => {
    this.setState({email:event.target.value})
  }

  handleSignup = e => {
    // action="http://localhost:4000/register" method="POST"
    e.preventDefault()

    axios.post("http://localhost:4000/register", 
    { username:this.state.username, 
      password:this.state.password,
      email:this.state.email
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log("login values",val, FormData)
  }
  onLogin = (data) => {
    this.props.onLogin(data)
  }
  handleLogin = e => {
    // action="http://localhost:4000/register" method="POST"
    e.preventDefault()
    const that = this
    axios.post("http://localhost:4000/login", 
    { username:this.state.username, 
      password:this.state.password
    }).then(function (response) {
      console.log(response.data);
      response.data === "user name or password not correct" ?
      that.setState({showLoginError:true}) :
      that.onLogin(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
      {
        this.state.showLoginError ? <h2 style={{color: "red"}}>Invalid username or password</h2> : ""
      }
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Signup" />
            <Tab label="Login" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
          <form onSubmit = {this.handleSignup}>
            <FormGroup >
              <TextField
                required
                id="usernameSignup"
                label="username"
                name="username"
                value={this.state.username}
                onChange={this.updateUsername}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="passwordSignup"
                label="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.updatePassword}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="email"
                label="email"
                name="email"
                value={this.state.email}
                onChange={this.updateEmail}
                className={classes.textField}
                margin="normal"
              />
              <Button variant="raised" color="primary" className={classes.button} type="submit">
                Signup
              </Button>
            </FormGroup>
            </form>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <FormGroup>
              <TextField
                required
                id="username"
                label="username"
                value={this.state.username}
                onChange={this.updateUsername}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="password"
                label="password"
                type="password"
                value={this.state.password}
                onChange={this.updatePassword}
                className={classes.textField}
                margin="normal"
              />
              <Button variant="raised" color="primary" className={classes.button} onClick = {this.handleLogin}>
                Submit
              </Button>
            </FormGroup>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

LoginAndRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LoginAndRegister);