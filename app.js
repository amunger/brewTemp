'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Server listening on port %d', port);
});

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

var readings = [];

io.sockets.on('connection', function(socket){
	console.log('client connected');
	readings.forEach(function(reading){
		socket.emit('reading', reading);
	});
});

app.get('/temp/:temp', function(req, res){
	console.log('temp received');
	var reading = {time: Date.now(), temp: req.params.temp};
	readings.push(reading);
	io.sockets.emit('reading', reading);
	res.send('ok')
});
	
