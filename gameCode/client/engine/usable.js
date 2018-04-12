//USABLE -----------------------------------------------------------------------------------------------------------------------------------
function Usable(type, id, x, y, vx, vy, width, height, img, color) {
	var self = Entity(type, id, x, y, vx, vy, width, height, img, color);
	
	
	self.applyEffect = function() {
		
	}
	
	return self;
}

function WeaponPickUp(id, x, y, weaponType, target) {
	
	
	var self = Usable("weapon", id, x, y, 0, 0, 25, 25, 'no', 'red');
	
	
	self.weaponType = weaponType;
	
	if (weaponType == "pistol") {
		self.weapon = new Pistol("w1", self.x, self.y, 0, 0, 50, 50,"pistol_image",null, target.id);
	}
	else if (weaponType == "shotgun") {
		self.weapon = new Shotgun("w1", self.x, self.y, 0, 0, 50, 50,"pistol_image",null, target.id);
	}
	else if (weaponType == "assaultRifle") {
		self.weapon = new AssaultRifle("w1", self.x, self.y, 0, 0, 50, 50,"pistol_image",null, target.id);
	}
	else {
		self.weapon = new Sword("w1", self.x, self.y, 0, 0, 50, 50,"pistol_image",null, target.id);
	}
	
	self.applyEffect = function() {
		target.weapon = self.weapon;
		ani.weaponPickUpSound();
	}
	
	self.draw = function(ctx,isLevelEditor) {
		gui.drawEntity(self.weapon, gui.fg_ctx, isLevelEditor);
	}
	
	return self;
	
}

function AmmoPickUp(id, x, y, target) {
	var self = Usable("ammo", id, x, y, 0, 0, 25, 25, 'no', 'red');
	
	self.applyEffect = function() {
		target.weapon.ammo += 5;
	}
	
	self.draw = function(ctx,isLevelEditor) {
		gui.drawEntity(self, gui.fg_ctx, false);
	}
	
	return self;

}


function BoulderPickUp(id, x, y, target) {
	
	var self = Usable("boulder", id, x, y, 0, 0, 50, 50, 'no', 'red');
	
	self.aniTimer = 0;

	
	self.applyEffect = function() {
		if (target.isBig) {
			target.pickUpBoulder();
		}
	}

	self.draw = function(ctx,isLevelEditor) {
		self.aniTimer++;
		ani.breakable1x6(self, self.aniTimer);		
		
		
		gui.drawEntity(self, gui.fg_ctx, false);
	}

	return self;
}
