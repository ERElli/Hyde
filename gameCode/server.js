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
//Sound file
app.get('/client/interface/sounds.js',function(req, res) {
    res.sendFile(__dirname + '/client/interface/sounds.js');
});
app.get('/client/interface/img/background/worldOneBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldOneBackground.png');
});


app.get('/images/loadlevelbutton.png',function(req, res) {
    res.sendFile(__dirname + '/images/loadlevelbutton.png');
});
app.get('/images/newlevelbutton.png',function(req, res) {
    res.sendFile(__dirname + '/images/newlevelbutton.png');
});

app.get('/client/interface/img/background/worldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldTwoBackground.png');
});
app.get('/client/interface/img/entity/humanoid/movingCharacter.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/movingCharacter.png');
});

app.get('/client/interface/img/entity/humanoid/bigGuy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/bigGuy.png');
});
app.get('/client/interface/img/entity/humanoid/basicEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/basicEnemy.png');
});
app.get('/client/interface/img/entity/humanoid/flyingEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/flyingEnemy.png');
});
app.get('/client/interface/img/entity/weapon/pistolAttack.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/weapon/pistolAttack.png');
});
app.get('/client/interface/img/entity/weapon/assaultAttack.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/weapon/assaultAttack.png');
});

app.get('/client/interface/img/entity/weapon/swordAttack.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/weapon/swordAttack.png');
});

app.get('/client/interface/img/entity/weapon/shotgunAttack.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/weapon/shotgunAttack.png');
});
app.get('/client/interface/img/entity/weapon/shotgunAttack.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/weapon/shotgunAttack.png');
});
app.get('/client/interface/img/terrain/block.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/block.png');
});


app.get('/client/interface/img/background/worldThreeBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldThreeBackground.png');
});

app.get('/client/interface/level.json',function(req, res) {
    res.sendFile(__dirname + '/client/interface/level.json');
});
app.get('/client/interface/jsonTest.js',function(req, res) {
    res.sendFile(__dirname + '/client/interface/jsonTest.js');
});

app.get('/client/interface/img/ovingCharacter.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/ovingCharacter.png');
});

app.get('/client/interface/img/bigGuy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/bigGuy.png');
});

app.get('/client/interface/img/entity/basicEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/basicEnemy.png');
});
app.get('/client/interface/img/entity/bigGuy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/bigGuy.png');
});

app.get('/client/interface/img/entity/flyingEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/flyingEnemy.png');
});
app.get('/client/interface/img/entity/movingCharacter.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/flyingEnemy.png');
});
app.get('/EntityFactory.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/EntityFactory.js');
});
app.get('/levelEditor/EntityFactory.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/EntityFactory.js');
});

app.get('/testLevel.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/testLevel.js');
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
app.get('/client/interface/img/placeCheckpoint.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/placeCheckpoint.png');
});

app.get('/client/interface/img/movingCharacter.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/movingCharacter.png');
});
////////////////

//for level editor
app.get('/Checkpoint.js',function(req, res) {
    res.sendFile(__dirname + '/levelEditor/Checkpoint.js');
});

app.get('/client/level.html',function(req, res) {
    res.sendFile(__dirname + '/client/level.html');
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
    res.sendFile(__dirname + '/client/interface/images.js');
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
app.get('/client/interface/img/entity/humanoid/playerSmall.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/playerSmall.png');
});


app.get('/client/interface/img/entity/bullet.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/bullet.png');
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

app.get('/client/interface/img/entity/humanoid/smallPlayer.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/smallPlayer.png');
});
app.get('/client/interface/img/entity/bullet2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/bullet2.png');
});

app.get('/client/interface/img/Animations/muzzleFlash/FlashStage1.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/Animations/muzzleFlash/FlashStage1.png');
});

app.get('/client/interface/img/Animations/muzzleFlash/FlashStage2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/Animations/muzzleFlash/FlashStage2.png');
});
app.get('/client/interface/img/Animations/muzzleFlash/FlashStage3.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/Animations/muzzleFlash/FlashStage3.png');
});
app.get('/client/interface/img/Animations/muzzleFlash/FlashStage4.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/Animations/muzzleFlash/FlashStage4.png');
});


app.get('client/interface/img/terrain/1x6BreakableBuilding.png',function(req, res) {
    res.sendFile(__dirname + 'client/interface/img/terrain/1x6BreakableBuilding.png');
});
app.get('client/interface/img/terrain/1x6BreakableBuildingAnimation.png',function(req, res) {
    res.sendFile(__dirname + 'client/interface/img/terrain/1x6BreakableBuildingAnimation.png');
});

