'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    let senha = "senha123";
    senha =  await bcrypt.hash(senha, salt);
    const produtos_fisicos = await queryInterface.bulkInsert('exposicao', [
      {
        "ativo": true,
        "destaque": true,
        "nome":"kit produto fisico",
        "preco_avista": 125.90,
        "preco_parcelado": 115,
        "descricao":"blabalbalbalab",
        "max_parcelas":10,
        "desconto_percentual": 5,
        "created_at": new Date(),      
      },
      {
        "ativo": true,
        "destaque": true,
        "nome":"kit_produto_digital",
        "preco_avista": 500,
        "preco_parcelado": 550,
        "descricao":"blabalbalbalab",
        "max_parcelas":2323,
        "desconto_percentual": 5,
        "created_at": new Date(),
      },
      {
        "ativo": true,
        "destaque": true,
        "nome":"produto_digital",
        "preco_avista": 300,
        "preco_parcelado": 350,
        "descricao":"blabalbalbalab",
        "max_parcelas":2323,
        "desconto_percentual": 5,
        "created_at": new Date(),
      },
    ]);
    const exposicao_produtos_fisicos = await queryInterface.bulkInsert('exposicao_produtos_fisicos', [
      {
        "produto_fisico_id":1,
        "quantidade":1,
        "exposicao_id":1,
        "created_at": new Date(),
      },
      {
        "produto_fisico_id":2,
        "quantidade":2,
        "exposicao_id":1,
        "created_at": new Date(),
      }
    ]);
    const exposicao_produtos_digitais = await queryInterface.bulkInsert('exposicao_produtos_digitais', [
      {
        "produto_digital_id":1,
        "exposicao_id":2,
        "created_at": new Date(),
      },
      {
        "produto_digital_id":2,
        "exposicao_id":2,
        "created_at": new Date(),
      },
      {
        "produto_digital_id":3,
        "exposicao_id":3,
        "created_at": new Date(),
      }
    ]);
    const images  = await queryInterface.bulkInsert('imagens', [
      {
        "exposicao_id": 1,
        "url": "/images/curso2.jpeg",
        "destaque":true,
        "created_at": new Date(),  
      },
      {
        "exposicao_id": 2, 
        "url": "/images/curso1.jpg",
        "destaque":true,
        "created_at": new Date(),
      },
      {
        "url": "/images/curso3.jpeg",
        "exposicao_id": 3,
        "destaque":true,
        "created_at": new Date(),
      }   
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    const produtos_fisicos =  queryInterface.bulkDelete('produtos_digitais', null, {});
    const images =  queryInterface.bulkDelete('images', null, {});

  }
};
