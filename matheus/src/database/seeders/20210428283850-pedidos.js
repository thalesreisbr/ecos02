'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const produtos_fisicos = await queryInterface.bulkInsert('pedidos', [
      {
        
        "valor_pago":115,
        "frete":25,
        "quantidade":1,
        "exposicao_id":1,
        "endereco_id":2,
        "usuario_id":1,
        "status_id":1,
        "created_at": new Date(),  
      },
      {
    
        "valor_pago":345,
        "frete":25,
        "quantidade":2,
        "exposicao_id":1,
        "endereco_id":1,
        "usuario_id":1,
        "status_id":1,
        "created_at": new Date(),  
      },
      {
        
        "valor_pago":500,
        "frete":0,
        "quantidade":1,
        "exposicao_id":2,
        "endereco_id":2,
        "usuario_id":1,
        "status_id":1,
        "created_at": new Date(),  
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {


  }
};
