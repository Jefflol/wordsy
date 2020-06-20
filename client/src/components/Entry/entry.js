import React, { Component } from 'react';

import { deleteWordEntry, getWordEntry } from '../../actions/entryActions';
import { getPartsOfSpeechData } from '../partsOfSpeech';
import { connect } from 'react-redux';

import './entry.css';


class WordEntry extends Component {
  // Delete word entry
  handleDeleteEntry = (e, wordId) => {
    e.stopPropagation();

    this.props.deleteWordEntry(this.props.userId, wordId);
  }

  // Show word details
  handleClickEntry = (e, wordId) => {
    e.stopPropagation();

    this.props.getWordEntry(this.props.userId, wordId);
  }

  render() {
    const { word, definition, lexemes, id, show } = this.props;

    return (
      <div className="entry">
        <div className="entry-word">
          <Word
            text={word}
            onClick={e => this.handleClickEntry(e, id)} 
            onDelete={e => this.handleDeleteEntry(e, id)} 
          />
        </div>
        <div className="entry-definition">
          { 
            show && 
            <WordDefinition text={definition} /> 
          }
        </div>
        <div className="entry-lexeme">
          { 
            lexemes.map(lexeme => 
              <WordLexeme key={`${id}+${lexeme}`} type={lexeme} />
            ) 
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, {
  deleteWordEntry,
  getWordEntry
})(WordEntry);


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
  const { color: lexemeColor, text: lexemeText } = getPartsOfSpeechData(props.type);
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