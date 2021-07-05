/* /* Controller <exemplo>
 * Loja-ESCOS12
 * Dev:  
 * Desc.: Controlador de todas as funções relacionadas à entidade "exemplo"
 */

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
					produto_digital_id:request.query.produto_digital_id,
					exposicao_id:request.query.exposicao_id,
					produto_fisico_id:request.query.produto_fisico_id,
					destaque: true,
					url :"/images/"+file.key
				});	
			}else{
				body.push({
					produto_digital_id:request.query.produto_digital_id,
					exposicao_id:request.query.exposicao_id,
					produto_fisico_id:request.query.produto_fisico_id,
					destaque: false,
					url :"/images/"+file.key
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

exports.adicionarSemUpload = async (request, response, next) => {
	try {
		
		let imagens_id = request.body.imagens_id;
		let exposicao_id = request.body.exposicao_id;
		
		const instancia = await DAO.adicionarSemUpload(imagens_id, exposicao_id);
		return (instancia ? response.status(status.CREATED).send({}) : response.status(status.BAD_REQUEST).send());

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