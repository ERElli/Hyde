
var frameCount;

var level;
var player;
var enemies;
var bullets = {};
var terrain;
var sufaceMods;
var pickUps={};
var boulderPickUps = {};


var hasReleasedJump = false;
var hasReleasedCrouch = true;
var paused = false;

var charCodes = {65:"left", 87:"jump", 68:"right", 83:"crouch", 32:"transform",};

var pressing = { "left": 0, "right":0, "jump":0, "crouch":0, "transform":0, "shoot":0 };


document.onkeydown = function(event) {
	pressing[charCodes[event.keyCode]] = 1;
}

document.onkeyup = function(event) {
	if (charCodes[event.keyCode] == "jump") {
		hasReleasedJump = true;
	}
	if (charCodes[event.keyCode] == "crouch") {
		hasReleasedCrouch = true;
	}
	pressing[charCodes[event.keyCode]] = 0;
}

document.onmousedown = function(mouse) {
	var mouseX = mouse.clientX - gui.fg.getBoundingClientRect().left;
	var mouseY = mouse.clientY - gui.fg.getBoundingClientRect().top;

	player.updateAim(mouseX, mouseY);

	pressing["shoot"] = 1;
}

document.onmouseup = function(mouse) {
	pressing["shoot"] = 0;
}

document.oncontextmenu = function(mouse) {
	mouse.preventDefault();
}

/*
* Reset the player's aiming angle when they move the mouse
*/
document.onmousemove = function(mouse){
	var mouseX = mouse.clientX - gui.fg.getBoundingClientRect().left;
	var mouseY = mouse.clientY - gui.fg.getBoundingClientRect().top;

	player.updateAim(mouseX, mouseY);
}

document.onkeypress = function(event) {
	if (event.keyCode == 112) {
		paused = !paused;
	}
}

/*
* Do everything that is pressed, controlled by the 'pressing' dict
*/
var doPressedActions = function() {

	if (pressing['left']) {
		if (!player.isLaunched) {
			player.ax = -player.acceleration;
		}
	}
	else if (pressing['right']) {
		if (!player.isLaunched) {
			player.ax = player.acceleration;
		}
	}
	else {
		if (Math.abs(player.vx) < 2 && !player.isLaunched) {
			//console.log("Stopping");
			player.vx = 0;
		}
		player.ax = -Math.sign(player.vx)*player.acceleration*0.5;
	}

	if (pressing['jump']) {
		if (!player.inAir) {
			console.log("Jumping");
			player.jump();
			hasReleasedJump = false;
		}
		else if (player.jumpBuffer > 10 && !player.doubleJumped && hasReleasedJump) {
			player.jump();
			player.doubleJumped = true;
		}
	}

	/*
	if (pressing['crouch']) {
		if (!player.isCrouching) {
			player.isCrouching = true;
			player.height = player.crouchHeight;
			player.y -= player.height;
		}
		hasReleasedCrouch = false;
	}

	if (hasReleasedCrouch) {
		player.height = player.crouchHeight*2;
		player.isCrouching = false;
	}
	*/

	if (pressing['transform']) {
		player.transform();
	}

	if (pressing['shoot']) {

		if (player.isBig) {
			
			if (player.hasBoulder && player.pickUpBoulderTimer > 10) {
				boulder = player.throwBoulder();
				bullets[boulder.id] = boulder;
			}
			else if (!player.hasBoulder && player.throwBoulderTimer > 10) {
				
				for (var key in boulderPickUps) {

					bp = boulderPickUps[key];

					pickUp_rect = {'x':bp.x-bp.width/2, 'y':bp.y-bp.height/2, 'width':bp.width, 'height':bp.height};

					player_rect = {'x':player.x-player.width/2, 'y':player.y-player.height/2, 'width':player.width, 'height':player.height};

					if (testCollision(player_rect, pickUp_rect)) {
						player.pickUpBoulder();
						delete boulderPickUps[key];
					}
				}
			}				
			player.pickUpBoulderTimer++;
			player.throwBoulderTimer++;
		}

		else {
			newBullets = player.shoot();
			for (i in newBullets) {
				newBullet = newBullets[i];
				if (newBullet) {
					bullets[newBullet.id] = newBullet;
				}
			}
		}
	}
}


