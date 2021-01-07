const mongoose = require('mongoose');
// const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, minlength: 10, required: true},
    isGold: Boolean
});


function validateCustomer(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).required(),
        isGold: Joi.boolean().required()
    });
    return schema.validate(genre);
}

module.exports.Customer = mongoose.model('Customer', customerSchema);
module.exports.validate = validateCustomer;