import React, { Component } from 'react';

import { getPartsOfSpeechData } from '../partsOfSpeech';

import './entry.css';


export default class Entry extends Component {
  render() {
    const { word, definition, pos: partsOfSpeeches, id } = this.props;

    return (
      <div className="entry">
        <div className="entry-word">
          <EntryWord>{word}</EntryWord>
        </div>
        <div className="entry-definition">
          <EntryDefinition>{definition}</EntryDefinition>
        </div>
        <div className="entry-parts-of-speech">
          { partsOfSpeeches.map(pos => <EntryPOS key={`${id}+${pos}`}type={pos} />) }
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
    <div>
      {props.children}
    </div>
  );
}

const EntryPOS = props => {
  const { color: posColor, text: posText } = getPartsOfSpeechData(props.type);
  const classNames = `entry-parts-of-speech-icon pos-background-${posColor} pos-text-${posColor}`;

  return (
    <div className={classNames}>
      {posText}
    </div>
  );
}