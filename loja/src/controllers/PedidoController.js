/* /* Controller <exemplo>
 * Loja-ESCOS12
 * Dev:  
 * Desc.: Controlador de todas as funções relacionadas à entidade "exemplo"
 */

const status = require("http-status");
const DAO = require('../services/PedidoDAO');

//Adiciona uma nova instancia da entidade.
exports.adicionar = async (request, response, next) => {
	try {

		const instancia = await DAO.adicionar(request.body);
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

//Busca por uma instancia da entidade.
exports.usuarioBuscarUm = async (request, response, next) => {
	try {

		const instancia = await DAO.UsuarioBuscarUm(request.params.id);

		//Administrador id pode ser
		if(!request.is_administrador && request.administrador_id!=instancia.usuario_id){
			return response.status(status.BAD_REQUEST).send({msg: 'Usuario Não pode buscar o pedido de outro usuario'});
		}
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};
//Busca por uma instancia da entidade.
exports.buscaPeloUsuarioID = async (request, response, next) => {
	if(!request.is_administrador && request.administrador_id!=request.params.id){
		return response.status(status.BAD_REQUEST).send({msg: 'Usuario Não pode buscar os pedidos de outro usuario'});
	}
	let { limite, pagina } = request.query;

	try {
		const instancias = await DAO.buscarTudoPeloUsuarioID(limite, pagina,request.params.id)
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Busca todas as instancias da entidade.
exports.buscarTudo = async (request, response, next) => {
	let { limite, pagina } = request.query;

	try {
		const instancias = await DAO.buscarTudo(request.query)
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
    let updated_id = null;

	try {
		// Se for Administrador operador que é o perfil=2
		if(request.body.status_id && request.perfil_id!=1){
			updated_id = await DAO.atualizarStatus(request.params.id, request.body.status_id)
		}else{
			updated_id = await DAO.atualizar(request.params.id, request.body)
		}
		return (updated_id ? response.status(status.OK).send( updated_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};

//Exclui uma instancia da entidade.
exports.excluir = async (request, response, next) => {
	if(request.perfil_id!=1){   
        return response.status(status.BAD_REQUEST).send({msg: 'Adminstrador com esse perfil não pode excluir esse pedido.'});
    }
	try {

		const deleted_id = await DAO.excluir(request.params.id)
		return (deleted_id ? response.status(status.OK).send( deleted_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};
