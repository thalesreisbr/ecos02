const status = require("http-status");
const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { default: SignJWT } = require('jose/jwt/sign')
const {getPrivateKey,getRecoveryKey} = require("../config/keys");
const DAO = require('../services/UsuarioDAO');
const mailer= require('../utils/Mailer');
const {cpf} = require('cpf-cnpj-validator');


exports.cadastrarSemLogin = async (request, response, next) => {
	const credenciais = request.body;
    //Verifica se os dados de cadastro estão completos
	if (!credenciais || !credenciais.name || !credenciais.email || !credenciais.password)
        return response.status(status.BAD_REQUEST).send({msg: 'Dados insuficientes.'});
    if(await DAO.buscarPeloEmail(credenciais.email)){
        return response.status(status.CONFLICT).send({msg: 'Email já existente.'});
    }
    const salt = await bcrypt.genSalt();
    credenciais.password = await bcrypt.hash(credenciais.password, salt);

	try {

		const instancia = await DAO.cadastrar(credenciais);
		return (instancia ? response.status(status.CREATED).send({usuario_id:instancia.id}) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};
//Adiciona uma nova instancia da entidade.
exports.cadastrar = async (request, response, next) => {
	const credenciais = request.body;
    //Verifica se os dados de cadastro estão completos
	if (!credenciais || !credenciais.nome || !credenciais.email || !credenciais.password)
        return response.status(status.BAD_REQUEST).send({msg: 'Dados insuficientes.'});

    if(await DAO.buscarPeloEmail(credenciais.email)){
        return response.status(status.CONFLICT).send({msg: 'Email já existente.'});
    }
    
    const salt = await bcrypt.genSalt();
    credenciais.password = await bcrypt.hash(credenciais.password, salt);

	try {

		let instancia = await DAO.cadastrar(credenciais);
        
        const payload = { 
            administrador_id: instancia.id,
            is_administrador:false,
            perfil_id:0
        };
		const privateKey = await getPrivateKey();
        const token = await new SignJWT(payload)
		.setProtectedHeader({alg: 'ES256'})
		.sign(privateKey);
        await DAO.atualizarToken(instancia.id, token);

        instancia = await DAO.buscarUm(instancia.id);

        return (instancia ? response.status(status.CREATED).send({usuario:instancia,token}) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};

//Realiza o autencicação do usuário, fornecendo-lhe o token caso seja um usuário autêntico.
exports.autenticar = async (request, response, next) => {
    const { email, password } = request.body;
    let credenciais;
	try {
        
        //Busca pelas credenciais de um operador e verifica se foi encontrado. 
        credenciais = await DAO.buscarCredenciais(email);
        if(!credenciais) return response.status(status.NOT_FOUND).send({ msg: 'Credenciais incorretas.' }); 

        //Compara a password preenchidas com a password cadastrada
        const isValid = await bcrypt.compare(password, credenciais.password);
        if(!isValid) return response.status(status.NOT_FOUND).send({ msg: 'Credenciais incorretas...' });
    

        //Esta inserido perfil_id =0 porque nao existe perfil para usuario, permissoes estao relacionada mais direta com administradores
        //Insere o id do operador na carga do token
		const payload = { 
            administrador_id: credenciais.id,
            is_administrador:false,
            perfil_id:0
        };

        //Busca a chave para gerar o token
		const privateKey = await getPrivateKey();

		const token = await new SignJWT(payload)
		.setProtectedHeader({alg: 'ES256'})
		.sign(privateKey);

        //Atualiza o refresh_token do operador
        await DAO.atualizarToken(credenciais.id, token);
        const usuario = await DAO.buscarUm(credenciais.id);

        //Responde a requisição de autenticação com o token de acesso
		return response.status(status.ACCEPTED).send({usuario, token });


	} catch (error) {
		next(error);
	}
};

//Busca por uma instancia da entidade.
exports.buscarUm = async (request, response, next) => {
    //Essa comparação é que caso seja um usuario ele pode buscar só por ele mesmo e nao outros usuarios do sistema

    if(request.administrador_id != request.params.id && !request.is_administrador){
        return response.status(status.BAD_REQUEST).send({msg: 'Usuário só pode pesquisar ele mesmo'});
    }

	try {

		const instancia = await DAO.buscarUm(request.params.id)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};
//Busca por uma instancia da entidade.
exports.buscarPeloEmail = async (request, response, next) => {

	try {

		const instancia = await DAO.buscarPeloEmail(request.params.email)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};



//Verifica se o token é do usuario que está logado no banco
exports.verificaToken = async (token,id) => {

	try {
		let result  = await DAO.verificaToken(token, id);
        
        
        return (result) ? true : false;
	} catch (error) {
        console.log(error);
		throw error;
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
	const credenciais = request.body;
    let usuario;
    
    if(cpf.isValid(credenciais.cpf) || credenciais.cpf)
        return response.status(status.BAD_REQUEST).send({msg: 'Cpf inválido.'});

    if(request.administrador_id != request.params.id && !request.is_administrador){
        return response.status(status.BAD_REQUEST).send({msg: 'Usuário só pode pesquisar ele mesmo'});
    }
    if(request.body.password){
        return response.status(status.BAD_REQUEST).send({msg: 'Não é permetido atualizar a password por aqui'});
    }
    try {
        
    	if (!credenciais){
            return response.status(status.BAD_REQUEST).send({msg: 'Dados insuficientes.'});
        }
        usuario = await DAO.atualizar(request.params.id,credenciais)

        return (usuario ? response.status(status.OK).send( usuario ) : response.status(status.NOT_FOUND).send());
		
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
//Apagar apenas alguns campos.
exports.excluirParcialmente = async (request, response, next) => {
	try {

		const deleted_id = await DAO.excluirParcialmente(request.params.id)
		return (deleted_id ? response.status(status.OK).send( deleted_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};


//Dado um e-mail existente no sistema, retorna um token de recuperação de password
exports.recuperarSenha =  (request, response, next) => {
    const { email } = request.body;

    try {
        DAO.buscarPeloEmail(email)
            .then(async (usuario) => {
                if (!usuario)
                   return response.status(status.NOT_FOUND).send({ error: 'Usuário não encontrado.' });
                   
                const privateKey = await getRecoveryKey();
                token_antigo = await DAO.buscarTokenRecuperacao(usuario.id);

                // Está validação tem o objetivo de que o usuario não fique mandando varios email caso o token dele ainda esteja válida
                // 
                let is_valid_created_a_new_token =true;
                if(token_antigo){
                    try{
                        await JWT.verify(token_antigo, privateKey, { algorithms: ['ES256'] });
                        is_valid_created_a_new_token = false;
                    }catch(err){
                        is_valid_created_a_new_token = false;
                    }
                    
                        
                }

                if(!is_valid_created_a_new_token){
                    return response.status(status.CONFLICT).send({ error: 'Verifique seu email, pois ja foi enviado o token e ele se encontra valido' });
                }else{

                    const nome = usuario.nome;

                    const recoveryToken = await new SignJWT({
                        id: usuario.id,
                        email: usuario.email,
                        nome: usuario.nome
                    })
                    .setProtectedHeader({alg: 'ES256'})
                    .setExpirationTime('0.5h')
                    .sign(privateKey);
    
                    await DAO.atualizarTokenRecuperacao(usuario.id,recoveryToken);
    
    
                    //E-mail para redefinição de password
                    mailer.sendMail({
                        to: email,
                        from: ' ',
                        subject: 'Vixting - Redefinição de password',
                        template: 'recuperacaoSenhaUsuario',
                        context: { recoveryToken, nome },
                    }, (error) => {
                        if (error) {
                            console.log(error);
                            response.status(status.BAD_REQUEST).send({ error: 'Não foi possível enviar o e-mail de recuperação. Por favor, tente mais tarde.' })
                        } else {
                            response.status(status.OK).send({ messagem: `E-mail de recuperação enviado para ${email}` })
                        }
                    });
                }

                
            })
            .catch((error) => next(error));
    } catch (error) {
        response.status(status.BAD_REQUEST).send({ error: 'Erro ao recuperar password. Por favor, tente novamente.' })
    }
}
 

//Verifica se o token de recuperação pertence ao usuário e se ele é válido. Caso seja, realiza a troca da password.
exports.redefinirSenha = (request, response, next) => {
    const { email, password } = request.body;
    try {
        DAO.buscarPeloEmail(email).then(async (usuario) => {
            if (!usuario)
               return response.status(status.NOT_FOUND).send({ error: 'Usuário não encontrado.' });
            if(usuario.token_recovery == ""){
                return response.status(status.UNAUTHORIZED).send({ msg: 'A password já foi alterada uma vez, emita um novo token para senhar ser alterada'});
            }      
            try {
                const salt = await bcrypt.genSalt();
                
                DAO.atualizarSenha(usuario.id,await bcrypt.hash(password, salt))
                    .then(() => {

                        //E-mail para aviso de seja redefinida
                        const nome = usuario.nome;
                        mailer.sendMail({
                            to: email,
                            from: ' ',
                            subject: 'Vixting - Sua senha foi redefinida!',
                            template: 'recuperacaoSenhaUsuarioConfirmado',
                            context: { nome },
                        })

                        response.status(status.OK).send({ messagem: `Senha redefinida!` });
                    })
                    .catch((error) => next(error));
                DAO.atualizarTokenRecuperacao(usuario.id,null);
            
            } catch (error) {
                return response.status(status.UNAUTHORIZED).send({ error: 'Token Invalido!' });
            }
        })
    } catch (error) {
        response.status(status.BAD_REQUEST).send({ error: 'Erro ao redefinir a senha. Por favor, tente novamente.' })
    }
} 
