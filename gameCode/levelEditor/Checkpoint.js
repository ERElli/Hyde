Checkpoint = function(id,x,y,width,height){
	var self = {
		id: id,
		type: "Checkpoint",
		x: x,
		y: y,
		width: width,
		height: height,
	};
	
	//var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	//self.color = color;

	var checkpointImage = new Image();
	terrainImage.src = "../../images/checkpoint.png";


	self.draw = function() {
		 //ctx_lg.fillStyle = self.color;
		 //ctx_lg.fillRect(self.x,self.y,self.width, self.height);

		ctx_lg.drawImage(checkointImage, self.x, self.y,width,height);
	}

	console.log(self);
	return self;
}

Checkpoint.add = function(checkpoint) {
	checkpoint.list[checkpoint.id] = checkpoint;
	console.log("Adding terrain: ",terrain);
}

Checkpoint.update = function() {
	for (var key in Checkpoint.list){
		var rect = Checkpoint.list[key];
		rect.draw();
	}
}