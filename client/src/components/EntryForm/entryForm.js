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
    partsOfSpeeches: [],
    definitions: {},
    examples: {},
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

  onChangeDefinition = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      definitions: {
        ...prevState.definitions,
        [name]: value
      }
    }));

    // Remove error message when user begins typing definition
    if (this.state.errors.definition) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          definition: ''
        } 
      }));
    }
  }

  onChangeExample = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      examples: {
        ...prevState.examples,
        [name]: value
      }
    }));
  }

  onDelete = id => {
    const { [id]: definitionValue, ...definition } = this.state.definitions;
    const { [id]: exampleValue, ...example } = this.state.examples;

    this.setState(prevState => ({
      partsOfSpeeches: prevState.partsOfSpeeches.filter(lexeme => {
        console.log(lexeme.id);
        return lexeme.id !== id;
      }),
      definitions: definition,
      examples: example
    }));
  }

  onSubmit = e => {
    e.preventDefault();

    const { word, definitions } = this.state;

    // Validate Form
    if (!this.validateForm(word, definitions)) {
      return;
    }

    const definitionArray = [];
    const exampleArray = [];
    const definitionEntries = Object.entries(this.state.definitions);
    const exampleEntries = Object.entries(this.state.examples);

    // Iterate through states to separate definitions and examples
    for (const [id, value] of definitionEntries) {
      const pos = this.state.partsOfSpeeches.find(lexeme => lexeme.id === id);

      const definitionEntry = {
        id: id,
        partsOfSpeech: pos.partsOfSpeech,
        definition: value
      };

      definitionArray.push(definitionEntry);
    }

    for (const [id, value] of exampleEntries) {
      const pos = this.state.partsOfSpeeches.find(lexeme => lexeme.id === id);

      const exampleEntry = {
        id: id,
        partsOfSpeech: pos.partsOfSpeech,
        example: value
      };

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
      partsOfSpeeches: [],
      definitions: {},
      examples: {},
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
      default: break;
    }

    this.setState({ errors: errors });
  }

  validateForm = (word, definitions) => {
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

    // Check if a definition entry is added
    if (isEmpty(definitions)) {
      newErrors.lexeme = 'Select a part of speech';
    } 

    // Check if definition is empty
    if (!isEmpty(definitions)) {
      for (const key in definitions) {
        const value = definitions[key];
        if (!value ) {
          newErrors.definition = 'Fill in all definitions';
          break;
        }
      }
    }

    // Return false if any inputs are empty
    Object.values(newErrors).forEach(val => {
      val.length > 0 && (valid = false)
    });

    // Update state for render
    if (!valid) this.setState({ errors: newErrors });
    // this.setState({ errors: newErrors });

    return valid;
  }

  posOnClick = newPartsOfSpeech => {
    const pos = {
      id: uuidv4(),
      partsOfSpeech: newPartsOfSpeech
    };

    this.setState(prevState => ({
      partsOfSpeeches: [...prevState.partsOfSpeeches, pos],
      definitions: {...prevState.definitions, [pos.id]: ''},
      examples: {...prevState.examples, [pos.id]: ''}
    }));

    // Remove error message if lexeme is selected
    if (this.state.errors.lexeme) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          lexeme: ''
        }
      }));
    }
  }

  renderDefinition = () => {
    return this.state.partsOfSpeeches.map((lexeme, index) => {
      return (
        <FormTextarea
          type={lexeme.partsOfSpeech}
          key={lexeme.id}
          id={lexeme.id}
          name={`${lexeme.id}`}
          tabIndex={(2 * index) + 10}
          value={this.state.definitions[`${lexeme.id}`]}
          onChange={this.onChangeDefinition}
          onDelete={this.onDelete}
          errorOn={this.state.errors.definition}
        />
      );
    });
  };

  renderExample = () => {
    return this.state.partsOfSpeeches.map((lexeme, index) => {
      return (
        <FormTextarea
          type={lexeme.partsOfSpeech}
          key={lexeme.id}
          id={lexeme.id}
          name={`${lexeme.id}`}
          tabIndex={(2 * index) + 30}
          value={this.state.examples[`${lexeme.id}`]} 
          onChange={this.onChangeExample}
          onDelete={this.onDelete}
        />
      );
    });
  }

  render() {
    const definitionChildren = this.renderDefinition();
    const exampleChildren = this.renderExample();

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
              <FormSelect option={partsOfSpeech} onClick={this.posOnClick} />
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