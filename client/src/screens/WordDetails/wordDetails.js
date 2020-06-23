import React, { Component, createRef } from 'react';

import { Word, WordDefinition, WordExample, WordLexeme } from '../../components/Word/word';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as CloseIcon } from '../../assets/x-circle.svg';

import './wordDetails.css';


export default class WordDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };

    this.scrollRefDefinition = createRef();
    this.scrollRefExample = createRef();
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.scrollTop !== prevState.scrollTop) {
      this.scrollRefDefinition.current.scrollTop = this.state.scrollTop;
      this.scrollRefExample.current.scrollTop = this.state.scrollTop;
    }
  }

  editWordEntry = () => {
    this.props.onEdit();
  }

  closeWordDetails = () => {
    this.props.onClose();
  }

  handleScrollDefinition = () => {
    this.setState({
      scrollTop: this.scrollRefDefinition.current.scrollTop
    });
  }

  handleScrollExample = () => {
    this.setState({
      scrollTop: this.scrollRefExample.current.scrollTop
    });
  }

  renderDefinitions = definitions => {
    return definitions.map((entry, index) => {
      return (
        <div className="body-entry" key={index}>
          <WordLexeme className="body-entry-lexeme" type={entry.partsOfSpeech} order={index + 1} />
          <WordDefinition text={entry.definition} />
        </div>
      );
    });
  }

  renderExamples = examples => {
    return examples.map((entry, index) => {
      return (
        <div className="body-entry" key={index}>
          <WordLexeme className="body-entry-lexeme" type={entry.partsOfSpeech} order={index + 1} />
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
            <button className="edit-btn" onClick={this.editWordEntry}><EditIcon /></button>
            <button className="close-btn" onClick={this.closeWordDetails}><CloseIcon /></button>
          </div>
          <div className="word-details-body-container">
            <div className="body-label">DEFINITION</div>
            <div className="word-details-body" ref={this.scrollRefDefinition} onScroll={this.handleScrollDefinition}>
              { definitions }
            </div>
          </div>
          <div className="word-details-body-container">
            <div className="body-label">EXAMPLE</div>
            <div className="word-details-body" ref={this.scrollRefExample} onScroll={this.handleScrollExample}>
            { examples }
            </div>
          </div>
        </div>
      </div>
    );
  }
}