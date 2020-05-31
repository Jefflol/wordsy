import React, { Component } from 'react';
import './entryForm.css';

import FormGroup, { FormLabel, FormInput, FormTextarea, FormSelect } from '../FormGroup/formGroup';
import { partsOfSpeech } from '../partsOfSpeech';

export default class EntryForm extends Component {
  state = {
    word: null,
    pos: null,
    definition: null,
    example: null,
    errors: {
      word: ''
    },
    inputTypes: []
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
  }

  posOnClick = (newPartsOfSpeech) => {
    this.setState(prevState => ({
      inputTypes: [...prevState.inputTypes, newPartsOfSpeech]
    }));
  }

  render() {
    const definitionChildren = [];
    const exampleChildren = []

    for(let i = 0; i < this.state.inputTypes.length; i++) {
      definitionChildren.push(
        <FormTextarea
          type={this.state.inputTypes[i]}
          key={`${i}`}
          id={`definition-${i}`}
          name={`definition-${i}`}
          tabIndex="2" 
          value={this.state[`definition-${i}`]} 
          onChange={this.onChange}  
        />
      );

      exampleChildren.push(
        <FormTextarea
          type={this.state.inputTypes[i]}
          key={`${i}`}
          id={`example-${i}`}
          name={`example-${i}`}
          tabIndex="2" 
          value={this.state[`example-${i}`]} 
          onChange={this.onChange}  
        />
      );
    }

    return (
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
    )
  }
}