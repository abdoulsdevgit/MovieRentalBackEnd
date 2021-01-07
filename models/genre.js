const mongoose = require('mongoose');
const Joi = require('joi-oid');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true, 
    }
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports.Genre = mongoose.model('Genre', genreSchema);
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;