const express = require('express');
const path = require('path');
const users = require('./Users');
const logger = require('./middleware/logger');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware init
app.use(logger);

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
})

// Get a single user
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = users.some(user => user.id === id);
    
    if (found) {
        res.json(users.filter(user => user.id === id));
    } else {
        res.status(400).json({ msg: `No user with id of ${id}` })
    }
})

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
})