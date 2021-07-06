const { date, time } = require('../utils/DataHoraAtual.js')

module.exports = {

    log: function log(req, res, next) {
        console.log(`[${date()} ${time()}] Origin: ${req.headers.origin}. Route: ${req.method} - ${req.url}`);
        next();
    }
}