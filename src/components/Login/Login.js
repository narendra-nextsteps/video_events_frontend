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



class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
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
            <FormGroup>
              <TextField
                required
                id="username"
                label="username"
                defaultValue="username"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="password"
                label="password"
                defaultValue="password"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="email"
                label="email"
                defaultValue="email"
                className={classes.textField}
                margin="normal"
              />
              <Button variant="raised" color="primary" className={classes.button}>
                Submit
              </Button>
            </FormGroup>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <FormGroup>
              <TextField
                required
                id="username"
                label="username"
                defaultValue="username"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="password"
                label="password"
                defaultValue="password"
                className={classes.textField}
                margin="normal"
              />
              <Button variant="raised" color="primary" className={classes.button}>
                Submit
              </Button>
            </FormGroup>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);