export const partsOfSpeech = [
  {id: 1, type: 'Noun'},
  {id: 2, type: 'Pronoun'},
  {id: 3, type: 'Adjective'},
  {id: 4, type: 'Verb'},
  {id: 5, type: 'Adverb'},
  {id: 6, type: 'Preposition'},
  {id: 7, type: 'Other'}
];

export const getPartsOfSpeechData = (type) => {
  let posData = {};
  
  switch(type) {
    case 'Noun':
      posData.color = 'blue';
      posData.text = 'N';
      break;
    case 'Pronoun':
      posData.color = 'green';
      posData.text = 'PN';
      break;
    case 'Adjective':
      posData.color = 'yellow';
      posData.text = 'Adj';
      break;
    case 'Verb':
      posData.color = 'orange';
      posData.text = 'V';
      break;
    case 'Adverb':
      posData.color = 'red';
      posData.text = 'Adv';
      break;
    case 'Preposition':
      posData.color = 'dark-red';
      posData.text = 'Pre';
      break;
    case 'Other':
    default:
      posData.color = 'grey';
      posData.text = 'O';
      break;
  }

  return posData;
}