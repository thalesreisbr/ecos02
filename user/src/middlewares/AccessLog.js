/* Middleware <Access> 
 * B2ML Sistemas
 * Dev:  
 * Desc.: Middleware que intercepta todas as requisições e printa os dados dela no console
 */

const { date, time } = require('../utils/DataHoraAtual.js')

module.exports = {

    log: function log(req, res, next) {
        console.log(`[${date()} ${time()}] Origin: ${req.headers.origin}. Route: ${req.method} - ${req.url}`);
        next();
    }
}