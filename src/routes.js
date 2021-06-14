const express = require("express");
const routes = express.Router();
const { AUTH,ADM,REFRESH, RECOVERY } = require('./middlewares/Autorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const Exemplo = require("./controllers/ExemploController");
const Usuario = require('./controllers/UsuarioController');
const Perfil = require('./controllers/PerfilController');
const Status = require('./controllers/StatusController');;



//Rotas para o controlador exemplo
routes.post("/api/ex", Exemplo.adicionar);
routes.get("/api/ex/:id", Exemplo.buscarUm);
routes.get("/api/ex", Exemplo.buscarTudo);
routes.get("/api/ex", Exemplo.buscarTudoSemPaginacao);
routes.put("/api/ex/:id", Exemplo.atualizar);
routes.delete("/api/ex/:id", Exemplo.excluir);

routes.get("/api/perfil/:id", Perfil.buscarUm);
routes.get("/api/perfil", Perfil.buscarTudoSemPaginacao);


routes.get("/api/status/:id", Status.buscarUm);
routes.get("/api/status", Status.buscarTudoSemPaginacao);


routes.post("/api/usuario/cadastro_sem_login", Usuario.cadastrarSemLogin);
routes.post("/api/usuario/", Usuario.cadastrar);
routes.post("/api/usuario/login",REFRESH, Usuario.autenticar);
routes.post("/api/usuario/recuperar_senha", Usuario.recuperarSenha);
routes.post("/api/usuario/redefinir_renha",RECOVERY, Usuario.redefinirSenha);
routes.get("/api/usuario/all", Usuario.buscarTudoSemPaginacao);
routes.get("/api/usuario/email", Usuario.buscarPeloEmail);
routes.get("/api/usuario/:id",AUTH, Usuario.buscarUm);
routes.get("/api/usuario", Usuario.buscarTudo);
routes.put("/api/usuario/:id",AUTH, Usuario.atualizar);
routes.delete("/api/usuario/:id", Usuario.excluir);
routes.delete("/api/usuario/parcialmente/:id", Usuario.excluirParcialmente);


module.exports = routes;
