import React, { Component } from 'react';

import AppRootComponent from './components/AppRootComponent/AppRootComponent';
import { Provider } from 'react-redux';
import store from './store';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRootComponent />
      </Provider>
    )
  }
}