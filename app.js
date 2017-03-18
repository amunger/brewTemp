'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Server listening on port %d', port);
});

app.use(express.static(__dirname + '/public'));

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
	var timestamp = Date.now();
	console.log(req.params.temp + ' temp received at ' + timestamp);
    var reading = {time: timestamp, temp: req.params.temp};
	readings.push(reading);
	io.sockets.emit('reading', reading);
	res.send('ok')
});
