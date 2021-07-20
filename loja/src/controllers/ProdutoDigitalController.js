const status = require("http-status");
const fetch  = require('node-fetch');

exports.buscarUm = async (request, response, next) => {
	try {
		console.log(process.env.API_CURSO_ENDPOINT + "/api/curso/" + request.params.id,)

		let res = await fetch(process.env.API_CURSO_ENDPOINT + "/api/curso/" + request.params.id, {
            method: 'GET',
        });
		const instancia = await res.json();
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

exports.buscarTudo = async (request, response, next) => {
	let { limite, pagina } = request.query;

	try {
		console.log(process.env.API_CURSO_ENDPOINT + "/api/curso/" + request.params.id,)

		let res = await fetch(process.env.API_CURSO_ENDPOINT + "/api/curso"+"?limite:"+limite+"&pagina:"+pagina , {
            method: 'GET',
        });
		const instancia = await res.json();
		return response.status(status.OK).send(instancia);

	} catch (error) {
		next(error);
	}
};

exports.buscarTudoSemPaginacao = async (request, response, next) => {
	try {

		let res = await fetch(process.env.API_CURSO_ENDPOINT + "/api/curso/", {
            method: 'GET',
        });
		const instancia = await res.json();
		return response.status(status.OK).send(instancia);


	} catch (error) {
		next(error);
	}
};
