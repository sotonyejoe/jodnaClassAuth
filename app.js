const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express();
app.use(express.json());

//mongodb connection
mongoose
  .connect('mongodb+srv://sotonye28:sotonyejoe23456@cluster0.ud0iuxa.mongodb.net/noteApp?retryWrites=true&w=majority')
  .then((reason) => console.log("DB Connected"))
  .catch((err) => console.log("DB Error", err));


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
