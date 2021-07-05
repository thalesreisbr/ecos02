/* Banco de Dados 
 * Loja-ESCOS12
 * Dev: 
 * Desc.: Configuração do Banco de Dados
 */
'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config')[environment];
const database = new Sequelize(config);

module.exports = database;