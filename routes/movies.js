const router = require('express').Router();
const { Genre } = require('../models/genre');
const {validate, Movie} = require('../models/movie');
const { auth } = require('../middleware/auth');


router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // get the genre model
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Sent invalide genre');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,

    });
    movie = await movie.save();
    res.send(movie);

});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("Not Found");
    res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // get the genre model
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalide Genre');
    
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        { 
          title: req.body.title,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }, { new: true }
    );
    
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);

});

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('Not Found');
    res.send(movie);
})

module.exports = router;