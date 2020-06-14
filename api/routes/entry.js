const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Entry, Definition, Example } = require('../models/entry-model');
const checkAuth = require('../middleware/check-auth');

// @route   GET /entry
// @desc    Fetch all entries
// @access  PRIVATE
// router.get('/', (req, res, next) => {
//   Entry.find()
//     .select('_id userId word definition example dateCreated')
//     .then(entries => {
//       console.log('Entries found ', entries);
//       return res.status(200).json({
//           entry: entries
//       });
//     })
//     .catch(err => {
//       return res.status(500).json({
//         error: err
//       });
//     });
// });

// @route   GET /entry/:userId
// @desc    Fetch all entries for a specific user
// @access  PRIVATE
router.get('/:userId', checkAuth, (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  Entry.find({ userId: req.params.userId })
    .select('_id userId word definition example dateCreated')
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
});


// @route   GET /entry/:userId/:entryId
// @desc    Fetch an entry by ID
// @access  PRIVATE
router.get('/:userId/:entryId', checkAuth, (req, res, next) => {
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
});


// @route   POST /entry/:userId
// @desc    Create an entry
// @access  PRIVATE
router.post('/:userId', checkAuth, (req, res, next) => {
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
});


// @route   DELETE /entry/:userId/:entryId
// @desc    Remove an entry
// @access  PRIVATE
router.delete('/:userId/:entryId', checkAuth, (req, res, next) => {
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
});


// @route   PATCH /entry/:entryId
// @desc    Edit an entry
// @access  PRIVATE
router.patch('/:entryId', checkAuth, (req, res, next) => {
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
});

module.exports = router;