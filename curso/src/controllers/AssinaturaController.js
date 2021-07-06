const status = require("http-status");
const DAO = require('../services/AssinaturaDAO');
const cursoDAO = require('../services/cursoDAO');

//Adiciona uma nova instancia da entidade.
exports.adicionar = async (request, response, next) => {
	try {

		const instancia = await DAO.adicionar(request.body);
		return (instancia ? response.status(status.CREATED).send(instancia) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};
exports.adicionarAPartirDoProdutoDigitalEUsuario  = async (request, response, next) =>{
    const {usuario_id, produto_digital_id} = request.body;
    const produto_digital =await cursoDAO.buscarUm(produto_digital_id);
    let data_aquisicao = new Date();
    let data_validade = new Date(data_aquisicao.getFullYear(),data_aquisicao.getMonth(),data_aquisicao.getDay()+produto_digital.validade);
    console.log(data_validade);
    const assinatura_body = {
        usuario_id,
        curso_id,
        status_id:1,
        data_aquisicao,
        data_validade
    };
    const instancia = await DAO.adicionar(assinatura_body);
	
    return (instancia ? response.status(status.CREATED).send({assinatura_id:instancia.id}) : response.status(status.BAD_REQUEST).send());

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
