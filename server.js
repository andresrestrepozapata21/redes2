var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);

var server = app.listen(8090, function(){
	console.log('Servidor iniciado en el puerto 8090');
});

var io = require('socket.io').listen(server);
var conectados = []

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res	
		.status(200)
		.sendFile( path.join(__dirname, 'public', 'index.html') );
});

app.get('/hola', function (req, res) {
	res.send('¡Hola mundo!');
});



io.on('connection', function(socket){	
	console.log('Usuario conectado');
	socket.on('sendchat', function(data){
	//Enviar a todos
	io.emit('sendchat', data);
	});

	socket.on('disconnect', function(){
	console.log("disconnect")
	});

	socket.on('istyping', function(username){
		//enviar a todos menos al emisor
		socket.broadcast.emit('istyping', {username:username} );	
	});

	socket.on('isnottyping', function(msg){
		//enviar a todos menos al emisor
		socket.broadcast.emit('isnottyping', msg );
	});

});
