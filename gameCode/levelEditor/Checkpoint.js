Checkpoint = function(id,type,x,y){
	var self = {};
	self.id = id;
	self.type = type;
	self.x = x;
	self.y = y;
	self.width = 50;
	self.height = 50;
	self.triggered = false;
	
	return self;
}

StandardCheckpoint = function(id,x,y){
	var self = Checkpoint(id,"standard checkpoint",x,y);
	self.img = Img.standardCheckpoint;

	self.draw = function(ctx,isLevelEditor){
		ctx.drawImage(self.img,0,0,self.img.width,self.img.height,self.x,self.y,self.width,self.height);
	}

	return self;
}

FinalCheckpoint = function(id,x,y){
	var self = Checkpoint(id,"final checkpoint",x,y);
	self.img = Img.finalCheckpoint;

	self.draw = function(ctx,isLevelEditor){
		ctx.drawImage(self.img,self.x,self.y, self.img.width, self.img.height);
	}
	return self;
}