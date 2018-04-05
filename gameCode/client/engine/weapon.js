function Weapon(type, id, x, y, vx, vy, width, height, img, color, firingRate, bulletSpeed, bulletType, range, ammo) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	//added for Animation.js weapon animation function
	self.isWeapon=true;
	
	self.firingRate = firingRate;
	self.bulletSpeed = bulletSpeed;
	self.bulletType = bulletType;
	self.range = range;
	self.ammo = ammo;
	
	self.fireTimer = 0;
	self.maxFireTimer = 8;
	self.isFiring = false;

	self.update = function(aimAngle) {
		self.aimAngle=aimAngle;
		if(self.isFiring){
			self.fireTimer++;
			if (self.fireTimer > self.maxFireTimer){	
				self.isFiring = false;
				self.fireTimer=0;
			}
		}
		self.updatePosition();
		self.draw(gui.fg_ctx,false);
	}
	self.applyEffect = function(target) {
		
	}
	
	self.fire = function(angle) {
		
	}
	
	return self;
}

function Pistol(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var pistolRate = 2;
	var pistolSpeed = 12;
	var img=Img.pistol;
	var self = Weapon("pistol", id, x, y, vx, vy, width, height, img, color, pistolRate, pistolSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.isFiring=true;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;
		self.ammo--;
		return [new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "gold", ownerID)];

	}
	
	return self;
}

function Shotgun(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var shotgunRate = 1;
	var shotgunSpeed = 12;
	var img=Img.shotgun;
	var self = Weapon("shotgun", id, x, y, vx, vy, width, height, img, color, shotgunRate, shotgunSpeed, "normal", 100, 20);
	
	
	self.fire = function(angle) {
		self.isFiring=true;
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

	
	return self;
}

function Sword(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var swordRate = 1;
	var swordSpeed = 12;
	var img=Img.swordWeapon;
	var self = Weapon("sword", id, x, y, vx, vy, width, height, img, color, swordRate, swordSpeed, "normal", 100, 20);
		
	self.fire = function(angle) {
		self.isFiring=true;
		return [new MeleeBullet(Math.random(),self.x,self.y,self.vx,self.vy,200,200, "img", "gold", ownerID)];

	}	
	
	return self;
}

function AssaultRifle(id, x, y, vx, vy, width, height, img, color, ownerID) {
	
	var rifleRate = 5;
	var rifleSpeed = 12;
	var img=Img.assaultWeapon;
	var self = Weapon("assaultRifle", id, x, y, vx, vy, width, height, img, color, rifleRate, rifleSpeed, "normal", 100, 20);
	
	self.maxFireTimer = 16;
	self.fire = function(angle) {
		self.isFiring=true;
		self.ammo--;
		var spdX = Math.cos(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vx;
		var spdY = Math.sin(angle/180*Math.PI)*self.bulletSpeed * mpsTOppf + self.vy;

		return [new Bullet(Math.random(),self.x,self.y,spdX,spdY,5,5, "img", "gold", ownerID)];

	}
	
	
	return self;
}
