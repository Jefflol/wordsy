import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import FormGroup, { FormLabel, FormInput, FormTextarea, FormSelect } from '../FormGroup/formGroup';
import { addWordEntry } from '../../actions/entryActions';
import { partsOfSpeech } from '../partsOfSpeech';
import { isEmpty } from '../helperFunctions';

import './entryForm.css';


class EntryForm extends Component {
  state = {
    // userId: '5ec61921d367772fc3177453',
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

  componentDidMount() {
    this.setState({
      userId: this.props.userId
    });
  }

  componentDidUpdate(prevProps) {
    const { isEntryAdded } = this.props;

    if (isEntryAdded !== prevProps.isEntryAdded && isEntryAdded) {
      this.clearForm();
    }
  }

  onChange = e => {
    // Validate Inputs
    this.checkValidation(e);
    
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeDetails = (e, id) => {
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

  onDelete = id => {
    const { [id]: value, ...details } = this.state.details;

    this.setState({
      details: details
    });
  }

  onSubmit = e => {
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

    this.props.addWordEntry(wordEntry);
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

  lexemeOnClick = lexeme => {
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
          onChange={e => this.onChangeDetails(e, id)}
          onDelete={this.onDelete}
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
        <form className="entry-form" onSubmit={this.onSubmit}>
          <div className="form-header">
            <h1 className="form-title">Hi JAF</h1>
            <h3 className="form-caption">Ready to add a new word?</h3>
          </div>
          <div className="word-input">
            <FormGroup>
              <FormLabel for="word" name="WORD" errorMessage={this.state.errors.word} errorOn={this.state.errors.word} />
              <FormInput type="text" id="word" name="word" maxLength="20" tabIndex="1" value={this.state.word} onChange={this.onChange} errorOn={this.state.errors.word}/>
            </FormGroup>
          </div>
          <div className="parts-of-speech-selection">
            <FormGroup>
              <FormLabel name="PARTS OF SPEECH" errorMessage={this.state.errors.lexeme} errorOn={this.state.errors.lexeme} />
              <FormSelect option={partsOfSpeech} onClick={this.lexemeOnClick} />
            </FormGroup>
          </div>
          <div className="definition-input">
            <FormGroup>
              <FormLabel for="definition" name="DEFINITION" errorMessage={this.state.errors.definition} errorOn={this.state.errors.definition} />
              {/* <FormTextarea id="definition" name="definition" tabIndex="2" value={this.state.definition} onChange={this.onChange} /> */}
              <div className="definition-textareas">
                { definitionChildren }
              </div>
            </FormGroup>
          </div>
          <div className="example-input">
            <FormGroup>
              <FormLabel for="example" name="EXAMPLE" />
              {/* <FormTextarea id="example" name="example" tabIndex="3" value={this.state.example} onChange={this.onChange} /> */}
              <div className="example-textareas">
                { exampleChildren }
              </div>
            </FormGroup>
          </div>
          <button className="form-submit-btn" tabIndex="100">Add</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  isEntryAdded: state.entry.isEntryAdded
});

export default connect(mapStateToProps, {
  addWordEntry
})(EntryForm);