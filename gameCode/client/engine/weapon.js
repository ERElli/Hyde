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