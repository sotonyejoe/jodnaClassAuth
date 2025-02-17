const Note = require('../models/note');

const createNote = async (req, res) => {
    const { title, content } = req.body;

    const note = new Note({
        title,
        content,
        user: req.user._id // Link note to the authenticated user
    });

    await note.save();
    res.status(201).json(note);
};

const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id }); // Fetch notes for the authenticated user
    res.json(notes);
};

const updateNote = async (req, res) => {
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
};

const deleteNote = async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
