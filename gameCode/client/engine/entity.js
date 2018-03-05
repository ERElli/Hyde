var canvas = document.getElementById("fg")
var ctx = canvas.getContext('2d');

let framesPerSecond = 60; //conversion factor for frames to seconds
let pixPerMetre = 70;
let mpsTOppf = pixPerMetre/framesPerSecond;

let g = -9.81*mpsTOppf/framesPerSecond; //metres pre frame squared

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
		ctx.save();
		ctx.fillStyle = self.color;
		ctx.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);
		ctx.restore();
	}
	self.getDistance = function(entity2) {	//return distance (number)
		var dx = self.x - entity2.x;
		var dy = self.y - entity2.y;
		return Math.sqrt(dx*dx+dy*dy);
	}

	self.testCollision = function(entity2) {	//return if colliding (true/false)
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
};


//HUMANOID ------------------------------------------------------------------------------------------------------------------------------------------
function Humanoid(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpSpeed, meleeDamage, meleeTimer) {	
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.health = health;
	self.weapon = weapon;
	self.mass = mass;
	self.jumpSpeed = jumpSpeed;
	self.meleeDamage = meleeDamage;
	self.meleeTimer = meleeTimer;
		
	self.attackCounter = 0;
	self.aimAngle = 0;
	
	self.applyJumpTimer = 0;
	self.jumpSpeed = 5*mpsTOppf; // pixels per frame
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
		
		self.x += self.vx;
		self.y -= self.vy;
		
		self.weapon.x = self.x;
		self.weapon.y = self.y;
		
	
	}	
	
	self.jump = function() {
		self.vy = self.jumpSpeed;
		self.justJumped = true;
	}
	
	self.shoot = function() {
		if (self.attackCounter > 1/(self.weapon.firingRate/framesPerSecond)) {
			console.log("shooting");
			self.attackCounter = 0;
			return self.weapon.fire(self.aimAngle);
		}
		else {
			return false;
		}
	}
	
	self.melee = function() {
		
	}
	
	return self;
}


//PLAYER
function Player(type, id, x, y, vx, vy, width, height, img, color, weapon, mass, jumpForce, meleeDamage, meleeTimer,
						maxHealth, isBig) {
	
	var maxHealth = 100;
	
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, maxHealth, weapon, mass, jumpForce, meleeDamage, meleeTimer);
	
	self.maxHealth = maxHealth;
	self.transformCounter = 0;
	self.leftCounter = 0;
	self.rightCounter = 0;
	self.smallSpeed = 5;
	self.isBig = isBig;
	
	
	var smallMass = 80;
	var smallWidth = 5;
	var smallHeight = 5;
	var smallAcceleration = 100*mpsTOppf/framesPerSecond;
	var smallMaxV = 7*mpsTOppf;
	
	var bigMass = 500;
	var bigWidth = 15;
	var bigHeight = 15;
	var bigAcceleration = 5*mpsTOppf/framesPerSecond;
	var bigMaxV = 5*mpsTOppf;
	
	self.acceleration = isBig ? bigAcceleration:smallAcceleration;
	self.maxVelocity = isBig ? bigMaxV:smallMaxV;

	
	
	self.updatePosition = function() {
		
		self.vx += self.ax;	
		self.vy += self.ay;
		
		if (Math.abs(self.vx) > self.maxVelocity) {
			self.vx = Math.sign(self.vx)*self.maxVelocity;
		}
		
		self.x += self.vx;
		self.y -= self.vy;
		
		self.weapon.x = self.x;
		self.weapon.y = self.y;
		
	
	}	
	
	self.sprint = function() {
		
	}
	
	self.transform = function() {
		if (self.transformCounter > 100) {
		
			console.log("isBig: " + self.isBig);
			self.transformCounter = 0;
			
			px = self.vx*self.mass;
			py = self.vy*self.mass;
			
			if (self.isBig) {
				self.isBig = false;
				self.mass = smallMass;
				self.acceleration = smallAcceleration;
			}
			else {
				self.isBig = true;
				self.mass = bigMass;
				self.acceleration = bigAcceleration;
			}
			
			self.vx = (px / self.mass) * mpsTOppf;
			self.vy = (py / self.mass) * mpsTOppf;
		}
		
		
	}
	
	//self.draw = function() {
		
	//}
	
	return self;
}


//ENEMY
function Enemy(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target) {
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer);
	
	
	self.path = path;
	self.target = target;

	
	self.melee = function(direction) {
		
	}
	
	self.attack = function(target) {
		
	}
	
	return self;
}

function BasicEnemy(id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target) {
	var self = Enemy("basic enemy", id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target);
	
	
	self.draw = function() {
		
	}
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

function Pistol(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("pistol", id, x, y, vx, vy, width, height, img, color, 2, 10, "normal", 100, 20);
	
	
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
function Bullet(id, x, y, vx, vy, width, height, img, color) {
	var self = Entity("bullet", id, x, y, vx, vy, width, height, img, color);
	
	
	self.damage = 1;
	
	
	//self.draw = function() {
	//	console.log("would draw bullet at " + self.x + ", " + self.y + " with width" + self.width + " and height" + self.height);
	//}
	
	return self;
}