const status = require("http-status");
const database = require("../config/database");
const {Op, where} = require("sequelize");
const IniciarModels = require("../models/init-models");
const { exposicao: entity,imagens:imagens_entity,produtos_digitais:produtos_digitais,exposicao_produtos_digitais:exposicao_produtos_digitais, exposicao_produtos_fisicos:exposicao_produtos_fisicos,produtos_fisicos:produtos_fisicos} = IniciarModels(database);

//Adiciona uma exposicao adiciona, imagens relacionda a ela e também produtosDigitais ou produtosFisicos .
exports.adicionar = async (body) => {
	try {
		var instancia;
		const trasaction = await database.transaction(async(t)=>{
			 instancia = await entity.create(body);

			if(body.produtos_fisicos){
				const exposicao_produtos_fisicos_body =  body.produtos_fisicos.map((produto) =>{
					return {
						exposicao_id:instancia.id,
						produto_fisico_id: produto.id,
						quantidade:produto.quantidade
					} 
				})
				await exposicao_produtos_fisicos.bulkCreate(exposicao_produtos_fisicos_body,{
					updateOnDuplicate: ['quantidade'], trasaction:t
				})
			}
			
			if(body.produtos_digitais){
				const exposicao_produtos_digitais_body = body.produtos_digitais.map((curso) =>{
					return {exposicao_id:instancia.id,produto_digital_id: curso}});
					await exposicao_produtos_digitais.bulkCreate(exposicao_produtos_digitais_body,{trasaction:t});
			}	
		})
		return (instancia ? instancia : null);
		

	} catch (error) { 
		throw error; 
	}
};
//Busca por uma instancia da entidade.
exports.buscarUm = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include:[	
				{
					model:produtos_fisicos,
					include:{
						model:imagens_entity,
					}
					
				},
				{
					model:produtos_digitais,
					include:{
						model:imagens_entity,
					}
				
				},
				{
					model:imagens_entity,
					
				}
				

			],
			order: [ 
				[imagens_entity,'produto_fisico_id', "DESC"],
				[imagens_entity,'produto_digital_id', "DESC"],
			]

		});
		return (instancia ? instancia : null);

	} catch (error) { 
		throw error;
	}
};

//Busca por uma instancia da entidade.
exports.alterarStatus = async (id,ativo) => {
	try {

		const instancia = await entity.findByPk(id);
		if(instancia){
			
			const updated = await entity.update({ativo:ativo}, { where: { id: instancia.id }});
		}else{
			return null;
		}
		return {updated_id:instancia.id}

	} catch (error) {
		throw error;
	}
};

//Busca todas as instancias da entidade junto com produtos e suas imagens e imagens de exposicao
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

		const instancias = await entity.findAll({include:[	
			{
				model:produtos_fisicos,
				include:{
					model:imagens_entity,
				}
			},
			{
				model:produtos_digitais,
				include:{
					model:imagens_entity,
				}
			},
			{
				model:imagens_entity,
			}],
			limit: limite, offset: offset });
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

		const instancias = await entity.findAll({include:[	
			{
				model:produtos_fisicos
			},
			{
				model:produtos_digitais
			
			},
			{
				model:imagens_entity,
			}]});
		return instancias;

	} catch (error) {
		 throw error;
	}
};

//Atualiza uma exposica, podendo excluir imagens ou o relacionamento produtosDigitais e Fisicos
//Também adicionar Imgaens ou fazer novos relacionamentos produtos digitais e fisicos.
exports.atualizar = async (id, body) => {
	try {
	
			const instancia = await entity.findByPk(id);
			if(instancia){
				const trasaction = await database.transaction(async(t)=>{
					const updated = await entity.update(body, { where: { id: instancia.id }});
					//produtosFisicos vem como o objeto :[{produto_fisico_id:1,quantidade:3},{produto_fisico_id:1,quantidade:3}]
					if(body.produtos_fisicos){
						const exposicao_produtos_fisicos_body =  body.produtos_fisicos.map((produto) =>{
							return {
								exposicao_id:instancia.id,
								produto_fisico_id: produto.id,
								quantidade:produto.quantidade
							} 
						})
						await exposicao_produtos_fisicos.bulkCreate(exposicao_produtos_fisicos_body,{
							updateOnDuplicate: ['quantidade'], trasaction:t
						})
					}
					if(body.deleted_produtos_fisicos){
						body.deleted_produtos_fisicos.map(async (produtoId)=>{
							await exposicao_produtos_fisicos.destroy({
								where:{
									exposicao_id:instancia.id,
									produto_fisico_id: produtoId
								},
								trasaction:t
							});
						});
					}
					if(body.produtos_digitais){
						const exposicao_produtos_digitais_body = body.produtos_digitais.map((curso) =>{
							return {exposicao_id:instancia.id,produto_digital_id: curso}});
							await exposicao_produtos_digitais.bulkCreate(exposicao_produtos_digitais_body,{ignoreDuplicates:true,trasaction:t});
					}
					if(body.deleted_produtos_digitais){
						body.deleted_produtos_digitais.map(async (cursoId)=>{
							await exposicao_produtos_digitais.destroy({
								where:{
									exposicao_id:instancia.id,
									produto_digital_id: cursoId
								},
								trasaction:t 
							});
						});
					}
				})
				
				return {updated_id:instancia.id}
			}else{
				return null;
			}
			
		
	} catch (error) {
		throw error;
	}
};


exports.alterarImagemDestaque = async (exposicao_id, imagem_id) => {
	try {

		const trasaction = await database.transaction(async(t)=>{
			await imagens_entity.update({destaque:false},{where:{exposicao_id},trasaction:t});
			await imagens_entity.update({destaque:true},{where:{id:imagem_id},trasaction:t});
		
		});
		console.log(trasaction);
		return imagem_id;
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
