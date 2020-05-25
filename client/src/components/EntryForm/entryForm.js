import React, { Component } from 'react';
import './entryForm.css';

import FormGroup, { FormLabel, FormInput, FormTextarea, FormSelect } from '../FormGroup/formGroup';
import { partsOfSpeech } from '../EntryForm/partsOfSpeech';

export default class EntryForm extends Component {
  state = {
    word: null,
    pos: null,
    definition: null,
    example: null,
    errors: {
      word: ''
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
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
        <div className="definition-input">
          <FormGroup>
            <FormLabel for="definition" name="DEFINITION" />
            <FormSelect option={partsOfSpeech}/>
            {/* <FormInput type="text" id="definition" name="definition" tabIndex="2" onChange={this.onChange} /> */}
            <FormTextarea id="definition" name="definition" tabIndex="2" value={this.state.definition} onChange={this.onChange} />
          </FormGroup>
        </div>
        <div className="example-input">
          <FormGroup>
            <FormLabel for="example" name="EXAMPLE" />
            {/* <FormInput type="text" id="example" name="example" tabIndex="3" onChange={this.onChange} /> */}
            <FormTextarea id="example" name="example" tabIndex="3" value={this.state.example} onChange={this.onChange} />
          </FormGroup>
        </div>
        <button className="form-submit-btn" tabIndex="10">Add</button>
      </form>
    )
  }
}