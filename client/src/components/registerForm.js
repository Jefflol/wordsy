import React, { Component } from 'react';
import './registerForm.css';
import { connect } from 'react-redux';

import { registerUser } from '../actions/userActions';

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

  goToLogin = (e) => {
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
          <label htmlFor="username">USERNAME</label>
          <input type="text" id="username" name="username" minLength="8" maxLength="20" onChange={this.onChange}></input>
        </div>
        <div className="password-input">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" name="password" autoComplete="on" onChange={this.onChange}></input>
        </div>
        {/* <input className="form-submit-btn" type="submit" value="Register"></input> */}
        <button className="form-submit-btn">Register</button>
        <div className="existing-account">
          <span>Already have an account?</span>
          <button className="sign-in-btn" onClick={this.goToLogin}>Sign in!</button>
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

/* TODO 
 * Align [sign-in-btn] with rest of text
 */