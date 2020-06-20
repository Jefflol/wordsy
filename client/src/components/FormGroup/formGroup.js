import React, { Component } from 'react';

import { EntryLexeme } from '../Entry/entry';
import { ReactComponent as AlertIcon } from '../../assets/alert-circle.svg';
import { getPartsOfSpeechData } from '../partsOfSpeech';

import './formGroup.css';

export default class FormGroup extends Component {
  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    );
  }
}

export const FormLabel = props => {
  const { for: htmlFor, name, errorMessage, errorOn } = props;

  return (
    <div className="header">
      <label className="header-label" htmlFor={htmlFor}>{name}</label>
      {
        errorOn &&
        <span className="header-alert-error">{errorMessage}</span>
      }
    </div>
  );
}

export class FormInput extends Component {
  onChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    const { type, id, name, minLength, maxLength, autoComplete, tabIndex, value, errorOn } = this.props;
    let classNames = errorOn ? "body-input body-alert-error" : "body-input";

    return (
      // <div className="body" tabIndex={tabIndex}>
      <div className="body">
        <input 
          className={classNames} 
          type={type} 
          id={id} 
          name={name} 
          minLength={minLength} 
          maxLength={maxLength} 
          autoComplete={autoComplete}
          tabIndex={tabIndex}
          // tabIndex={-1}
          value={value}
          onChange={this.onChange}
        ></input>
        {
          errorOn &&
          <div className="alert-error-icon"><AlertIcon /></div>
        }
      </div>
    );
  }
}

export class FormTextarea extends Component {
  onChange = e => {
    this.props.onChange(e);
  }

  onDelete = id => {
    this.props.onDelete(id);
  }

  onKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      this.onDelete(id);
    }
  }

  render() {
    const { id, name, type, value, tabIndex } = this.props;

    return (
      <div className="form-textarea-container">
        <textarea
          className="form-textarea"
          id={id} 
          name={name}
          value={value}
          tabIndex={tabIndex}
          onChange={this.onChange}
        />
        {
          !!this.props.onDelete &&
          <div
            className="form-textarea-delete-btn" 
            onClick={() => this.onDelete(id)}
            onKeyPress={(e) => this.onKeyPress(e, id)}
            tabIndex={tabIndex}
          >
            <span>&times;</span>
          </div>
        }
        <EntryLexeme className="lexeme-icon" type={type} border />
      </div>
    );
  }
}

export class FormSelect extends Component {
  onClick = newPartsOfSpeech => {
    // Add new inputs for definition and example
    this.props.onClick(newPartsOfSpeech);
  }

  render() {
    const options = this.props.option;

    return (
      <div className="form-select">
        { 
          options.map((option, index) => 
            <FormOption
              key={option.id} 
              type={option.type} 
              tabIndex={index + 1}
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

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.onClick();
    }
  }


  render() {
    const { id, type, tabIndex } = this.props;
    const { text: posText, color: posColor } = getPartsOfSpeechData(type);
    const classNames = `form-option pos-border pos-border-${posColor} pos-background-${posColor} pos-text-${posColor}`;

    return (
      <div
        className={classNames} 
        key={id}
        tabIndex={tabIndex}
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
      >
        {posText}
      </div>
    );
  }
}