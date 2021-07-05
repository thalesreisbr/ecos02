/* /* Controller <Exposicao>
 * Loja-ESCOS12
 * Dev:  
 * Desc.: Controlador de todas as funções relacionadas à entidade "Exposicao"
 */

const status = require("http-status");
const DAO = require('../services/ExposicaoDAO');


//Adiciona uma nova instancia da entidade podendo fazer o relacionamento com imagens produtos fisicos, digitais.
exports.adicionar = async (request, response, next) => {
	try {
		if(request.body.ativo && request.body.destaque){
			const instancia = await DAO.adicionar(request.body);

			return (instancia ? response.status(status.CREATED).send({exposicao_id:instancia.id}) : response.status(status.BAD_REQUEST).send());
		}else{
			return response.status(status.BAD_REQUEST).send();
		}
	} catch (error) { 
		next(error);  
	}
};

//Busca por uma instancia da entidade.
exports.alterarStatus = async (request, response, next) => {
	try {

		const instancia = await DAO.alterarStatus(request.params.id,request.params.status);
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};
//Busca por uma instancia da entidade.
exports.alterarImagemDestaque = async (request, response, next) => {
	try {

		const instancia = await DAO.alterarImagemDestaque(request.params.id,request.params.imgId);
		console.log(instancia);
		return (instancia ? response.status(status.OK).send({imagem_destaque:instancia}) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

//Busca por uma instancia da entidade.
exports.buscarUm = async (request, response, next) => {
	try {

		const instancia = await DAO.buscarUm(request.params.id)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

//Busca todas as instancias da entidade.
exports.buscarTudo = async (request, response, next) => {
	let { limite, pagina } = request.query;

	try {
		const instancias = await DAO.buscarTudo(limite, pagina)
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.buscarTudoSemPaginacao = async (request, response, next) => {
	try {

		const instancias = await DAO.buscarTudoSemPaginacao();

		let produto_digital=[];
		let produto_fisico=[];
		let kit_produto_fisico=[];
		let kit_produto_digital=[];
		let kit_produto_digital_e_produto_fisico=[];
		
		await instancias.map(async (element) => {
			
			if(element.produtos_digitais.length == 1 && element.produtos_fisicos.length == 0){
				produto_digital.push(element);
			}else
			if(element.produtos_digitais.length > 1 && element.produtos_fisicos.length == 0){
				kit_produto_digital.push(element);
			}else
			if(element.produtos_fisicos.length == 1 && element.produtos_digitais.length == 0){
				produto_fisico.push(element);
			}else
			if(element.produtos_fisicos.length > 1 && element.produtos_digitais.length == 0){
				kit_produto_fisico.push(element);
			}else 
			kit_produto_digital_e_produto_fisico.push(element);
		});

		return response.status(status.OK).send({produto_digital,produto_fisico,kit_produto_digital,kit_produto_fisico,kit_produto_digital_e_produto_fisico});

	} catch (error) {
		next(error);
	}
};

//Atualiza uma instancia da entidade.
exports.atualizar = async (request, response, next) => {
	try {

		const updated_id = await DAO.atualizar(request.params.id, request.body);
		
		return (updated_id ? response.status(status.OK).send( updated_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};

//Exclui uma instancia da entidade.
exports.excluir = async (request, response, next) => {
	try {

		const deleted_id = await DAO.excluir(request.params.id)
		return (deleted_id ? response.status(status.OK).send( deleted_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};
