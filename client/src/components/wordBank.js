import React, { Component } from 'react';
import { connect } from 'react-redux';

import Entry from './Entry/entry';
import { getWordEntries } from '../actions/entryActions';
import { ReactComponent as MoreIcon } from '../assets/more-horizontal.svg';

import './wordBank.css';


class WordBank extends Component {
  state = {
    entry: [],
  }

  componentDidMount() {
    this.props.getWordEntries(this.props.userId);
    // this.props.getWordEntries('5ec61921d367772fc3177453');
  }

  componentDidUpdate(prevProps) {
    const { isEntryLoading } = this.props;

    if (isEntryLoading !== prevProps.isEntryLoading && !isEntryLoading) {
      this.setState({ entry: this.props.entry || [] });
    }
  }

  toggleOptions = () => {
    console.log('Toggled');
  }

  renderWordBank = () => {
    const wordBank = this.state.entry.map(entry => {
      const definition = entry.definition[0].definition;
      const partsOfSpeeches = [];
      
      entry.definition.forEach(entry => {
        partsOfSpeeches.push(entry.partsOfSpeech)
      });

      return (
        <Entry
          key={entry._id}
          id={entry._id}
          word={entry.word}
          definition={definition}
          pos={partsOfSpeeches}
        />
      );
    });

    return wordBank;
  };

  render() {
    const wordBank = this.renderWordBank();

    return (
      <div className="word-bank-container">
        <div className="word-bank-header">
          <div className="header-title">Your Words</div>
          <MoreIcon className="word-bank-options" onClick={this.toggleOptions} />
        </div>
        <div className="word-bank">
          { wordBank }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  entry: state.entry.wordEntry,
  isEntryLoading: state.entry.isEntryLoading
});

export default connect(mapStateToProps, {
  getWordEntries
})(WordBank);