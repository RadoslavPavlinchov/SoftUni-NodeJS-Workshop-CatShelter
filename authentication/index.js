const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

function auth(authLevel) {
    return (req, res, next) => {
        const authUser = users.find(user => user.id === req.body.userId);
        if (!authUser) { 
            res.status(401).send('401: You are not authorized to see this page!');
            return; 
        }
        req.user = authUser;
        next()
    }
}


app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session(
    { secret: 'my secret' },
    { httpOnly: true },
    { secure: false }
))

const PORT = 3000;

const users = [
    {   
        id: 1,
        username: 'user1',
        password: 'user1',
        authLevel: 5
    },
    {
        id: 2,
        username: 'user2',
        password: 'user2'
    },
    {
        id: 3,
        username: 'user3',
        password: 'user3'
    },
]

app.get('/protected', auth(5), (req, res) => {
    res.send('This is a protected route')
})

app.get('/logout', (req, res) => {
    res.session.destroy(err => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        }
        res.redirect('/');
    })
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'login.html'))
})

app.post('/login', (req, res) => {
    if (authUser.password !== req.body.password) {
        res.sendFile(path.resolve(__dirname, 'pages', 'login.html'))
        return
    }
    req.session.userId = authUser.id;
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.send('Home Page')
    // res.cookie('test_cookie', { test: 123 }).send('<h2>Hello world</h2>')
    // res.locals
});

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})