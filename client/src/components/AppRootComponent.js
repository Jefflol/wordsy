import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserForm from '../components/UserForm/userForm';
import EntryForm from '../components/EntryForm/entryForm';
import WordBank from '../components/wordBank';

import '../App.css';

class AppRootComponent extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.isLoggedIn ? 
          <>
            <EntryForm />
            <WordBank />
          </> :
          <>
            <UserForm />
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(AppRootComponent);