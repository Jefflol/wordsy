import React, { Component } from 'react';

import FormGroup, { FormInput, FormLabel } from '../../components/Form/formGroup';
import { registerUser } from '../../actions/userActions';
import { connect } from 'react-redux';

import './registerForm.css';


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errors: {
        username: '',
        password: ''
      }
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if(error !== prevProps.error) {
      // Check if username is taken
      if(error.id === 'ERROR_USER_EXISTS') {
        this.setState(prevState => ({ 
          errors: {
            ...prevState.errors,
            username: error.msg
          }
        }));
      }
    }
  }

  handleChange = e => {
    // Validate Inputs
    this.checkValidation(e);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { username, password, errors } = this.state;

    // Validate Form
    if (!this.validateForm(username, password, errors)) {
      return;
    }

    // Register Account
    this.props.registerUser({ username, password });
  }

  checkValidation = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch(name) {
      case 'username':
        errors.username = 
          (value.length < 8 || value.length > 20)
            ? 'Username must be 8 - 20 characters long'
            : '';
        break;
      case 'password':
        errors.password = 
        (value.length < 3)
            ? 'Password must be at least 3 characters long'
            : '';
        break;
      default: break;
    }

    this.setState({ errors: errors });
  }

  validateForm = (username, password, errors) => {
    let valid = true;
    let newErrors = {...errors};

    // Check if username is empty
    if (!username) {
      newErrors.username = 'Username must be 8 - 20 characters long';
    }

    // Check if password is empty
    if (!password) {
      newErrors.password = 'Password must be at least 3 characters long';
    }

    // Return false if any inputs are empty
    Object.values(newErrors).forEach(val => {
      val.length > 0 && (valid = false)
    });

    // Update state for render
    if (!valid) this.setState({ errors: newErrors });

    return valid;
  }

  goToLogin = e => {
    e.preventDefault();
    this.props.switchTab();
  }

  render() {
    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        <div className="form-header">
          <h1 className="form-title">Register</h1>
          <h3 className="form-caption">Ready to add a new word?</h3>
        </div>
        <div className="username-input">
          <FormGroup>
            <FormLabel for="username" name="USERNAME" errorMessage={this.state.errors.username} errorOn={this.state.errors.username}/>
            <FormInput type="text" id="username" name="username" maxLength="20" tabIndex="1" onChange={this.handleChange} errorOn={this.state.errors.username}/>
          </FormGroup>
        </div>
        <div className="password-input">
          <FormGroup>
            <FormLabel for="password" name="PASSWORD" errorMessage={this.state.errors.password} errorOn={this.state.errors.password}/>
            <FormInput type="text" id="password" name="password" autoComplete="on" tabIndex="2" onChange={this.handleChange} errorOn={this.state.errors.password}/>
          </FormGroup>
        </div>
        <button className="form-submit-btn" type="submit" tabIndex="3">Register</button>
        <div className="form-footer">
          {
            this.props.isRegistered &&
            <div className="registration-success">
              <span className="registration-success-text">Registration success!</span>
              <button className="sign-in-btn" type="button" tabIndex="4" onClick={this.goToLogin}>Sign in now!</button>
            </div>
          }
          <div className="existing-account">
            <span className="existing-account-text">Already have an account?</span>
            <button className="sign-in-btn" type="button" tabIndex="5" onClick={this.goToLogin}>Sign in!</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  isRegistered: state.user.isRegistered,
});

export default connect(mapStateToProps, {
  registerUser
})(RegisterForm);