'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const produtos_fisicos = await queryInterface.bulkInsert('produtos_fisicos', [
        {
          "ativo":true,
          "nome":"Pomada para cabelo",
          "descricao":"Cotem tal coisa e tal coisa",
          "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"Pomada rejuvenescedora",
        "descricao":"Cotem tal coisa e tal coisa",
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"Pomada para dor",
        "descricao":"cotem tal e tal coisa",
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"Dorcabou",
        "descricao":"cotem tal e tal coisa",
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"bepantol",
        "descricao":"cotem tal e tal coisa",
        "created_at":new Date()
      },
      {
        "ativo":true,
        "nome":"bepantrix",
        "descricao":"cotem tal e tal coisa",
        "created_at":new Date()
      },
    ]);
    const images  = await queryInterface.bulkInsert('imagens', [
      {
             "produto_fisico_id": 1,
          "url": "/images/4.jpeg",
          "created_at": "2021-04-23T13:07:19.313Z",
      },
      {
             "produto_fisico_id": 1,
          "url": "/images/4-4.png",
          "created_at": "2021-04-23T13:07:19.313Z",

      },
      {
             "produto_fisico_id": 2,
          "url": "/images/5.png",
          "created_at": "2021-04-23T13:10:08.732Z",
      },
      {
         "produto_fisico_id": 3,
        "url": "/images/2.jpg",
        "created_at": "2021-04-23T13:13:04.320Z",
      },
      {
             "produto_fisico_id": 3,
          "url": "/images/2.jpg",
          "created_at": "2021-04-23T13:13:04.320Z",
      },
      {
         "produto_fisico_id": 4,
        "url": "/images/3.jpeg",
        "created_at": "2021-04-23T13:15:18.393Z",

      },
      {
         "produto_fisico_id": 5,
        "url": "/images/1.jpg",
        "created_at": "2021-04-23T13:17:07.920Z",
     },
     {
     "produto_fisico_id": 6,
      "url": "/images/bepan.jpeg",
      "created_at": "2021-04-23T13:25:09.536Z",
  }
       
  ]);
    if(produtos_fisicos && images){
      return true;
    }else{
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const produtos_fisicos =  queryInterface.bulkDelete('produtos_fisicos', null, {});
    const images =  queryInterface.bulkDelete('imagens', null, {});

  }
};
