import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormGroup, { FormLabel, FormInput, FormTextarea, FormSelect } from '../FormGroup/formGroup';
import { addWordEntry, getWordEntries } from '../../actions/entryActions';
import { partsOfSpeech } from '../partsOfSpeech';

import './entryForm.css';


class EntryForm extends Component {
  state = {
    userId: '5ec61921d367772fc3177453',
    word: null,
    partsOfSpeeches: []
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const definitionArray = [];
    const exampleArray = [];
    const entries = Object.entries(this.state);

    // Iterate through states to separate definitions and examples
    for (const [propName, value] of entries) {
      // console.log(`[${propName}]: ${value}`);

      // Check if state property mataches definiton
      if (propName.includes('definition-')) {
        const index = propName.slice(-1);
        const pos = this.state.partsOfSpeeches[index];

        const definitionEntry = {
          partsOfSpeech: pos,
          definition: value
        };

        definitionArray.push(definitionEntry);
      }

      // Check if state property mataches example
      if (propName.includes('example-') && value) {
        const index = propName.slice(-1);
        const pos = this.state.partsOfSpeeches[index];

        const exampleEntry = {
          partsOfSpeech: pos,
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

  posOnClick = newPartsOfSpeech => {
    this.setState(prevState => ({
      partsOfSpeeches: [...prevState.partsOfSpeeches, newPartsOfSpeech]
    }));
  }

  renderDefinition = () => {
    return this.state.partsOfSpeeches.map((partsOfSpeech, index) => {
      return (
        <FormTextarea
          type={partsOfSpeech}
          key={`${index}`}
          id={`definition-${index}`}
          name={`definition-${index}`}
          tabIndex="2" 
          value={this.state[`definition-${index}`]} 
          onChange={this.onChange}  
        />
      );
    });
  };

  renderExample = () => {
    return this.state.partsOfSpeeches.map((partsOfSpeech, index) => {
      return (
        <FormTextarea
          type={partsOfSpeech}
          key={`${index}`}
          id={`example-${index}`}
          name={`example-${index}`}
          tabIndex="2" 
          value={this.state[`example-${index}`]} 
          onChange={this.onChange}  
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
              <FormInput type="text" id="word" name="word" maxLength="20" tabIndex="1" onChange={this.onChange} />
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
          <button className="form-submit-btn" tabIndex="10">Add</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
  addWordEntry,
  getWordEntries
})(EntryForm);