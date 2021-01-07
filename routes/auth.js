const router = require('express').Router();
const Joi = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', async(req,res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateToken();
    res.send(token);
});

function validate(user) {
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

module.exports = router;