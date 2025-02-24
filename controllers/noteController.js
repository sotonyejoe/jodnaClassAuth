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

const getNoteCount = async (req, res) => {
    try {
        const count = await Note.countDocuments({ user: req.user._id });

        res.status(200).json({ message: 'Note count retrieved successfully', count });
    } catch (error) {
        console.error('Error counting notes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getUserNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).populate('user', 'username email').sort({ createdAt: -1 });

        res.status(200).json({ message: 'User notes retrieved successfully', notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Server error' });
    }
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

module.exports = { createNote, getNotes, updateNote, deleteNote, getUserNotes, getNoteCount };
