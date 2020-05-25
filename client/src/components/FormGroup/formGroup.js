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

export class FormTextarea extends Component {
  onChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    return (
      <textarea
        className="form-textarea" 
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
  render() {
    const options = this.props.option;

    console.log(options);

    return (
      <div className="form-select">
        { options.map(option => <FormOption key={option.id} type={option.type} />) }
      </div>
    );
  }
}

export class FormOption extends Component {
  state = {
    isPressed: false
  }
  
  toggle = () => {
    this.setState(prevState => ({
      isPressed: !prevState.isPressed
    }));
  }

  getType = (type) => {
    let posData = {};
    
    switch(type) {
      case 'Noun':
        posData.color = 'pos-blue';
        posData.text = 'N';
        break;
      case 'Pronoun':
        posData.color = 'pos-green';
        posData.text = 'PN';
        break;
      case 'Adjective':
        posData.color = 'pos-yellow';
        posData.text = 'Adj';
        break;
      case 'Verb':
        posData.color = 'pos-orange';
        posData.text = 'V';
        break;
      case 'Adverb':
        posData.color = 'pos-red';
        posData.text = 'Adv';
        break;
      case 'Preposition':
        posData.color = 'pos-dark-red';
        posData.text = 'Pre';
        break;
      case 'Other':
      default:
        posData.color = 'pos-grey';
        posData.text = 'O';
        break;
    }

    return posData;
  }

  render() {
    const typeData = this.getType(this.props.type);
    const classNames = this.state.isPressed ? `form-option pos-border ${typeData.color}` : `form-option ${typeData.color}`;

    return (
      <div className={classNames} key={this.props.id} onClick={this.toggle}>
        {typeData.text}
      </div>
    );
  }
}