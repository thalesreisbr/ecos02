const express = require('express');
const routes = express.Router();
const {ACCESS_TOKEN} = require('./middlewares/ApiHotmartAutorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const curso = require('./controllers/cursoController');;
const Exposicao = require('./controllers/ExposicaoController');
const Status = require('./controllers/StatusController'); ;
const Assinatura = require('./controllers/AssinaturaController');
const arquivo = require('./controllers/ImagensController');
const Aula = require('./controllers/AulaController');

// ROtas para controlador produtoDigital
// routes.post("/api/produtoDigital",AUTH,ADM, produtoDigital.adicionar);
routes.post('/api/curso', curso.adicionar);
routes.get('/api/curso/sem_paginacao', curso.buscarTudoSemPaginacao);
routes.get('/api/curso/:id', curso.buscarUm);
routes.get('/api/curso', curso.buscarTudo);
routes.put('/api/curso/:id', curso.atualizar);
routes.delete('/api/curso/:id', curso.excluir);


// ROtas para controlador produtoDigital
routes.get('/api/exposicao/sem_paginacao', Exposicao.buscarTudoSemPaginacao);
routes.get('/api/exposicao/:id', Exposicao.buscarUm);
routes.patch('/api/exposicao/:id/ativo/:status', Exposicao.alterarStatus);
routes.get('/api/exposicao', Exposicao.buscarTudo);


//Assinatura
routes.post("/api/assinatura", Assinatura.adicionar);
routes.get("/api/assinatura//sem_paginacao", Assinatura.buscarTudoSemPaginacao);
routes.post("/api/assinatura/usuario_produto_digital", Assinatura.adicionarAPartirDoProdutoDigitalEUsuario);
routes.get("/api/assinatura/:id", Assinatura.buscarUm);
routes.get("/api/assinatura", Assinatura.buscarTudo);
routes.put("/api/assinatura/:id", Assinatura.atualizar);
routes.delete("/api/assinatura/:id", Assinatura.excluir);

routes.post("/api/arquivo",UPLOAD, arquivo.adicionar);
routes.get("/api/arquivo/:id", arquivo.buscarUm);
routes.get("/api/arquivo", arquivo.buscarTudo);
routes.get("/api/arquivo", arquivo.buscarTudoSemPaginacao);
//routes.put("/api/arquivo/:id", arquivo.atualizar);
routes.delete("/api/arquivo/vet", arquivo.excluirVarias);
routes.delete("/api/arquivo/:id", arquivo.excluir);


//Rotas para aula
routes.post("/api/aula", Aula.adicionar);
routes.get("/api/aula/:id", Aula.buscarUm);
//routes.get("/api/aula/produtoDigital/:id", Aula.buscarTudoPeloPrododutoDigital);
routes.get("/api/aula", Aula.buscarTudo);
routes.get("/api/aula", Aula.buscarTudoSemPaginacao);
routes.put("/api/aula/:id", Aula.atualizar);
routes.delete("/api/aula/:id", Aula.excluir);
routes.get('/api/status/:id', Status.buscarUm);
routes.get('/api/status', Status.buscarTudoSemPaginacao);


module.exports = routes;
