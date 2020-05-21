import React, { Component } from 'react';
import './loginForm.css';

import FormGroup, { FormLabel, FormInput } from '../FormGroup/formGroup';

export default class LoginForm extends Component {
  state = {
    username: null,
    password: null,
    errors: {
      username: '',
      password: ''
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
  }

  goToRegister = e => {
    e.preventDefault();
    this.props.switchTab();
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.onSubmit}>
      <div className="form-header">
        <h1 className="form-title">Welcome Back</h1>
        <h3 className="form-caption">Ready to add a new word?</h3>
      </div>
      <div className="username-input">
        <FormGroup>
          <FormLabel for="username" name="USERNAME" />
          <FormInput type="text" id="username" name="username" maxLength="20" tabIndex="1" onChange={this.onChange} />
        </FormGroup>
      </div>
      <div className="password-input">
        <FormGroup>
          <FormLabel for="password" name="PASSWORD" />
          <FormInput type="text" id="password" name="password" autoComplete="on" tabIndex="2" onChange={this.onChange} />
        </FormGroup>
      </div>
      <button className="form-submit-btn" tabIndex="3">Login</button>
      <div className="form-footer">
        <div className="register-account">
          <span className="register-text">Don't have an account?</span>
          <button className="register-btn" tabIndex="4" onClick={this.goToRegister}>Register now!</button>
        </div>
      </div>
    </form>
    );
  }
}