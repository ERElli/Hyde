require('./Database');

var express = require('express');
var app = express();
var serv = require('http').Server(app);

var user ;

app.get('/test', function (req, res) {
  res.sendfile(__dirname + '/levelEditor/test.html');
});

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/client/gameMenu.html',function(req, res) {
    res.sendFile(__dirname + '/client/gameMenu.html');
});
//for interface
app.get('/client/engine/usable.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/usable.js');
});
app.get('/client/interface/Animation.js',function(req, res) {
    res.sendFile(__dirname + '/client/interface/Animation.js');
});
app.get('/client/interface/index.html',function(req, res) {
    res.sendFile(__dirname + '/client/interface/index.html');
});

app.get('/client/engine/entity.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/entity.js');
});
app.get('/client/engine/main.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/main.js');
});
app.get('/client/engine/enemy.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/enemy.js');
});
app.get('/client/engine/weapon.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/weapon.js');
});
app.get('/client/engine/player.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/player.js');
});
app.get('/client/interface/GUI.js',function(req, res) {
    res.sendFile(__dirname + '/client/interface/GUI.js');
});

app.get('/client/interface/img/worldOneBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/worldOneBackground.png');
});

app.get('/client/interface/img/worldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/worldTwoBackground.png');
});

app.get('/client/interface/img/worldThreeBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/worldThreeBackground.png');
});

app.get('/client/interface/img/ovingCharacter.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/ovingCharacter.png');
});

app.get('/client/interface/img/bigGuy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/bigGuy.png');
});

app.get('/client/interface/img/enemy1.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/enemy1.png');
});

app.get('/client/interface/img/enemy2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/enemy2.png');
});

app.get('/client/interface/img/enemy3.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/enemy3.png');
});

app.get('/client/interface/img/pistolWeapon.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/pistolWeapon.png');
});

app.get('/client/interface/img/assaultWeapon.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/assaultWeapon.png');
});

app.get('/client/interface/img/swordWeapon.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/swordWeapon.png');
});

app.get('/client/interface/img/bullet.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/bullet.png');
});

app.get('/client/interface/img/movingCharacter.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/movingCharacter.png');
});
////////////////

//for level editor
app.get('/Checkpoint.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Checkpoint.js');
});
app.get('/levelEditor',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/levelEditor.html');
});
app.get('/Map.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Map.js');
});
app.get('/Rectangle.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Rectangle.js');
});
app.get('/Terrain.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Terrain.js');
});
app.get('/levelEditor/Terrain.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Terrain.js');
});
app.get('/Enemy.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Enemy.js');
});

app.get('/LevelEditorStyling.css',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/LevelEditorStyling.css');
});

app.get('/client/interface/images.js',function(req, res) {
    res.sendFile(__dirname + '//client/interface/images.js');
});

///////////////
app.get('/client/interface/img/terrain/terrain3x2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x2.png');
});
app.get('/client/interface/img/bear.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/bear.png');
});
app.get('/client/interface/img/shotgun.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/shotgun.png');
});

app.get('/images/placeCheckpoint.png',function(req, res) {
    res.sendFile(__dirname + '/images/placeCheckpoint.png');
});

app.get('/images/enemy2.png',function(req, res) {
    res.sendFile(__dirname + '/images/enemy2.png');
});

app.get('/images/enemy1.png',function(req, res) {
    res.sendFile(__dirname + '/images/enemy1.png');
});

app.get('/images/worldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/images/worldTwoBackground.png');
});
app.get('/images/music3Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/music3Drop.png');
});

app.get('/images/music2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/music2Drop.png');
});

app.get('/images/enemy3Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/enemy3Drop.png');
});

app.get('/images/music1Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/music1Drop.png');
});

app.get('/images/world1Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/world1Drop.png');
});
app.get('/images/enemy1Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/enemy1Drop.png');
});

app.get('/images/enemy2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/enemy2Drop.png');
});

app.get('/images/world2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/world2Drop.png');
});

app.get('/images/world3Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/world3Drop.png');
});

app.get('/images/3x2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/3x2Drop.png');
});

app.get('/images/3x2BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/3x2BDrop.png');
});

app.get('/images/3x4BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/3x4BDrop.png');
});

app.get('/images/3x4Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/3x4Drop.png');
});

app.get('/images/3x6Drop.png',function(req, res) {
    res.sendFile(__dirname + '/images/3x6Drop.png');
});

app.get('/images/3x6BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/3x6BDrop.png');
});

app.get('/images/pistolDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/pistolDrop.png');
});

app.get('/images/assaultDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/assaultDrop.png');
});

app.get('/images/swordDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/swordDrop.png');
});

app.get('/images/shottyDrop.png',function(req, res) {
    res.sendFile(__dirname + '/images/shottyDrop.png');
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

app.get('/images/weaponButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/weaponButton.png');
});
app.get('/images/backgroundButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/backgroundButton.png');
});
app.get('/client/interface/img/terrain/breakableTerrain3x4.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableTerrain3x4.png');
});
app.get('/client/interface/img/terrain/terrain3x4.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x4.png');
});
app.get('/client/interface/img/terrain/breakableTerrain3x2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableTerrain3x2.png');
});
app.get('/client/interface/img/inf.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/inf.png');
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

app.get('/images/terrain3x2.png',function(req, res) {
    res.sendFile(__dirname + '/images/terrain3x2.png');
});

app.get('/images/breakableTerrain3x2.png',function(req, res) {
    res.sendFile(__dirname + '/images/breakableTerrain3x2.png');
});

app.get('/images/terrain3x4.png',function(req, res) {
    res.sendFile(__dirname + '/images/terrain3x4.png');
});
app.get('/images/breakableTerrain3x4.png',function(req, res) {
    res.sendFile(__dirname + '/images/breakableTerrain3x4.png');
});

app.get('/images/terrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/images/terrain3x6.png');
});
app.get('/images/breakableTerrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/images/breakableTerrain3x6.png');
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

  socket.on('forgotPassword',function(data){

   Database.isUsernameTaken(data,function(res){
    if(res){
      console.log("true");

    //  });
    }
    else {

    }

  });
});

  socket.on('updateLevel',function(data){
   Database.levelUpdate(user, data);
  });

  socket.on('getLevelObject',function(data){
   Database.getLevelObject(data, function(res){
    console.log(res);

    socket.emit('receiveLevelObjects', res);
   });

  });

  socket.on('saveLevel',function(data){
   Database.levelSave(data);
  });

  socket.on('loadLevel', function(data){
  console.log("jello");

  });

  Database.getLevelObject("level 1", function(res){
socket.emit('hey', res);
   });


  socket.on('addLevelItem',function(data){
    console.log("x:"+data.x);
   Database.addLevelItem(data);
  });

  socket.on('deleteLevelItem',function(data){
   Database.deleteLevelItem(data);
  });

});


// socket.emit('saveLevel',{username:signDivUsername.value,password:signDivPassword.value});
