const status = require("http-status");
const DAO = require('../services/ImagemDAO');

//Adiciona uma nova instancia da entidade.
exports.adicionar = async (request, response, next) => {
	try {
		
		let files = request.files;
		let body =[];
		//esse cont é utilizado para pegar a primeira interação do map que no caso no cadastro a imagem que vier é a destaque
		let cont =0;
		let verifica  = await DAO.verificaSeExisteImagemDestaque(request.query);
		files.map((file)=>{
			if(!cont && verifica){
				body.push({
					curso_id:request.query.curso_id,
					aula_id:request.query.aula_id,
					destaque: true,
					url :"/arquivos/"+file.key
				});	
			}else{
				body.push({
					curso_id:request.query.curso_id,
					aula_id:request.query.aula_id,
					destaque: false,
					url :"/arquivos/"+file.key
				});
				
			}
			cont++;
		})
		
		const instancia = await DAO.adicionar(body);
		return (instancia ? response.status(status.CREATED).send(instancia) : response.status(status.BAD_REQUEST).send());

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
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Atualiza uma instancia da entidade.
exports.atualizar = async (request, response, next) => {
	try {

		const updated_id = await DAO.atualizar(request.params.id, request.body)
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
//Exclui uma instancia da entidade.
exports.excluirVarias = async (request, response, next) => {
	try {

		const deleted_id = await DAO.excluirVarias(request.body.imagens)
		return (deleted_id ? response.status(status.OK).send( deleted_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};