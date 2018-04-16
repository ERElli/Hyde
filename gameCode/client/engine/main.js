
var socket = io();
var frameCount;

var level;
var player;
var ghost;
var enemies;
var bullets = {};
var terrain;
var sufaceMods;
var pickUps={};
var boulderPickUps = {};

var difficulty = 'normal';

var playerPositionLog={};

var hasReleasedJump = false;
var hasReleasedCrouch = true;
var paused = false;

var charCodes ={}; // updated using controls stored in controls.js

var pressing = { "left": 0, "right":0, "jump":0, "crouch":0, "transform":0, "shoot":0 }; // the actions the player is currently inputting


/*
* Updates the key bindings using the values set in controls.js
*/
var updateControls = function() {
	for (var key in codeToChar) {
		charCodes[codeToChar[key]] = key;
	}
}


/*
* Sets the appropriate value in 'pressing' to 1, according to the input key code
*/
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
	else if (!player.onPlatform) {
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
	var len = 0;
	if (thing.type == 'basic boss' || thing.type == 'flying boss' || thing.type == 'tank boss') {
		//console.log("YEAH");
		len = 0;
	}
	else {
		len = Math.sqrt( Math.pow(thing.x - player.x, 2) + Math.pow(thing.y - player.y, 2) ) //sqrt(delta_x^2 + delta_y^2)
	}
	return len < 1500;
}

