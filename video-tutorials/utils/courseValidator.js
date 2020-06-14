const { body } = require('express-validator');

module.exports = [
    body('title', 'Title should be at least 5 symbols')
        .isLength({ min: 5 })
        .isAlphanumeric(),
    body('description', 'Description should be at least 50 symbols')
        .isLength({ min: 50 })
        .isAlphanumeric(),
    body('imageUrl')
        .custom(value => {
            if (!value.startsWith('http')) { throw new Error('Image URL should start with "http" or "https"!') }
        })
];