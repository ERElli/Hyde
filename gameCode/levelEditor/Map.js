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
				self.tiles[i].push({});
		}
	}

	var offset = 2; //The grid is shifted down 2 tile widths to make space for the buttons

	self.placeEntity = function(e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - offset;
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);


		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				filled = !(Object.keys(self.tiles[i][j]).length === 0 && self.tiles[i][j].constructor === Object);
				if(filled){
					break;
				}
					/* do not delete
					console.log("Cell: ",i,j);
					console.log("Filled:", filled);
					*/
				
			}
			if(filled){
				console.log(self.tiles[i][j].type,"already placed in this location");
				break;
			}
		}

		if(!filled){
			// Terrain.add(e);
			for(var k=x; k<w; k++){
				for(var l=y; l<h; l++){
					self.tiles[k][l].id = e.id;
					self.tiles[k][l].type = e.type;

				}
			}

			switch(e.type){
				case "Terrain":
					Terrain.add(e);
					break;
			}
		}
	};

	self.removeEntity = function(x,y){
		var i = x/tile_width;
		var j = (y/tile_height)-offset;

		console.log("type",self.tiles[i][j].type);

		switch(self.tiles[i][j].type){
			case "Terrain":
				toBeRemoved = Terrain.list[self.tiles[i][j].id];
				Terrain.remove(toBeRemoved);
				console.log(Terrain.list);
				break;
			default:
				console.log("Nothing to remove");
		}	

		self.makeFreeSpace(toBeRemoved);
	};

	self.makeFreeSpace = function(e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - offset;
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);

		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				self.tiles[i][j] = {};
			}
		}
	};

	return self;
};