import React, { Component } from 'react';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as CloseIcon } from '../../assets/x-circle.svg';
import { Word, WordDefinition, WordExample, WordLexeme } from '../Word/word';

import './wordDetails.css';

export default class WordDetails extends Component {
  onEdit = () => {
    this.props.onEdit();
  }

  onClose = () => {
    this.props.onClose();
  }

  renderDefinitions = definitions => {
    return definitions.map((entry, index) => {
      return (
        <div className="body-entry" key={index}>
          <WordLexeme className="word-details-lexeme" type={entry.partsOfSpeech} order={index + 1} />
          <WordDefinition text={entry.definition} />
        </div>
      );
    });
  }

  renderExamples = examples => {
    return examples.map((entry, index) => {
      return (
        <div className="body-entry" key={index}>
          <WordLexeme className="word-details-lexeme" type={entry.partsOfSpeech} order={index + 1} />
          <WordExample text={entry.example} />
        </div>
      );
    });
  }

  render() {
    const { word, definition, example } = this.props.word;
    const definitions = this.renderDefinitions(definition);
    const examples = this.renderExamples(example);

    return (
      <div className="word-details-container">
        <div className="word-details">
          <div className="word-details-header">
            <Word text={word} />
            <button className="edit-btn" onClick={this.onEdit}><EditIcon /></button>
            <button className="close-btn" onClick={this.onClose}><CloseIcon /></button>
          </div>
          <div className="word-details-body">
            <div className="body-title">DEFINITION</div>
            { definitions }
          </div>
          <div className="word-details-body">
            <div className="body-title">EXAMPLE</div>
            { examples }
          </div>
        </div>
      </div>
    );
  }
}