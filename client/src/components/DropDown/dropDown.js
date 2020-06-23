import React from 'react';

import './dropDown.css';


export const DropDown = props => {
  return (
    <>
      <div className="dropdown">
        {props.children}
      </div>
      <div className="dropdown-backdrop" onClick={props.onClose}>
      </div>
    </>
  );
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
      tabIndex={props.tabIndex}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}