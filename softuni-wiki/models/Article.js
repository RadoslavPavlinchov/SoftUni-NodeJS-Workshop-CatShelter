const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;

const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'Title is required!' ],
        unique: [ true, 'Article should be unique!' ],
        minlength: [ 5, 'Title should be at least 5 characters!' ]
    },
    description: {
        type: String,
        required: true,
        minlength: [ 20, 'Content should be at least 20 characters!' ]
    },
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = new Model('Article', articleSchema);