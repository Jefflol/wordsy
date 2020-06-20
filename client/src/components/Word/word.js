import React from 'react';

import { getLexemeData } from '../../helpers/lexemeData';

import './word.css';


export const Word = props => {
  let classNames = props.onClick ? 'word-container word-hover' : 'word-container';

  return (
    <div className={classNames} onClick={props.onClick}>
      <div className="word-text">
        {props.text}
      </div>
      {
        props.onDelete &&
        <button className="word-delete-btn" onClick={props.onDelete}>
          <span>&times;</span>
        </button>
      }
    </div>
  );
}

export const WordDefinition = props => {
  return (
    <div className="word-definition">
      {props.text}
    </div>
  );
}

export const WordExample = props => {
  return (
    <div className="word-example">
      {props.text}
    </div>
  );
}

export const WordLexeme = props => {
  const { color: lexemeColor, text: lexemeText } = getLexemeData(props.type);
  let classNames = `lexeme-icon lexeme-background-${lexemeColor} lexeme-text-${lexemeColor}`;
  if (props.border) classNames += ` lexeme-border-${lexemeColor} lexeme-border-active`;
  classNames += ` ${props.className}`;

  return (
    <div className={classNames}>
      {lexemeText}
      { props.order && <div className="lexeme-order">{props.order}</div>}
    </div>
  );
}