const router = require('express').Router();
const _ = require('lodash');
const { User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const { auth } = require('../middleware/auth');


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


router.post('/', async(req,res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, email, password } = req.body;

    // check if email not in database
    const verifyEmail = await User.findOne({email});
    if(verifyEmail) return res.status(400).send('User already registerd');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        email,
        password: hashedPassword,
    })

    await user.save();

    const token = user.generateToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));


});


module.exports = router;