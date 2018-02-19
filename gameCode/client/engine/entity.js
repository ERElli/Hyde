var canvas = document.getElementById("ctx")
var ctx = canvas.getContext('2d');

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
		ctx.clearRect(0, 0, canvas.width, canvas.height);
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
		self.y += self.vy;
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
function Humanoid(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	self.health = health;
	self.weapon = weapon;
	self.mass = mass;
	self.jumpForce = jumpForce;
	self.meleeDamage = meleeDamage;
	self.meleeTimer = meleeTimer;
	
	
	self.jump = function() {
		
	}
	
	self.shoot = function() {
		
	}
	
	self.melee = function() {
		
	}
	
	return self;
}


//PLAYER
function Player(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, acceleration,
						maxVelocity, maxHealth, transformTimer) {
	
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer);
	
	self.acceleration = acceleration;
	self.maxVelocity = maxVelocity;
	self.maxHealth = maxHealth;
	self.transformTimer = transformTimer;
	
	
	self.sprint = function() {
		
	}
	
	self.transform = function() {
		
	}
	
	return self;
}

function SmallPlayer(id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, acceleration,
						maxVelocity, maxHealth, transformTimer) {
			
	var self = Player("small player", id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, acceleration,
						maxVelocity, maxHealth, transformTimer);
	
	
	//self.draw = function() {
		
	//}
	
	return self;	
}

function LargePlayer(id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, acceleration,
						maxVelocity, maxHealth, transformTimer) {

	var self = Player("large player", id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, accleration,
						maxVelocity, maxHealth, transformTimer);
	
	
	self.chargeAttack = function() {
		
	}
	
	self.draw = function() {
		
	}
	
	return self;	
}


//ENEMY
function Enemy(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target) {
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer);
	
	
	self.path = path;
	self.target = target;
	
	
	self.shoot = function(target) {
		
	}
	
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
	
	self.draw() {
		
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
	
	
	self.draw = function {
		
	}
	
	return self;
}

function SpikeTrap(id, x, y, vx, vy, width, height, img, color, damage, orientation) {
	var self = Entity("spike trap", id, x, y, vx, vy, width, height, img, color);
	
	
	self.damage = damage;
	self.orientation = damage;
	
	
	self.dealDamage = function(target) {
		
	}
	
	self.draw() {
		
	}
	
	return self;
}


//USABLE -----------------------------------------------------------------------------------------------------------------------------------
function Usable(type, id, x, y, vx, vy, width, height, img, color) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.applyEffect() {
		
	}
	
	return self;
}

function PowerUp(type, id, x, y, vx, vy, width, height, img, color, increaseAmount, effectedStat) {
	var self = Usable(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.increaseAmount = increaseAmount;
	self.effectedStat = effectedStat;
	
	
	self.applyEffect(target) {
		
	}
	
	return self;
}

function Perk(type, id, x, y, vx, vy, width, height, img, color, name) {
	var self = Usable(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.name = name;
	
	
	self.applyEffect(target) {
		
	}
	
	return self;
}

function Weapon(type, id, x, y, vx, vy, width, height, img, color, firingRate, bulletSpeed, bulletType, range, startAmmo) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.firingRate = firingRate;
	self.bulletSpeed = bulletSpeed;
	self.bulletType = bulletType;
	self.range = range;
	self.startAmmo = startAmmo;
	
	
	self.applyEffect(target) {
		
	}
	
	self.fire() {
		
	}
	
	return self;
}

function Pistol(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("pistol", id, x, y, vx, vy, width, height, img, color, 5, 100, "normal", 100, 20);
	
	
	self.fire() {
		
	}
	
	self.draw() {
		
	}
	
	
	return self;
}

function Shotgun(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("shotgun", id, x, y, vx, vy, width, height, img, color, 1, 300, "normal", 50, 10);
	
	
	self.fire() {
		
	}
	
	self.draw() {
		
	}
	
	
	return self;
}

function Sword(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("sword", id, x, y, vx, vy, width, height, img, color, 5, 300, "normal", 10, 10);
	
	
	self.fire() {
		
	}
	
	self.draw() {
		
	}
	
	
	return self;
}

function AssaultRifle(id, x, y, vx, vy, width, height, img, color) {
	var self = Weapon("assault rifle", id, x, y, vx, vy, width, height, img, color, 15, 300, "normal", 100, 50);
	
	
	self.fire() {
		
	}
	
	self.draw() {
		
	}
	
	
	return self;
}


//PROJECTILE ------------------------------------------------------------------------------------------------------------------
function Bullet(id, x, y, vx, vy, width, height, img, color) {
	var self = Entity("bullet", id, x, y, vx, vy, width, height, img, color);
	
	
	self.damage = 1;
	
	
	self.draw = function() {
		
	}
	
	return self;
}