Terrain = function(id,x,y,width,height){
	var self = {
		id: id,
		type: "Terrain",
		x: x,
		y: y,
		width: width,
		height: height,
	};
	
	var terrainImage = new Image();
	terrainImage.src = "../../images/buildingTerrain3x6.png";


	self.draw = function() {
		ctx_lg.drawImage(terrainImage, self.x, self.y,width,height);
	};

	return self;
};

Terrain.add = function(terrain) {
	Terrain.list[terrain.id] = terrain;
	console.log("Adding terrain: ",terrain);
};

Terrain.remove = function(terrain) {
	delete Terrain.list[terrain.id];
};

Terrain.update = function() {
	for (var key in Terrain.list){
		var terrain = Terrain.list[key];
		terrain.draw();
	}
};