import React, { Component } from 'react';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as CloseIcon } from '../../assets/x-circle.svg';
import { getPartsOfSpeechData } from '../partsOfSpeech';

import './wordDetails.css';

export default class WordDetails extends Component {
  render() {
    return (
      <div className="word-details-container">
        <div className="word-details">
          <div className="word-details-header">
            <Word text="Baleful" />
            <button className="edit-btn"><EditIcon /></button>
            <button className="close-btn"><CloseIcon /></button>
          </div>
          <div className="word-details-body">
            <div className="body-title">DEFINITION</div>
            <div className="body-entry">
              <WordLexeme type="Noun" order="1"/>
              <WordDefinition definition="Threatening harm; menacing" />
            </div>
          </div>
          <div className="word-details-body">
            <div className="body-title">EXAMPLE</div>
            <div className="body-entry">
              <WordLexeme type="Noun" order="1"/>
              <WordExample example="What a baleful personality!" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Word = props => {
  return (
    <div className="word-container">
      <div className="word-text">
        {props.text}
      </div>
    </div>
  );
}

const WordLexeme = props => {
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

const WordDefinition = props => {
  return (
    <div className="word-definition">{props.definition}</div>
  );
}

const WordExample = props => {
  return (
    <div className="word-example">{props.example}</div>
  );
}