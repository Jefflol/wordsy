import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Word, WordDefinition, WordLexeme } from './word';
import { deleteWordEntry, getWordEntry } from '../../actions/entryActions';

import './wordEntry.css';


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