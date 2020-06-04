import React, { Component } from 'react';
import '../App.css';

import UserForm from '../components/UserForm/userForm';
import WordBank from '../components/wordBank';
import EntryForm from '../components/EntryForm/entryForm';

import { connect } from 'react-redux';

class AppRootComponent extends Component {
  render() {
    return (
      <div className="App">
        { this.props.isLoggedIn && <EntryForm /> }
        { this.props.isLoggedIn && <WordBank/> }
        { !this.props.isLoggedIn && <UserForm /> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(AppRootComponent);