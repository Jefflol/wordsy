import React, { Component } from 'react';

import EntryForm from '../../screens/EntryForm/entryForm';
import UserForm from '../../screens/UserForm/userForm';
import WordBank from '../../screens/WordBank/wordBank';
import WordDetails from '../../screens/WordDetails/wordDetails';
import { loadWordEntry } from '../../actions/entryActions';

import { connect } from 'react-redux';

import './App.css';


class AppRootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordDetails: {},
      showWordDetails: false
    };
  }

  componentDidUpdate(prevProps) {
    const { isLoadingEdit, isWordDetailsLoading, wordDetails } = this.props;

    // Update wordDetails before rendering WordDetails component
    if (isWordDetailsLoading !== prevProps.isWordDetailsLoading && !isWordDetailsLoading) {
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
  userId: state.user.userId,
  isLoadingEdit: state.entry.isLoadingEdit,
  isWordDetailsLoading: state.entry.isWordDetailsLoading,
  wordDetails: state.entry.wordDetails
});

export default connect(mapStateToProps, {
  loadWordEntry
})(AppRootComponent);