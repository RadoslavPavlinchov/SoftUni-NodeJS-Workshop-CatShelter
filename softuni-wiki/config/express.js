const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Installed additionally handlebars to fix the issue with the not a "own property"
const Handlebars = require('handlebars');
const handlebars = require('express-handlebars');
const config = require('./config');

// Installed additionally handlebars to fix the issue with the not a "own property"
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

module.exports = (app) => {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.engine('hbs', handlebars({
        // Installed additionally handlebars to fix the issue with the not a "own property"
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        layoutsDir: 'views',
        defaultLayout: 'main-layout',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));

    app.use((req, res, next) => {
        res.locals.isLoggedIn = req.cookies[config.cookie] !== undefined;
        res.locals.username = req.cookies['username'];

        next();
    })

    app.set('view engine', 'hbs');

    app.use(express.static('static'));
}