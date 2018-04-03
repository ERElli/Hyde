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
	
	self.weapon = new Sword("w1", self.x, self.y, 0, 0, 50, 50,"pistol_image",null, target.id);
	
	self.applyEffect = function() {
		target.weapon = self.weapon;
	}
	
	self.draw = function(ctx,isLevelEditor) {
		gui.drawEntity(self.weapon, gui.fg_ctx, false);
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