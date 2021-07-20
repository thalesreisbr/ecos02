/* Server 
 * Loja-ESCOS12
 */

const http = require('http');
const database = require('./config/database');
const app = require("./app");
const { date, time } = require('./utils/DataHoraAtual.js')

//Sincronizando todos os models e estabelecendo o servidor.
database.sync({ /* force: true */})
    .then(() => {
        const port = process.env.SERVER_PORT || 3001;
        app.set('port', port);
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`\n============ ${date()} ${time()} ============`);
            console.log(`API Loja Executando em: http://${database.config.host}:${port}/`);
            console.log(`=============================================\n`);
        });
    })


