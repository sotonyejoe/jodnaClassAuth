const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 


const registerUser = async (req, res) => {
    const { email, password, username } = req.body;

    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        // Create a new user object
        const user = new User({ email, password, username });

        // Save the user to the database
        await user.save();  // <-- Use .save() instead of .create()

        console.log(user);

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1000s' });
        

        // Respond with the user data and token
        res.status(201).json({
            status: 'success',
            message: 'User has successfully logged in',
            token,
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a JWT token if the password matches
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the user and the token
    res.json({ 
        status: 'success',
        token, 
        data: { user }
    });
};


module.exports = { registerUser, loginUser };
