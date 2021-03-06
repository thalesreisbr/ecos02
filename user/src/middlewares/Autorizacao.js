const status = require('http-status');
const JWT = require('jsonwebtoken');
const {getPrivateKey,getRefreshKey,getRecoveryKey} = require('../config/keys');
const UsuarioController = require('../controllers/UsuarioController');

//Realiza a checagem da validade do token
exports.AUTH = async (request, response, next) => {
    const auth = request.headers.authorization;
    const privateKey = await getPrivateKey();
    
    //Verifica se existe uma autorização no header
    if (!auth)
        return response.status(status.UNAUTHORIZED).send({ erro: 'Nenhum token foi passado.' });

    
    const parts = auth.split(' ');

    //Verifica se o token possui duas partes
    if (!parts.length === 2)
        return response.status(status.UNAUTHORIZED).send({ erro: 'Token quebrado.' });

        
    const [prefix, token] = parts;

    //Verifica se o token possui o prefixo Bearer
    if(!/^Bearer$/i.test(prefix))
        return response.status(status.UNAUTHORIZED).send({ erro: 'Erro no formato do token.'});

        
    responseBody = {};
    try {
        
        let decoded = JWT.verify(token, privateKey, { algorithms: ['ES256'] });
        responseBody.administrador_id = decoded.administrador_id;
        responseBody.is_administrador = decoded.is_administrador;
        responseBody.perfil_id = decoded.perfil_id;
        
        //Para usuario alem de o token ser valido no jwt ele também tem que estar no banco popis só pode ter um token(usuario logado) por cada usuario
        if(!decoded.is_administrador){
            if(!(await UsuarioController.verifyToken(token, decoded.administrador_id)))
                return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido, outra pessoa logou nessa conta'});
        }
        return response.status(200).send({"payload": responseBody, msg:"Usuario Autorizado"});
    } catch (error) {
        return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido!', error });
    }
};
exports.ADM = async (request, response, next) => {
    const auth = request.headers.authorization;
    const privateKey = await getPrivateKey();

    //Verifica se existe uma autorização no header
    if (!auth)
        return response.status(status.UNAUTHORIZED).send({ erro: 'Nenhum token foi passado.' });

    const parts = auth.split(' ');

    //Verifica se o token possui duas partes  
    if (!parts.length === 2)
        return response.status(status.UNAUTHORIZED).send({ erro: 'Token quebrado.' });

    const [prefix, token] = parts;

    //Verifica se o token possui o prefixo Bearer
    if(!/^Bearer$/i.test(prefix))
        return response.status(status.UNAUTHORIZED).send({ erro: 'Erro no formato do token.'});

    try {
        console.log(token);
        let decoded = JWT.verify(token, privateKey, { algorithms: ['ES256'] });
        request.administrador_id = decoded.administrador_id;
        request.is_administrador = decoded.is_administrador;
        request.perfil_id = decoded.perfil_id;

        //Para usuario alem de o token ser valido no jwt ele também tem que estar no banco popis só pode ter um token(usuario logado) por cada usuario
        if(!decoded.is_administrador){
            return response.status(200).send({msg:"Usuario Autorizado"});
        }else{
            return response.status(403).send({msg:"Somente administrador pode acessar"});

        }
    } catch (error) {
        return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido!', error });
    }
}
//Realiza a checagem da validade do refresh_token, caso ele exista
exports.REFRESH = async (request, response, next) => {
    const auth = request.headers.authorization;
    
    //Verifica se existe um refresh_token no header
    if (!auth) return next()
    
    const parts = auth.split(' ');
    
    //Verifica se o refresh_token possui duas partes
    if (!parts.length === 2)
    return response.status(status.UNAUTHORIZED).send({ erro: 'refresh_token quebrado.' });
    
    const [prefix, refresh_token] = parts;
    
    //Verifica se o refresh_token possui o prefixo Bearer
    if(!/^Bearer$/i.test(prefix))
    return response.status(status.UNAUTHORIZED).send({ erro: 'Erro no formato do refresh_token.'});
    
    try {
        const refreshKey = await getRefreshKey();
        let decoded = JWT.verify(refresh_token, refreshKey, { algorithms: ['ES256'] });
        request.refresh_token = refresh_token;
        return next();
    } catch (error) {
        request.refresh_token = undefined;
        return next();
    }
};
//Realiza a checagem da validade do refresh_token, caso ele exista
exports.RECOVERY = async (request, response, next) => {
    const recovery_token = request.headers.recovery_token;
    
    //Verifica se existe um token no header
    if (!recovery_token) return response.status(status.BAD_REQUEST).send({ erro: 'Nenhum token foi passado.' });
    
    try {
        const recoveryKey = await getRecoveryKey();
        let decoded = JWT.verify(recovery_token, recoveryKey, { algorithms: ['ES256'] });
        request.body.email = decoded.email;
        return next();
    } catch (error) {
        return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido!', error });
    }
};

