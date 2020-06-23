const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');


// @route   POST /users/signup
// @desc    Create a user
// @access  PUBLIC
router.post('/signup', UserController.user_signup);

// @route   POST /users/login
// @desc    Check for a user and login
// @access  PUBLIC
router.post('/login', UserController.user_login);

// @route   DELETE /users/:userId
// @desc    Delete a user by ID
// @access  PRIVATE
// router.delete('/:userId', checkAuth, UserController.user_delete);

// @route   GET /users/:userId
// @desc    Fetch user data
// @access  PRIVATE
router.get('/:userId', checkAuth, UserController.user_get_data);


module.exports = router;