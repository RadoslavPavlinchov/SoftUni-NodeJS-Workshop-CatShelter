// Importing all required modules
const express = require('express');
const router = require('./router');
const handlebars = require('express-handlebars');

// Setting up the port
const port = 3000;

// Assign the application
const app = express();

// Set the template engine
app.engine('.hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');

// Middleware - set the router and the static files
app.use('/', router);
app.use('/about', router);
app.use(express.static('public'));

// Middleware custom - it is used only for this path and it is checking whether the user exists
app.use('/user/:userId', (req, res, next) => {
    const userId = req.params.userId;
    // Check whether the user exists in the db;
    const userExists = true;

    if (!userExists) {
        res.redirect('/login')
    } else {
        next()
    }
})
app.get('/user/:userId', (req, res) => {
    res.status(200).send(`<h1>Welcome User</h1>`)
})

// Simple routing to the pages
// app.get('/', (req, res) => {
//     res.status(200);
//     res.send('This is a GET request to the homepage');
// });

// app.post('/', (req, res) => {
//     res.status(200);
//     res.send('This is a POST request to the homepage');
// });

// app.put('/', (req, res) => {
//     res.status(200);
//     res.send('This is a PUT request to the homepage');
// });

// Prompt to download a file
app.get('/pdf', (req, res) => {
    res.download('./be careful.pdf')
})

// Response send json
// app.get('/json', (req, res) => {
//     res.status(500).json('Oh No!');
// });

// Redirect 
app.get('/redirect', (req, res) => {
    res.redirect('/foo')
});

// Send a file
app.get('/file/:name', (req, res) => {
    const fileName = req.params.name;
    res.sendFile(__dirname, './test', fileName)
})

// Path with Middleware that is covering every HTTP request 
app.all('/about', (req, res, next) => {
    console.log('The middleware is executed');
    next()
}, (req, res) => {
    res.send('About page for all http methods');
});

// Path with id
app.get('/users/:id(\\d+)', (req, res) => {
    const params = req.params.id;
    res.send(params);
});

// Chained home route with all HTTP requests
// app.route('/')
//     .get((req, res) => {
//         res.status(200);
//         res.send('This is a GET request to the homepage');
//     })
//     .post((req, res) => {
//         res.status(200);
//         res.send('This is a POST request to the homepage');
//     })
//     .put((req, res) => {
//         res.status(200);
//         res.send('This is a PUT request to the homepage');
//     })
//     .all((req, res, next) => {
//         console.log('The middleware is executed');
//         next()
//     }, (req, res) => {
//         res.send('About page for all http methods');
// });

app.get('*', (req, res) => {
    res.status(200);
    res.send('This route matches everything');
});

// Running server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})