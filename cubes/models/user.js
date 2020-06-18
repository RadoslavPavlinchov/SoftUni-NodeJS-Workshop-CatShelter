const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: function(v) {
        //       return /[a-zA-Z0-9]+/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid username!`
        //   },
        match: [/^[a-zA-Z0-9]+$/, 'Username is not valid'],
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: function(v) {
        //       return /[a-zA-Z0-9]+/.test(v);
        //     },
        //     message: props => `Password is not valid!`
        //   },
        minlength: 8
    }
})

module.exports = mongoose.model('User', UserSchema)