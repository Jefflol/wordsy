import React, { Component } from 'react';
import './entry.css';

export default class Entry extends Component {
  render() {
    const word = this.props.word;
    const definition = this.props.definition;
    const pos = this.props.pos;

    const id = this.props.id;

    return (
      <div className="entry">
        <div className="entry-word">
          <EntryWord>{word}</EntryWord>
        </div>
        <div className="entry-definition">
          <EntryDefinition>{definition}</EntryDefinition>
        </div>
        <div className="entry-parts-of-speech">
          { pos.map(pos => <EntryPOS key={`${id}+${pos}`}type={pos} />) }
        </div>
      </div>
    );
  }
}

class EntryWord extends Component {
  render() {
    return (
      <div className="entry-word-bubble">
        <div className="entry-word-text">
          {this.props.children}
        </div>
      </div>
    );
  }
}

class EntryDefinition extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class EntryPOS extends Component {
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
    const classNames = `entry-parts-of-speech-icon ${typeData.color}`;

    return (
      <div className={classNames}>
        {typeData.text}
      </div>
    );
  }
}