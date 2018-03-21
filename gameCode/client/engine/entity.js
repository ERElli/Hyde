/*
Coordinates are center of entities (still updating from bottom-left)
*/

var canvas = document.getElementById("fg")
var ctx = canvas.getContext('2d');

let framesPerSecond = 60; //conversion factor for frames to seconds
let pixPerMetre = 120;
let mpsTOppf = pixPerMetre/framesPerSecond;

let g = -9*mpsTOppf/framesPerSecond; //metres pre frame squared

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
		self.draw();
	}
	
	self.draw = function() {
		gui.drawEntity(self);		
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

/*
var testCollisionRectRect = function(rect1,rect2){
	return (rect1.x - (rect2.x+rect2.width)) <= -0.1
			&& (rect2.x - (rect1.x+rect1.width)) <= -0.1
			&& (rect1.y - (rect2.y+rect2.height)) <= -0.1
			&& (rect2.y - (rect1.y+rect1.height)) <= -0.1	
};
*/

var testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width 
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}


//HUMANOID ------------------------------------------------------------------------------------------------------------------------------------------
function Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, health, weapon, mass, jumpSpeed, meleeDamage, meleeTimer) {	
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	self.acceleration = acceleration;
	self.maxVelocityX = maxVX;
	self.maxVelocityY = maxVY;
	self.health = health;
	self.weapon = weapon;
	self.mass = mass;
	self.jumpSpeed = jumpSpeed;
	self.meleeDamage = meleeDamage;
	self.meleeTimer = meleeTimer;
		
	self.attackCounter = 0;
	self.aimAngle = 0;
	
	self.isImmune = false;
	self.immuneCounter = 0;
	
	self.jumpBuffer = 0;
	self.justJumped = false;
	
	self.ax = 0;
	self.ay = 0;
	//self.fx = 0;
	//self.fy = 0;
	
	self.updatePosition = function() {
		
		//self.ax = -self.fx / self.mass;
		//self.ay = -self.fy / self.mass;
		
		self.vx += self.ax;
		self.vy += self.ay;
		
		if (Math.abs(self.vx) > self.maxVelocityX) {
			self.vx = Math.sign(self.vx)*self.maxVelocityX;
		}
		
		if (Math.abs(self.vy) > self.maxVelocityY) {
			self.vy = Math.sign(self.vy)*self.maxVelocityX;
		}
		
		self.x += self.vx;
		self.y -= self.vy;
		
		self.weapon.x = self.x
		self.weapon.y = self.y
		//self.offsetWeapon();
		
	
	}
	
	/*
	self.offsetWeapon = function() {
		var weaponOffsetX = 0;
		var weaponOffsetY = 0;
		
		var offXPlus = self.width*3/4;
		var offYPlus = self.height/2
		var offXNeg = -self.width/4;
		var offYNeg = -self.height*3/4;
		
		//Aiming right
		if (self.aimAngle >= -30 && self.aimAngle < 30) {
			weaponOffsetX = offXPlus;
			weaponOffsetY = 0;
		}
		
		//Aiming diagonal (up-right)
		else if (self.aimAngle >= 30 && self.aimAngle < 60) {
			weaponOffsetX = offXPlus;
			weaponOffsetY = offYPlus;
		}
		
		//Aiming up
		else if (self.aimAngle >= 60 && self.aimAngle < 120) {
			weaponOffsetX = offXPlus/2;
			weaponOffsetY = offYPlus;
		}
		
		//Aiming diagonal (up-left)
		else if (self.aimAngle >= 120 && self.aimAngle < 150) {
			weaponOffsetX = 0;
			weaponOffsetY = offYPlus;
		}
		
		//Start using negatives, different conceptually
		
		//Aiming left
		else if (self.aimAngle >= 150 || self.aimAngle < -150) {
			weaponOffsetX = offXNeg;
			weaponOffsetY = 0;
		}
		
		//Aiming diagonal (down-left)
		else if (self.aimAngle >= -150 && self.aimAngle < -120) {
			weaponOffsetX = 0;
			weaponOffsetY = offYNeg;
		}
		
		//Aiming down
		else if (self.aimAngle >= -120 && self.aimAngle < -60) {
			weaponOffsetX = offXPlus/2;
			weaponOffsetY = offYNeg;
		}
		
		//Aiming diagonal (down-right)
		else {
			weaponOffsetX = offXPlus;
			weaponOffsetY = offYNeg;
		}
		
		self.weapon.x = self.x + weaponOffsetX;
		self.weapon.y = self.y - weaponOffsetY;
	}
	*/
	
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


//PLAYER
function Player(type, id, x, y, vx, vy, width, height, img, color, weapon, meleeDamage, meleeTimer, maxHealth, isBig) {
	
	var maxHealth = 100;
	
	var smallMass = 80;
	var smallWidth = 50;
	var smallHeight = 50;
	var smallAcceleration = 100*mpsTOppf/framesPerSecond;
	var smallMaxVX = 5*mpsTOppf;
	var smallMaxVY = 15*mpsTOppf;
	var smallJumpSpeed = 3*mpsTOppf;
	
	var bigMass = 500;
	var bigWidth = 100;
	var bigHeight = 100;
	var bigAcceleration = 5*mpsTOppf/framesPerSecond;
	var bigMaxVX = 3*mpsTOppf;
	var bigMaxVY = 20*mpsTOppf;
	var bigJumpSpeed = 2*mpsTOppf;
	
	var self = Humanoid(type, id, x, y, vx, vy, smallWidth, smallHeight, img, color, 0, 0, 0, maxHealth, weapon, smallMass, 4*mpsTOppf, meleeDamage, meleeTimer);
	
	self.maxHealth = maxHealth;
	self.transformCounter = 0;
	self.leftCounter = 0;
	self.rightCounter = 0;
	self.smallSpeed = 5;
	self.isBig = isBig;	
	self.doubleJumped = false;
	
	self.acceleration = self.isBig ? bigAcceleration:smallAcceleration;
	self.maxVelocityX = self.isBig ? bigMaxVX:smallMaxVX;
	self.maxVelocityY = self.isBig ? bigMaxVY:smallMaxVY;
	
	self.updatePosition = function() {
		
		if (Math.sign(self.vx) != Math.sign(self.ax)) {
			self.ax = 2*self.ax;
		}
		
		self.vx += self.ax;	
		self.vy += self.ay;
		
		if (Math.abs(self.vx) > self.maxVelocityX) {
			self.vx = Math.sign(self.vx)*self.maxVelocityX;
		}
		
		if (Math.abs(self.vy) > self.maxVelocityY) {
			self.vy = Math.sign(self.vy)*self.maxVelocityX;
		}
	
		self.x += self.vx;
		self.y -= self.vy;
		
		self.weapon.x = self.x;
		self.weapon.y = self.y;
		
		//self.offsetWeapon();
	
	}
	
	self.setAirMotion = function() {
		self.ay = g;
		if (self.isBig) {
			self.ax /= 2;
		}
		else {
			self.ax /= 4;
		}
	}
	
	self.setGroundMotion = function() {
		self.ay = 0;
		self.vy = 0;
		self.acceleration = self.isBig ? bigAcceleration:smallAcceleration;
		self.maxVelocityX = self.isBig ? bigMaxVX:smallMaxVX;
	}
	
	self.sprint = function() {
		
	}
	
	self.transform = function() {
		if (self.transformCounter > 100) {
		
			self.transformCounter = 0;
			
			px = self.vx*self.mass;
			py = self.vy*self.mass;
			
			var oldHeight = self.height;
			
			if (self.isBig) {
				self.isBig = false;
				self.mass = smallMass;
				self.width = smallWidth;
				self.height = smallHeight;
				self.acceleration = smallAcceleration;
				self.maxVelocityX = smallMaxVX;
				self.maxVelocityY = smallMaxVY;
				self.jumpSpeed = smallJumpSpeed;
			}
			else {
				self.isBig = true;
				self.mass = bigMass;
				self.width = bigWidth;
				self.height = bigHeight;
				self.acceleration = bigAcceleration;
				self.maxVelocityX = bigMaxVX;
				self.maxVelocityY = bigMaxVY;
				self.jumpSpeed = bigJumpSpeed;
			}
			
			self.y -= (self.height - oldHeight)/2;
			self.vx = (px / self.mass) * mpsTOppf;
			self.vy = (py / self.mass) * mpsTOppf;
		}	
	}
	
	//self.draw = function() {
		
	//}

	
	return self;
}


//ENEMY
function Enemy(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, meleeTimer, patrolRange, target) {
	
	//type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpSpeed, meleeDamage, meleeTimer
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, meleeTimer);

	self.zeroPoint = x;
	self.patrolRange = patrolRange;
	self.target = target;
	self.maxForward = self.zeroPoint + self.patrolRange;
	self.maxBackward = self.zeroPoint - self.patrolRange;
	
	self.melee = function(direction) {
		
	}
	
	self.attack = function(target) {
		
	}
	
	self.updateAim = function(target) {
		self.aimAngle = Math.atan2(target.y-self.y,target.x-self.x) / Math.PI * -180;
	}
	
	self.takeDamage = function(amount) {
		self.health -= amount;
		self.isImmune = true;
		self.immuneCounter = 0;
	}
	
	return self;
}

