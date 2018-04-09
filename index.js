const express = require('express');

const app = express();


app.get('/', function(req, res) {
	console.log('route /')
	res.send('Random Dice Bot1')
});



const serverPort = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || process.env.WEB_PORT || 8080;
const serverIp = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || process.env.IP || '127.0.0.1';

app.listen(serverPort, serverIp, function() {
	console.log('Server listening on ' + serverIp + ':' + serverPort);
});

