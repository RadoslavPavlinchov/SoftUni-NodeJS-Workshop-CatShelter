const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;

const extractDataFromJWT = (req, res) => {
    const token = req.cookies['aid'];
    return jwt.verify(token, privateKey);
}

module.exports = extractDataFromJWT;