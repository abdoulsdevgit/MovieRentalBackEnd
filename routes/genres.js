const express = require('express');
const {Genre, validate} = require('../models/genre');
const router = express.Router();
const { auth } = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');


router.get('/', asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
    // res.render('index', {message:"hello World", title:"hello"});
}));

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(parseInt(req.params.id));
    if(!genre) return res.status(404).send('Not Found');

    res.send(genre);
});

router.post('/',  auth, async (req, res) => {
    // validate
    const {error} = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // create new genre
    let genre = new Genre({
        name: req.body.name,
    });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

    // validate the body
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // look for the object and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if(!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

    // if no genre found
    if(!genre) return res.status(404).send('Not Found');

    res.send(genre);
});


module.exports = router;