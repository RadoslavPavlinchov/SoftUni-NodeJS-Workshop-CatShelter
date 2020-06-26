const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;

const { String, Boolean, ObjectId } = Schema.Types;

const courseSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'Title is required!' ],
        unique: [ true, 'Course should be unique!' ],
    },
    description: {
        type: String,
        required: [ true, 'Description is required!' ],
        maxlength: [ 50, 'Content should be at least 50 characters!' ]
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now // Check the date that creates 
    },
    usersEnrolled: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]

});

module.exports = new Model('Course', courseSchema);