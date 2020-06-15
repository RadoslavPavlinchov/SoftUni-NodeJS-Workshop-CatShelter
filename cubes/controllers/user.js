const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;
const saltRounds = 10;

const generateToken = (data) => {
    const token = jwt.sign({ data }, privateKey);
    return token;
};

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

    const token = generateToken(userObj)

    res.cookie('aid', token);

    return true;
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const userObj = await User.findOne({ username });

    const status = await bcrypt.compare(password, userObj.password);

    if (status) {
        const token = generateToken(userObj)
        res.cookie('aid', token);
    }

    return status;
}

module.exports = {
    registerUser,
    loginUser
}

