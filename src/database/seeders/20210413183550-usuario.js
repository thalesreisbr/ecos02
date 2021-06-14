'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    let senha = "senha123";
    senha =  await bcrypt.hash(senha, salt);
    return queryInterface.bulkInsert('usuarios', [
      {
        "nome":"thales",
        "email":"thale@gmail.com.br",
        "senha":senha,
        "cpf":"13373085608",
        "sexo":"male",
        "data_de_nascimento":"1990-05-07",
        "endereco_id":2,
        "created_at": new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});

  }
};
