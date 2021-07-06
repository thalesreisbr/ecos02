'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const produtos_digitais = await queryInterface.bulkInsert('produtos_digitais', [
      {
        "ativo":true,
        "nome":"curso emagrecer",
        "descricao":"10 aulas com tematica tal e conteudo tal",
        "duracao":40,
        "validade": 100,
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"gravida em forma",
        "descricao":"10 aulas com tematica tal e conteudo tal",
        "duracao":40,
        "validade": 100,
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"Exercicios para gravida",
        "descricao":"10 aulas com tematica tal e conteudo tal",
        "duracao":40,
        "validade": 100,
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"Diastase",
        "descricao":"10 aulas com tematica tal e conteudo tal",
        "validade": 100,
        "created_at":new Date()
      },
    ]);
    const images  = await queryInterface.bulkInsert('imagens', [
      {
        "produto_digital_id": 1,
        "url": "/images/curso2.jpeg",
        "created_at": new Date(),  
      },
      {
        "produto_digital_id": 2, 
        "url": "/images/curso1.jpg",
        "created_at": new Date(),
      },
      {
        "url": "/images/curso3.jpeg",
        "produto_digital_id": 3,
        "created_at": new Date(),
      }   
  ]);
    if(produtos_digitais && images){
      return true;
    }else{
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const produtos_fisicos =  queryInterface.bulkDelete('produtos_digitais', null, {});
    const images =  queryInterface.bulkDelete('imagens', null, {});

  }
};
