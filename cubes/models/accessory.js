const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 60
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
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
});

module.exports = mongoose.model('Accessory', AccessorySchema);