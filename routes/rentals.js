const { Customers } = require('../models/customer');
const { Movies } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const { auth } = require('../middleware/auth');

const router = require('express').Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');

Fawn.init(mongoose);


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //find the customer by customerid
    const customer = await Customers.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movies.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock === 0){
        return res.status(400).send('Movie not in stock');
    }

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },

        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental) // passe in the name of the collection
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1}
            })
            .run();

        res.send(rental);
    } catch(err) {
        res.status(500).send('Internal server Error');
    }

});




module.exports = router;