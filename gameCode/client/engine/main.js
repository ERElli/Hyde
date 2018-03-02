var framecount;

var level;
var player;
var enemies;
var bullets = {};
var blocks;
var sufaceMods;

var charCodes = {65:"left", 87:"jump", 68:"right", 83:"crouch", 32:"transform", 27:"pause", };

var pressing = { "left": 0, "right":0, "jump":0, "crouch":0, "transform":0, "shoot":0, };

document.onkeydown = function(event) {
	pressing[charCodes[event.keyCode]] = 1;
}

document.onkeyup = function(event) {
	pressing[charCodes[event.keyCode]] = 0;
}

document.onmousedown = function(mouse) {
	pressing["shoot"] = 1;
}

document.onmouseup = function(mouse) {
	pressing["shoot"] = 0;
}


var doPressedActions = function() {
	
	if (pressing['left']) {
		player.vx = -5;
	}
	else if (pressing['right']) {
		player.vx = 5;
	}
	else {
		player.vx = 0;
	}
	
	if (pressing['jump']) {
		if (!player.isJumping) {
			player.jump();
		}
	}
	
	if (pressing['crouch']) {
		player.crouch();
	}
	
	if (pressing['transform']) {
		player.transform();
	}
	
	if (pressing['shoot']) {
		player.shoot();
	}
}

var update = function() {
	frameCount++;
	player.attackCounter++;
	
	doPressedActions();
	
	if (player.isJumping) {
		console.log("is jumping: " + player.jumpTimer);
		player.jumpTimer++;
		if (player.jumpTimer > 50 && !player.isFalling) {
			player.vx = -5;
			player.isFalling = true;
			console.log("Starting fall");
		}
		if (player.jumpTimer >= 100) {
			player.isFalling = false;
			player.isJumping = false;
			player.vy = 0;
			console.log("Ending jump");
		}
	}
	else if (!player.isFalling) {
		player.vy = 0;
	}
	
	
	/*
	for (var key in bullets) {
	
		var bullet = bullets[key];
		
		//if bullet near player
		
		//bullet.timer++;
		bullet.update();
		
		toRemove = false;
	
		for (var key2 in enemies) {
			var isColliding = bullet.testCollision(enemies[key2]);
			if (isColliding) {
				toRemove = true;
				
				//reduce enemy health, maybe apply effect (like knockback)
				
				//remove dead enemies when looping over them
				delete enemies[key2];
				break;
			}	
		}
		
		var isColliding = bullet.testCollision(player);
		if (isColliding) {
			toRemove = true;
			
			//reduce player health
		}
		
		if(toRemove){
			bullet.remove();
			delete bullets[key];
		}
	}
	
	for (var key in enemies) {
		
		var enemy = enemies[key];
		//if enemy near player:
		
		enemy.attackCounter++;
		
		var isColliding = enemy.testCollision(player);
		if (isColliding) {
			//momentum check
		}
		
	}
	*/
	player.update();
}

var testCollision = function(rect1, rect2) {
	return rect1.x <= rect2.x+rect2.width 
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}

var startGame = function(initial_level) {
	level = initial_level;
	player = level["player"];
	//enemies = level["enemies"];
	//bullets = level["bullets"];
	//blocks = level["terrain"];
	//surfaceMods = level["terrain"];
	frameCount = 0;
	
	setInterval(update, 60)
}

var endGame = function() {
	
}