/*
* Return true if the given entity is within the renderable radius
*/
var inRange = function(thing) {
	len = Math.sqrt( Math.pow(thing.x - player.x, 2) + Math.pow(thing.y - player.y, 2) ) //sqrt(delta_x^2 + delta_y^2)
	return len < level_width;
}

/*
* Main game loop
*/
var update = function() {

	if (paused) {
		return;
	}

	gui.fg_ctx.clearRect(0, 0, gui.fg.width, gui.fg.height);



	//Update counters
	frameCount++;
	if (frameCount % 10 == 0) {
		everyTenCount++;
	}

	//Draw HUD
	//draws background
	gui.drawMap();
	gui.HUD(gui.gr_ctx,player);


	//Manage player -----------------------------------------------------------------------------------

	if (player.y > 500) {
		player.health = 0;
	}

	if (player.health <= 0) {
		player.reset(0, 0);
	}

	if (player.x >= level_width) {
		endGame();
	}

	player.attackCounter++;
	player.transformCounter++;
	player.immuneCounter++;

	player.falling = true; //set to false if standing on terrain;
	player.blockedLeft = false;
	player.blockedRight = false;


	//Manage terrain (more player below) ---------------------------------------------------------------------------
	for (var key in terrain) {

		block = terrain[key];

		gui.drawTerrain(block,gui.fg_ctx)

		if (!inRange(block)) {
			continue;
		}

		//Check collisions with player ####################################

		if (blockUnderEntity(block, player)) {
			player.falling = false;
			if (!player.justJumped) {
				putOnTerrain(block, player);
			}
		}

		if (player.falling) {
			player.inAir = true;
			player.setAirMotion();
		}


		if (blockLeftEntity(block, player)) {

			if (!block.breakAt) {
				player.x = block.x + block.width+player.xOffset;
				player.blockedLeft = true;
			}

			else {
				if (Math.abs(player.getMomentum()) >= block.breakAt) {
					b = new BoulderPickUp(Math.random(), block.x, block.y, player);
					boulderPickUps[b.id] = b;
					console.log("Creating boulder");
					delete  terrain[key];
				}
				else {
					player.x = block.x + block.width+player.xOffset;
					player.blockedLeft = true;
				}
			}

		}
		if (blockRightEntity(block, player) && player.vx >= 0){

			console.log(block.type);

			if (!block.breakAt) {
				player.x = block.x - player.xOffset;
				player.blockedRight = true;
			}

			else {
				if (Math.abs(player.getMomentum()) >= block.breakAt) {

					b = new BoulderPickUp(Math.random(), block.x, block.y+block.height, player);
					boulderPickUps[b.id] = b;
					console.log("Creating boulder");
					delete  terrain[key];
				}
				else {
					player.x = block.x-player.xOffset;
					player.blockedRight = true;
				}
			}

		}


		if (blockOverEntity(block, player)) {
			player.y = block.y+block.height+player.height/2;
			player.vy = 0;
		}


		//Check collisions with enemies ####################################

		for (var key in enemies) {

			enemy = enemies[key];
			enemy.falling = true;

			if (blockUnderEntity(block, enemy)) {
				enemy.falling = false;
				if (!enemy.justJumped) {
					putOnTerrain(block, enemy);
				}
			}

			if (enemy.falling) {
				enemy.inAir = true;
				enemy.setAirMotion();
			}


			if (blockLeftEntity(block, enemy) && enemy.vx < 0) {
				enemy.x = block.x + block.width+enemy.width/2;
				enemy.vx = 1;
			}
			if (blockRightEntity(block, enemy) && enemy.vx > 0) {
				enemy.x = block.x-enemy.width/2;
				enemy.vx = -1;
			}


			if (blockOverEntity(block, enemy)) {
				enemy.y = block.y+block.height+enemy.height/2;
				enemy.vy = -2;
			}
		}


		// Check collisions with bullets ###############################

		for (var key in bullets) {

			bullet = bullets[key]

			if (bullet.type != 'meleeBullet') {
				if (testCollision(block, {'x':bullet.x-bullet.width/2, 'y':bullet.y-bullet.height/2, 'width':bullet.width, 'height':bullet.height})) {
					delete bullets[key];
				}
			}

		}

	}


	if (player.isLaunched) {
		player.launchTimer++;
		if (player.launchTimer > 25) {
			player.isLaunched = false;
		}
	}

	//Manage player damage immunity
	if (player.isImmune && player.immuneCounter > 100) {
		player.isImmune = false;
	}

	//Do things according to player input (shoot, jump, etc.)
	doPressedActions();


	//Manage whether or not player is in the air

	//Don't put player on the ground if they just jumped (even though they are near terrain)
	if (player.justJumped) {
		player.inAir = true;
		player.jumpBuffer++;
		if (player.jumpBuffer > 20) {
			player.justJumped = false;
		}
	}

	//If they didn't just jump, and they are near terrain, put them on that terrain
	/*
	else if (nearTerrain(player.x, player.y+player.height/2)) {
		player.inAir = false;
		player.doubleJumped = false;
		putOnTerrain(player);
	}
	*/

	//Manage motion type
	if (player.inAir) {
		player.setAirMotion();
	}
	else {
		player.setGroundMotion();
	}

	player.update();



	// Manage pick-ups ------------------------------------------------------------------


	for (var key in pickUps) {

		pickUp = pickUps[key];

		pickUp.draw();

		pickUp_rect = {'x':pickUp.x-pickUp.width/2, 'y':pickUp.y-pickUp.height/2, 'width':pickUp.width, 'height':pickUp.height};

		player_rect = {'x':player.x-player.width/2, 'y':player.y-player.height/2, 'width':player.width, 'height':player.height};

		if (testCollision(player_rect, pickUp_rect)) {
			pickUp.applyEffect();
			delete pickUps[key];
		}

	}
	
	
	for (var key in boulderPickUps) {
		boulderPickUps[key].draw();
	}



	//Manage all the bullets -----------------------------------------------------------------------------------------------------

	for (var key in bullets) {

		var bullet = bullets[key];


		//If the bullet is very far away from the player, just delete it
		if (!inRange(bullet)) {
			delete bullets[key];
		}

		//Update the bullet's position, and re-draw it
		bullet.update();

		//Check if the bullet has hit a humanoid. If so, remove it, and damage the humanoid
		toRemove = false;

		for (var key2 in enemies) {

			var isColliding = bullet.testCollision(enemies[key2]);
			if (isColliding && bullet.ownerID != enemies[key2].id) {

				if (bullet.type == 'bullet') {
					toRemove = true;
				}

				//Enemy takes damage, maybe apply effect (like knockback)
				enemies[key2].takeDamage(bullet.damage);
				break;
			}
		}

		if (bullet.ownerID != player.id) {
			var isColliding = bullet.testCollision(player);
			if (isColliding) {
				if (bullet.type == 'bullet') {
					toRemove = true;
				}
				player.takeDamage(bullet.damage);
			}
		}

		if (bullet.type == 'meleeBullet') {

			bullet.timer++;
			if (bullet.timer > 10) {
				toRemove = true;
			}
		}

		if(toRemove){
			delete bullets[key];
		}
	}

	//Manage all the enemies ----------------------------------------------------------------------------------------

	for (var key in enemies) {

		var enemy = enemies[key];

		if (!inRange(enemy)) {
			continue;
		}

		enemy.update();
		enemy.updateAim(player);

		if (enemy.health <= 0) {
			delete enemies[key];

			if (Math.random() < 0.3) {
				a = new AmmoPickUp(Math.random(), enemy.x, enemy.y, player);
				pickUps[a.id] = a;

			}

		}

		enemy.attackCounter++;

		if (enemy.isLaunched) {
			enemy.launchTimer++;
			if (enemy.launchTimer > 50) {
				enemy.isLaunched = false;
			}
		}


		if (enemy.type == "flying enemy") {
			newBullets = enemy.shoot();
			for (i in newBullets) {
				newBullet = newBullets[i];
				if (newBullet) {
					bullets[newBullet.id] = newBullet;
				}
			}
		}


		var isColliding = enemy.testCollision(player);

		if (isColliding) {

			var enemyDeals = enemy.meleeDamage;
			var playerDeals = 0;

			if (!player.isImmune) {

				if (player.isBig || enemy.type=="tank enemy") {

					player_p = Math.abs(player.getMomentum());
					enemy_p = Math.abs(enemy.getMomentum());

					delta_p = Math.abs(player_p - enemy_p);

					if (player_p > enemy_p) {
						enemy.launch(Math.sign(player.vx)*delta_p/enemy.mass);
						playerDeals += delta_p/150;
					}
					else if (enemy_p > player_p) {
						player.launch(Math.sign(enemy.vx)*delta_p/player.mass);

						enemyDeals += delta_p/150;

					}
					else {
					}

				}

				player.takeDamage(enemyDeals);

			}
			enemy.takeDamage(playerDeals);
		}

	}


}

