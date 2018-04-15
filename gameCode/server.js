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
app.get('/client/gameMenu2.html',function(req, res) {
    res.sendFile(__dirname + '/client/gameMenu2.html');
});
//for interface
app.get('/client/engine/usable.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/usable.js');
});
app.get('/client/engine/controls.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/controls.js');
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



/*
	CLIENT/INTERFACE/IMG FILES
*/

//client/interface/img
app.get('/client/interface/img/inf.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/inf.png');
});
app.get('/client/interface/img/goalFlag.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/goalFlag.png');
});
app.get('/client/interface/img/level_complete.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/level_complete.png');
});
app.get('/client/interface/img/placeCheckpoint.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/placeCheckpoint.png');
});

//client/interface/img/animations
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
app.get('/client/interface/img/Animations/transformAnimation.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/Animations/transformAnimation.png');
});

//client/interface/img/background
app.get('/client/interface/img/background/worldOneBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldOneBackground.png');
});
app.get('/client/interface/img/background/worldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldTwoBackground.png');
});
app.get('/client/interface/img/background/worldThreeBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldThreeBackground.png');
});
app.get('/client/interface/img/terrain/topSpikeTrap.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/topSpikeTrap.png');
});
app.get('/images/worldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/background/worldTwoBackground.png');
});
app.get('/images/newWorldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/newWorldTwoBackground.png');
});

//client/interface/img/entity
app.get('/client/interface/img/entity/bullet.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/bullet.png');
});
app.get('/client/interface/img/entity/bullet2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/bullet2.png');
});
app.get('/client/interface/img/entity/boulderThrow.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/boulderThrow.png');
});


//client/interface/img/entity/humanoid
app.get('/client/interface/img/entity/humanoid/basicEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/basicEnemy.png');
});
app.get('/client/interface/img/entity/humanoid/bigGuy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/bigGuy.png');
});
app.get('/client/interface/img/entity/humanoid/flyingEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/flyingEnemy.png');
});
app.get('/client/interface/img/entity/humanoid/shieldEnemy.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/shieldEnemy.png');
});
app.get('/client/interface/img/entity/humanoid/smallPlayer.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/entity/humanoid/smallPlayer.png');
});

//client/interface/img/entity/weapon
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

//client/interface/img/terrain
app.get('/client/interface/img/terrain/1x6BreakableBuilding.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/1x6BreakableBuilding.png');
});
app.get('/client/interface/img/terrain/block.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/block.png');
});
app.get('/client/interface/img/terrain/breakableBlock.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableBlock.png');
});
app.get('/client/interface/img/terrain/breakableBuildingAnimation.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableBuildingAnimation.png');
});
app.get('/client/interface/img/terrain/breakableTerrain3x2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableTerrain3x2.png');
});
app.get('/client/interface/img/terrain/breakableTerrain3x4.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableTerrain3x4.png');
});
app.get('/client/interface/img/terrain/breakableTerrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/breakableTerrain3x6.png');
});
app.get('/client/interface/img/terrain/terrain3x2.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x2.png');
});
app.get('/client/interface/img/terrain/terrain3x4.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x4.png');
});
app.get('/client/interface/img/terrain/terrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x6.png');
});
app.get('/client/interface/img/terrain/terrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x6.png');
});
app.get('/client/interface/img/terrain/terrain3x6.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/terrain3x6.png');
});
app.get('/client/interface/img/terrain/platform.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/platform.png');
});


app.get('/images/loadlevelbutton.png',function(req, res) {
    res.sendFile(__dirname + '/images/loadlevelbutton.png');
});
app.get('/images/newlevelbutton.png',function(req, res) {
    res.sendFile(__dirname + '/images/newlevelbutton.png');
});
app.get('/client/interface/level.json',function(req, res) {
    res.sendFile(__dirname + '/client/interface/level.json');
});
app.get('/client/interface/jsonTest.js',function(req, res) {
    res.sendFile(__dirname + '/client/interface/jsonTest.js');
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



app.get('/client/interface/img/levelEditor/buttons/checkpoint/checkpointDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/checkpoint/checkpointDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/checkpoint/checkpointFinishDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/checkpoint/checkpointFinishDrop.png');
});


app.get('/client/interface/img/levelEditor/buttons/enemy/basicEnemyDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/enemy/basicEnemyDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/enemy/flyingEnemyDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/enemy/flyingEnemyDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/enemy/shieldEnemyDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/enemy/shieldEnemyDrop.png');
});


app.get('/client/interface/img/levelEditor/buttons/music/music1Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/music/music1Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/music/music2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/music/music2Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/music/music3Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/music/music3Drop.png');
});


