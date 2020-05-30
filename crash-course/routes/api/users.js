const express = require('express');
const router = express.Router();
const users = require('../../Users');
const uuid = require('uuid');

// Get all users
router.get('/', (req, res) => {
    res.json(users);
})

// Get a single user
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = users.some(user => user.id === id);
    
    if (found) {
        res.json(users.filter(user => user.id === id));
    } else {
        res.status(400).json({ msg: `No user with id of ${id}` })
    }
})

// Create a user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newUser.email || !newUser.name) {
       return res.status(400).json({ msg: `Please add name and email` })
    }

    users.push(newUser);
    // res.json(users);
    res.redirect('/');
})

// Update a user
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = users.some(user => user.id === id);
    
    if (found) {
        const updateUser = req.body;
        users.forEach(user => {
            if (user.id === id) {
                user.name = updateUser.name ? updateUser.name : user.name;
                user.email = updateUser.email ? updateUser.email : user.email;
                res.json({ msg: 'The user was updated', user })
            }
        })
    } else {
        res.status(400).json({ msg: `No user with id of ${id}` })
    }
})

// Delete a user
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = users.some(user => user.id === id);
    
    if (found) {
        res.json({
            msg: 'The user has been deleted', 
            users: users.filter(user => user.id !== id)
        })
    } else {
        res.status(400).json({ msg: `No user with id of ${id}` })
    }
})

module.exports = router
