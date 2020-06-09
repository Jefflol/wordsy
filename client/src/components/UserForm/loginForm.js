import React, { Component } from 'react';
import './loginForm.css';
import { connect } from 'react-redux';

import FormGroup, { FormLabel, FormInput } from '../FormGroup/formGroup';
import { loginUser } from '../../actions/userActions';

class LoginForm extends Component {
  state = {
    username: null,
    password: null,
    errors: {
      username: '',
      password: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if(error !== prevProps.error) {
      // Check if username and passwords are correct
      if(error.id === 'ERROR_INVALID_CREDENTIALS') {
        this.setState(prevState => ({ 
          errors: {
            ...prevState.errors,
            username: error.msg,
            password: error.msg
          }
        }));
      }
    }
  }

  onChange = e => {
    // Validate Inputs
    this.checkValidation(e);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    // Validate Form
    if (!this.validateForm(username, password)) {
      return;
    }

    // Login User
    this.props.loginUser({ username, password });
  }

  checkValidation = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch(name) {
      case 'username':
        errors.username = 
          (value.length === 0)
            ? 'Enter a username'
            : '';
        break;
      case 'password':
        errors.password = 
        (value.length === 0)
            ? 'Enter a password'
            : '';
        break;
      default: break;
    }

    this.setState({ errors: errors });
  }

  validateForm = (username, password) => {
    let valid = true;
    let newErrors = {};

    // Check if username is empty
    if (!username) {
      newErrors.username = 'Enter a username';
    }

    // Check if password is empty
    if (!password) {
      newErrors.password = 'Enter a password';
    }

    // Return false if any inputs are empty
    Object.values(newErrors).forEach(val => {
      val.length > 0 && (valid = false)
    });

    // Update state for render
    if (!valid) this.setState({ errors: newErrors });

    return valid;
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
          <FormLabel for="username" name="USERNAME" errorMessage={this.state.errors.username} errorOn={this.state.errors.username} />
          <FormInput type="text" id="username" name="username" maxLength="20" tabIndex="1" errorOn={this.state.errors.username} onChange={this.onChange} />
        </FormGroup>
      </div>
      <div className="password-input">
        <FormGroup>
          <FormLabel for="password" name="PASSWORD" errorMessage={this.state.errors.password} errorOn={this.state.errors.password} />
          <FormInput type="password" id="password" name="password" autoComplete="on" tabIndex="2" errorOn={this.state.errors.password} onChange={this.onChange} />
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

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, {
  loginUser
})(LoginForm);