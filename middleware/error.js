const winston = require('winston');

module.exports = function (err, req, res, next){
    winston.error(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug 
    // silly

    res.status(500).json({ status: 'error', message: 'Something failed on the server.'});

}