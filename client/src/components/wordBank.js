import React, { Component } from 'react';
import './wordBank.css';
import { connect } from 'react-redux';

class WordBank extends Component {
  render() {
    return (
      <div className="word-bank-container">
        {
          // this.props.isLoggedIn &&
          <div className="word-bank">
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