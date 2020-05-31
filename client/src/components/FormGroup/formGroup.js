import React, { Component } from 'react';
import './formGroup.css';

import { ReactComponent as AlertIcon } from '../../assets/alert-circle.svg';
import { getPartsOfSpeechData } from '../partsOfSpeech';

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
      <div className="body" tabIndex={this.props.tabIndex}>
        <input 
          className={classNames} 
          type={this.props.type} 
          id={this.props.id} 
          name={this.props.name} 
          minLength={this.props.minLength} 
          maxLength={this.props.maxLength} 
          autoComplete={this.props.autoComplete}
          // tabIndex={this.props.tabIndex}
          tabIndex={-1}
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

export class FormTextarea extends Component {
  onChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    const { color: posColor } = getPartsOfSpeechData(this.props.type);
    const classNames = `form-textarea pos-border-active pos-border-${posColor}`;

    return (
      <textarea
        className={classNames}
        id={this.props.id} 
        name={this.props.name}
        value={this.props.value || ''} 
        tabIndex={this.props.tabIndex}
        onChange={this.onChange}
      />
    );
  }
}

export class FormSelect extends Component {
  onClick = (newPartsOfSpeech) => {
    // Add new inputs for definition and example
    this.props.onClick(newPartsOfSpeech);
  }

  render() {
    const options = this.props.option;

    return (
      <div className="form-select">
        { 
          options.map(option => 
            <FormOption
              key={option.id} 
              type={option.type} 
              onClick={this.onClick} 
            />
          )
        }
      </div>
    );
  }
}

export class FormOption extends Component {
  onClick = () => {
    // Add new inputs for definition and example
    this.props.onClick(this.props.type);
  }

  render() {
    const { text: posText, color: posColor } = getPartsOfSpeechData(this.props.type);
    const classNames = `form-option pos-border pos-border-${posColor} pos-background-${posColor} pos-text-${posColor}`;

    return (
      <div className={classNames} key={this.props.id} onClick={this.onClick}>
        {posText}
      </div>
    );
  }
}