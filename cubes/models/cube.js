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

cubeSchema.method.getDescription = function () {
    return this.description;
}

module.exports = mongoose.model('Cube', cubeSchema);