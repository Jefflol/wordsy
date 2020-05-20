import React, { Component } from 'react';
import './registerForm.css';
import { connect } from 'react-redux';

import { registerUser } from '../actions/userActions';

import FormGroup, { FormLabel, FormInput } from './FormGroup/formGroup';

class RegisterForm extends Component {
  state = {
    username: '',
    password: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    // Register Account
    this.props.registerUser({ username, password });
  }

  goToLogin = e => {
    e.preventDefault();
  }

  render() {
    return (
      <form className="register-form" onSubmit={this.onSubmit}>
        <div className="form-header">
          <h1 className="form-title">Register</h1>
          <h3 className="form-caption">Ready to add a new word?</h3>
        </div>
        <div className="username-input">
          <FormGroup>
            <FormLabel for="username" name="USERNAME" errorMessage="Username must not be empty"/>
            <FormInput type="text" id="username" name="username" minLength="8" maxLength="20" onChange={this.onChange}/>
          </FormGroup>
        </div>
        <div className="password-input">
          <FormGroup>
            <FormLabel for="password" name="PASSWORD"/>
            <FormInput type="password" id="password" name="password" autoComplete="on" onChange={this.onChange}/>
          </FormGroup>
        </div>
        <button className="form-submit-btn">Register</button>
        <div className="existing-account">
            Already have an account?
            <span className="sign-in-btn" onClick={this.goToLogin}>Sign in!</span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterForm);