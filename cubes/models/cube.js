const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    difficultyLevel: Number
});

module.exports = mongoose.model('cubeModel', cubeSchema);