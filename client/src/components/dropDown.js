import React, { Component } from 'react';
import './dropDown.css';

export default class DropDown extends Component {
  onClickHandler = () => {
    console.log('selected');
  }

  render() {
    return (
      <div className="dropdown">
        {this.props.children}
      </div>
    );
  }
}

// Childrens of DropDown must be of type DropDownOption
DropDown.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName]

    let error = null;
    React.Children.forEach(prop, child => {
      if (child.type !== DropDownOption) {
        error = new Error('`' + componentName + '` children should be of type `DropDownOption`.');
      }
    });

    return error;
  }
}

export const DropDownOption = props => {
  return (
    <button
      className="dropdown-option"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}