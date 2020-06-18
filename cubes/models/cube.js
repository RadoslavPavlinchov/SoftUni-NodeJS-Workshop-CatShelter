const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'Cube name is not valid'],
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        maxlength: 60,
        match: [/^[a-zA-Z0-9 ]+$/, 'Cube description is not valid'],
        minlength: 5
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
              return /^(https|http)/.test(v);
            },
            message: 'Image should have http or https in URL!'
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }],
    creatorId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

module.exports = mongoose.model('Cube', CubeSchema);