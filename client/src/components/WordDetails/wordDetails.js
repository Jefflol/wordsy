import React, { Component } from 'react';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as CloseIcon } from '../../assets/x-circle.svg';
import { Word, WordLexeme, WordDefinition, WordExample } from '../Word/word';

import './wordDetails.css';

export default class WordDetails extends Component {
  render() {
    return (
      <div className="word-details-container">
        <div className="word-details">
          <div className="word-details-header">
            <Word text="Baleful" />
            <button className="edit-btn"><EditIcon /></button>
            <button className="close-btn"><CloseIcon /></button>
          </div>
          <div className="word-details-body">
            <div className="body-title">DEFINITION</div>
            <div className="body-entry">
              <WordLexeme type="Noun" order="1"/>
              <WordDefinition definition="Threatening harm; menacing" />
            </div>
          </div>
          <div className="word-details-body">
            <div className="body-title">EXAMPLE</div>
            <div className="body-entry">
              <WordLexeme type="Noun" order="1"/>
              <WordExample example="What a baleful personality!" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}