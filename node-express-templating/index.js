const express = require('express');
const router = require('./router');
const app = express();

const port = 3000;

app.use('/', router);
app.use('/about', router);
app.use(express.static('public'));

app.use('/user/:userId', (req, res, next) => {
    const userId = req.params.userId;
    // Check whether the user exists in the db;
    const userExists = true;

    if (!userExists) {
        res.redirect('/login')
    } else {
        next()
    }
}, (req, res) => {
    res.status(200).send(`<h1>Welcome User</h1>`)
})

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

app.get('/pdf', (req, res) => {
    res.download('./be careful.pdf')
})

// app.get('/json', (req, res) => {
//     res.status(500).json('Oh No!');
// });

app.get('/redirect', (req, res) => {
    res.redirect('/foo')
});

app.get('/file/:name', (req, res) => {
    const fileName = req.params.name;
    res.sendFile(__dirname, './test', fileName)
})

app.all('/about', (req, res, next) => {
    console.log('The middleware is executed');
    next()
}, (req, res) => {
    res.send('About page for all http methods');
});

app.get('/users/:id(\\d+)', (req, res) => {
    const params = req.params.id;
    res.send(params);
});

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})