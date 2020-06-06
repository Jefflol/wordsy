const mongoose = require('mongoose');

const definitionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  partsOfSpeech: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
});

const exampleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  partsOfSpeech: {
    type: String,
    required: true
  },
  example: {
    type: String,
    required: true
  }
});

const entrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: [definitionSchema],
    required: true
  },
  example: {
    type: [exampleSchema]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// module.exports = mongoose.model('Entry', entrySchema);
const Entry = mongoose.model('Entry', entrySchema);
const Definition = mongoose.model('Definition', definitionSchema);
const Example = mongoose.model('Example', exampleSchema);


module.exports = {
  Entry: Entry,
  Definition: Definition,
  Example: Example
};