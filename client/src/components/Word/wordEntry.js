import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Word, WordDefinition, WordLexeme } from './word';
import { deleteWordEntry, getWordEntry } from '../../actions/entryActions';
import { debounce } from '../../helpers/helperFunctions';

import './wordEntry.css';


class WordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryLexemeWidth: 0
    };

    this.lexemeRef = React.createRef();
  }

  componentDidMount() {
    this.getEntryLexemeWidth();

    window.addEventListener('resize', this.getEntryLexemeWidth);
    // window.addEventListener('resize', this.debouncedGetEntryLexemeWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedGetEntryLexemeWidth);
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
    let res = [];

    lexemes.some((lexeme, index) => {
      // Calculate total width of displayed lexemes
      let lexemesWidth = index
        ? (index * 22) + 6 + 28 + 4 // DIFFERENCE(BTW LEFT OF LEXEMES) + DIFFERENCE(BTW FIRST AND NEXT LEXEME SIZE) + WIDTH + BORDER(BOTH SIDES)
        : 34 + 4;

      let style = {
        left: index ? `${(index * 22) + 6}px` : '0px',
        zIndex: `${(lexemes.length - index) * lexemes.length}`, // ensures lexemes are placed in front of each other from left to right
      };

      // If lexemes exceeds entry-lexeme width, show ellipsis for the last one and hide rest
      if (lexemesWidth >= this.state.entryLexemeWidth && lexemes.length - index > 0) {
        // Replace last lexeme with ellipsis lexeme
        style = {
          left: `${((index - 1) * 22) + 6}px`,
          zIndex: `${(lexemes.length - index - 1) * lexemes.length}`,
        };

        res.pop();
        res.push(
          <WordLexeme
            className="entry-lexeme-compact-style"
            style={style}
            key={`${index}+${lexeme}`}
            type={"MORE-LEXEME"} 
          />
        );

        return true;
      }

      res.push(
        <WordLexeme
          className="entry-lexeme-compact-style"
          style={style}
          key={`${index}+${lexeme}`}
          type={lexeme} 
        />
      );
    });

    return res;
  }

  render() {
    const { word, definition, lexemes, id, show } = this.props;
    const entryLexemes = this.renderLexemes(lexemes);

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