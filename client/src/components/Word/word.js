import React from 'react';

import { ReactComponent as MoreIcon } from '../../assets/more-horizontal.svg';
import { getLexemeData } from '../../helpers/lexemeData';

import './word.css';


export class Word extends React.Component {
  handleKeyPressWord = e => {
    if (e.key === 'Enter') {
      this.props.onClick(e);
    }
  }

  handleKeyPressDelete = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      return () => this.props.onDelete();
    }
  }

  render() {
    let classNames = this.props.onClick ? 'word-container word-hover' : 'word-container';

    return (
      <div 
        className={classNames} 
        onClick={this.props.onClick}
        onKeyPress={this.handleKeyPressWord}
        tabIndex={this.props.tabIndex}
      >
        <div className="word-text">
          {this.props.text}
        </div>
        {
          this.props.onDelete &&
          <button
            className="word-delete-btn"
            type="button"
            onClick={this.props.onDelete}
            onKeyPress={this.handleKeyPressDelete}
            tabIndex={this.props.tabIndex}
          >
            <span>&times;</span>
          </button>
          }
      </div>
    );
  }
}

export const WordDefinition = props => {
  return (
    <div className="word-definition">
      {props.text}
    </div>
  );
}

export const WordExample = props => {
  return (
    <div className="word-example">
      {props.text}
    </div>
  );
}

export class WordLexeme extends React.Component {
  render() {
    const { className, style, type, order, border, hover, tabIndex, onClick, onKeyPress } = this.props;
    const { color: lexemeColor, text: lexemeText } = getLexemeData(type);
    
    let classNames = `${className} lexeme-icon lexeme-background-${lexemeColor} lexeme-text-${lexemeColor}`;
    if (border) classNames += ` lexeme-border-${lexemeColor} lexeme-border-active`;
    if (hover) classNames += ` lexeme-border-${lexemeColor} lexeme-border-hover`;
  
    // Special case to display and ellipsis WordLexeme
    if (type === 'MORE-LEXEME') {
      return (
        <div className={classNames} style={style}>
          <MoreIcon style={{width: '16px'}}/>
        </div>
      );
    }
  
    return (
      <div className={classNames} style={style} tabIndex={tabIndex} onClick={onClick} onKeyPress={onKeyPress}>
        {lexemeText}
        { order && <div className="lexeme-order">{order}</div>}
      </div>
    );
  }
}