const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);

const startupDebug = require('debug')("app:startup");
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const winston = require('winston');
const app = express();


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logging.log' })
    ]
});
require('./database/dbconnection')(logger);

// winston


process.on('uncaughtException', (exception) => {
    winston.error(exception.message, exception);
    process.exit(1);
});

process.on('unhandledRejection', (exception) => {
    winston.error(exception.message, exception);
    process.exit(1);
});




// routes
require('./startup/routes')(app);

require('dotenv').config();
const PORT = process.env.PORT || 3001;


app.set('view engine', 'pug');
app.set('views', './views');


app.use(helmet());

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
}






app.get('/', (req, res) => {
    // res.send(genres);
    res.render('index', {message:"hello World", title:"hello"});
});


app.listen(PORT, () => console.log(`Listenning on port: ${PORT}`));



