var canvas = document.getElementById("ctx")

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

document.onmousemove = function(mouse){
	var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
	var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
	
	mouseX -= player.x;
	mouseY -= player.y;
	
	player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * -180;
}


var doPressedActions = function() {
	
	if (pressing['left']) {
		player.ax = -player.acceleration;
		console.log(player.ax);
	}
	else if (pressing['right']) {
		player.ax = player.acceleration;
	}
	else {
		console.log(player.vx);
		if (Math.abs(player.vx) <= 0.5) {
			player.vx = 0;
		}
		player.ax = -Math.sign(player.vx)*player.acceleration/2;
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
		newBullet = player.shoot();
		//console.log(newBullet);
		if (newBullet) {
			bullets[newBullet.id] = newBullet;
		}
	}
}

var onTerrain = function(x, y) {
	if (y >= 450) {
		return true;
	}
}

var inRange = function(thing) {
	len = Math.sqrt( Math.pow(thing.x - player.x, 2) + Math.pow(thing.y - player.y, 2) ) //sqrt(delta_x^2 + delta_y^2)
	return len < gameWidth;
}

var update = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	frameCount++;
	player.attackCounter++;
	player.transformCounter++;
			
	doPressedActions();

	if (player.justJumped) {
		player.ay = g;
		player.justJumped = false;
	}
	else if (onTerrain(player.x, player.y)) {
		player.ay = 0;
		player.vy = 0;
	}
	
	for (var key in bullets) {
	
		var bullet = bullets[key];
		
		if (!inRange(bullet)) {
			continue;
		}
		
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
		
		/*
		var isColliding = bullet.testCollision(player);
		if (isColliding) {
			toRemove = true;
			
			//reduce player health
		}
		*/
		
		if(toRemove){
			delete bullets[key];
		}
	}
	
	for (var key in enemies) {
		
		var enemy = enemies[key];
		
		if (!inRange(bullet)) {
			continue;
		}
		
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
	//enemies = level["enemies"];
	//bullets = level["bullets"];
	//blocks = level["terrain"];
	//surfaceMods = level["terrain"];
	console.log(player.x);
	frameCount = 0;
	
	setInterval(update, 1000/60)
}

var endGame = function() {
	
}