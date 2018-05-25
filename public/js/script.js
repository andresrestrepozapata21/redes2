var socket;
var username;
var escribiendo;
var usuarios=[];
var script,total;


$(document).ready(function() {
	$("#login").click( login );
	$("#enviar-msj").click( enviarChat );
	$("#mensaje").keydown( estaEscribiendo );
});

function login(){
	username = $("#username").val() 

	if(username!=""){
		if(usuarios.lenght==0){
			usuarios[usuarios.lenght]=username;
			$("#username-form").hide()
			$("#chats-form").show()
			conectarSocket();
			console.log("ingreso con el array en 0");
		}
		else{
			usuarios[usuarios.lenght]=username;
			$("#username-form").hide()
			$("#chats-form").show()
			conectarSocket();
			console.log("ingreso y lleno el array ya con datos");
		}
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
			var fecha = new Date();
			var hora = fecha.getHours();
			var minutos = fecha.getMinutes();
			var segundos = fecha.getSeconds();
			script= hora+":"+minutos+":"+segundos;
			total=script;
			socket.emit('sendchat', {username:username, msg:valor, total:total} );
			$("#mensaje").val('');
		}
	}
	return false;
}

function cargarMensajes(){
	socket.on('sendchat', function(msg){
			
		$("#mensajes").append('<li>'+msg.username+": "+msg.msg+"-----------------Hora:"+msg.total+'</li>');
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