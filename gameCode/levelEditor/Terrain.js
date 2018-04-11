var MaxMomentum = 24*400;

function Terrain(id, x, y){
	var self = {
		id: id,
		x: x,
		y: y,
	};

	self.draw = function(ctx,isLevelEditor){
		gui.drawTerrain(self,ctx,isLevelEditor);
	}
	
	self.clearEffects = function(target) {
		if (target.isSlipping) {
			target.isSlipping = false;
			target.acceleration *= 15;
		}
		if (target.isMuddy) {
			target.isMuddy = false;
			if (target.type != "player") {
				target.maxVelocityX *= 2;
			}
		}
	}

	return self;
}

function Terrain1x1(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 50;
	self.height = 50;

	self.img = Img.terrain1x1;

	self.type = "Terrain1x1";

	return self;
}

function Terrain1x1Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.height = 50;
	self.width = 50;
	self.health = 40;
	self.breakAt = MaxMomentum/2;
	self.img = Img.terrain1x1Breakable;

	self.type = "Terrain1x1Breakable";

	return self;
}

function Terrain3x2(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 100;
	self.img = Img.terrain3x2;

	self.type = "Terrain3x2";

	return self;
}

function Terrain3x2Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 100;
	self.health = 40;
	self.breakAt = MaxMomentum/2;
	self.img = Img.terrain3x2Breakable;

	self.type = "Terrain3x2Breakable";

	return self;
}

function Terrain3x4(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 200;
	self.img = Img.terrain3x4;
	self.type = "Terrain3x4";

	return self;
}

function Terrain3x4Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 200;
	self.health = 40;
	self.breakAt = MaxMomentum/2;
	self.img = Img.terrain3x4Breakable;

	self.type = "Terrain3x4Breakable";

	return self;
}

function Terrain3x6(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 300;
	self.img = Img.terrain3x6;

	self.type = "Terrain3x6";

	return self;
}

function Terrain3x6Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 300;
	self.health = 40;
	self.breakAt = MaxMomentum/2;
	self.img = Img.terrain3x6Breakable;

	self.type = "Terrain3x6Breakable";

	return self;
}

function Terrain1x6Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 50;
	self.height = 300;
	self.health = 40;
	self.breakAt = MaxMomentum/2;
	self.img = Img.terrain1x6Breakable;

	self.type = "Terrain1x6Breakable";

	return self;
}

function TerrainModifier(type) {
	
	var self = {};
	
	self.type = type;
	
	self.applyEffect = function(target) {
		
	}
	
	return self;
	
}

function IceModifier() {
	
	self = TerrainModifier('ice');
	
	self.applyEffect = function(target) {
		if (!target.isSlipping) {
			target.acceleration /= 15;
			target.isSlipping = true;
		}
		else if (target.isMuddy) {
			target.isMuddy = false;
		}
	}
	
	return self;
	
}

function MudModifier() {
	
	self = TerrainModifier('mud');
	
	self.applyEffect = function(target) {
		if (!target.isMuddy) {
			console.log("Applying mud");
			target.maxVelocityX /= 2;
			console.log("In mud: " + target.maxVelocityX);
			target.isMuddy = true;
		}
		else if (target.isSlipping) {
			target.isSlipping = false;
			target.acceleration *= 15;
		}
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

	//Temp drawing function for testing in level editor
	self.draw = function(ctx,isLevelEditor) {
		ctx.drawImage(Img.platform,0,0,Img.platform.width,Img.platform.height,self.x,self.y,self.width,self.height);
	}

	return self;
}



/*
* Like Terrain, traps' coordinates refer to their top-left corner.
*/ 
function SpikeTrap(id, x, y, orientation) {
	
	var self = Terrain(id, x, y);


	self.damage = 25;
	self.orientation = orientation;
	self.type = "spike trap"
	self.width = 50;
	self.height = 50;
	self.img = Img.terrain1x1Breakable;


	//Temp drawing function for testing in level editor
	/*
	self.draw = function(ctx,isLevelEditor) {
		ctx.drawImage(Img.topSpikeTrap,0,0,Img.topSpikeTrap.width,Img.topSpikeTrap.height,self.x,self.y,self.width,self.height);
	}
	*/
	
	//Temp function for engine (uses 1x1 breakable in GUI.js)
	self.draw = function(ctx, isLevelEditor) {
		gui.drawTerrain(self,ctx,isLevelEditor);
	}

	return self;
}