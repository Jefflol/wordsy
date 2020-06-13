import React from 'react';
import { getPartsOfSpeechData } from '../partsOfSpeech';

import './word.css';

export const Word = props => {
  return (
    <div className="word-container">
      <div className="word-text">
        {props.text}
      </div>
    </div>
  );
}

export const WordLexeme = props => {
  let { color: lexemeColor, text: lexemeText } = getPartsOfSpeechData(props.type);
  let classNames = `word-lexeme lexeme-background-${lexemeColor} lexeme-text-${lexemeColor}`;

  return (
    <>
      <div className={classNames}>
        {lexemeText}
        <div className="word-lexeme-order">{props.order}</div>
      </div>
    </>
  );
}

export const WordDefinition = props => {
  return (
    <div className="word-definition">{props.definition}</div>
  );
}

export const WordExample = props => {
  return (
    <div className="word-example">{props.example}</div>
  );
}