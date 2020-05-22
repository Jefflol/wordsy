import React, { Component } from 'react';
import './wordBank.css';
import { connect } from 'react-redux';

import Entry from './Entry/entry';

class WordBank extends Component {
  state = {
    word: 'Baleful',
    definition: [{
      id: 1,
      text: 'Threatening harm; menancing'
    }],
    pos: [{
      id: 1,
      text: 'Adjective'
    },
    {
      id: 2,
      text: 'Noun'
    }]
  }

  render() {
    return (
      <div className="word-bank-container">
        {
          // this.props.isLoggedIn &&
          <div className="word-bank">
            <Entry 
              word={this.state.word}
              definition={this.state.definition}
              pos={this.state.pos}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(WordBank);