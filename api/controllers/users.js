const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users-model');


exports.user_signup = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Username already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
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
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Invalid credentials'
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              username: user[0].username,
            },
            process.env.JWT_KEY,
            { expiresIn: '1hr' }
          );

          return res.status(200).json({
            message: 'Authorization successful',
            userId: user[0]._id,
            username: user[0].username,
            token: token
          });
        }

        return res.status(401).json({
          message: 'Invalid credentials'
        });
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  User.deleteOne({ _id: req.params.userId})
    .then((user) => {
      if (user.deletedCount) {
        return res.status(200).json({
          message: `User [${req.params.userId}] deleted`
        });
      } else {
        return res.status(404).json({
          message: `User [${req.params.userId}] not found`
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.user_get_data = (req, res, next) => {
  // Check if user is authorized
  if (req.params.userId !== req.userData.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  User.findById({ _id: req.params.userId })
    .select('_id username')
    .then(user => {
      console.log('User found ', user);

      if (user) {
        return res.status(200).json({
          user: user
        });
      } else {
        return res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};
