const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;
const saltRounds = 10;

const generateToken = (data) => {
    const token = jwt.sign(data, privateKey);
    return token;
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt)
    // Store hash in your password DB.

    try {
        const user = new User({
            username,
            password: hash
        })

        const userObj = await user.save();

        const token = generateToken({
            userId: userObj._id,
            username: userObj.username
        })

        res.cookie('aid', token);

        return token;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err
        }
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userObj = await User.findOne({ username });
        if (!userObj) {
            return {
                error: true,
                message: 'There is no such user!'
            }
        }
        const status = await bcrypt.compare(password, userObj.password);
        if (status) {
            const token = generateToken({
                userId: userObj._id,
                username: userObj.username
            })
            res.cookie('aid', token);
        }

        return {
            error: !status,
            message: status || 'Wrong password'
        };
    } catch (error) {
        return {
            error: true,
            message: 'There is no such user!'
        }
    }
}

const auth = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) { return res.redirect('/user/login'); }

    try {
        jwt.verify(token, privateKey);
        next();
    } catch (error) {
        res.redirect('/user/login');
    }
}

const alreadyLogged = (req, res, next) => {
    const token = req.cookies['aid'];
    if (token) { return res.redirect('/'); }
    next();
}

const isLoggedInCheck = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) { req.isLoggedIn = false }
    try {
        jwt.verify(token, privateKey);
        req.isLoggedIn = true;
    } catch (error) {
        req.isLoggedIn = false
    }

    next();
}

const authJSON = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        return res.json({
            error: "Not authenticated"
        })
    }

    try {
        jwt.verify(token, privateKey);
        next();
    } catch (error) {
        return res.json({
            error: "Not authenticated"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    auth,
    authJSON,
    alreadyLogged,
    isLoggedInCheck
}

