'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config')[environment];
const database = new Sequelize(config);

const Address = require('../models/Address');
const User = require('../models/User');


Address.init(database);
User.init(database);

Address.associate(database.models);
User.associate(database.models);



module.exports = database;