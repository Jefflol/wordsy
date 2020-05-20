import React, { Component } from 'react';
import './registerForm.css';

export default class RegisterForm extends Component {
  render() {
    return (
      <form className="register-form">
        <div className="form-header">
          <h1 className="form-title">Register</h1>
          <h3 className="form-caption">Ready to add a new word?</h3>
        </div>
        <div className="username-input">
          <label htmlFor="username">USERNAME</label>
          <input type="text" id="username" name="username"></input>
        </div>
        <div className="password-input">
          <label htmlFor="password">PASSWORD</label>
          <input type="text" id="password" name="password"></input>
        </div>
        <button className="form-submit-btn">Register</button>
        <div className="existing-account">
          <span>Already have an account?</span>
          <button className="sign-in-btn">Sign in!</button>
        </div>
      </form>
    );
  }
}

/* TODO 
 * Align [sign-in-btn] with rest of text
 */