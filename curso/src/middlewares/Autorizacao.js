const status = require('http-status');
const fetch  = require('node-fetch');

exports.AUTH = async (request, response, next) => {
    const auth = request.headers.authorization;

    console.log(auth);
    console.log(process.env.API_USER_ENDPOINT + "/api/auth");
    res = await fetch(process.env.API_USER_ENDPOINT + "/api/auth", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'authorization':auth
                },
    });
    console.log(res);
    const result = await res.json();
    request.payload = result.payload;
    if(res.status == 200){
        return next();

    }else{
        return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido!' });
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
        console.log(process.env.API_USER_ENDPOINT + "/api/auth");
       res = await fetch(process.env.API_USER_ENDPOINT + "/api/auth/adm", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'authorization':"Bearer "+token
                    },
        });
        const result = await res.json();
        request.payload = result.payload;
        return next();
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
        
        return next();
    } catch (error) {
        request.refresh_token = undefined;
        return next();
    }
};

