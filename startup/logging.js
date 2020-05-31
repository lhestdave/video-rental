// const { createLogger, transports } = require('winston');

// require('express-async-errors');

// module.exports = function() {
//     // winston.createLogger(
//     //     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//     //     new winston.transports.File({ filename: './logs/uncaughtExceptions.log' }));

//     createLogger({
//         transports: [
//             new transports.File({ filename: './logs/combined.log' })
//         ],
//         exceptionHandlers: [
//             new transports.Console({ colorize: true, prettyPrint: true }),
//             new transports.File({ filename: './logs/exceptions.log' })
//         ]
//         });

    
//     process.on('unhandledRejection', (ex) => {
//         throw ex;
//     });

//     //winston.add(winston.transports.File, { filename: './logs/logfile.log'});
//     winston.add(new winston.transports.File({
//         filename: './logs/logfile.log',
//         //handleExceptions: true
//       }));
// }

const winston = require('winston');
const { format, createLogger, transports } = winston;
const { combine, label, json } = format;

module.exports = function() {
    // Enable exception handling when you create your logger.
    const logger = createLogger({
        transports: [
        new transports.File({ filename: 'combined.log' }) 
        ],
        exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
        ]
    });
    //
    // Configure the logger for `category1`
    //
    winston.loggers.add('category1', {
    format: combine(
        label({ label: 'category one' }),
        json()
    ),
    transports: [
        new winston.transports.Console({ level: 'silly' }),
        new winston.transports.File({ filename: 'somefile.log' })
    ]
    });
    
    //
    // Configure the logger for `category2`
    //
    winston.loggers.add('category2', {
    format: combine(
        label({ label: 'category two' }),
        json()
    ),
    transports: [
        new winston.transports.Http({ host: 'localhost', port:8080 })
    ]
    });
}