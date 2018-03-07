require('./Database');

var express = require('express');
var app = express();
var serv = require('http').Server(app);


app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");


var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');

    socket.on('signIn',function(data){ //{username,password}
  		Database.isValidPassword(data,function(res){
  			if(!res)
  				return socket.emit('signInResponse',{success:false});
  			Database.getPlayerProgress(data.username,function(progress){
  			//Player.onConnect(socket,data.username,progress);
  			socket.emit('signInResponse',{success:true});
  			})
  		});
	  });

    socket.on('signUp',function(data){
		 Database.isUsernameTaken(data,function(res){
			if(res){
				socket.emit('signUpResponse',{success:false});
			} else {
				Database.addUser(data,function(){
					socket.emit('signUpResponse',{success:true});
				});
			}
		});
	});

});