app.get('/images/background.png',function(req, res) {
    res.sendFile(__dirname + '/images/background.png');
});
//Sound files
app.get('/client/interface/soundFX/checkpoint.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/checkpoint.wav');
});
app.get('/client/interface/soundFX/transform.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/transform.wav');
});
app.get('/client/interface/soundFX/WinGame.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/WinGame.wav');
});
//world background music
app.get('/client/interface/soundFX/atmospheric/worldOne.mp3',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/atmospheric/worldOne.mp3');
});
app.get('/client/interface/soundFX/atmospheric/worldTwo.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/atmospheric/worldTwo.wav');
});
app.get('/client/interface/soundFX/atmospheric/worldThree.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/atmospheric/worldThree.wav');
});
//Weapon sounds
app.get('/client/interface/soundFX/weaponEffects/assaultRifle.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/weaponEffects/assaultRifle.wav');
});
app.get('/client/interface/soundFX/weaponEffects/pistol.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/weaponEffects/pistol.wav');
});
app.get('/client/interface/soundFX/weaponEffects/shotgun.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/weaponEffects/shotgun.wav');
});
app.get('/client/interface/soundFX/weaponEffects/sword.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/weaponEffects/sword.wav');
});
app.get('/client/interface/soundFX/weaponEffects/weaponPickup.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/weaponEffects/weaponPickup.wav');
});
//Player Soundeffects
app.get('/client/interface/soundFX/playerSounds/deathSound.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/playerSounds/deathSound.wav');
});
app.get('/client/interface/soundFX/playerSounds/smallPlayer/smallHurt.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/playerSounds/smallPlayer/smallHurt.wav');
});
app.get('/client/interface/soundFX/playerSounds/smallPlayer/smallJump.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/playerSounds/smallPlayer/smallJump.wav');
});
app.get('/client/interface/soundFX/playerSounds/bigPlayer/bigJump.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/playerSounds/bigPlayer/bigJump.wav');
});
app.get('/client/interface/soundFX/playerSounds/bigPlayer/bigHurt.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/playerSounds/bigPlayer/bigHurt.wav');
});
app.get('/client/interface/soundFX/weaponEffects/weaponPickup.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/weaponEffects/weaponPickup.wav');
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

    //var levelN ="not working";

    socket.on('newLevel',function(data){
      //levelN = data.level;
      console.log(data.level);
     //socket.emit('changeLevelName', {level: data.level});
     Database.newLevel(data);
     change(data.level);




      /* if(!res){
         socket.emit('checkLevelName', {success:false});
       }
       else if(res){
         socket.emit('checkLevelName', {success:true});
       }
       */
   });
  var change = function (levelNa){


   socket.emit('gee', {level:levelNa});
 };


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
          Database.checkAnswer(data,function(result){
            if(result){
              socket.emit('recoverResponse',{success:true, password: result.password});
              console.log("verified");
            }
            else{
              console.log("not correct a1");
            }
          });
        }
        else {
          socket.emit('recoverResponse',{success:false});
          console.log("Username does not exist");

        }

      });
  });

/*  socket.on('getLevelNames',function(){
   //Database.levelUpdate(user, data);
   socket.emit('receiveLevelNames', {level1:"level 1",level2: "level 2", level3:"level 3"});
  });

  */

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
var state;
  socket.on('load', function(data){

    //console.log("uuuuu");
    socket.emit('changeMe');
    //Database.getLevelObject("level1", function(res){

  });

  socket.on('do', function(){
    console.log("helo let");

  });


  Database.getLevelObject("level1", function(res){
    console.log("hhhhh");
    socket.emit('loadIt', res);
   });





  //Database.getLevelObject("level1", function(res){
  //socket.emit('hey', res);
//   });

   socket.on('button',function(data){
     console.log('data.level');
     Database.getLevelObject(data.level, function(res){
     socket.emit('result', res);
      });
   });
  socket.on('addLevelItem',function(data){
    console.log(data);
   Database.addLevelItem(data);
  });
  socket.on('addPlayerItem',function(data){
    console.log(data);
   Database.addPlayerItem(data);
  });
  socket.on('addTerrainItem',function(data){
    console.log(data);
   Database.addTerrainItem(data);
  });

  socket.on('deleteLevelItem',function(data){
    console.log(data);
   Database.deleteLevelItem(data);
  });
  socket.on('deletePlayerItem',function(data){
    console.log(data);
   Database.deletePlayerItem(data);
  });
  socket.on('deleteTerrainItem',function(data){
    console.log(data);
   Database.deleteTerrainItem(data);
  });

  /*socket.on('deleteLevelItem',function(data){
   Database.deleteLevelItem(data);
 }); */



});


// socket.emit('saveLevel',{username:signDivUsername.value,password:signDivPassword.value});