var blockUnderEntity = function(terrain, entity) {

	terrain_rect = {'x':terrain.x, 'y':terrain.y, 'width':terrain.width, 'height':terrain.height/4};

	entity_rect = {'x':entity.x-entity.xOffset/2, 'y':entity.y+entity.yOffset, 'width':entity.xOffset, 'height':entity.yOffset/2};

	return testCollision(terrain_rect, entity_rect);

}

var blockLeftEntity = function(terrain, entity) {

	entity_rect = {'x':entity.x-entity.xOffset, 'y':entity.y-entity.yOffset/2, 'width':entity.xOffset/2, 'height':entity.yOffset};

	return testCollision(terrain, entity_rect);

}

var blockRightEntity = function(terrain, entity) {

	entity_rect = {'x':entity.x+entity.xOffset, 'y':entity.y-entity.yOffset/2, 'width':entity.xOffset/2, 'height':entity.yOffset};

	return testCollision(terrain, entity_rect);

}

var blockOverEntity = function(terrain, entity) {

	entity_rect = {'x':entity.x-entity.xOffset/2, 'y':entity.y-entity.yOffset, 'width':entity.xOffset, 'height':entity.yOffset/2};

	return testCollision(terrain, entity_rect);

}


var putOnTerrain = function(terrain, entity) {

	entity.inAir = false;
	entity.doubleJumped = false;
	entity.setGroundMotion();

	entity.y = terrain.y - entity.height/2;
	entity.vy = 0;


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
	enemies = level["enemies"];
	terrain = level["terrain"];
	breakable = new Terrain1x1Breakable(Math.random(), 500, 325);
	// terrain[breakable.id] = breakable;
	// console.log(terrain[breakable.id]['x'])
	//surfaceMods = level["terrain"];
	pickUps = level['weapon'];
	frameCount = 0;
	everyTenCount = 0;

	level_width = initial_level.width;

	//createPickUps();

	setInterval(update, 1000/60)
}

var createPickUps = function() {

	w = new WeaponPickUp(Math.random(), 100, 100, 'sword', player);

	a = new AmmoPickUp(Math.random(), 300, 100, player);

	pickUps[w.id] = w;
	pickUps[a.id] = a;

}

var endGame = function() {
	gui.levelComplete();
	paused = true;
}
