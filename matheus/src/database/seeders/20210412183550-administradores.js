'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    let senha = "senha123";
    senha =  await bcrypt.hash(senha, salt);
    return queryInterface.bulkInsert('administradores', [
      {
        "nome":"b2ml",
        "email":"b2ml@b2ml.com.br",
        "senha":senha,
        "perfil_id":1,
        "created_at": new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('administradores', null, {});

  }
};
