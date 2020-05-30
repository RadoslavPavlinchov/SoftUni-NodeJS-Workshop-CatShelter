const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const router = require('./routes/api/users');
const logger = require('./middleware/logger');
const users = require('./Users');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware init
// app.use(logger);

// Handlebars
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'NodeJS workshop',
        users
    });
});

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use('/api/users', router);



app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
})