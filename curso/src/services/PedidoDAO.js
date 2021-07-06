const status = require("http-status");
const database = require("../config/database");
const IniciarModels = require("../models/init-models");
const { pedidos: entity,imagens:imagens, enderecos:enderecos,usuarios:usuarios,exposicao:exposicao, produtos_fisicos:produtos_fisicos, produtos_digitais:produtos_digitais,status:statusModel, exposicao_produtos_fisicos:exposicao_produtos_fisicos } = IniciarModels(database);
const { Op } = require('sequelize');
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
exports.buscarPeloUsuarioID = async (id) => {
	try {

		const instancia = await entity.findByPk(id, {include:{model:enderecos}});
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};
//Busca por uma instancia da entidade.
exports.buscarUm = async (id) => {
	try {

		const instancia = await entity.findByPk(id, 
			{
				include:[
					{model:enderecos},
					{model:usuarios, attributes: {exclude: ['senha']}},
					{
						model: exposicao,
						include:[
							{
								model:produtos_fisicos,
								
							},
							
							{
								model:produtos_digitais
							}
						]
					},
					{model:statusModel}
				]
			});
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};
//Busca por uma instancia da entidade.
exports.UsuarioBuscarUm = async (id) => {
	try {

		const instancia = await entity.findByPk(id, 
			{
				include:[
					{model:enderecos},
					{
						model: exposicao,
						include:[
							{
								model:produtos_fisicos
							},
							{
								model:produtos_digitais
							}
						]
					},
					{model:statusModel}
				]
			});
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};

//Busca todas as instancias da entidade.
exports.buscarTudo = async (query) => {
	let limite = parseInt(query.limite || 0);
    let pagina = parseInt(query.pagina || 0);
	
    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        throw {error: 'Parâmetros de busca inválidos.'}
    }
    const ITENS_POR_PAGINA = 100;
    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    const offset = pagina <= 0 ? 0 : pagina * limite;

	// Filtros de usuario
	let filter_usuario = {[Op.and]: []};
	if(query.cpf) filter_usuario[Op.and].push({'$cpf$': query.cpf});

    //Percorre todos os elementos do query montando os parametros de filtragem para o objeto pedidos
    let filter = {[Op.and]: []};
    for(const [key, value] of Object.entries(query)){
        if(value && key !== 'limite' && key !== 'pagina' && key !='cpf' && key !='created_at' ){
            let newParam = new Object();
            if(Number.isNaN(parseInt(value))){
                newParam[key] = {[Op.substring]: value};
            }else{
                newParam[key] = value;
            }
            filter[Op.and].push(newParam);
        }
    }
	
	if(query.created_at){
		let dateStart = new Date(query.created_at);
		let dateEnd = new Date(query.created_at);
		
		filter['created_at'] = {[Op.between]:  [dateStart, new Date(dateEnd.setDate(dateEnd.getDate()+1))]};
		
		//filter[Op.between].push({'created_at': [date, new Date(date.setHours(12,59))]});	
	} 
    console.log(filter);

    try {

        const instancias = await entity.findAll({ limit: limite, offset: offset,
            where: filter,
            include:[
				{model:enderecos},
				{
					model:usuarios,
					attributes: {exclude: ['senha']},
					where:filter_usuario
			    },
				{
					model: exposicao,
					include:[
						{
							model:produtos_fisicos,
							include:{
								model:imagens
							}
						},
						{
							model:produtos_digitais,
							include:{
								model:imagens
							}
						}
					]
				},
				{model:statusModel}
			]
        });
        const total = await entity.count({
            where: filter,
            include:[
				{model:enderecos},
				{
					model:usuarios,
					attributes: {exclude: ['senha']},
					where:filter_usuario
			    },
			]
        });
        const totalPaginas = total > limite ? parseInt(total / limite) : 1;

        return { total, pagina, totalPaginas, limite, offset, instancias };
    } catch (error) {
        throw error;
    }
};
//Busca todas as instancias da entidade.
exports.buscarTudoPeloUsuarioID = async (limite, pagina,usuario_id) => {
	limite = parseInt(limite || 0);
	pagina = parseInt(pagina || 0);

	if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
		throw {error: 'Parâmetros de busca inválidos.'}
	}

	const ITENS_POR_PAGINA = 100;
	limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
	const offset = pagina <= 0 ? 0 : pagina * limite;

	try {

		const instancias = await entity.findAll({ limit: limite, offset: offset,
			include:[
				{model:enderecos},
				{
					model: exposicao,
					include:[
						{
							model:produtos_fisicos
						},
						{
							model:produtos_digitais
						}
					]
				},
				{model:statusModel}
			],
			where:{
				usuario_id
			}
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
//Atualiza uma instancia da entidade.
exports.atualizarStatus = async (id, status_id) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			const updated = await entity.update({status_id:status_id}, { where: { id: instancia.id }});
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
