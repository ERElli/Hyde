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