app.get('/client/interface/img/levelEditor/buttons/world/world1Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/world/world1Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/world/world2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/world/world2Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/world/world3Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/world/world3Drop.png');
});

app.get('/client/interface/img/levelEditor/buttons/terrain/1x1Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/1x1Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/1x1BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/1x1BDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/3x2Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/3x2Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/3x2BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/3x2BDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/3x4BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/3x4BDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/3x4Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/3x4Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/3x6Drop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/3x6Drop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/3x6BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/3x6BDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/1x6BDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/1x6BDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/topSpikeDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/topSpikeDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/platformDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/platformDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/iceDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/iceDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/terrain/mudDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/terrain/mudDrop.png');
});


app.get('/client/interface/img/levelEditor/buttons/weapon/pistolDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/weapon/pistolDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/weapon/assaultDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/weapon/assaultDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/weapon/swordDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/weapon/swordDrop.png');
});
app.get('/client/interface/img/levelEditor/buttons/weapon/shottyDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/weapon/shottyDrop.png');
});


app.get('/client/interface/img/levelEditor/buttons/header/bossButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/bossButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/enemiesButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/enemiesButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/musicButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/musicButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/checkPointButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/checkPointButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/characterButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/characterButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/terrainButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/terrainButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/weaponButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/weaponButton.png');
});
app.get('/client/interface/img/levelEditor/buttons/header/backgroundButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/levelEditor/buttons/header/backgroundButton.png');
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

app.get('/images/backgroundButton.png',function(req, res) {
    res.sendFile(__dirname + '/images/backgroundButton.png');
});


app.get('/images/signUpBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/signUpBackground.png');
});

app.get('/images/signUpButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/signUpButton.png');
});

app.get('/images/signInButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/signInButton.png');
});
app.get('/images/signInBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/signInBackground.png');
});
app.get('/images/signUpHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/signUpHover.png');
});
app.get('/images/signInHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/signInHover.png');
});
app.get('/images/smallSignUp.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/smallSignUp.png');
});
app.get('/images/smallSignIn.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/smallSignIn.png');
});
app.get('/images/smallSignUpHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/smallSignUpHover.png');
});
app.get('/images/smallSignInHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/smallSignInHover.png');
});
app.get('/mainStyle.css',function(req, res) {
    res.sendFile(__dirname + '/client/mainStyle.css');
});
app.get('/client/mainStyle.css',function(req, res) {
    res.sendFile(__dirname + '/client/mainStyle.css');
});
app.get('/client/images/playonlineButtonHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/playonlineButtonHover.png');
});
app.get('/client/images/achievementsButtonHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/achievementsButtonHover.png');
});
app.get('/client/images/levelEditorButtonHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/levelEditorButtonHover.png');
});
app.get('/client/images/playStoryButtonHover.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/playStoryButtonHover.png');
});


