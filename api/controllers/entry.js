const mongoose = require('mongoose');

const { Entry, Definition, Example } = require('../models/entry-model');


// @route   GET /entry/:userId?sort=
// @desc    Fetch all entries for a specific user
// @access  PRIVATE
exports.entry_get_all = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  // Sort entries alphabetically or recently (default)
  const sortQuery = (req.query.sort === 'alphabet') ? { word: 1 } : { dateCreated: 1 };

  Entry.find({ userId: req.params.userId })
    .select('_id userId word definition example dateCreated')
    .sort(sortQuery)
    .collation({ locale: 'en' })
    .then(entries => {
      console.log('Entries found ', entries);
      return res.status(200).json({
        entry: entries
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};


// @route   GET /entry/:userId/:entryId
// @desc    Fetch an entry by ID
// @access  PRIVATE
exports.entry_get_one = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  Entry.findOne({ userId: req.params.userId, _id: req.params.entryId })
    .select('_id userId word definition example dateCreated')
    .then(entry => {
      console.log('Entry found ', entry);

      if (entry) {
        return res.status(200).json({
          entry: entry
        });
      } else {
        return res.status(404).json({
          message: 'No valid entry found for provided ID'
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};


// @route   POST /entry/:userId
// @desc    Create an entry
// @access  PRIVATE
exports.entry_add = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  const id = new mongoose.Types.ObjectId();
  const definitions = req.body.definition.map(definition => {
    return new Definition({
      _id: id,
      partsOfSpeech: definition.partsOfSpeech,
      definition: definition.definition
    });
  });

  const examples = req.body.example.map(example => {
    return new Example({
      _id: id,
      partsOfSpeech: example.partsOfSpeech,
      example: example.example
    });
  });

  const entry = new Entry({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    word: req.body.word,
    definition: [...definitions],
    example: [...examples]
  });

  entry.save()
    .then(result => {
      console.log(result);
      return res.status(201).json({
        message: 'Entry created'
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};


// @route   DELETE /entry/:userId/:entryId
// @desc    Remove an entry
// @access  PRIVATE
exports.entry_delete = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  Entry.deleteOne({ _id: req.params.entryId })
    .then(entry => {
      if (entry.deletedCount) {
        return res.status(200).json({
          message: `Entry [${req.params.entryId}] deleted`
        });
      } else {
        return res.status(404).json({
          message: `Entry [${req.params.entryId}] not found`
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};


// @route   PATCH /entry/:entryId
// @desc    Edit an entry
// @access  PRIVATE
exports.entry_edit = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Entry.update({ _id: req.params.entryId }, { $set: updateOps })
  .then(result => {
    return res.status(200).json({
      entry: result,
      message: 'Entry updated',
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  });
};