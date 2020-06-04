import React, { Component } from 'react';
// import './App.css';
import { Provider } from 'react-redux';
import store from './store';

// import UserForm from './components/UserForm/userForm';
// import WordBank from './components/wordBank';
// import EntryForm from './components/EntryForm/entryForm';

import AppRootComponent from './components/AppRootComponent';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <div className="App">
          <EntryForm />
          <WordBank />
          <UserForm />
        </div> */}
        <AppRootComponent />
      </Provider>
    )
  }
}