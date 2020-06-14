import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getWordEntry, deleteWordEntry } from '../../actions/entryActions';
import { getPartsOfSpeechData } from '../partsOfSpeech';

import './entry.css';

class Entry extends Component {
  deleteWordEntry = (e, wordId) => {
    e.stopPropagation();

    this.props.deleteWordEntry(this.props.userId, wordId);
  }

  showWordDetails = (e, wordId) => {
    e.stopPropagation();

    this.props.getWordEntry(this.props.userId, wordId);
  }

  render() {
    const { word, definition, pos: lexemes, id } = this.props;

    return (
      <div className="entry">
        <div className="entry-word">
          <EntryWord onClick={e => this.showWordDetails(e, id)} onDelete={e => this.deleteWordEntry(e, id)}>{word}</EntryWord>
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

const mapStateToProps = state => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, {
  getWordEntry,
  deleteWordEntry
})(Entry);

const EntryWord = props => {
  return (
    <div className="entry-word-bubble" onClick={props.onClick}>
      <div className="entry-word-text">
        {props.children}
      </div>
      <button className="entry-word-delete-btn" onClick={props.onDelete}>
        &times;
      </button>
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