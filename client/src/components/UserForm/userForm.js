import React, { Component } from 'react';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';

import './userForm.css';


export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'LOGIN_TAB'
    };
  }
  
  switchTab = () => {
    if (this.state.tab === 'REGISTER_TAB') {
      this.setState({ tab: 'LOGIN_TAB' });
    } else {
      this.setState({ tab: 'REGISTER_TAB' });
    }
  }

  render() {
    return (
      <div className="user-form">
        {
          this.state.tab === 'REGISTER_TAB' &&
          <RegisterForm switchTab={this.switchTab} />
        }
        {
          this.state.tab === 'LOGIN_TAB' &&
          <LoginForm switchTab={this.switchTab} />
        }
      </div>
    );
  }
}