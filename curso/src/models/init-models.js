var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _assinaturas = require("./assinaturas");
var _aulas = require("./aulas");
var _cursos = require("./cursos");
var _imagens = require("./imagens");
var _produtos_digitais = require("./produtos_digitais");
var _status = require("./status");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var assinaturas = _assinaturas(sequelize, DataTypes);
  var aulas = _aulas(sequelize, DataTypes);
  var cursos = _cursos(sequelize, DataTypes);
  var imagens = _imagens(sequelize, DataTypes);
  var produtos_digitais = _produtos_digitais(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);

  assinaturas.belongsTo(aulas, { as: "stop_aula", foreignKey: "stop_aula_id"});
  aulas.hasMany(assinaturas, { as: "assinaturas", foreignKey: "stop_aula_id"});
  imagens.belongsTo(aulas, { as: "aula", foreignKey: "aula_id"});
  aulas.hasMany(imagens, { as: "imagens", foreignKey: "aula_id"});
  assinaturas.belongsTo(cursos, { as: "curso", foreignKey: "curso_id"});
  cursos.hasMany(assinaturas, { as: "assinaturas", foreignKey: "curso_id"});
  aulas.belongsTo(cursos, { as: "curso", foreignKey: "curso_id"});
  cursos.hasMany(aulas, { as: "aulas", foreignKey: "curso_id"});
  imagens.belongsTo(cursos, { as: "curso", foreignKey: "curso_id"});
  cursos.hasMany(imagens, { as: "imagens", foreignKey: "curso_id"});
  assinaturas.belongsTo(status, { as: "status", foreignKey: "status_id"});
  status.hasMany(assinaturas, { as: "assinaturas", foreignKey: "status_id"});

  return {
    SequelizeMeta,
    assinaturas,
    aulas,
    cursos,
    imagens,
    produtos_digitais,
    status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
