import React, { Component } from 'react';
import './App.css';
import MenuAppBar from '../Header/Header'
import LoginAndRegister from '../Login/Login'
import Videos from '../Videos/Videos'

class App extends Component {
  constructor(props){
    super();
    this.state={
      loginDetails : undefined,
      loggedIn: false
    }
  }
  render() {
    console.log(this.state.loginDetails, this.state.loggedIn)
    return (
      <div className="App">
        <MenuAppBar loggedIn={this.state.loggedIn} loggedOut = {logout => this.setState({loginDetails: undefined, loggedIn:false})}/>
        
        {
          this.state.loginDetails !== undefined ?
          (
            <Videos loginDetails = {this.state.loginDetails}/>
          ):
          <LoginAndRegister onLogin={loginDetails => this.setState({loginDetails, loggedIn:true})}/>
        }
      </div>
    );
  }
}

export default App;
