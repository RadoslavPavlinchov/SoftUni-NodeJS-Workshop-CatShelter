const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

const saltRounds = 9;
const PORT = 3000;
const options = { expiresIn: '10m' };
const secret = 'mySecretSecret';

app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session(
    { secret: 'my secret' },
    { httpOnly: true },
    { secure: false }
))

function auth(authLevel) {
    return (req, res, next) => {
        // const authUser = users.find(user => user.id === req.session.userId);
        const token = req.cookies['auth_cookie'];
        const data = jwt.verify(token, secret);
        const authUser = users.find(user => user.id === data.userId);
        if (!authUser) { 
            res.status(401).send('401: You are not authorized to see this page!');
            return; 
        }
        req.user = authUser;
        next()
    }
}

let users = [
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

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'register.html'))
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => { user.username === username });
    if (user) {
        res.sendFile(path.resolve(__dirname, 'pages', 'register.html'));
        return;
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) { next(err); return; }
        users = users.concat({ id: 4, username, password: hash });
        res.redirect('/')
    })
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'login.html'))
})

app.post('/login', (req, res, next) => {
    const authUser = users.find(user => user.username === req.body.username);
    if (!authUser) {
        res.sendFile(path.resolve(__dirname, 'pages', 'login.html'));
        return;
    }
    bcrypt.compare(req.body.password, authUser.password).then(respond => {
        if (!respond) {
            res.sendFile(path.resolve(__dirname, 'pages', 'login.html'))
            return
        }
        const token = jwt.sign({ userId: authUser.id }, secret, options);
        // req.session.userId = authUser.id;
        res.cookie('auth_cookie', token).redirect('/');
    }).catch(next)
})

app.get('/protected', auth(5), (req, res) => {
    res.send('This is a protected route')
})

app.get('/logout', (req, res) => {
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send(err.message);
    //         return
    //     }
    //     res.redirect('/');
    // });
    
    // Black list table should be created for the already expired tokens

    res.clearCookie('auth_cookie').redirect('/')
})

app.get('/', (req, res) => {
    res.send('Home Page')
    // res.cookie('test_cookie', { test: 123 }).send('<h2>Hello world</h2>')
    // res.locals
});

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})