app.get('/client/images/achievementsButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/achievementsButton.png');
});
app.get('/client/images/newWorldTwoBackground.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/newWorldTwoBackground.png');
});
app.get('/client/images/levelEditorButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/levelEditorButton.png');
});
app.get('/client/images/playOnlineButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/playOnlineButton.png');
});
app.get('/client/images/playStoryButton.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/playStoryButton.png');
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
app.get('/client/interface/soundFX/buildingBreak.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/buildingBreak.wav');
});
app.get('/client/interface/soundFX/enemyDeath.wav',function(req, res) {
    res.sendFile(__dirname + '/client/interface/soundFX/enemyDeath.wav');
});
app.get('/client/interface/storyLevels/LevelOne.json',function(req, res) {
    res.sendFile(__dirname + '/client/interface/storyLevels/LevelOne.json');
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
app.get('/client/interface/img/terrain/modifier/ice.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/modifier/ice.png');
});
app.get('/client/interface/img/terrain/modifier/mud.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/terrain/modifier/mud.png');
});
app.get('/client/interface/img/medals.png',function(req, res) {
    res.sendFile(__dirname + '/client/interface/img/medals.png');
});
app.get('/client/engine/controls.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/controls.js');
});
app.get('/client/images/spikeLeft.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/spikeLeft.png');
});
app.get('/client/images/spikeLeftDrop.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/spikeLeftDrop.png');
});
app.get('/client/images/spikeRight.png',function(req, res) {
    res.sendFile(__dirname + '/client/images/spikeRight.png');
});
app.get('/client/interface/ghostDemo.json',function(req, res) {
    res.sendFile(__dirname + '/client/interface/ghostDemo.json');
});
app.get('/client/interface/testLevel.json',function(req, res) {
    res.sendFile(__dirname + '/client/interface/testLevel.json');
});
app.get('/images/textfieldBackground.png',function(req, res) {
    res.sendFile(__dirname + '/images/textfieldBackground.png');
});
app.get('/client/interface/storyLevels/levelEight.json',function(req, res) {
    res.sendFile(__dirname + '/client/interface/storyLevels/levelEight.json');
});
app.get('/client/engine/timer.js',function(req, res) {
    res.sendFile(__dirname + '/client/engine/timer.js');
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

    socket.on('newLevel',function(data){
      console.log(data.level);
     //socket.emit('changeLevelName', {level: data.level});
     Database.newLevel(data);
      /* if(!res){
         socket.emit('checkLevelName', {success:false});
       }
       else if(res){
         socket.emit('checkLevelName', {success:true});
       }
       */
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
    console.log("i was called");
   Database.levelUpdate(user, data);
  });

  socket.on('getLevelObject',function(data){
   Database.getLevelObjectInterface(data.level, function(res){
    console.log("my result" +res);

    socket.emit('receiveLevelObjects', res);
   });

  });



  socket.on('saveLevel',function(data){
   Database.levelSave(data);
  });



  //Database.getLevelObject("level1", function(res){
  //socket.emit('hey', res);
//   });

   socket.on('button',function(data){
     console.log("console new" +data.level);
     Database.getLevelObject(data.level, function(res){
     socket.emit('result', res);

      });
   });

   socket.on('getTheLevels',function(){
     console.log("getting the levels");
      Database.getLevels( function(res){
        console.log('the levels are'+ res);
        socket.emit('receiveLevels', res);
      });
   });

   socket.on('getTheAchievements',function(){
     console.log("getting the Achievements");
      Database.getPlayerProgress(user, function(res){
        console.log('the Achievements are'+ JSON.stringify(res));
        socket.emit('receiveTheAchievements', res);
      });
   });

   socket.on('getLevels',function(){
     console.log("getting the  2 levels");
      Database.getLevels( function(res){
        console.log('the levels are'+ res);
        socket.emit('receiveTheLevels', res);
      });
   });



   socket.on('levelLoadButton',function(data){
     console.log('levelLoadButtonB'+ data.level);

     Database.getLevelObject(data.level, function(res){
     socket.emit('loadIt', res);
      });
   });

   socket.on('levelNewButton',function(data){
     console.log('levelNewButton');
     Database.getLevelObject(data.level, function(res){
     socket.emit('hey', res);
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
  socket.on('addPlatformItem',function(data){
    console.log(data);
   Database.addPlatformItem(data);
  });

  socket.on('addWeaponItem',function(data){
    console.log(data);
   Database.addWeaponItem(data);
  });
  socket.on('addCheckpointItem',function(data){
    console.log(data);
   Database.addCheckpointItem(data);
  });
  socket.on('addBossItem',function(data){
    console.log(data);
   Database.addBossItem(data);
  });
  socket.on('addSpikeItem',function(data){
    console.log(data);
   Database.addSpikeItem(data);
  });

  socket.on('deleteLevelItem',function(data){
    console.log(data);
   Database.deleteLevelItem(data);
  });

  socket.on('addBackgroundItem',function(data){
    console.log("oooooh" + data.level + data.background);
   Database.addBackgroundItem(data);
  });
  socket.on('deletePlayerItem',function(data){
    console.log(data);
   Database.deletePlayerItem(data);
  });
  socket.on('deleteTerrainItem',function(data){
    console.log(data);
   Database.deleteTerrainItem(data);
  });
  socket.on('deleteCheckpointItem',function(data){
    console.log(data);
   Database.deleteCheckpointItem(data);
  });
  socket.on('deleteWeaponItem',function(data){
    console.log(data);
   Database.deleteWeaponItem(data);
  });
  socket.on('deletePlatformItem',function(data){
    console.log(data);
    console.log('received socket to dlt platform');
   Database.deletePlatformItem(data);
  });
  socket.on('deleteBossItem',function(data){
    console.log(data);
    console.log('received socket to dlt boss');
   Database.deleteBossItem(data);
  });
  socket.on('deleteSpikeItem',function(data){
    console.log(data);
    console.log('received socket to dlt spike');
   Database.deleteSpikeItem(data);
  });
  socket.on('changeMod',function(data){
    console.log(data);
    console.log('received socket to change mod');
   Database.changeMod(data);
  });
  /*socket.on('deleteLevelItem',function(data){
   Database.deleteLevelItem(data);
 }); */



});


// socket.emit('saveLevel',{username:signDivUsername.value,password:signDivPassword.value});
