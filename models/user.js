const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare the provided password with the stored hash
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
