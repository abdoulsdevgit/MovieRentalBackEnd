const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const Joi = require('joi-oid');
// Joi.objectId = require('joi-objectid')(Joi);

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        minlength: 5,
        maxlength: 255,
        trim: true,
        required: true,
    },

    genre:{
        type: genreSchema,
        required: true,
        name: String,
    },

    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max:255,
        
    },

    dailyRentalRate: {
        type: Number,
        min:0,
        max:255,
        required: true,
    },

});

function validate(movie) {
    const movieSchema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    });

    return movieSchema.validate(movie);
}

module.exports.validate = validate;
module.exports.Movie = mongoose.model('Movie', movieSchema);