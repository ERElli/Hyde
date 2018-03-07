Map = function(width, height,tile_width, tile_height) {
	var self = {};
	self.width = width;
	self.height = height;
	self.numTilesX = width/tile_width;
	self.numTilesY = height/tile_height;
	self.tiles = [];
	
	for(var i=0; i<self.numTilesX; i++){
		self.tiles.push([]);
		for(var j=0; j<self.numTilesY; j++){
				self.tiles[i].push(0);
		}
	}

	var offset = 2; //The grid is shifted down 2 tile widths to make space for the buttons

	self.placeEntity = function(e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - offset;
		console.log("position: ",x,y);
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);

		var filled;

		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				filled = (self.tiles[i][j] == 1);
				if(filled){
					break;
				}
				console.log(i,j);
				console.log("Filled:", filled);
			}
			if(filled){
				console.log("Entity already placed in this location");
				break;
			}
		}

		if(!filled){
			Terrain.add(e);
			for(var k=x; k<w; k++){
				for(var l=y; l<h; l++){
					self.tiles[k][l] = 1;
				}
			}
			console.table(self.tiles);
		}
	};

	return self;
};