const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createNote, getNotes, updateNote, getNoteCount, getUserNotes, deleteNote } = require('../controllers/noteController');

const router = express.Router();


router.post("/", protect, createNote);// Authenticate the user before creating a note
router.get("/", protect, getNotes);// henticate the user before fetching notes
router.get('/count', protect, getNoteCount); // to get all notes created
router.get('/:id', protect, getUserNotes) // to get all notes created by the user
router.put("/:id", protect, updateNote);// Authenticate the user before updating a note
router.delete("/:id", protect, deleteNote); // Authenticate the user before deleting a note


module.exports = router;
