//ENEMY
function Enemy(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, slowDown, target) {
	
	console.log("in enemy: " + target.x);
	
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage);

	self.zeroPoint = x;
	self.patrolRange = patrolRange;
	self.target = target;
	self.maxForward = self.zeroPoint + self.patrolRange;
	self.maxBackward = self.zeroPoint - self.patrolRange;
	
	
	var superUpdatePos = self.updatePosition;
	self.updatePosition = function() {
		
		//console.log(target.x);
		
		if (self.x < target.x) {
			self.ax = self.acceleration;
			console.log("Player on right");
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
		
		superUpdatePos();

		
	}
	
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
	var basicMaxVX = 3*mpsTOppf;
	var basicMaxVY = 20*mpsTOppf;
	var basicMaxHP = 20;
	var basicWeapon = new Pistol("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var basicMass = 50;
	var basicJumpSpeed = 3*mpsTOppf;
	var basicMeleeDamage = 5;
	var basicPatrolRange = 200;
	var basicSlowDown = 3;
	
	console.log("in basic: " + target.x);
	
	//type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, slowDown, target
	var self = Enemy("basic enemy", id, x, y, vx, vy, basicWidth, basicHeight, img, color, basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
					basicJumpSpeed, basicMeleeDamage, basicPatrolRange, basicSlowDown, target);
	
	
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
	var basicPatrolRange = 1000;
	
	var self = Enemy("flying enemy", id, x, y, vx, vy, basicWidth, basicHeight, img, color, basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
					basicJumpSpeed, basicMeleeDamage, basicPatrolRange, target);
	
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

function TankEnemy(id, x, y, vx, vy, img, color, target) {

	var tankWidth = 70;
	var tankHeight = 70;
	var tankAcceleration = 3*mpsTOppf/framesPerSecond;
	var tankMaxVX = 9*mpsTOppf;
	var tankMaxVY = 20*mpsTOppf;
	var tankMaxHP = 20;
	var tankWeapon = new Pistol("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var tankMass = 500;
	var tankJumpSpeed = 2*mpsTOppf;
	var tankMeleeDamage = 10;
	var tankPatrolRange = 1000;
	var tankSlowDown = 3;
	
	var self = Enemy("tank enemy", id, x, y, vx, vy, tankWidth, tankHeight, img, color, tankAcceleration, tankMaxVX, tankMaxVY, tankMaxHP, tankWeapon, tankMass,
					tankJumpSpeed, tankMeleeDamage, tankPatrolRange, tankSlowDown, target);
	
	
	self.block = function() {
		
	}
	
	//self.draw = function() {
		
	//}
	
	return self;
}