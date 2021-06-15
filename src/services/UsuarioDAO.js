const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../config/database");
const Address = require("../models/Address");
const entity = require("../models/User");

//Adiciona uma nova instancia da entidade.
exports.cadastrar = async (credenciais) => {
	try {
		
		const instancia = await entity.create(credenciais,{include:'address'});
		
		return (((instancia)) ? instancia : null);

	} catch (error) { 
		throw error; 
	}
};

//Busca por uma instancia da entidade.
exports.buscarCredenciais = async (email) => {
	try {

		const instancia = await entity.findOne({attributes: ['id', 'password'], where: { email }});
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};
//Retorna verdadeiro se o token gerado para usuario é o que esta logado no banco
exports.verificaToken = async (token,id) => {
	try {

		const instancia = await entity.findOne({attributes: ['id'], where: {token,id}});
		
		return ((instancia !=null )? true : false);

	} catch (error) { 
		throw error;
	}
};
exports.buscarTokenRecuperacao = async (id) => {
	try {

		const instancia = await entity.findOne({attributes: ['token_recovery'], where: {id}});
		
		return (instancia ? instancia.token_recovery : null);

	} catch (error) { 
		throw error;
	}
};

//Busca por uma instancia da entidade.
exports.buscarUm = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{attributes: {exclude: ['password','token','deleted_at','token_recovery']},include:'address'});
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};
//Busca por uma instancia da entidade.
exports.buscarPeloEmail = async (email) => {
	try {

		const instancia = await entity.findOne({attributes: {exclude: ['password']},where :{email}});
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

		const instancias = await entity.findAll({limit: limite, offset: offset, 
			attributes: ['id', 'name', 'email'],
		});
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

		const instancias = await entity.findAll({
			attributes: ['id', 'name', 'email'],
		});
		return instancias;

	} catch (error) {
		 throw error;
	}
};

//Atualiza uma instancia da entidade.
exports.atualizar = async (id, body) => {
	try {
		let address;
		const instancia = await entity.findByPk(id);
		if(instancia){
			if(instancia.endereco_id == null && body.address!=null){
				address =  await Address.create(body.address);
				body.address_id = address.id;
			}
			
			const updated = await entity.update(body, { where: { id: instancia.id }}).then(
				async (updated)=>{
					if(body.address && instancia.address_id!=null){
						await Address.update(body.address,{where:{id:instancia.address_id}});
					}
				});
			const usuario =  await entity.findByPk(id,{include:'address'});
			return { usuario: usuario };
		}else{
			return null;
		}

	} catch (error) {
		throw error;
	}
};
exports.atualizarSenha = async (id, password) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			const updated = await entity.update({password:password}, { where: { id: instancia.id }});
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

//Soft Delete excluindo apenas informaçãoes pessoais
exports.excluirParcialmente = async (id) => {
	try {
		let deleted;
		let instancia = await entity.findByPk(id);
		if(instancia){
			await entity.update({name:null,email:null,cpf:null,password:null},{where: { id: instancia.id } }).then(
				async ()=>{
					let instancia_address = await addresss.findByPk(instancia.address_id);
					if(instancia_address){
						instancia_address.address = null;
						await addresss.update(instancia_address, {where : { id :instancia.address_id}}).then(
							async ()=>{
								deleted = await entity.destroy({ where: { id: instancia.id } });
							}
						);
					}
					
				}

			);
			
			return (deleted) ? {deleted_id:instancia.id} : null;
		}else{
			return null;
		}
	} catch (error) {
		throw error;
	}
};

exports.atualizarTokenRecuperacao = async (id, token_recovery) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			const updated = await entity.update({token_recovery:token_recovery}, { where: { id: instancia.id }});
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		throw error;
	}
}


exports.atualizarToken = async (id, token) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			const updated = await entity.update({token:token}, { where: { id: instancia.id }});
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		throw error;
	}
};

//Verifica se o operador possui algum dos perfis exigidos.
// exports.verificarRole = async (operator_id, roles) => {
// 	try {
// 		const instancia = await entity.findOne({
// 			attributes: ['id'],
// 			where: {[Op.and]: [{id: operator_id}, {[Op.or]: {role_id: roles}}]}
// 		});
// 		return (instancia ? true : false);

// 	} catch (error) { 
// 		throw error;
// 	}
// };


