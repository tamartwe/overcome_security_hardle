const fs = require('fs');
const path = require('path');

const superSecret = process.env.SECRET;

const getSecret = () => {
    return superSecret;
}


module.exports.getSecret = getSecret;