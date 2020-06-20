import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import FormGroup, { FormLabel, FormInput, FormTextarea, FormSelect } from '../../components/Form/formGroup';
import { addWordEntry, editWordEntry, cancelEditWordEntry } from '../../actions/entryActions';
import { logoutUser } from '../../actions/userActions';
import { lexeme } from '../../helpers/lexemeData';
import { isEmpty } from '../../helpers/helperFunctions';
import { ReactComponent as LogoutIcon } from '../../assets/log-out.svg';

import './entryForm.css';


class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      details: {
        // "": {
        //   lexeme: '',
        //   definition: '',
        //   example: ''
        // }
      },
      errors: {
        word: '',
        lexeme: '',
        definition: ''
      }
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userId
    });
  }

  componentDidUpdate(prevProps) {
    const { isEntryAdded, isLoadingEdit, isEditing, wordDetails } = this.props;

    // Clear form once entry has been added
    if (isEntryAdded !== prevProps.isEntryAdded && isEntryAdded) {
      this.clearForm();
    }

    // Clear form once entry has been edited
    if (isEditing !== prevProps.isEditing && !isEditing) {
      this.clearForm();
    }

    // Update wordDetails once entry goes into edit mode
    if (isLoadingEdit !== prevProps.isLoadingEdit && isLoadingEdit) {
      let details = {};

      wordDetails.definition.forEach((entry, index) => {
        console.log(entry);
        details[entry.id] = {
          lexeme: wordDetails.definition[index].partsOfSpeech,
          definition: wordDetails.definition[index].definition,
          example: wordDetails.example[index].example
        };
      });

      this.setState({
        word: wordDetails.word,
        details: details
      });
    }
  }

  handleChange = e => {
    // Validate Inputs
    this.checkValidation(e);
    
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleDetailsChange = (e, id) => {
    // Validate Inputs
    this.checkValidation(e);

    const { name, value } = e.target;

    this.setState(prevState => ({
      details: {
        ...prevState.details,
        [id]: {
          ...prevState.details[id],
          [name]: value
        }
      }
    }));
  }

  handleDelete = id => {
    const { [id]: value, ...details } = this.state.details;

    this.setState({
      details: details
    });
  }

  handleReset = () => {
    this.clearForm();

    if (this.props.isEditing) {
      this.props.cancelEditWordEntry();
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const { word, details } = this.state;

    // Validate Form
    if (!this.validateForm(word, details)) {
      return;
    }

    const definitionArray = [];
    const exampleArray = [];

    // Iterate through states to combine definitions and examples
    for (const [id, detail] of Object.entries(details)) {
      console.log(id);
      const definitionEntry = {
        id: id,
        partsOfSpeech: detail.lexeme,
        definition: detail.definition
      };

      const exampleEntry = {
        id: id,
        partsOfSpeech: detail.lexeme,
        example: detail.example
      };

      definitionArray.push(definitionEntry);
      exampleArray.push(exampleEntry);
    }

    const wordEntry = {
      userId: this.state.userId,
      word: this.state.word,
      definition: definitionArray,
      example: exampleArray,
    };

    if (!this.props.isEditing) {
      this.props.addWordEntry(wordEntry);
    } else {
      const modifications = [{
        "propName": "word",
        "value": this.state.word
      },
      {
        "propName": "definition",
        "value": definitionArray
      },
      {
        "propName": "example",
        "value": exampleArray
      }];

      this.props.editWordEntry(this.state.userId, this.props.wordDetails._id, modifications);
    }
  }

  clearForm = () => {
    this.setState({
      word: '',
      details: {},
      errors: {
        word: '',
        lexeme: '',
        definition: ''
      }
    });
  }

  checkValidation = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch(name) {
      case 'word':
        errors.word = 
          (value.length === 0)
            ? 'Enter a word'
            : '';
        break;
      case 'definition':
        errors.definition =
          (value.length === 0)
            ? 'Fill in all definitions'
            : '';
        break;
      default: break;
    }

    this.setState({ errors: errors });
  }

  validateForm = (word, details) => {
    let valid = true;
    let newErrors = {
      word: '',
      lexeme: '',
      definition: ''
    };

    // Check if word is empty
    if (!word) {
      newErrors.word = 'Enter a word';
    }

    // Check if a lexeme is selected
    if (isEmpty(details)) {
      newErrors.lexeme = 'Select a part of speech';
    } 

    // Check if definition is empty
    if (!isEmpty(details)) {
      for (const detail of Object.values(details)) {
        if (!detail.definition ) {
          newErrors.definition = 'Fill in all definitions';
          break;
        }
      }
    }

    // Return false if any inputs are empty
    Object.values(newErrors).forEach(val => {
      val.length > 0 && (valid = false)
    });

    // Update state for error message render
    if (!valid) {
      this.setState({ errors: newErrors });
    }

    return valid;
  }

  handleLogoutClick = () => {
    this.props.logoutUser();
  };

  handleLexemeClick = lexeme => {
    const id = uuidv4();

    this.setState(prevState => ({
      details: {
        ...prevState.details,
        [id]: {
          lexeme: lexeme,
          definition: '',
          example: ''
        }
      }
    }));

    // Remove error message
    if (this.state.errors.lexeme) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          lexeme: ''
        }
      }));
    }
  }

  renderDetails = (detailType) => {
    let detailsArray = [];

    for (const [id, detail] of Object.entries(this.state.details)) {
      detailsArray.push(
        <FormTextarea
          type={detail.lexeme}
          key={id}
          id={id}
          name={detailType}
          tabIndex={10}
          value={this.state.details[id][detailType]} 
          onChange={e => this.handleDetailsChange(e, id)}
          onDelete={this.handleDelete}
        />
      );
    }

    return detailsArray;
  }

  render() {
    const definitionChildren = this.renderDetails('definition');
    const exampleChildren = this.renderDetails('example');

    return (
      <div className="entry-form-container">
        <form className="entry-form" onSubmit={this.handleSubmit}>
          <div className="form-header">
            <div className="form-title">
              <h1>Hi JAF</h1>
              <LogoutIcon className="form-logout-btn" onClick={this.handleLogoutClick} />
            </div>
            <h3 className="form-caption">Ready to add a new word?</h3>
          </div>
          <div className="word-input">
            <FormGroup>
              <FormLabel for="word" name="WORD" errorMessage={this.state.errors.word} errorOn={this.state.errors.word} />
              <FormInput type="text" id="word" name="word" maxLength="20" tabIndex="1" value={this.state.word} onChange={this.handleChange} errorOn={this.state.errors.word}/>
            </FormGroup>
          </div>
          <div className="parts-of-speech-selection">
            <FormGroup>
              <FormLabel name="PARTS OF SPEECH" errorMessage={this.state.errors.lexeme} errorOn={this.state.errors.lexeme} />
              <FormSelect option={lexeme} onClick={this.handleLexemeClick} />
            </FormGroup>
          </div>
          <div className="definition-input">
            <FormGroup>
              <FormLabel for="definition" name="DEFINITION" errorMessage={this.state.errors.definition} errorOn={this.state.errors.definition} />
              {/* <FormTextarea id="definition" name="definition" tabIndex="2" value={this.state.definition} onChange={this.handleChange} /> */}
              <div className="definition-textareas">
                <div className="definition-overflow">
                  { definitionChildren }
                </div>
              </div>
            </FormGroup>
          </div>
          <div className="example-input">
            <FormGroup>
              <FormLabel for="example" name="EXAMPLE" />
              {/* <FormTextarea id="example" name="example" tabIndex="3" value={this.state.example} onChange={this.handleChange} /> */}
              <div className="example-textareas">
                <div className="example-overflow">
                  { exampleChildren }
                </div>
              </div>
            </FormGroup>
          </div>
          <div className="form-buttons">
            <button className="form-reset-btn" type="button" tabIndex="100" onClick={this.handleReset}>Reset</button>
            <button className="form-submit-btn" type="submit" tabIndex="100">{this.props.isEditing ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  isEntryAdded: state.entry.isEntryAdded,
  wordDetails: state.entry.wordDetails,
  isLoadingEdit: state.entry.isLoadingEdit,
  isEditing: state.entry.isEditing
});

export default connect(mapStateToProps, {
  addWordEntry,
  editWordEntry,
  cancelEditWordEntry,
  logoutUser
})(EntryForm);