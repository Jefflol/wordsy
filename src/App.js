import React, { Component } from 'react';
import './App.css';

import RegisterForm from './components/registerForm';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterForm></RegisterForm>
      </div>
    )
  }
}