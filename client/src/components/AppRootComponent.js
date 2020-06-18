import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserForm from '../components/UserForm/userForm';
import EntryForm from '../components/EntryForm/entryForm';
import WordBank from '../components/wordBank';
import WordDetails from './WordDetails/wordDetails';

import { loadWordEntry } from '../actions/entryActions';

import '../App.css';

class AppRootComponent extends Component {
  state = {
    wordDetails: {},
    showWordDetails: false
  }

  componentDidUpdate(prevProps) {
    const { isWordDetailsLoading, wordDetails, isLoadingEdit } = this.props;

    // Update wordDetails before rendering WordDetails component
    if (isWordDetailsLoading !== prevProps.isWordDetailsLoading && !isWordDetailsLoading) {
      console.log(wordDetails);
      this.setState({ 
        showWordDetails: true,
        wordDetails: wordDetails || {
          word: '',
          definition: [],
          example: []
        },
        userId: wordDetails.userId,
        wordId: wordDetails._id
      });
    }

    // Hide WordDetails component if editing
    if (isLoadingEdit !== prevProps.isLoadingEdit && isLoadingEdit) {
      this.setState({ showWordDetails: false });
    }
  }

  editWordDetails = () => {
    this.props.loadWordEntry(this.state.userId, this.state.wordId);
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
        { 
          this.state.showWordDetails && 
          <WordDetails 
            word={this.state.wordDetails}
            onEdit={this.editWordDetails}
            onClose={this.closeWordDetails}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isWordDetailsLoading: state.entry.isWordDetailsLoading,
  wordDetails: state.entry.wordDetails,
  userId: state.user.userId,
  isLoadingEdit: state.entry.isLoadingEdit
});

export default connect(mapStateToProps, {
  loadWordEntry
})(AppRootComponent);