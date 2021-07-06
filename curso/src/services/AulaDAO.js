const status = require("http-status");
const database = require("../config/database");
const IniciarModels = require("../models/init-models");
const { aulas: entity } = IniciarModels(database);

//Adiciona uma nova instancia da entidade.
exports.adicionar = async (body) => {
	try {
		const instancia = await entity.create(body);
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error; 
	}
};

//Busca por uma instancia da entidade.
exports.buscarUm = async (id) => {
	try {

		const instancia = await entity.findByPk(id);
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};

//Busca todas as instancias da entidade.
exports.buscarTudoPeloCurso = async (curso_id	,limite, pagina) => {
	limite = parseInt(limite || 0);
	pagina = parseInt(pagina || 0);

	if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
		throw {error: 'Parâmetros de busca inválidos.'}
	}

	const ITENS_POR_PAGINA = 100;
	limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
	const offset = pagina <= 0 ? 0 : pagina * limite;

	try {

		const instancias = await entity.findAll({
			where:{curso_id	},
			 limit: limite,
			  offset: offset });
		const total = await entity.count({});
		
		const totalPaginas = total > limite ? parseInt(total / limite) : 1;	

		return { total, pagina, totalPaginas, limite, offset, instancias };

	} catch (error) {
		throw error;
	}
};


//Busca todas as instancias da entidade.
exports.buscarTudo = async (limite, pagina) => {
	limite = parseInt(limite || 0);
	pagina = parseInt(pagina || 0);

	if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
		throw {error: 'Parâmetros de busca inválidos.'}
	}

	const ITENS_POR_PAGINA = 100;
	limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
	const offset = pagina <= 0 ? 0 : pagina * limite;

	try {

		const instancias = await entity.findAll({ limit: limite, offset: offset });
		const total = await entity.count({});
		
		const totalPaginas = total > limite ? parseInt(total / limite) : 1;	

		return { total, pagina, totalPaginas, limite, offset, instancias };

	} catch (error) {
		throw error;
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.buscarTudoSemPaginacao = async () => {
	try {

		const instancias = await entity.findAll({});
		return instancias;

	} catch (error) {
		 throw error;
	}
};

//Atualiza uma instancia da entidade.
exports.atualizar = async (id, body) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			const updated = await entity.update(body, { where: { id: instancia.id }});
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		throw error;
	}
};

//Exclui uma instancia da entidade.
exports.excluir = async (id) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			const deleted = await entity.destroy({ where: { id: instancia.id } });
			return { deleted_id: instancia.id };
		}else{
			return null;
		}
	} catch (error) {
		throw error;
	}
};
