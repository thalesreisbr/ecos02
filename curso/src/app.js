require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const status = require('./middlewares/Status');
const path = require('path');

const { log } = require('./middlewares/AccessLog.js');

class AppController {
    constructor() {
        this.express = express();

        //Middlewares
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(cors({origin: '*'}));
        //this.express.use(autorizacao.global);
        this.express.use(log);
        this.express.use(routes);
        this.express.use('/arquivos', express.static(path.resolve(__dirname, 'uploads', 'images')));
        this.express.use(status.status404);
        this.express.use(status.status500);

        
    }
}

module.exports = new AppController().express;