/*
Mongoose Model Schema for User

Schema Fields:
- email: String (required, unique)
- name: String (required)
- password: String (required)

*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
