Rectangle = function(id,x,y,width,height){
	var self = {
		id: id,
		type: "Rectangle",
		x: x,
		y: y,
		width: width,
		height: height,
	};

	// Rectangle.list[id] = self;
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	self.color = color;

	self.draw = function() {
		ctx_lg.fillStyle = self.color;
		ctx_lg.fillRect(self.x,self.y,self.width, self.height);
	};

	return self;
};

Rectangle.add = function(rect){
	Rectangle.list[rect.id] = rect;
	console.log("Adding rect: ",rect);
};

Rectangle.update = function() {
	for (var key in Rectangle.list){
		var rect = Rectangle.list[key];
		rect.draw();
	}
};
