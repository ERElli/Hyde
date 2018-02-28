var framecount;

var level;
var player;
var enemies;
var bullets = {};
var blocks;

var charCodes = {65:"left", 87:"jump", 68:"right", 83:"crouch", 32:"transform", 27:"pause", };

var pressing = {"left":0, "jump":0, "right":0, "crouch":0, "transform":0, "shoot":0, };

var functions;

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

var update = function() {
	frameCount++;
	player.attackCounter++;
	
	for (var key in pressing) {
		if (pressing[key]) {
			button_functions[key]();
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
	
	for (var key in enemies) {
		
		var enemy = enemies[key];
		//if enemy near player:
		
		enemy.attackCounter++;
		
		var isColliding = enemy.testCollision(player);
		if (isColliding) {
			//momentum check
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
	button_functions = {"jump": player.jump, "transform": player.transform, "shoot": player.shoot, };
	//player.draw();
	//enemies = level["enemies"];
	//bullets = level["bullets"];
	//blocks = level["terrain"];
	frameCount = 0;
	
	setInterval(update, 60)
}

var endGame = function() {
	
}