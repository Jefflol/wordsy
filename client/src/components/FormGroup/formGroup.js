import React, { Component } from 'react';
import './formGroup.css';

import { ReactComponent as AlertIcon } from '../../assets/alert-circle.svg';

export default class FormGroup extends Component {
  render() {
    return (
      <div className="form-group">
        {this.props.children}
        {/* <div className="header">
          <label htmlFor="header-label">USERNAME</label>
          <span className="header-alert-error">Username must not be empty</span>
        </div> */}
        {/* <div className="body">
          <input className="body-input" type="text" id="username" name="username" minLength="8" maxLength="20" onChange={this.onChange}></input>
          <input className="body-input body-alert-error" type="text" id="username" name="username" minLength="8" maxLength="20" onChange={this.onChange}></input>
          <div className="alert-error-icon"><AlertIcon /></div>
        </div> */}
      </div>
    );
  }
}


export class FormLabel extends Component {
  render() {
    const errorMessage = this.props.errorMessage;

    return (
      <div className="header">
        <label className="header-label" htmlFor={this.props.for}>{this.props.name}</label>
        {
          this.props.errorOn &&
          <span className="header-alert-error">{errorMessage}</span>
        }
      </div>
    );
  }
}

export class FormInput extends Component {
  onChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    let classNames = "body-input";
    if (this.props.errorOn) classNames += " body-alert-error";

    return (
      <div className="body">
        <input 
          className={classNames} 
          type={this.props.type} 
          id={this.props.id} 
          name={this.props.name} 
          minLength={this.props.minLength} 
          maxLength={this.props.maxLength} 
          autoComplete={this.props.autoComplete}
          tabIndex={this.props.tabIndex}
          onChange={this.onChange}
        ></input>
        {
          this.props.errorOn &&
          <div className="alert-error-icon"><AlertIcon /></div>
        }
      </div>
    );
  }
}