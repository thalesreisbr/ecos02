/* Rotas
 * B2ML Sistemas
 * Dev:
 */
const express = require('express');
const routes = express.Router();
const {ACCESS_TOKEN} = require('./middlewares/ApiHotmartAutorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const produto_digital = require('./controllers/ProdutoDigitalController');
const produto_fisico = require('./controllers/ProdutoFisicoController');
const Exposicao = require('./controllers/ExposicaoController');
const Pedido = require('./controllers/PedidoController');
const Status = require('./controllers/StatusController'); ;


// ROtas para controlador produtoDigital
// routes.post("/api/produtoDigital",AUTH,ADM, produtoDigital.adicionar);
routes.post('/api/produto_digital', produto_digital.adicionar);
routes.get('/api/produto_digital/sem_paginacao', produto_digital.buscarTudoSemPaginacao);
routes.get('/api/produto_digital/:id', produto_digital.buscarUm);
routes.get('/api/produto_digital', produto_digital.buscarTudo);
routes.put('/api/produto_digital/:id', produto_digital.atualizar);
routes.delete('/api/produto_digital/:id', produto_digital.excluir);


// ROtas para controlador produtoDigital
routes.get('/api/exposicao/sem_paginacao', Exposicao.buscarTudoSemPaginacao);
routes.get('/api/exposicao/:id', Exposicao.buscarUm);
routes.patch('/api/exposicao/:id/ativo/:status', Exposicao.alterarStatus);
routes.get('/api/exposicao', Exposicao.buscarTudo);

// ROtas para controlador Produto
routes.get('/api/produto_fisico/sem_paginacao', produto_fisico.buscarTudoSemPaginacao);
routes.get('/api/produto_fisico/:id', produto_fisico.buscarUm);
routes.get('/api/produto_fisico', produto_fisico.buscarTudo);

routes.get('/api/status/:id', Status.buscarUm);
routes.get('/api/status', Status.buscarTudoSemPaginacao);


module.exports = routes;
