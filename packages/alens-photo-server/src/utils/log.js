module.exports = function (module) {
    const winston = require('winston');

    return new (winston.Logger) ({
        transports: [
            new winston.transports.Console(),
            // new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'application.log' })
        ]
    });
};