import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { Word, WordDefinition, WordLexeme } from './word';
import { deleteWordEntry, getWordEntry } from '../../actions/entryActions';
import { debounce, removeDuplicates } from '../../helpers/helperFunctions';

import './wordEntry.css';


class WordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryLexemeWidth: 0
    };

    this.lexemeRef = createRef();
  }

  componentDidMount() {
    this.getEntryLexemeWidth();

    window.addEventListener('resize', this.getEntryLexemeWidth);
    // window.addEventListener('resize', this.debouncedGetEntryLexemeWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getEntryLexemeWidth);
    // window.removeEventListener('resize', this.debouncedGetEntryLexemeWidth);
  }

  getEntryLexemeWidth = () => {
    this.setState({
      entryLexemeWidth: this.lexemeRef.current.offsetWidth
    });
  }

  // Performance optimization for entryLexeme when resizing screen
  debouncedGetEntryLexemeWidth = debounce(
    this.getEntryLexemeWidth,
    500
  );

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

  renderLexemes = lexemes => {
    let lexemesSize = lexemes.length;
    let res = [];

    for (let i = 0; i < lexemesSize; i++) {
      let lexeme = lexemes[i];

      let style = {
        left: i ? `${(i * 22) + 6}px` : '0px',
        zIndex: `${(lexemesSize - i) * lexemesSize}`, // ensures lexemes are placed in front of each other from left to right
      };

      // Calculate total width of displayed lexemes
      let lexemesWidth = i
        ? (i * 22) + 6 + 28 + 4 // DIFFERENCE(BTW LEFT OF LEXEMES) + DIFFERENCE(BTW FIRST AND NEXT LEXEME SIZE) + WIDTH + BORDER(BOTH SIDES)
        : 34 + 4;

      // If lexemes exceeds entry-lexeme width, show ellipsis for the last one and hide rest
      if (lexemesWidth >= this.state.entryLexemeWidth && lexemesSize - i > 0) {
        // Replace last lexeme with ellipsis lexeme
        style = {
          left: `${((i - 1) * 22) + 6}px`,
          zIndex: `${(lexemesSize - i - 1) * lexemesSize}`,
        };

        res.pop();
        res.push(
          <WordLexeme
            className="entry-lexeme-compact-style"
            style={style}
            key={`${i}+${lexeme}`}
            type={"MORE-LEXEME"} 
          />
        );

        break;
      }

      res.push(
        <WordLexeme
          className="entry-lexeme-compact-style"
          style={style}
          key={`${i}+${lexeme}`}
          type={lexeme} 
        />
      );
    };

    return res;
  }

  render() {
    const { word, definition, lexemes, id, show } = this.props;
    const entryLexemes = this.renderLexemes(removeDuplicates(lexemes));

    return (
      <div className="entry">
        <div className="entry-word">
          <Word
            text={word}
            onClick={e => this.handleClickEntry(e, id)} 
            onDelete={e => this.handleDeleteEntry(e, id)}
            tabIndex={100}
          />
        </div>
        <div className="entry-definition">
          { show && <WordDefinition text={definition} /> }
        </div>
        <div className="entry-lexeme" ref={this.lexemeRef}>
          { entryLexemes }
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