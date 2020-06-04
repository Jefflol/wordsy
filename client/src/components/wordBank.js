import React, { Component } from 'react';
import './wordBank.css';
import { connect } from 'react-redux';
import { getWordEntries } from '../actions/entryActions';

import Entry from './Entry/entry';

class WordBank extends Component {
  state = {
    userId: '5ec61921d367772fc3177453',
    entry: [],
  }

  componentDidMount() {
    this.props.getWordEntries();
  }

  componentDidUpdate(prevProps) {
    const { isEntryLoaded } = this.props;

    if (isEntryLoaded !== prevProps.isEntryLoaded && isEntryLoaded) {
      this.setState({ entry: this.props.entry });
    }
  }

  render() {
    const entries = [];

    this.state.entry.forEach(entry => {
      const definition = entry.definition[0].definition;
      const partsOfSpeeches = [];
      
      entry.definition.forEach(entry => {
        partsOfSpeeches.push(entry.partsOfSpeech)
      });

      const entryChild = <Entry
        key={entry._id}
        id={entry._id}
        word={entry.word}
        definition={definition}
        pos={partsOfSpeeches}
      />
      entries.push(entryChild);
    });

    return (
      <div className="word-bank-container">
        <div className="word-bank">
          { entries }
          {/* <button onClick={this.props.getWordEntries}>Get Entries</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entry.wordEntry,
  isLoggedIn: state.user.isLoggedIn,
  isEntryLoaded: state.entry.isEntryLoaded
});

export default connect(mapStateToProps, {
  getWordEntries
})(WordBank);