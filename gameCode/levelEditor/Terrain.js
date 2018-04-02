var MaxMomentum = 24*400;

function Terrain(id, x, y){
	var self = {
		id: id,
		x: x,
		y: y,
	};

	return self;
}

function Terrain1x1(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 50;
	self.height = 50;

	self.img = Img.terrain1x1;

	self.type = "Terrain1x1";

	self.draw = function(ctx){
		ctx.drawTerrain(self, gui.fg_ctx, false);
		//this is just a temp function until we have art for 1x1 terrain
	};

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

	self.draw = function(ctx){
		ctx.drawImage(self.img, 0, 0,self.img.width,self.img.height,self.x,self.y, self.width, self.height);
		//this is just a temp function until we have art for 1x1 terrain
	};
	return self;
}

function Terrain3x2(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 100;
	self.img = Img.terrain3x2;

	self.type = "Terrain3x2";

	self.draw = function(ctx){
		ctx.drawImage(self.img,self.x,self.y, self.width, self.height);
	};

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

	self.draw = function(ctx){
		ctx.drawImage(self.img,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x4(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 200;
	self.img = Img.terrain3x4;
	self.type = "Terrain3x4";

	self.draw = function(ctx){
		ctx.drawImage(self.img,self.x,self.y, self.width, self.height);
	};

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

	self.draw = function(ctx){
		ctx.drawImage(self.img,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x6(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 300;
	self.img = Img.terrain3x6;

	self.type = "Terrain3x6";

	self.draw = function(ctx){
		ctx.drawImage(self.img,self.x,self.y, self.width, self.height);
	};

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

	self.draw = function(ctx){
		ctx.drawImage(self.img,self.x,self.y, self.width, self.height);
	};

	return self;
}
