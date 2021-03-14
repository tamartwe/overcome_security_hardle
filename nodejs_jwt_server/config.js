const fs = require('fs');
const path = require('path');

const superSecret = fs.readFileSync('./secret.txt').toString();  

const getSecret = () => {
    return superSecret;
}


module.exports.getSecret = getSecret;
