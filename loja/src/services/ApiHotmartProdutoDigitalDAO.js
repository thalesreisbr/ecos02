const fetch = require('node-fetch');
const Mail= require('../utils/Mailer');
const database = require("../config/database");
const IniciarModels = require("../models/init-models");
const { produtos_digitais: entity } = IniciarModels(database);

exports.adicionaSeNaoExistir =  async (produtoDigital) => {
    try {
        const produto_digital = await entity.create(produtoDigital);
        return produto_digital;
    } catch (error) {
        console.log(error);
        return error;
    }

};   
exports.getAllProducts = async (access_token) => {
    var URL = process.env.URL_API_HOTMART+'/product/rest/v2/'+'';;
    
    
    var options = {
        method: 'get',
        headers: { 
                    'Content-Type': 'application/json',
                    'Authorization':"Bearer "+access_token
                },
    };
    
    var result = await fetch(URL,options)
                .then(res => res.json())
                .catch(error => { throw error});
    

    
    return result;
    
};
exports.rota = async (access_token) => {
    var URL = process.env.URL_API_HOTMART+'/affiliation/rest/v2/';
    
    
    var options = {
        method: 'get',
        headers: { 
                    'Content-Type': 'application/json',
                    'Authorization':"Bearer "+access_token
                },
    };
    
    var result = await fetch(URL,options)
                .then(res => res.json())
                .catch(error => { throw error});
    

    
    return result;
    
};
exports.getAffiliations = async(access_token)=>{
    var URL = process.env.URL_API_HOTMART+'/affiliation/rest/v2/';
    
    
    var options = {
        method: 'get',
        headers: { 
                    'Content-Type': 'application/json',
                    'Authorization':"Bearer "+access_token
                },
    };
    
    var result = await fetch(URL,options)
                .then(res => res.json())
                .catch(error => { throw error});
    

    
    return result;
    
};