import React, { Component } from 'react';
import './App.css';
import RegisterForm from './components/registerForm';

import { Provider } from 'react-redux';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RegisterForm />
        </div>
      </Provider>
    )
  }
}