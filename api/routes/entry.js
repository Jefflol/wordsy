const express = require('express');
const router = express.Router();

const EntryController = require('../controllers/entry');
const checkAuth = require('../middleware/check-auth');


// @route   GET /entry/:userId?sort=
// @desc    Fetch all entries for a specific user
// @access  PRIVATE
router.get('/:userId', checkAuth, EntryController.entry_get_all);

// @route   GET /entry/:userId/:entryId
// @desc    Fetch an entry by ID
// @access  PRIVATE
router.get('/:userId/:entryId', checkAuth, EntryController.entry_get_one);

// @route   POST /entry/:userId
// @desc    Create an entry
// @access  PRIVATE
router.post('/:userId', checkAuth, EntryController.entry_add);

// @route   DELETE /entry/:userId/:entryId
// @desc    Remove an entry
// @access  PRIVATE
router.delete('/:userId/:entryId', checkAuth, EntryController.entry_delete);

// @route   PATCH /entry/:entryId
// @desc    Edit an entry
// @access  PRIVATE
router.patch('/:entryId', checkAuth, EntryController.entry_edit);


module.exports = router;