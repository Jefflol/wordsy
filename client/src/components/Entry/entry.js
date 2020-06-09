import React, { Component } from 'react';

import { getPartsOfSpeechData } from '../partsOfSpeech';

import './entry.css';


export default class Entry extends Component {
  render() {
    const { word, definition, pos: lexemes, id } = this.props;

    return (
      <div className="entry">
        <div className="entry-word">
          <EntryWord>{word}</EntryWord>
        </div>
        <div className="entry-definition">
          <EntryDefinition>{definition}</EntryDefinition>
        </div>
        <div className="entry-lexeme">
          { lexemes.map(lexeme => <EntryLexeme key={`${id}+${lexeme}`} type={lexeme} />) }
        </div>
      </div>
    );
  }
}

const EntryWord = props => {
  return (
    <div className="entry-word-bubble">
      <div className="entry-word-text">
        {props.children}
      </div>
    </div>
  );
}

const EntryDefinition = props => {
  return (
    <>
      {props.children}
    </>
  );
}

const EntryLexeme = props => {
  const { color: lexemeColor, text: lexemeText } = getPartsOfSpeechData(props.type);
  const classNames = `entry-lexeme-icon lexeme-background-${lexemeColor} lexeme-text-${lexemeColor}`;

  return (
    <div className={classNames}>
      {lexemeText}
    </div>
  );
}