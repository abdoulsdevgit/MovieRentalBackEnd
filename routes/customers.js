const express = require('express');
const {Customers, validate} = require('../models/customer');
const router = express.Router();
const { auth } = require('../middleware/auth');


router.get('/', async (req, res) => {
    const customers = await Customers.find();
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    // validate the data sent by user is correct
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const { name, phone, isGold } = req.body;

    let customer = new Customers({
        name, phone, isGold
    });

    customer =  await customer.save();
    res.send(customer);

});

router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    if(!customer) return res.status(404).send('Not Found');
    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const { name, phone, isGold } = req.body;

    const customer = await Customers.findByIdAndUpdate(req.params.id, {
        name, phone, isGold
    }, {new: true});

    if(!customer) return res.status(404).send('Not Found');

    res.send(customer);
});


router.delete('/:id', auth, async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('Not Found');
    res.send(customer);

});



module.exports = router;