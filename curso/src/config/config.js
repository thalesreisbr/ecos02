require('dotenv').config();
const config = {
  "development": {
    "dialect": "postgres",
    "port": 5432,
    "host": "localhost",
    "schema": "public",
    "database": "curso",
    "username": "postgres",
    "password": "postgres",
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  },
  "homolog": {
    "dialect": "postgres",
    "port": process.env.DB_HOMOLOG_PORT,
    "host": process.env.DB_HOMOLOG_HOST,
    "schema": "public",
    "username": process.env.DB_HOMOLOG_USERNAME,
    "password": process.env.DB_HOMOLOG_PASSWORD,
    "database": process.env.DB_HOMOLOG_DB_NAME,
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  },
  "production": {
    "dialect": "",
    "host": "",
    "username": "",
    "password": "",
    "database": ""
  }
}
module.exports = config;
