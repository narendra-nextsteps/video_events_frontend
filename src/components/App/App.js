import React, { Component } from 'react';
import './App.css';
import MenuAppBar from '../Header/Header'
import FullWidthTabs from '../Login/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuAppBar/>
        <FullWidthTabs/>
      </div>
    );
  }
}

export default App;
