require('./Database');

var express = require('express');
var app = express();
var serv = require('http').Server(app);

var user ;

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/client/gameMenu.html',function(req, res) {
    res.sendFile(__dirname + '/client/gameMenu.html');
});

app.get('/levelEditor',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/levelEditor.html');
});
app.get('/gameCode/levelEditor/Map.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Map.js');
});
app.get('/gameCode/levelEditor/Rectangle.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Rectangle.js');
});
app.get('/gameCode/levelEditor/Terrain.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Terrain.js');
});

app.get('/images/enemiesButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/enemiesButton.png');
});
app.get('/images/musicButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/musicButton.png');
});
app.get('/images/checkPointButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/checkPointButton.png');
});
app.get('/images/characterButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/characterButton.png');
});

app.get('/images/terrainButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/terrainButton.png');
});

app.get('/images/scientistMain.png',function(req, res) {
    res.sendFile(__dirname + '/images/scientistMain.png');
});

app.get('/images/playStory.png',function(req, res) {
    res.sendFile(__dirname + '/images/playStory.png');
});

app.get('/images/playOnline.png',function(req, res) {
    res.sendFile(__dirname + '/images/playOnline.png');
});
app.get('/images/levelEditor.png',function(req, res) {
    res.sendFile(__dirname + '/images/levelEditor.png');
});

app.get('/images/achievements.png',function(req, res) {
    res.sendFile(__dirname + '/images/achievements.png');
});

app.get('/images/weaponButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/weaponButton.png');
});
app.get('/images/backgroundButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/backgroundButton.png');
});
app.get('/images/background.png',function(req, res) {
    res.sendFile(__dirname + '/images/background.png');
});
app.get('/images/buildingTerrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/images/buildingTerrain3x6.png');
});
app.use('/',express.static('CS4770'));
//app.use('/levelEditor',express.static(__dirname + '/levelEditor'));
serv.listen(2000);
console.log("Server started.");


var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){

    console.log('socket connection');

    socket.on('signIn',function(data){ //{username,password}


  		Database.isValidPassword(data,function(res){
  			if(!res)
  				return socket.emit('signInResponse',{success:false});
        user = data.username;
        console.log(user);
  		  Database.getPlayerProgress(data.username,function(progress){
          console.log(progress);
  			//Player.onConnect(socket,data.username,progress);
  			socket.emit('signInResponse',{success:true});
        socket.emit('levels',progress);
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

  socket.on('updateLevel',function(data){
   Database.levelUpdate(user, data);
  });

  socket.on('saveLevel',function(data){
   Database.levelSave(data);
  });

  socket.on('deleteLevelItem',function(data){
   Database.deleteLevelItem(data);
  });

});


// socket.emit('saveLevel',{username:signDivUsername.value,password:signDivPassword.value});
