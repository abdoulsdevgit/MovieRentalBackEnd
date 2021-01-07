const mongoose = require('mongoose');
const dbLog = require('debug')('app:database');
const winston = require('winston');

require('dotenv').config();
dbLog('connected to db');
const url = process.env.URL;

module.exports = function(logger) {
    mongoose.connect(url)
    .then(() =>{
        dbLog('connected to db');
        logger.info('Connected to Database')
    })
    // .catch(err => {
    //     logger.error('Something went wrong', err);
    //     dbLog(err);
    // });

}
