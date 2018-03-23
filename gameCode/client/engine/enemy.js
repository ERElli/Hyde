//ENEMY
function Enemy(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, target) {
	
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage);

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

function FlyingEnemy(id, x, y, vx, vy, img, color, target) {
	
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
	
	var self = Enemy("flying enemy", id, x, y, vx, vy, basicWidth, basicHeight, img, color, basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
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
	
	/*
	self.draw = function() {
		ctx.save();
		ctx.fillStyle = self.color;
		ctx.fillRect(gui.bg.//SOMETHING self.x,self.y-self.height,self.width,self.height);
		ctx.restore();
	}
	*/
	
	return self;
	
}

function TankEnemy(id, x, y, vx, vy, width, height, img, color, health, weapon, mass, jumpForce, meleeDamage, meleeTimer, path, target) {

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
	
	var self = Enemy("tank enemy", id, x, y, vx, vy, basicWidth, basicHeight, img, color, basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
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
	
	
	self.block = function() {
		
	}
	
	//self.draw = function() {
		
	//}
	
	return self;
}