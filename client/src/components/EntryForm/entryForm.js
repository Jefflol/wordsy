import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import FormGroup, { FormLabel, FormInput, FormTextarea, FormSelect } from '../FormGroup/formGroup';
import { addWordEntry } from '../../actions/entryActions';
import { partsOfSpeech } from '../partsOfSpeech';

import './entryForm.css';


class EntryForm extends Component {
  state = {
    // userId: '5ec61921d367772fc3177453',
    word: '',
    partsOfSpeeches: [],
    details: {}
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
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeDetails = e => {
    const { name, value } = e.target;
  
    this.setState(prevState => ({
      details: {
        ...prevState.details,
        [name]: value
      }
    }));
  }

  onDelete = id => {
    console.log('idx: ', id);

    this.setState(prevState => ({
      partsOfSpeeches: prevState.partsOfSpeeches.filter(lexeme => {
        console.log(lexeme.id);
        return lexeme.id !== id;
      })
    }));
  }

  onSubmit = e => {
    e.preventDefault();

    const definitionArray = [];
    const exampleArray = [];
    const entries = Object.entries(this.state.details);

    // Iterate through states to separate definitions and examples
    for (const [propName, value] of entries) {
      console.log(`[${propName}]: ${value}`);

      // Check if state property mataches definiton
      if (propName.includes('definition-')) {
        const id = propName.slice(11);
        const pos = this.state.partsOfSpeeches.find(lexeme => lexeme.id === id);

        const definitionEntry = {
          id: id,
          partsOfSpeech: pos.partsOfSpeech,
          definition: value
        };

        definitionArray.push(definitionEntry);
      }

      // Check if state property mataches example
      if (propName.includes('example-') && value) {
        const id = propName.slice(8);
        const pos = this.state.partsOfSpeeches.find(lexeme => lexeme.id === id);

        const exampleEntry = {
          id: id,
          partsOfSpeech: pos.partsOfSpeech,
          example: value
        };

        exampleArray.push(exampleEntry);
      }
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
      details: {}
    });
  }

  posOnClick = newPartsOfSpeech => {
    const pos = {
      id: uuidv4(),
      partsOfSpeech: newPartsOfSpeech
    };

    this.setState(prevState => ({
      partsOfSpeeches: [...prevState.partsOfSpeeches, pos]
    }));
  }

  renderDefinition = () => {
    return this.state.partsOfSpeeches.map((lexeme, index) => {
      return (
        <FormTextarea
          type={lexeme.partsOfSpeech}
          key={lexeme.id}
          id={lexeme.id}
          name={`definition-${lexeme.id}`}
          tabIndex={(2 * index) + 10}
          value={this.state.details[`definition-${lexeme.id}`]}
          onChange={this.onChangeDetails}
          onDelete={this.onDelete}
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
          name={`example-${lexeme.id}`}
          tabIndex={(2 * index) + 30}
          value={this.state.details[`example-${lexeme.id}`]} 
          onChange={this.onChangeDetails}
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
              <FormLabel for="word" name="WORD" />
              <FormInput type="text" id="word" name="word" maxLength="20" tabIndex="1" value={this.state.word} onChange={this.onChange} />
            </FormGroup>
          </div>
          <div className="parts-of-speech-selection">
            <FormGroup>
              <FormLabel name="PARTS OF SPEECH" />
              <FormSelect option={partsOfSpeech} onClick={this.posOnClick} />
            </FormGroup>
          </div>
          <div className="definition-input">
            <FormGroup>
              <FormLabel for="definition" name="DEFINITION" />
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