const express = require("express");
const routes = express.Router();
const { AUTH,ADM,REFRESH, RECOVERY } = require('./middlewares/Autorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const Exemplo = require("./controllers/ExemploController");
const Usuario = require('./controllers/UsuarioController');
const Perfil = require('./controllers/PerfilController');
const Status = require('./controllers/StatusController');;



routes.get("/api/auth", AUTH);
routes.get("/api/auth/adm",)

// //Rotas para o controlador exemplo
// routes.post("/api/ex", Exemplo.add);
// routes.get("/api/ex/:id", Exemplo.findOne);
// routes.get("/api/ex", Exemplo.findAll);
// routes.get("/api/ex", Exemplo.findAllWithoutPagination);
// routes.put("/api/ex/:id", Exemplo.refresh);
// routes.delete("/api/ex/:id", Exemplo.delete);

routes.get("/api/perfil/:id", Perfil.findOne);
routes.get("/api/perfil", Perfil.findAllWithoutPagination);


routes.get("/api/status/:id", Status.findOne);
routes.get("/api/status", Status.findAllWithoutPagination);


routes.post("/api/usuario/cadastro_sem_login", Usuario.registerWithoutLogin);
routes.post("/api/usuario/", Usuario.register);
routes.post("/api/usuario/login",REFRESH, Usuario.authenticate);
routes.post("/api/usuario/recuperar_senha", Usuario.recoverPassword);
routes.post("/api/usuario/redefinir_renha",RECOVERY, Usuario.redefinePassword);
routes.get("/api/usuario/all", Usuario.findAllWithoutPagination);
routes.get("/api/usuario/email", Usuario.findByEmail);
routes.get("/api/usuario/:id",AUTH, Usuario.findOne);
routes.get("/api/usuario", Usuario.findAll);
routes.put("/api/usuario/:id",AUTH, Usuario.refresh);
routes.delete("/api/usuario/:id", Usuario.delete);
routes.delete("/api/usuario/parcialmente/:id", Usuario.partialDelete);


module.exports = routes;
