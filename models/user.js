const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },

    email: {
        type: String,
        minlength: 2,
        maxlength: 255,
        unique: true,
        required: true
    },

    password: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: true
    },

    isAdmin: Boolean
});

userSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, secret);
}

function validate(user) {
    
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validate;