const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = function (req, res, next) {
    // user has to be logged in to be get to the routes anyways
    // so we have access to the user object.
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');

    next();
};