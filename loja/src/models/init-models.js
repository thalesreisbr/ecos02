var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _exposicao = require("./exposicao");
var _exposicao_produtos_digitais = require("./exposicao_produtos_digitais");
var _exposicao_produtos_fisicos = require("./exposicao_produtos_fisicos");
var _imagens = require("./imagens");
var _pedidos = require("./pedidos");
var _produtos_digitais = require("./produtos_digitais");
var _produtos_fisicos = require("./produtos_fisicos");
var _status = require("./status");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var exposicao = _exposicao(sequelize, DataTypes);
  var exposicao_produtos_digitais = _exposicao_produtos_digitais(sequelize, DataTypes);
  var exposicao_produtos_fisicos = _exposicao_produtos_fisicos(sequelize, DataTypes);
  var imagens = _imagens(sequelize, DataTypes);
  var pedidos = _pedidos(sequelize, DataTypes);
  var produtos_digitais = _produtos_digitais(sequelize, DataTypes);
  var produtos_fisicos = _produtos_fisicos(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);

  produtos_digitais.belongsToMany(exposicao, { through: exposicao_produtos_digitais, foreignKey: "produto_digital_id", otherKey: "exposicao_id" });
  exposicao.belongsToMany(produtos_digitais, { through: exposicao_produtos_digitais, foreignKey: "exposicao_id", otherKey: "produto_digital_id" });
  produtos_fisicos.belongsToMany(exposicao, { through: exposicao_produtos_fisicos, foreignKey: "produto_fisico_id", otherKey: "exposicao_id" });
  exposicao.belongsToMany(produtos_fisicos, { through: exposicao_produtos_fisicos, foreignKey: "exposicao_id", otherKey: "produto_fisico_id" });
  exposicao_produtos_digitais.belongsTo(exposicao, { foreignKey: "exposicao_id"});
  exposicao.hasMany(exposicao_produtos_digitais, { foreignKey: "exposicao_id"});
  exposicao_produtos_digitais.belongsTo(produtos_digitais, { foreignKey: "produto_digital_id"});
  produtos_digitais.hasMany(exposicao_produtos_digitais, { foreignKey: "produto_digital_id"});
  exposicao_produtos_fisicos.belongsTo(exposicao, { foreignKey: "exposicao_id"});
  exposicao.hasMany(exposicao_produtos_fisicos, { foreignKey: "exposicao_id"});
  exposicao_produtos_fisicos.belongsTo(produtos_fisicos, { foreignKey: "produto_fisico_id"});
  produtos_fisicos.hasMany(exposicao_produtos_fisicos, { foreignKey: "produto_fisico_id"});
  imagens.belongsTo(exposicao, { foreignKey: "exposicao_id"});
  exposicao.hasMany(imagens, { foreignKey: "exposicao_id"});
  imagens.belongsTo(produtos_digitais, { foreignKey: "produto_digital_id"});
  produtos_digitais.hasMany(imagens, { foreignKey: "produto_digital_id"});
  imagens.belongsTo(produtos_fisicos, { foreignKey: "produto_fisico_id"});
  produtos_fisicos.hasMany(imagens, { foreignKey: "produto_fisico_id"});
  pedidos.belongsTo(exposicao, { foreignKey: "exposicao_id"});
  exposicao.hasMany(pedidos, { foreignKey: "exposicao_id"});
  pedidos.belongsTo(status, { foreignKey: "status_id"});
  status.hasMany(pedidos, { foreignKey: "status_id"});

  return {
    SequelizeMeta,
    exposicao,
    exposicao_produtos_digitais,
    exposicao_produtos_fisicos,
    imagens,
    pedidos,
    produtos_digitais,
    produtos_fisicos,
    status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
