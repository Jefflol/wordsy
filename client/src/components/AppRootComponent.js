import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserForm from '../components/UserForm/userForm';
import EntryForm from '../components/EntryForm/entryForm';
import WordBank from '../components/wordBank';
import WordDetails from './WordDetails/wordDetails';

import '../App.css';

class AppRootComponent extends Component {
  state = {
    wordDetails: {},
    showWordDetails: false
  }

  componentDidUpdate(prevProps) {
    const { isWordDetailsLoading, wordDetails } = this.props;

    if (isWordDetailsLoading !== prevProps.isWordDetailsLoading && !isWordDetailsLoading) {
      this.setState({ 
        showWordDetails: true,
        wordDetails: wordDetails || {
          word: '',
          definition: [],
          example: []
        } 
      });
    }
  }

  closeWordDetails = () => {
    this.setState({
      showWordDetails: false
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.props.isLoggedIn ? 
          <>
            <EntryForm />
            <WordBank />
          </> :
          <>
            <UserForm />
          </>
        }
        { this.state.showWordDetails && <WordDetails word={this.state.wordDetails} closeWordDetails={this.closeWordDetails} /> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isWordDetailsLoading: state.entry.isWordDetailsLoading,
  wordDetails: state.entry.wordDetails
});

export default connect(mapStateToProps)(AppRootComponent);