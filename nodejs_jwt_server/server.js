const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


const port = process.env.PORT || 8080;

//Signup API
app.post('/generate_token', async (req, res) => {
  const secret = config.getSecret();
  const token = jwt.sign({ id: req.username }, secret, { expiresIn: 60 * 60 * 24 * 30 });
  return res.send({ auth: true, token: token });

});

//Login API
app.post('/authenticate',async (req,res) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  const secret = config.getSecret();
  jwt.verify(token, secret, function(err, decoded) {
    if (err)  { 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    return res.status(200).send(decoded);
  });
});

app.listen(port);
