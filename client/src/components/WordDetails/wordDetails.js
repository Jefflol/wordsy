import React, { Component } from 'react';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as CloseIcon } from '../../assets/x-circle.svg';

import './wordDetails.css';

export default class WordDetails extends Component {
  render() {
    return (
      <div className="word-details-container">
        <div className="word-details">
          <div className="word-header">
            <div className="word-bubble">
              <div className="word-text">
                Baleful
              </div>
            </div>
            <button className="edit-btn">
              <EditIcon />
            </button>
            <button className="close-btn">
              <CloseIcon />
            </button>
          </div>
          <div className="word-definitions">
            <div className="word-definitions-title">DEFINITION</div>
            <div className="word-definitions-entry">
              <div className="word-definitions-lexeme lexeme-background-blue lexeme-text-blue">
                N
                <div className="word-definitions-lexeme-number">1</div>
              </div>
              <div className="word-definitions-definition">Threatening harm; menacing</div>
            </div>
          </div>
          <div className="word-examples">
            <div className="word-examples-title">EXAMPLE</div>
            <div className="word-examples-entry">
              <div className="word-examples-lexeme lexeme-background-blue lexeme-text-blue">
                N
                <div className="word-definitions-lexeme-number">1</div>
              </div>
              <div className="word-examples-example">What a <i>baleful</i> personality!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}