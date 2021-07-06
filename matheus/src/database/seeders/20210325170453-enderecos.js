'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('enderecos', [
      {
        cep:"37500182",
        cidade:"itajuba",
        endereco:"rua pardal 654",
        numero:654,
        complemento:"casa",
        bairro:"Nossa Senhora das graças",
        uf:"MG"
      },
      {
        cep:"37500182",
        cidade:"itajuba",
        endereco:"rua pardal 654",
        numero:654,
        complemento:"casa",
        bairro:"Nossa Senhora das graças",
        uf:"MG"
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('enderecos', null, {});
  }
};
