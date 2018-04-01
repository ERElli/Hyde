/*
Coordinates are center of entities (still updating from bottom-left)
*/

//var canvas = document.getElementById("fg")
//ctx=gui.fg_ctx; //canvas.getContext('2d');

var framesPerSecond = 60; //conversion factor for frames to seconds
var pixPerMetre = 120;
var mpsTOppf = pixPerMetre/framesPerSecond;

var g = -9*mpsTOppf/framesPerSecond; //metres pre frame squared

//ENTITY
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
		/*
		ctx.save();
		ctx.fillStyle = self.color;
		ctx.fillRect(self.x,self.y-self.height,self.width,self.height);
		ctx.restore();
		*/
	}
	self.getDistance = function(entity2) {	//return distance (number)
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

var testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width 
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}


//HUMANOID ------------------------------------------------------------------------------------------------------------------------------------------
function Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, health, weapon, mass, jumpSpeed, meleeDamage, slowDown) {
	
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	self.acceleration = acceleration;
	self.maxVelocityX = maxVX;
	self.maxVelocityY = maxVY;
	self.health = health;
	self.weapon = weapon;
	self.mass = mass;
	self.jumpSpeed = jumpSpeed;
	self.meleeDamage = meleeDamage;
	self.slowDownFactor = slowDown
		
	self.attackCounter = 100;
	self.aimAngle = 0;
	
	self.isImmune = false;
	self.immuneCounter = 0;
	
	self.jumpBuffer = 0;
	self.justJumped = false;
	
	self.isLaunched = false;
	
	self.falling = false;
	
	self.ax = 0;
	self.ay = 0;
	//self.fx = 0;
	//self.fy = 0;
	
	self.updatePosition = function() {
		
		//self.ax = -self.fx / self.mass;
		//self.ay = -self.fy / self.mass;
		
		self.vx += self.ax;
		self.vy += self.ay;
		
		if (Math.abs(self.vx) > self.maxVelocityX && !self.isLaunched) {
			self.vx = Math.sign(self.vx)*self.maxVelocityX;
		}
		
		if (Math.abs(self.vy) > self.maxVelocityY) {
			self.vy = Math.sign(self.vy)*self.maxVelocityX;
		}
		
		self.x += self.vx;
		self.y -= self.vy;
		
		self.weapon.x = self.x;
		self.weapon.y = self.y;
		self.weapon.vx = self.vx;
		self.weapon.vy = self.vy;
		self.weapon.update();
		
	
	}
	
	self.setAirMotion = function() {
		self.ay = g;
		self.ax /= 2;
	}
	
	self.setGroundMotion = function() {
		self.ay = 0;
		self.vy = 0;
	}
	
	self.getMomentum = function() {
		return self.vx*self.mass;
	}
	
	self.launch = function(vx) {
		self.isLaunched = true;
		self.vx = vx;
		self.launchTimer = 0;
	}
	
	self.jump = function() {
		self.vy = self.jumpSpeed;
		self.jumpBuffer = 0;
		self.justJumped = true;
	}
	
	self.shoot = function() {
		if (self.attackCounter > 1/(self.weapon.firingRate/framesPerSecond)) {
			self.attackCounter = 0;
			return self.weapon.fire(self.aimAngle);
		}
		else {
			return false;
		}
	}
	
	self.melee = function() {
		
	}
	
	self.takeDamage = function(amount) {
		self.health -= amount;
		self.isImmune = true;
		self.immuneCounter = 0;
	}
	
	return self;
}





//GHOST --------------------------------------------------------------------------------------------------------------------------------------
function Ghost(id, x, y, vx, vy, width, height, img, color) {
	var self = Entity("ghost", id, x, y, vx, vy, width, height, img, color);
	
	self.draw = function() {
		
	}
	
	return self;
}


//SPECIAL SURFACES --------------------------------------------------------------------------------------------------------------------------
function MovingPlatform(id, x, y, vx, vy, width, height, img, color, path, delay) {
	var self = Entity("moving platform", id, x, y, vx, vy, width, height, img, color);
	
	
	self.path = path;
	self.delay = delay;
	
	
	self.start = function() {
		
	}
	
	self.stop = function() {
		
	}
	
	self.draw = function() {
		
	}

	return self;
}

function FrictionModifier(id, x, y, vx, vy, width, height, img, color, mu) { //mu is coefficient of kinetic friction
	var self = Entity("friction modifier", id, x, y, vx, vy, width, height, img, color);

	
	self.mu = mu;
	
	
	self.draw = function() {
		
	}
	
	return self;
}

function SpikeTrap(id, x, y, vx, vy, width, height, img, color, damage, orientation) {
	var self = Entity("spike trap", id, x, y, vx, vy, width, height, img, color);
	
	
	self.damage = damage;
	self.orientation = damage;
	
	
	self.dealDamage = function(target) {
		
	}
	
	self.draw = function() {
		
	}
	
	return self;
}


//USABLE -----------------------------------------------------------------------------------------------------------------------------------
function Usable(type, id, x, y, vx, vy, width, height, img, color) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.applyEffect = function() {
		
	}
	
	return self;
}

function PowerUp(type, id, x, y, vx, vy, width, height, img, color, increaseAmount, effectedStat) {
	var self = Usable(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.increaseAmount = increaseAmount;
	self.effectedStat = effectedStat;
	
	
	self.applyEffect = function(target) {
		
	}
	
	return self;
}

function Perk(type, id, x, y, vx, vy, width, height, img, color, name) {
	var self = Usable(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.name = name;
	
	
	self.applyEffect = function(target) {
		
	}
	
	return self;
}


//PROJECTILE ------------------------------------------------------------------------------------------------------------------
function Bullet(id, x, y, vx, vy, width, height, img, color, ownerID) {
	var self = Entity("bullet", id, x, y, vx, vy, width, height, img, color);
	
	self.width = 10;
	self.height = 10;
	self.damage = 5;
	
	self.ownerID = ownerID;
	
	
	//self.draw = function() {
	//}
	
	return self;
}


function MeleeBullet(id, x, y, vx, vy, width, height, img, color, ownerID) {
	var self = Entity("meleeBullet", id, x, y, vx, vy, width, height, img, color);

	self.damage = 20;
	self.timer = 0;
	
	self.ownerID = ownerID;
	
	self.updatePosition = function() {
		self.x = player.x;
		self.y = player.y;
		self.vx = player.vx;
		self.vy = player.vy;
	}
	
	
	//self.draw = function() {
	
	//}
	
	return self;
}
