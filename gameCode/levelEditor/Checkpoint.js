Checkpoint = function(id,x,y){
	var self = {
		id: id,
		x: x,
		y: y,
		width: 50,
		height: 50,
	};
	
	console.log(self);
	return self;
}

standardCheckpoint = function(id,x,y){
	var self = Checkpoint(id,x,y);
	self.type = "standard Checkpoint";
	self.img = Img.standardCheckpoint;

	self.draw = function(ctx,isLevelEditor){
		ctx.drawImage(self.img,self.x,self.y, self.img.width, self.img.height);
	}

	return self;
}

standardCheckpoint = function(id,x,y){
	var self = Checkpoint(id,x,y);
	self.type = "final checkpoint";
	self.img = Img.finalCheckpoint;

	self.draw = function(ctx,isLevelEditor){
		ctx.drawImage(self.img,self.x,self.y, self.img.width, self.img.height);
	}

	return self;
}