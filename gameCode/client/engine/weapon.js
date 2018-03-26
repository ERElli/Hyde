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
	var pistolSpeed = 12;
	
	var self = Weapon("pistol", id, x, y, vx, vy, width, height, img, color, pistolRate, pistolSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;

		return [new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "gold", ownerID)];

	}
	
	return self;
}

function Shotgun(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var shotgunRate = 2;
	var shotgunSpeed = 12;
	
	var self = Weapon("shotgun", id, x, y, vx, vy, width, height, img, color, shotgunRate, shotgunSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX1 = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY1 = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;
		
		var spdX2 = Math.cos((angle+5)/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY2 = Math.sin((angle+5)/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;
		
		var spdX3 = Math.cos((angle-5)/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY3 = Math.sin((angle-5)/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;

		return [new Bullet(Math.random(),self.x,self.y,spdX1,spdY1,5,5, "img", "gold", ownerID),
				new Bullet(Math.random(),self.x,self.y,spdX2,spdY2,5,5, "img", "gold", ownerID),
				new Bullet(Math.random(),self.x,self.y,spdX3,spdY3,5,5, "img", "gold", ownerID)];

	}
	
	self.draw = function() {
		
	}
	
	return self;
}

function Sword(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var swordRate = 2;
	var swordSpeed = 12;
	
	var self = Weapon("sword", id, x, y, vx, vy, width, height, img, color, swordRate, swordSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;

		return [new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "gold", ownerID)];

	}
	
	return self;
}

function AssaultRifle(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var rifleRate = 5;
	var rifleSpeed = 12;
	
	var self = Weapon("assaultRifle", id, x, y, vx, vy, width, height, img, color, rifleRate, rifleSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;

		return [new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "gold", ownerID)];

	}
	
	
	return self;
}