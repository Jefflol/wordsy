export const lexeme = [
  {id: 1, type: 'Noun'},
  {id: 2, type: 'Pronoun'},
  {id: 3, type: 'Adjective'},
  {id: 4, type: 'Verb'},
  {id: 5, type: 'Adverb'},
  {id: 6, type: 'Preposition'},
  {id: 7, type: 'Other'}
];

export const getLexemeData = type => {
  switch(type) {
    case 'Noun':
      return {
        color: 'blue',
        text: 'N'
      };
    case 'Pronoun':
      return {
        color: 'green',
        text: 'PN'
      };
    case 'Adjective':
      return {
        color: 'yellow',
        text: 'Adj'
      };
    case 'Verb':
      return {
        color: 'orange',
        text: 'V'
      };
    case 'Adverb':
      return {
        color: 'red',
        text: 'Adv'
      };
    case 'Preposition':
      return {
        color: 'dark-red',
        text: 'Pre'
      };
    case 'Other':
      return {
        color: 'grey',
        text: 'O'
      };
    case 'MORE-LEXEME':
    default:
      return {
        color: 'grey',
        text: 'MORE-LEXEME'
      };
  }
}