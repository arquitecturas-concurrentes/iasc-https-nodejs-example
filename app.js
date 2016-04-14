var fs = require('fs');
var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var key = fs.readFileSync('./keys/server.key');
var cert = fs.readFileSync('./keys/server.crt')
var ca = fs.readFileSync('./keys/ca.crt')
var https_options = {
    key: key,
    cert: cert,
    ca: ca,
    agent: false,
    rejectUnauthorized: false,
};
var PORT = 8000;
var HOST = 'localhost';
app = express();

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

app.get('/pepe', function(req, res) {
  res.send('Pepe');	
});

app.get('/algo', function(req, res) {
  res.send('Bleh');	
});

app.post('/echo', function (req, res) {
  res.json(req.body);
});

app.all('/echo/param/:id', function (req, res) {
  res.json({
    param: req.params.id
  });
});

app.post('/echo/headers', function (req, res) {
  res.json(req.headers);
});

app.get('/echo/qs', function (req, res) {
  res.json(req.query);
});

server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

