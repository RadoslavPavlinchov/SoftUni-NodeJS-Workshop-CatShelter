const { body } = require('express-validator');

module.exports = [
    body('startAndEndPoint')
        .custom(value => {
            if (!value.includes(' - ')) {
                throw new Error('The directions input field should include " - " in between!')
            }

            return true
        }),

    body('dateTime')
        .custom(value => {
            if (!value.includes(' - ')) {
                throw new Error('The date and time input value should includes " - " in between!')
            }

            return true
        })
];