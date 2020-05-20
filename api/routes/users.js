const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users.model');


// @route   POST /users/signup
// @desc    Create a user
// @access  PUBLIC
router.post('/signup', (req, res, next) => {
  User.find({ username: req.body.username })
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists'
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          password: req.body.password
        });

        user.save()
          .then(result => {
            console.log(result);
            return res.status(201).json({
              message: 'User created'
            });
          })
          .catch(err => {
            return res.status(500).json({
              error: err
            });
          });
      }
    })
});

// @route   POST /users/login
// @desc    Check for a user and login
// @access  PUBLIC
router.post('/login', (req, res, next) => {
  User.find({ username: req.body.username, password: req.body.password })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Authorization failed'
        });
      }
      
      return res.status(200).json({
        message: 'Authorization successful',
        userId: user[0]._id,
        username: user[0].username
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});

// @route   DELETE /users/:userId
// @desc    Delete a user by ID
// @access  PUBLIC
router.delete('/:userId', (req, res, next) => {
  User.deleteOne({ _id: req.params.userId})
    .then(() => {
      return res.status(200).json({
        message: `User [${req.params.userId}] deleted`
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});


// @route   GET /users/:userId
// @desc    Fetch user data
// @access  PUBLIC
// router.get('/:userId', (req, res, next) => {
//   User.findById({ id})
// });


module.exports = router;