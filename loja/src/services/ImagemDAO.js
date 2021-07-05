/* /* Data Access Object <exemplo>
 * Loja-ESCOS12
 * Dev:  
 * Desc.: Camada de persistencia da entidade "exemplo"
 */

const status = require("http-status");
const database = require("../config/database");
const IniciarModels = require("../models/init-models");
const { imagens: entity } = IniciarModels(database);

//Adiciona uma nova instancia da entidade.
exports.adicionarSemUpload = async (imagens_id,exposicao_id) => {
	try {

		const trasaction = await database.transaction(async(t)=>{
			imagens_id.map( async (id) => {
				entity.findByPk(id).then( async (elemento) => {
					imagem = {
						exposicao_id:exposicao_id,
						url : elemento.url,
						produto_digital_id:null,
						produto_fisico_id:null
					}
					entity.create(imagem,{
						trasaction:t
					});
				});
				
			})
		});
		
		return true;

	} catch (error) { 
		throw error; 
	}
};
exports.adicionar = async (body) => {
	try {

		const instancia = await entity.bulkCreate(body);
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error; 
	}
};

//Se tem alguma imagem destaque referente 
exports.verificaSeExisteImagemDestaque = async (body) => {
	try {

		const instancia = await entity.findOne({
			where:{
				produto_digital_id:body.produto_digital_id?body.produto_digital_id:null,
				exposicao_id:body.exposicao_id?body.exposicao_id:null,
				produto_fisico_id:body.produto_fisico_id?body.produto_fisico_id:null,
				destaque:true
			}
	});
		console.log(instancia);
		return (instancia==null ? true :false);

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

exports.buscarTudoPeloProdutoId= async (produto_id) => {
	try {

		const instancias = await entity.findAll({where:{produto_id}});
		return instancias;

	} catch (error) {
		 throw error;
	}
};

exports.buscarTudoPeloCursoId= async (produto_digital_id) => {
	try {

		const instancias = await entity.findAll({where:{produto_digital_id}});
		return instancias;

	} catch (error) {
		 throw error;
	}
};
exports.buscarTudoPeloExposicaoId= async (exposicao_id) => {
	try {

		const instancias = await entity.findAll({where:{exposicao_id}});
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
exports.excluirVarias = async (ids) => {
	try {
		let deleted;
		const trasaction = await database.transaction(async(t)=>{
			ids.map(async (id) =>{
				deleted = await entity.destroy({ where: { id: id }, trasaction:t });
			})
		});
		return transaction;
	} catch (error) {
		throw error;
	}
};
