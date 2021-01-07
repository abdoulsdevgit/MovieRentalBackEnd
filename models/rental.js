const mongoose = require('mongoose');
const Joi = require('joi-oid');

const rentalsSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String, 
                required: true,
                minlength: 5,
                maxlength: 50,
            },
        
            phone: {
                type: String, 
                minlength: 10,
                maxlength: 50,
                required: true
            },

            isGold:{
                type: Boolean,
                default: false,
            },
        })
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255,
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
        }),
        required: true
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    dateReturned: {
        type: Date,
    },
    
    rentalFee: {
        type: Number,
        min: 0,
    }
});

function validate(rental) {
    const rentalSchema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });

    return rentalSchema.validate(rental);
}


module.exports.Rental = mongoose.model('Rental', rentalsSchema);
module.exports.validate = validate;