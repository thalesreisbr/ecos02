'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    let senha = "senha123";
    senha =  await bcrypt.hash(senha, salt);
    return queryInterface.bulkInsert('User', [
      {
        "name":"thales",
        "email":"thale@gmail.com.br",
        "password":senha,
        "document":"13373085608",
        "gender":"male",
        "birth_date":"1990-05-07",
        "perfil_id":1,
        "created_at": new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});

  }
};
