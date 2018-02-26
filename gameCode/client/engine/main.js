var framecount;

var level;
var player;
var enemies;
var bullets = {};
var blocks;

var charCodes = {65:"left", 87:"up", 68:"right", 83:"down", 32:"transform", 27:"pause", };

var pressing = {"left":0, "up":0, "right":0, "down":0, "transform":0, "shoot":0, };

var functions = {"up": jump}

document.onkeydown() {
	
	pressing[charCodes[event.keyCode]] = 1;
	
}


var update = function() {
	frameCount++;
	
	for (var key in pressing) {
		if (pressing[key]) {
			functions[key]();
		}
	}
	
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
	
	for (var key in enemyList) {
		
		var enemy = enemyList[key];
		//if enemy near player:
		
		var isColliding = enemy.testCollision(player);
		if (isColliding) {
			
			if (
			player_momentum = player.vx * player.mass;
			
		}
		
	}
	
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
	//player.draw();
	//enemies = level["enemies"];
	//bullets = level["bullets"];
	//blocks = level["terrain"];
	frameCount = 0;
	
	setInterval(update, 60)
}

var endGame = function() {
	
}