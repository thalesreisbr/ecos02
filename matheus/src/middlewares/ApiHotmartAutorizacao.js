const fetch = require('node-fetch');

exports.ACCESS_TOKEN = async (req, res, next) => {
    var URL = 'https://api-sec-vlc.hotmart.com/security/oauth/token?';
    URL = URL + 'grant_type=client_credentials'+'&client_id='+process.env.CLIENT_ID+'&client_secret='+process.env.CLIENT_SECRET;
    var options = {
        method: 'post',
        headers: { 
                    'Authorization':process.env.BASIC
                },
    };

    var result = await fetch(URL,options)
                .then(res => res.json())
                .catch(error => { throw error});
    req.access_token =  result.access_token;
    next();

};