/* Rotas
 * Loja-ESCOS12
 * Dev: 
 */
const express = require("express");
const routes = express.Router();
const { UPLOAD } = require('./middlewares/UploadFiles');
const produto_digital = require('./controllers/ProdutoDigitalController');
const produto_fisico = require('./controllers/ProdutoFisicoController');
const Imagem = require('./controllers/ImagensController');
const Exposicao = require('./controllers/ExposicaoController');
const Pedido = require('./controllers/PedidoController');
const Status = require('./controllers/StatusController');;


//ROtas para controlador produtoDigital
//routes.post("/api/produtoDigital",, produtoDigital.adicionar);
routes.post("/api/produto_digital", produto_digital.adicionar);
routes.get("/api/produto_digital/sem_paginacao", produto_digital.buscarTudoSemPaginacao);
routes.get("/api/produto_digital/:id", produto_digital.buscarUm);
routes.get("/api/produto_digital", produto_digital.buscarTudo);
routes.put("/api/produto_digital/:id", produto_digital.atualizar);
routes.delete("/api/produto_digital/:id", produto_digital.excluir);



//ROtas para controlador produtoDigital
routes.post("/api/exposicao", Exposicao.adicionar);
routes.get("/api/exposicao/sem_paginacao", Exposicao.buscarTudoSemPaginacao);
routes.get("/api/exposicao/:id", Exposicao.buscarUm);
routes.patch("/api/exposicao/:id/ativo/:status", Exposicao.alterarStatus);
routes.get("/api/exposicao", Exposicao.buscarTudo);
routes.put("/api/exposicao/:id", Exposicao.atualizar);
routes.patch("/api/exposicao/:id/imagem_destaque/:imgId", Exposicao.alterarImagemDestaque)
routes.delete("/api/exposicao/:id", Exposicao.excluir);

//ROtas para controlador Produto
routes.post("/api/produto_fisico", produto_fisico.adicionar);
routes.get("/api/produto_fisico/sem_paginacao", produto_fisico.buscarTudoSemPaginacao);
routes.get("/api/produto_fisico/:id", produto_fisico.buscarUm);
routes.get("/api/produto_fisico", produto_fisico.buscarTudo);
routes.put("/api/produto_fisico/:id", produto_fisico.atualizar);
routes.delete("/api/produto_fisico/:id", produto_fisico.excluir);

routes.post("/api/pedido", Pedido.adicionar);
routes.get("/api/pedido/:id", Pedido.buscarUm);
routes.get("/api/pedido/:id/usuario", Pedido.usuarioBuscarUm);
routes.get("/api/pedido/usuario/:id", Pedido.buscaPeloUsuarioID);
routes.get("/api/pedido/",Pedido.buscarTudo);
routes.get("/api/pedido",Pedido.buscarTudoSemPaginacao);
routes.put("/api/pedido/:id",Pedido.atualizar);
routes.delete("/api/pedido/:id",Pedido.excluir);




routes.post("/api/imagem",UPLOAD, Imagem.adicionar);
routes.get("/api/imagem/:id", Imagem.buscarUm);
routes.get("/api/imagem", Imagem.buscarTudo);
routes.get("/api/imagem", Imagem.buscarTudoSemPaginacao);
//routes.put("/api/imagem/:id", Imagem.atualizar);
routes.delete("/api/imagem/vet", Imagem.excluirVarias);
routes.delete("/api/imagem/:id", Imagem.excluir);
routes.post("/api/imagem/sem_upload",Imagem.adicionarSemUpload);

routes.get("/api/status/:id", Status.buscarUm);
routes.get("/api/status", Status.buscarTudoSemPaginacao);



module.exports = routes;
