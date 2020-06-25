const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;

const { String, Number, Boolean, ObjectId } = Schema.Types;

const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true

    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    carImage: {
        type: String,
        required: true
    },
    buddies: [
        {
            type: ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = new Model('Trip', tripSchema);