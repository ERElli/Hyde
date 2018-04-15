//ENEMY
function Enemy(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, slowDown, target) {
	
	
	var self = Humanoid(type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage);

	self.zeroPoint = x;
	self.patrolRange = patrolRange;
	self.target = target;	
	self.maxForward = self.zeroPoint + self.patrolRange;
	self.maxBackward = self.zeroPoint - self.patrolRange;
	self.ammo = 10000000;
	
	
	var superUpdatePos = self.updatePosition;
	self.updatePosition = function() {
		
		//console.log("In Enemy: " + self.target);

		
		if (self.isLaunched) {
			self.ax = 0;
			/*
			if (self.x >= self.maxForward*5) {
				self.x = self.maxForward*5;
				self.vx = 0;
			}
			else if (self.x <= self.maxBackward*5) {
				self.x = self.maxBackward*5;
				self.vx = 0;
			}
			*/
		}
		
		else {
			if (self.x < self.target.x) {
				self.ax = self.acceleration;
			}
			else {
				self.ax = -self.acceleration;
			}
			
			/*
			if (self.x >= self.maxForward) {
				self.x = self.maxForward
				//self.vx = 0;
			}
			else if (self.x <= self.maxBackward && !self.isLaunched) {
				self.x = self.maxBackward;
				//self.vx = 0;
			}
			*/
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
	var basicAcceleration = 50*mpsTOppf/framesPerSecond;
	var basicMaxVX = 3*mpsTOppf;
	var basicMaxVY = 20*mpsTOppf;
	var basicMaxHP = 20;
	var basicWeapon = new NoWeapon("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var basicMass = 50;
	var basicJumpSpeed = 3*mpsTOppf;
	var basicMeleeDamage = 5;
	var basicPatrolRange = 200;
	var basicSlowDown = 3;
	
	
	//type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, slowDown, target
	var self = Enemy("basic enemy", id, x, y, vx, vy, basicWidth, basicHeight, img, color, basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
					basicJumpSpeed, basicMeleeDamage, basicPatrolRange, basicSlowDown, target);
	
	
	//self.draw = function() {
		
	//}
	
	return self;
}

function FlyingEnemy(id, x, y, vx, vy, img, color, target) {
	
	var flyingWidth = 30;
	var flyingHeight = 30;
	var flyingAcceleration = 5*mpsTOppf/framesPerSecond;
	var flyingMaxVX = 7*mpsTOppf;
	var flyingMaxVY = 10*mpsTOppf;
	var flyingMaxHP = 1;
	var flyingWeapon = new Pistol("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var flyingMass = 20;
	var flyingJumpSpeed = 3*mpsTOppf;
	var flyingMeleeDamage = 5;
	var flyingPatrolRange = 2000;
	var flyingSlowDown = 3;
	
	
	//type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, slowDown, target
	var self = Enemy("flying enemy", id, x, y, vx, vy, flyingWidth, flyingHeight, img, color, flyingAcceleration, flyingMaxVX, flyingMaxVY, flyingMaxHP, flyingWeapon, flyingMass,
					flyingJumpSpeed, flyingMeleeDamage, flyingPatrolRange, flyingSlowDown, target);
	
	
	var vertPatrolRange = 300; //metres
	self.maxUp = self.y-vertPatrolRange;
	self.maxDown = self.y+vertPatrolRange;
	
	var accSum = 0;
	
	var superUpdate = self.updatePosition;
	self.updatePosition = function() {

		//vertical position should be sinusoidal, y(t) = A*sin(omega*t) + offset
		//so v(t) = A*omega*cos(omega*t), a(t) = -A*omega^2 * sin(omega*t)
		
		T = 5; //seconds per oscillation
		omega = 2*Math.PI/T;
		t = frameCount / framesPerSecond; //current time in seconds
		omegat = omega*t;
		omegat = (omegat%(2*Math.PI)-Math.PI);
		amplitude = vertPatrolRange/2; //metres
	
		//self.y = (amplitude*Math.sin(omegat)) + y;
		self.vy = amplitude*omega*Math.cos(omegat)/framesPerSecond;
		
		superUpdate();
		
		
		if (self.y >= self.maxDown) {
			self.y = self.maxDown;
		}
		else if (self.y <= self.maxUp) {
			self.y = self.maxUp;
		}
		
		
		
	}
	
	
	return self;
}

function TankEnemy(id, x, y, vx, vy, img, color, target) {

	var tankWidth = 70;
	var tankHeight = 70;
	var tankAcceleration = 3*mpsTOppf/framesPerSecond;
	var tankMaxVX = 7*mpsTOppf;
	var tankMaxVY = 20*mpsTOppf;
	var tankMaxHP = 50;
	var tankWeapon = new NoWeapon("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var tankMass = 200;
	var tankJumpSpeed = 2*mpsTOppf;
	var tankMeleeDamage = 10;
	var tankPatrolRange = 1000;
	var tankSlowDown = 3;
	
	var self = Enemy("tank enemy", id, x, y, vx, vy, tankWidth, tankHeight, img, color, tankAcceleration, tankMaxVX, tankMaxVY, tankMaxHP, tankWeapon, tankMass,
					tankJumpSpeed, tankMeleeDamage, tankPatrolRange, tankSlowDown, target);
	
	
	var superUpdate = self.updatePosition;
	self.updatePosition = function() {
		
		if (self.health <= 5) {
			self.block();
		}
		
		if (self.isBlocking) {
			self.vx *= 0.9;
		}
		superUpdate();
	}
	
	var superTakeDamage = self.takeDamage;
	self.takeDamage = function(amount) {
		if (self.isBlocking) {
			amount /= 10;
		}
		superTakeDamage(amount);
	}
	
	self.block = function() {
		self.isBlocking = true;
	}
	
	self.getMomentum = function() {
		if (!self.isBlocking) {
			return self.vx*self.mass;
		}
		else {
			return self.mass*5;
		}
	}
	
	return self;
}



function BasicBoss(id, x, y, target) {
	
	var basicWidth = 100;
	var basicHeight = 100;
	var basicAcceleration = 50*mpsTOppf/framesPerSecond;
	var basicMaxVX = 2*mpsTOppf;
	var basicMaxVY = 20*mpsTOppf;
	var basicMaxHP = 75;
	var basicWeapon = new NoWeapon("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var basicMass = 500;
	var basicJumpSpeed = 3*mpsTOppf;
	var basicMeleeDamage = 15;
	var basicPatrolRange = 20000;
	var basicSlowDown = 3;
	
	
	//type, id, x, y, vx, vy, width, height, img, color, acceleration, maxVX, maxVY, maxHealth, weapon, mass, jumpSpeed, meleeDamage, patrolRange, slowDown, target
	var self = Enemy("basic boss", id, x, y, 0, 0, basicWidth, basicHeight, 'img', 'color', basicAcceleration, basicMaxVX, basicMaxVY, basicMaxHP, basicWeapon, basicMass,
					basicJumpSpeed, basicMeleeDamage, basicPatrolRange, basicSlowDown, target);
	
	
	self.spawnTimer = 0;
	self.maxSpawnTimer = 100;
	
	var superUpdate = self.updatePosition;
	self.updatePosition = function() {
		
		superUpdate();
		
		self.spawnTimer++;
		
		if (self.spawnTimer > self.maxSpawnTimer) {
			self.spawnMinion();
			self.spawnTimer = 0;
		}

		
	}
	
	
	self.spawnMinion = function() {
		
		console.log(self.aimAngle);
		
		var spdX = Math.cos(self.aimAngle/180*Math.PI)*10 * mpsTOppf + self.vx;
		var spdY = Math.sin(self.aimAngle/180*Math.PI)*10 * mpsTOppf + self.vy;
		
		m = new BasicEnemy(Math.random(), self.x, self.y, spdX, spdY, 'img', 'color', self.target);
		enemies[m.id] = m;
		
	}
	
	//self.draw = function() {
		
	//}
	
	return self;
}


function FlyingBoss(id, x, y, target) {
	
	//kamakazee with shotguns
	
	var flyingWidth = 50;
	var flyingHeight = 50;
	var flyingAcceleration = 15*mpsTOppf/framesPerSecond;
	var flyingMaxVX = 7*mpsTOppf;
	var flyingMaxVY = 10*mpsTOppf;
	var flyingMaxHP = 25;
	var flyingWeapon = new Shotgun("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var flyingMass = 20;
	var flyingJumpSpeed = 3*mpsTOppf;
	var flyingMeleeDamage = 50;
	var flyingPatrolRange = 20000;
	var flyingSlowDown = 3;
	
	//id, x, y, vx, vy, img, color, target
	var self = Enemy("flying boss", id, x, y, 0, 0, flyingWidth, flyingHeight, 'img', 'color', flyingAcceleration, flyingMaxVX, flyingMaxVY, flyingMaxHP, flyingWeapon, flyingMass,
					flyingJumpSpeed, flyingMeleeDamage, flyingPatrolRange, flyingSlowDown, target);
	
	self.width = 50;
	self.height = 50;
	self.health = 10;
	self.weapon = new Shotgun(Math.random(), x, y, 0, 0, 5, 5,'img','black', self.id);
	self.weapon.ammo = 100000;
	self.meleeDamage = 50;
	self.patrolRange = 20000;
	
	self.vyStandard = 5 * mpsTOppf;
	
	self.kiting = true;
	self.diving = false;
	
	self.kiteTimer = 0;
	self.maxKite = 500;
	self.diveTimer = 0;
	self.maxDive = 60;
	
	var superUpdate = self.updatePosition;
	self.updatePosition = function() {
		
		superUpdate();
		
		if (self.kiting) {
			
			if (self.kiteTimer < self.maxKite) {
				
				if (self.target.y - self.y < 500) {
					self.vy = self.vyStandard;
				}
				else {
					self.vy = 0;
				}
				
				self.kiteTimer++;
			}
			else {
				self.kiting = false;
				self.diving = true;
				self.diveTimer = 0;
			}
			
		}
		
		else if (self.diving) {
			
			if (self.diveTimer < self.maxDive) {
				
				self.vy = -self.vyStandard*2;
				
				self.diveTimer++;
			}
			
			else {
				self.diving = false;
				self.kiting = true;
				self.kiteTimer = 0;
				//console.log("diving -> kiting");
			}
			
		}
				
	}
	
	
	return self;
}


function TankBoss(id, x, y, target) {

	var tankWidth = 350;
	var tankHeight = 350;
	var tankAcceleration = 5*mpsTOppf/framesPerSecond;
	var tankMaxVX = 8*mpsTOppf;
	var tankMaxVY = 20*mpsTOppf;
	var tankMaxHP = 100;
	var tankWeapon = new NoWeapon("w1", x, y, 0, 0, 5, 5,'img','black', id);
	var tankMass = 400;
	var tankJumpSpeed = 2*mpsTOppf;
	var tankMeleeDamage = 15;
	var tankPatrolRange = 1000;
	var tankSlowDown = 5;
	
	var self = Enemy("tank boss", id, x, y, 0, 0, tankWidth, tankHeight, 'img', 'color', tankAcceleration, tankMaxVX, tankMaxVY, tankMaxHP, tankWeapon, tankMass,
					tankJumpSpeed, tankMeleeDamage, tankPatrolRange, tankSlowDown, target);
	
	
	var superUpdate = self.updatePosition;
	self.updatePosition = function() {
		
		if (self.health <= 5) {
			self.block();
		}
		
		if (self.isBlocking) {
			self.vx *= 0.9;
		}
		superUpdate();
	}
	
	var superTakeDamage = self.takeDamage;
	self.takeDamage = function(amount) {
		if (self.isBlocking) {
			amount /= 10;
		}
		superTakeDamage(amount);
	}
	
	self.block = function() {
		self.isBlocking = true;
	}
	
	self.getMomentum = function() {
		if (!self.isBlocking) {
			return self.vx*self.mass;
		}
		else {
			return self.mass*5;
		}
	}
	
	return self;
}