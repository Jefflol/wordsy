import React, { Component } from 'react';

import { WordLexeme } from '../Word/word';
import { ReactComponent as AlertIcon } from '../../assets/alert-circle.svg';

import './form.css';


export const FormGroup = props => {
  return (
    <div className="form-group">
      {props.children}
    </div>
  );
}

export const FormLabel = props => {
  const { for: htmlFor, name, errorMessage, errorOn } = props;

  return (
    <div className="form-label">
      <label className="form-label-text" htmlFor={htmlFor}>{name}</label>
      {
        errorOn &&
        <span className="form-label-alert-error">{errorMessage}</span>
      }
    </div>
  );
}

export class FormInput extends Component {
  onChange = e => {
    this.props.onChange(e);
  }

  render() {
    const { type, id, name, minLength, maxLength, autoComplete, tabIndex, value, errorOn } = this.props;
    let classNames = errorOn ? "form-input form-input-alert-error" : "form-input";

    return (
      <div className="form-input-container">
        <input 
          className={classNames} 
          type={type} 
          id={id} 
          name={name} 
          minLength={minLength} 
          maxLength={maxLength} 
          autoComplete={autoComplete}
          tabIndex={tabIndex}
          value={value}
          onChange={this.onChange}
        />
        {
          errorOn &&
          <div className="form-input-error-icon"><AlertIcon /></div>
        }
      </div>
    );
  }
}

export class FormTextarea extends Component {
  handleChange = e => {
    this.props.onChange(e);
  }

  handleDelete = id => {
    this.props.onDelete(id);
  }

  handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      this.onDelete(id);
    }
  }

  render() {
    const { className, id, name, type, value, tabIndex } = this.props;

    return (
      <div className="form-textarea-container">
        <textarea
          className={`form-textarea ${className}`}
          id={id} 
          name={name}
          value={value}
          tabIndex={tabIndex}
          onChange={this.handleChange}
        />
        {
          !!this.props.onDelete &&
          <button
            className="form-textarea-delete-btn" 
            onClick={() => this.handleDelete(id)}
            onKeyPress={e => this.handleKeyPress(e, id)}
            tabIndex={tabIndex}
          >
            <span>&times;</span>
          </button>
        }
        <WordLexeme className="form-textarea-lexeme-icon" type={type} border />
      </div>
    );
  }
}

export class FormSelect extends Component {
  handleClick = newPartsOfSpeech => {
    // Add new inputs for definition and example
    this.props.onClick(newPartsOfSpeech);
  }

  render() {
    const { options, tabIndex } = this.props;

    return (
      <div className="form-select">
        { 
          options.map(option => 
            <FormOption
              key={option.id} 
              type={option.type} 
              tabIndex={tabIndex}
              onClick={this.handleClick} 
            />
          )
        }
      </div>
    );
  }
}

export class FormOption extends Component {
  handleClick = () => {
    // Add new inputs for definition and example
    this.props.onClick(this.props.type);
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <WordLexeme 
        className={"form-option"}
        type={this.props.type}
        tabIndex={this.props.tabIndex}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        hover
      />
    );
  }
}