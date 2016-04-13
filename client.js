var PORT = 8000;
var HOST = 'localhost';
var tls = require('tls');
var fs = require('fs');
var ca = fs.readFileSync('./ca.key');
var key = fs.readFileSync('./test.key');
var cert = fs.readFileSync('./test.crt');

var options = { 
		ca: [fs.readFileSync('./server.key')], 
		cn: [HOST],
		key: key,
		cert: cert,
		passphrase: '1234',
		rejectUnauthorized: false,
	      };
var client = tls.connect(PORT, HOST, options, function() {
    if (client.authorized) {
        
        console.log('Connected and authorized\n');
        
        client.on('close', function() {
            console.log('Closing Socket...\n');
            process.exit();
        });
        
        process.stdin.pipe(client);
        process.stdin.resume();
        
        // Time to make some request to the server
        // We will write straight to the socket, but recommended way is to use a client library like 'request' or 'superagent'
        client.write('GET /Pepe HTTP/1.1\r\n');
        client.write('\r\n');
        
        client.write('POST /bleh HTTP/1.1\r\n');
        client.write('\r\n');

    }
    else {
        console.log('HTTPS Authentication failed\n');
        process.exit();
    }
});
client.setEncoding('utf8');
client.on('data', function(data) {
    console.log('-------------');
    console.log(data);
});
