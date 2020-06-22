import React from 'react';

import { ReactComponent as MoreIcon } from '../../assets/more-horizontal.svg';
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
  let classNames = `${props.className} lexeme-icon lexeme-background-${lexemeColor} lexeme-text-${lexemeColor}`;
  if (props.border) classNames += ` lexeme-border-${lexemeColor} lexeme-border-active`;

  // Special case to display and ellipsis WordLexeme
  if (props.type === 'MORE-LEXEME') {
    return (
      <div className={classNames} style={props.style}>
        <MoreIcon style={{width: '16px'}}/>
      </div>
    );
  }

  return (
    <div className={classNames} style={props.style}>
      {lexemeText}
      { props.order && <div className="lexeme-order">{props.order}</div>}
    </div>
  );
}