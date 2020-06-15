const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;
const saltRounds = 10;

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt)
    // Store hash in your password DB.
    const user = new User({
        username,
        password: hash
    })

    const userObj = await user.save();

    const token = jwt.sign({ 
        userId: userObj._id,
        userName: userObj.userName
    }, privateKey);

    res.cookie('aid', token);

    return true;
}

module.exports = {
    registerUser,
}

