const genresRoutes = require('../routes/genres');
const customersRoutes = require('../routes/customers');
const moviesRoutes = require('../routes/movies');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const error = require('../middleware/errors');

const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/genres', genresRoutes);
    app.use('/api/customers', customersRoutes);
    app.use('/api/movies', moviesRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use(error);
}