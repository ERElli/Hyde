var framesPerSecond = 60; //conversion factor for frames to seconds
var pixPerMetre = 120;
var mpsTOppf = pixPerMetre/framesPerSecond;

var g = -9*mpsTOppf/framesPerSecond; //metres pre frame squared

/*
* The base class for all entities in the game.
*/
function Entity(type, id, x, y, vx, vy, width, height, img, color) {

	var self = {
		type:type,
		id:id,
		x:x,
		y:y,
		vx:vx,
		vy:vy,
		width:width,
		height:height,
		img:img,
		color:color,
	};

	self.update = function() {
		self.updatePosition();
		self.draw(gui.fg_ctx,false);
	}

	self.draw = function(ctx,isLevelEditor) {
		gui.drawEntity(self, ctx, isLevelEditor);
	}
	
	self.getDistance = function(entity2) {
		var dx = self.x - entity2.x;
		var dy = self.y - entity2.y;
		return Math.sqrt(dx*dx+dy*dy);
	}

	self.testCollision = function(entity2){	//return if colliding (true/false)
		var rect1 = {
			x:self.x-self.width/2,
			y:self.y-self.height/2,
			width:self.width,
			height:self.height,
		}
		var rect2 = {
			x:entity2.x-entity2.width/2,
			y:entity2.y-entity2.height/2,
			width:entity2.width,
			height:entity2.height,
		}
		return testCollisionRectRect(rect1,rect2);

	}

	self.updatePosition = function() {
		self.x += self.vx;
		self.y -= self.vy;
	}

	return self;
};

/*
* Basic test collision for two rectangles
*/
var testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}


/*
* The base class for player and enemies. Defines entities with more complex movement.
*/
function Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, health, weapon, mass, jumpSpeed, meleeDamage, slowDown) {

	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);

	self.acceleration = acceleration; // acceleration in x
	self.maxVelocityX = maxVX;
	self.maxVelocityY = maxVY;
	self.health = health;
	self.weapon = weapon;
	self.mass = mass;
	self.jumpSpeed = jumpSpeed;
	self.meleeDamage = meleeDamage;
	self.slowDownFactor = slowDown; // the rate at which the humanoid slows down when not deliberately accelerating

	self.attackCounter = 100; // timer for keeping track of when the humanoid can attack
	self.aimAngle = 0;

	self.isImmune = false;
	self.immuneCounter = 0;

	self.jumpBuffer = 0;
	self.justJumped = false;

	self.isLaunched = false;
	self.launchTimerMax = 25;

	self.falling = false;

	//values used in collision detection
	self.xOffset = self.width/2; 
	self.yOffset = self.height/2;

	self.ax = 0;
	self.ay = 0;
	
	//Animation counter for humanoids
	self.aniCount=0;

	self.setAniCount=function(newCount){
		self.aniCount=newCount;
	}
	
	
	self.updatePosition = function() {

		self.vx += self.ax;
		self.vy += self.ay;

		// If speed greater than max and humanoid is not launched, set speed to max speed (in appropriate direction)
		if (Math.abs(self.vx) > self.maxVelocityX && !self.isLaunched) {
			self.vx = Math.sign(self.vx)*self.maxVelocityX;
		}

		// Same with y
		if (Math.abs(self.vy) > self.maxVelocityY) {
			self.vy = Math.sign(self.vy)*self.maxVelocityX;
		}

		// Make sure humanoid does not move if it is blocked by terrain
		if (self.blockedLeft && self.vx < 0) {
			self.vx = 0;
		}
		if (self.blockedRight && self.vx > 0) {
			self.vx = 0;
		}


		self.x += self.vx;
		self.y -= self.vy;

		// Humanoid's weapon moves with humanoid
		self.weapon.x = self.x;
		self.weapon.y = self.y;
		self.weapon.vx = self.vx;
		self.weapon.vy = self.vy;

		self.weapon.update(self.aimAngle);

	}

	// Set properties for air motion
	self.setAirMotion = function() {
		self.ay = g;
		self.ax /= 2;
	}

	// Set properties for ground motion
	self.setGroundMotion = function() {
		self.ay = 0;
		self.vy = 0;
	}

	self.getMomentum = function() {
		return self.vx*self.mass; // p = mv
	}

	// Make the humanoid move very fast for a short time (used in collisions)
	self.launch = function(vx, time) {
		self.isLaunched = true;
		self.vx = vx;
		self.ax = 0;
		self.launchTimer = 0;
		self.launchTimerMax = time;
	}

	self.jump = function() {
		self.vy = self.jumpSpeed;
		self.jumpBuffer = 0;
		self.justJumped = true;
		ani.jumpSound(self);
	}

	
	self.shoot = function() {
		
		if (self.weapon.ammo > 0) {
			if (self.attackCounter > 1/(self.weapon.firingRate/framesPerSecond)) {
				self.attackCounter = 0;
				return self.weapon.fire(self.aimAngle);
			}
			else {
				return false;
			}
		}
		
	}
	

	self.takeDamage = function(amount) {
		self.health -= amount;
		self.isImmune = true;
		self.immuneCounter = 0;
	}

	return self;
}



/*
* The record of the high-score run through the level.
*/
function Ghost(id, x, y, path) {
	self = Entity("ghost", id, x, y, 0, 0, self.width, self.height, "", "red");
	self.width = 50;
	self.height = 50;
	self.path = path;


	self.aniCount=0;

	self.setAniCount=function(newCount){
		self.aniCount=newCount;
	}

	self.setPath = function(newPath){
		self.path = newPath;
	}

	return self;
}



/*
* General bullet, fired by gun, does damage to entities.
*/
function Bullet(id, x, y, vx, vy, width, height, img, color, ownerID) {
	var self = Entity("bullet", id, x, y, vx, vy, width, height, img, color);

	self.width = 10;
	self.height = 10;
	self.damage = 5;

	self.ownerID = ownerID; // does not damage its owner

	return self;
}


/*
* Damage radius done by a melee weapon (sword).
*/
function MeleeBullet(id, x, y, vx, vy, width, height, img, color, ownerID) {
	var self = Entity("meleeBullet", id, x, y, vx, vy, width, height, img, color);

	self.damage = 5;
	self.timer = 0;

	self.ownerID = ownerID;

	// Moves with the player during the swing
	self.updatePosition = function() {
		self.x = player.x;
		self.y = player.y;
		self.vx = player.vx;
		self.vy = player.vy;
	}

	return self;
}


/*
* A boulder that has been thrown.
*/
function BoulderBullet(id, x, y, vx, vy, img, color, ownerID) {	
	
	var self = Entity("boulderBullet", id, x, y, vx, vy, 0, 0, img, color);
	
	self.width = 50;
	self.height = 50;
	self.damage = 25;
	self.xOffset = 0;
	self.yOffset=0;
	self.falling = false;
	self.ay = g;

	self.ownerID = ownerID;

	self.aniCount=0;

	self.setAniCount=function(newCount){
		self.aniCount=newCount;
	}
	
	
	var oldUpdate = self.updatePosition;
	self.updatePosition = function() {

		self.vy += self.ay;
		
		oldUpdate();
		
	}
	
	return self;
}