function BasicEnemy(id, x, y, vx, vy, img, color, target) {
	
	var basicWidth = 40;
	var basicHeight = 40;
	var basicAcceleration = 100*mpsTOppf/framesPerSecond;
	var basicMaxVX = 5;
	var basicMaxVY = 20;
	var basicMaxHP = 20;
	var basicWeapon = new Pistol("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var basicMass = 50;
	var basicJumpSpeed = 3*mpsTOppf;
	var basicMeleeDamage = 5;
	var basicMeleeTimer = 10;
	var basicPatrolRange = 100;
	
	var self = Enemy("basic enemy", id, x, y, vx, vy, basicWidth, basicHeight, img, color, basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
					basicJumpSpeed, basicMeleeDamage, basicMeleeTimer, basicPatrolRange, target);
	
	
	var superUpdatePos = self.updatePosition;
	self.updatePosition = function() {
		
		superUpdatePos();
		
		if (self.x < target.x) {
			self.ax = self.acceleration;
		}
		else {
			self.ax = -self.acceleration;
		}
		
		if (self.x >= self.maxForward) {
			self.x = self.maxForward
		}
		else if (self.x <= self.maxBackward) {
			self.x = self.maxBackward;
		}
		
	}
	
	//self.draw = function() {
		
	//}
	
	return self;
}

function FlyingEnemy(id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target) {
	var self = Enemy("flying enemy", id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target);
	
	
	self.draw = function() {
		
	}
	
	return self;
}

function TankEnemy(id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target) {
	var self = Enemy("tank enemy", id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target);
	
	
	self.block = function() {
		
	}
	
	self.draw = function() {
		
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

function Weapon(type, id, x, y, vx, vy, width, height, img, color, firingRate, bulletSpeed, bulletType, range, ammo) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.firingRate = firingRate;
	self.bulletSpeed = bulletSpeed;
	self.bulletType = bulletType;
	self.range = range;
	self.ammo = ammo;
	
	
	self.applyEffect = function(target) {
		
	}
	
	self.fire = function(angle) {
		
	}
	
	return self;
}

function Pistol(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var pistolRate = 2;
	var pistolSpeed = 7;
	
	var self = Weapon("pistol", id, x, y, vx, vy, width, height, img, color, pistolRate, pistolSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;

		return new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "gold", ownerID);

	}
	
	self.draw = function() {
		
	}
	
	
	return self;
}

function Shotgun(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("shotgun", id, x, y, vx, vy, width, height, img, color, 1, 10, "normal", 50, 10);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		return new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "black");
	}
	
	self.draw = function() {
		
	}
	
	
	return self;
}

function Sword(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("sword", id, x, y, vx, vy, width, height, img, color, 2, 1, "normal", 10, 10);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		return new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "black");
	}
	
	self.draw = function() {
		
	}
	
	
	return self;
}

function AssaultRifle(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("assault rifle", id, x, y, vx, vy, width, height, img, color, 5, 10, "normal", 100, 50);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf;
		return new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "black");
	}
	
	self.draw = function() {
		
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
