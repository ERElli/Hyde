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
	self.img = "../../images/terrain3x2.png";
	self.type = "Terrain1x1";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image, 0, 0, image.width, image.height, self.x, self.y, self.width, self.height);
		//this is just a temp function until we have art for 1x1 terrain
	};

	return self;
}

function Terrain1x1Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.height = 50;
	self.width = 50;
	self.img = "../../images/breakableTerrain3x2.png";
	self.type = "Terrain1x1Breakable";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image, 0, 0,image.width,image.height,self.x,self.y, self.width, self.height);
		//this is just a temp function until we have art for 1x1 terrain
	};
	return self;
}

function Terrain3x2(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 100;
	self.img = "../../images/terrain3x2.png";
	self.type = "Terrain3x2";

	var image = new Image();
	image.src = self.img;

	self.draw = function(context){
		context.drawImage(image,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x2Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 100;
	self.img = "../../images/breakableTerrain3x2.png";
	self.type = "Terrain3x2Breakable";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x4(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 200;
	self.img = "../../images/terrain3x4.png";
	self.type = "Terrain3x4";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x4Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 200;
	self.img = "../../images/breakableTerrain3x4.png";
	self.type = "Terrain3x4Breakable";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x6(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 300;
	self.img = "../../images/terrain3x6.png";
	self.type = "Terrain3x6";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image,self.x,self.y, self.width, self.height);
	};

	return self;
}

function Terrain3x6Breakable(id, x, y){
	var self = Terrain(id, x, y);
	self.width = 150;
	self.height = 300;
	self.img = "../../images/breakableTerrain3x6.png";
	self.type = "Terrain3x6Breakable";

	var image = new Image();
	image.src = self.img;

	self.draw = function(ctx){
		ctx.drawImage(image,self.x,self.y, self.width, self.height);
	};

	return self;
}