const winston = require('winston');

module.exports = function(err, req, res, next) {
    winston.error('Something went wrong', err); // can store metadata, error
    res.status(500).send('Something Went Wrong');
}