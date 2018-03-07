Terrain = function(id,x,y,width,height){
	var self = {
		id: id,
		type: "Terrain",
		x: x,
		y: y,
		width: width,
		height: height,
	};
	
	//var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	//self.color = color;

	var terrainImage = new Image();
	terrainImage.src = "../../images/buildingTerrain3x6.png";


	self.draw = function() {
		 //ctx_lg.fillStyle = self.color;
		 //ctx_lg.fillRect(self.x,self.y,self.width, self.height);

		ctx_lg.drawImage(terrainImage, self.x, self.y,width,height);
	}

	console.log(self);
	return self;
}

Terrain.add = function(terrain) {
	Terrain.list[terrain.id] = terrain;
	console.log("Adding terrain: ",terrain);
}

Terrain.update = function() {
	for (var key in Terrain.list){
		var rect = Terrain.list[key];
		rect.draw();
	}
}