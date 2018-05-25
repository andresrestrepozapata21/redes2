var socket;
var username;
var escribiendo;
var usuarios=[];

$(document).ready(function() {
	$("#login").click( login );
	$("#enviar-msj").click( enviarChat );
	$("#mensaje").keydown( estaEscribiendo );
});

function login(){
	username = $("#username").val()

	usuarios[usuarios.lenght]=username; 

	if(username!=""){
		$("#username-form").hide()
		$("#chats-form").show()
		conectarSocket();	
	}
}

function conectarSocket(){
	socket = io();	
	cargarMensajes();	
}

function enviarChat(){
	if(socket){		
		var valor = $("#mensaje").val();

		if(valor!=""){
			socket.emit('sendchat', {username:username, msg:valor} );
			$("#mensaje").val('');
		}
	}
	return false;
}

function cargarMensajes(){
	socket.on('sendchat', function(msg){
		$("#mensajes").append('<li>'+msg.username+": "+msg.msg+'</li>');
	});

	socket.on('disconnect', function(id_user){
		console.log("Desconectado")
	});

	socket.on('istyping', function(data){
		$("#escribiendo").html('<span>'+data.username+" está escribiendo..."+'</span>')
	});	

	socket.on('isnottyping', function(msg){
		$("#escribiendo").html('')
	});	
}

function estaEscribiendo(e){
	if(e.which != 13) {
		clearTimeout(escribiendo);
		socket.emit('istyping', username );
		if( $("#mensaje").val ){
			escribiendo = setTimeout(terminoEscribir, 1000);			
		}
	}
}

function terminoEscribir(){
	socket.emit('isnottyping', username );
}

function listarUsuarios(){
	$
}