/*
* Main game loop
*/
var update = function() {

	if (paused) {
		Timer.pause();
		return;
	}

	gui.fg_ctx.clearRect(0, 0, gui.fg.width, gui.fg.height);



	//Update counters
	frameCount++;
	if (frameCount % 3 == 0) {
		playerPositionLog[everyTenCount] = {};
		playerPositionLog[everyTenCount].x = player.x;
		playerPositionLog[everyTenCount].y = player.y;
		if(ghost != undefined && ghost.path != null){
			//console.log("GHOST PATH",ghost.path);
			if((everyTenCount<Object.keys(ghost.path).length)){
				gui.ep_ctx.clearRect(0,0,gui.ep.width,gui.ep.height);
				ghost.x = ghost.path[everyTenCount].x;
				ghost.y = ghost.path[everyTenCount].y;
				// gui.fg_ctx.fillRect(ghost.x,ghost.y,ghost.width,ghost.height);
				ghost.update();
			}
		}
		everyTenCount++;

	}

	//ghost.update();
	//Draw HUD
	//draws background
	gui.drawMap();
	gui.HUD(gui.gr_ctx,player);
	gui.drawGoal();

	//Manage player -----------------------------------------------------------------------------------

	if (player.y > 500) { // player has fallen off the map
		player.health = 0;
	}

	if (player.health <= 0) { // player has died
		player.reset(50, 50);
	}

	if (player.x >= level_width && !level.hasBoss) {
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

		if (block.type == "moving platform") { // only terrain type that moves
			block.updatePosition();
		}


		//Check collisions with player ####################################

		if (blockUnderEntity(block, player)) { // player is standing on some sort of terrain

			if (block.type == 'spike trap' && block.orientation == "up" && !player.isImmune) { // player is not immune and is standing on a spike trap
				player.takeDamage(block.damage);
				player.vy = 10; // launch player upwards when they step on a spike trap
			}
			else {
				player.falling = false;

				if (block.mod.type != 'none') { // block has some modifier on it
					block.mod.applyEffect(player);
				}
				else { // block has no modifier on it
					block.clearEffects(player);
				}
				if (!player.justJumped) {
					putOnTerrain(block, player);
				}
			}

			if (block.type == 'moving platform') {
				if (block.direction == "horizontal" && !pressing['left'] && !pressing['right']) {
					player.vx = block.vx; // player is standing on a moving platform and not trying to move, so they move with the platform
					player.onPlatform = true;
				}
				else if (block.direction == "vertical" && !pressing['jump']) {
					player.vy = block.vy;
					player.onPlatform = true;
				}
			}
			else {
				player.onPlatform = false;
			}
		}

		if (player.falling) {
			if (player.isSlipping) {
				player.isSlipping = false;
				player.acceleration *= 15;
			}
			player.inAir = true;
			player.setAirMotion();
		}


		if (blockLeftEntity(block, player)) { // player is blocked on the left by some sort of terrain

			if (!block.breakAt) { // block is not breakable, stop player from moving
				player.x = block.x + block.width+player.xOffset;
				player.blockedLeft = true;
			}

			if (block.type == 'spike trap' && block.orientation == "right" && !player.isImmune) { // player is running into a right-facing spike trap
				player.takeDamage(block.damage);
				player.vx = 10;
			}

			else { // player is running into a breakable
				if (Math.abs(player.getMomentum()) >= block.breakAt) { // player breaks breakable
					b = new BoulderPickUp(Math.random(), block.x, block.y, player); // this creates a boulder pick-up
					boulderPickUps[b.id] = b;
					delete  terrain[key];
				}
				else { // player does not break breakable
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

			if (block.type == 'spike trap' && block.orientation == "left" && !player.isImmune) {
				player.takeDamage(block.damage);
				player.vx = -10;
			}

			else {
				if (Math.abs(player.getMomentum()) >= block.breakAt) {
					ani.buildingBreakSound();
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


		if (blockOverEntity(block, player)) { // player is jumping into the bottom of a block

			if (block.type == 'spike trap' && block.orientation == "down" && !player.isImmune) {
				player.takeDamage(block.damage);
				player.vy = -10;
			}
			else {
				player.y = block.y+block.height+player.height/2;
				player.vy = 0;
			}
		}


		//Check collisions with enemies (same logic as for player) ####################################

		for (var key in enemies) {

			enemy = enemies[key];
			enemy.falling = true;

			if (blockUnderEntity(block, enemy)) {
				enemy.falling = false;

				if (block.mod) {
					block.mod.applyEffect(enemy);
				}
				else {
					block.clearEffects(enemy);
				}

				if (!enemy.justJumped) {
					if (enemy.type == 'flying enemy') {
						enemy.y = block.y - block.height*0.75;
						enemy.vy = 0;
					}
					else if (enemy.type == 'flying boss') {
						enemy.y = block.y - block.height;
						enemy.vy = 0;
					}
					else {
						putOnTerrain(block, enemy);
					}
				}
			}

			if (enemy.falling) {

				if (enemy.isSlipping) {
					enemy.isSlipping = false;
					enemy.acceleration *= 15;
				}

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

			if (bullet.type != 'meleeBullet') { // then it is either a normal bullet or a boulder (either way delete)
				if (testCollision(block, {'x':bullet.x-bullet.width/2, 'y':bullet.y-bullet.height/2, 'width':bullet.width, 'height':bullet.height})) {
					delete bullets[key];
				}
			}

		}

	}


	if (player.isLaunched) {
		player.launchTimer++;
		if (player.launchTimer > player.launchTimerMax) {
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

				if (enemies[key2].type == 'basic boss' || enemies[key2].type == 'flying boss' || enemies[key2].type == 'tank boss') {

					if (bullet.ownerID == player.id) { // bosses only take damage from player bullets
						if (bullet.type == 'bullet') {
							toRemove = true;
						}

						enemies[key2].takeDamage(bullet.damage);
						break;
					}

				}

				else {
					if (bullet.type == 'bullet') {
						toRemove = true;
					}

					//Enemy takes damage, maybe apply effect (like knockback)
					enemies[key2].takeDamage(bullet.damage);
					break;
				}


			}
		}

		if (bullet.ownerID != player.id) { // player cannot shoot themselves
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
		enemy.updateAim(player); // enemies always aim at player

		if (enemy.health <= 0) {
			ani.enemyDeathSound();
			delete enemies[key];

			if (enemy.type == 'basic boss' || enemy.type == 'flying boss' || enemy.type == 'tank boss') {
				endGame(); // game ends if boss dies
			}

			if (Math.random() < 0.7) { // enemies drop ammo with probability 0.7
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


		if (enemy.type == "flying enemy" || enemy.type == "flying boss") { // these are the only enemies with guns
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

			var enemyDeals = enemy.meleeDamage; // enemies always deal damage on collision
			var playerDeals = 0; // player only deals damage if he is big and has greater momentum

			if (!player.isImmune) {

				if (player.isBig || enemy.type=="tank enemy" || enemy.type == "tank boss") {

					player_p = Math.abs(player.getMomentum());
					enemy_p = Math.abs(enemy.getMomentum());

					delta_p = Math.abs(player_p - enemy_p); // difference in momentums


					// entity with lower momentum takes damage and is launched
					if (player_p > enemy_p) {
						enemy.launch(Math.sign(player.vx)*delta_p/enemy.mass);
						playerDeals += delta_p/150;
					}
					else if (enemy_p > player_p) {
						player.launch(Math.sign(enemy.vx)*delta_p/player.mass, 25);
						enemyDeals += delta_p/150;

					}

				}

				player.takeDamage(enemyDeals);

			}
			enemy.takeDamage(playerDeals);
		}

	}


}


/*
* Tests if the given block is under the given entity
*/
var blockUnderEntity = function(terrain, entity) {

	terrain_rect = {'x':terrain.x, 'y':terrain.y, 'width':terrain.width, 'height':terrain.height/4};

	entity_rect = {'x':entity.x-entity.xOffset/2, 'y':entity.y+entity.yOffset, 'width':entity.xOffset, 'height':entity.yOffset/2};

	return testCollision(terrain_rect, entity_rect);

}

/*
* Tests if the given block is left of the given entity
*/
var blockLeftEntity = function(terrain, entity) {

	entity_rect = {'x':entity.x-entity.xOffset, 'y':entity.y-entity.yOffset/2, 'width':entity.xOffset/2, 'height':entity.yOffset};

	return testCollision(terrain, entity_rect);

}

/*
* Tests if the given block is right of the given entity
*/
var blockRightEntity = function(terrain, entity) {

	entity_rect = {'x':entity.x+entity.xOffset, 'y':entity.y-entity.yOffset/2, 'width':entity.xOffset/2, 'height':entity.yOffset};

	return testCollision(terrain, entity_rect);

}

/*
* Tests if the given block is over the given entity
*/
var blockOverEntity = function(terrain, entity) {

	entity_rect = {'x':entity.x-entity.xOffset/2, 'y':entity.y-entity.yOffset, 'width':entity.xOffset, 'height':entity.yOffset/2};

	return testCollision(terrain, entity_rect);

}


/*
* Places the given entity on the given block
*/
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
	Timer.start();
	console.log(Timer.startTime);
	level = initial_level;
	player = level["player"];

	if(level['ghost'] == null){
		//console.log("GHOST NULL");
		ghost = null;
		//DO NOTHING
	}else{
		//console.log("GHOST",level['ghost']);
		ghost = level['ghost'];
	}

	enemies = level["enemies"];
	terrain = level["terrain"];
	pickUps = level['weapons'];
	frameCount = 0;
	everyTenCount = 0;

	level_width = initial_level.width;

	//createPickUps();
	//createPlatforms();
	//createBoss();

	updateControls();

	setInterval(update, 1000/60)
}

var createPickUps = function() {

	w = new WeaponPickUp(Math.random(), 100, 100, 'sword', player);

	a = new AmmoPickUp(Math.random(), 300, 100, player);

	pickUps[w.id] = w;
	pickUps[a.id] = a;

}

var createTraps = function() {

	w = new SpikeTrap(Math.random(), 100, 100, 'up');

	a = new SpikeTrap(Math.random(), 300, 100, 'down');

	terrain[w.id] = w;
	terrain[a.id] = a;

}

var createPlatforms = function() {

	w = new MovingPlatform(Math.random(), 100, 50, 'vertical', 200);

	//a = new SpikeTrap(Math.random(), 300, 100, 'down');

	terrain[w.id] = w;
	//terrain[a.id] = a;

}

var createBoss = function() {
	b = new BasicBoss(Math.random(), 1000, 100, player);
	enemies[b.id] = b;
	level.hasBoss = true;
}


var endGame = function() {
	Timer.end();
	//should be a varianle for level name and time

	console.log("level is: "+level.name +"time "+ Timer.getEndTime() ); //level.level doesn't work

	socket.emit('updateLevel', { level: level.name , time: Timer.getEndTime() });
	gui.levelComplete();
	//console.log("PLAYER POSTIION",playerPositionLog);
	ghost = new Ghost(Math.random(),0,0,{});
	ghost.setPath(playerPositionLog);
	//socket for signaling user has finished a level and sends level name and score
	paused = true;
	//socket.emit('updateLevel', { level: "level 1", score: "score"});
	setTimeout(function(){gui.drawMedal(storyMedal())},5000);
	//makeLevel();
	//convertToString();

	//Creates ghost object
	//level.ghost=ghostArray
}

var makeLevel = function(){
	let Level = {};
	Level.player = {};

	Level.width = level.width;
	Level.height = level.height;
	Level.enemies = level.enemies;
	Level.terrain = level.terrain;
	Level.player = level.player;
	Level.background = level.background;
	Level.ghost = ghost;

	for(id in Level.enemies){
		Level.enemies[id].y = Level.enemies[id].y+150;
	}
	for(id in Level.terrain){
		Level.terrain[id].y = Level.terrain[id].y+150;
	}
	for(id in Level.player){
		Level.player[id].y = Level.player[id].y+150;
	}
	return Level;
}

var convertToString = function(){
	// var form = document.getElementById("form");
	var levelName = "ghostDemo"
	var filename = levelName+".json";
	var Level = makeLevel();
	console.log("CTS LEVEL",Level);
	console.log("CTS MYDATA",mydata);
	Level.name = levelName;

	var str = JSON.stringify(Level).toString();
	var str = "level='"+str;
	var str = str + "'";
	var a = document.createElement("a");
	document.body.appendChild(a);
	var file = new Blob([str],{type: 'application/json'});
	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();
};
