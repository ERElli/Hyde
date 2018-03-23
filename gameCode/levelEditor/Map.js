Map = function(width, height,tile_width, tile_height) {
	var self = {};
	self.width = width;
	self.height = height;
	self.numTilesX = width/tile_width;
	self.numTilesY = height/tile_height;
	self.tiles = [];
	//self.tiles is only used to make sure that no two entities are placed in the same position
	self.EntityList = {
		terrain: {},
		enemy1: {},
		enemy2: {},
	};
	//self.objects is list of list of entities. There will be list for terrain, one for enemies, one for weapons, etc.
	//The format of this list is still flexible
	
	//Filling tiles with empty objects
	for(var i=0; i<self.numTilesX; i++){
		self.tiles.push([]);
		for(var j=0; j<self.numTilesY; j++){
				self.tiles[i].push({});
		}
	}

	var gridShiftDown = 2; //The grid is shifted down 2 tile widths to make space for the buttons

	self.isFilled = function(x,y){
		return !(Object.keys(self.tiles[x][y]).length === 0 && self.tiles[x][y].constructor === Object);
	};

	self.addToEntityList = function(entity){
		var type = entity.type;
		var id = entity.id;

		var list = self.EntityList[type];
		list[id] = entity;
	};

	//Function to check if the entity, e, can be placed in the spot where the user clicks
	self.tryToPlaceEntity = function(e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - gridShiftDown;
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);

		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				filled = self.isFilled(i,j);
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
			self.addEntity(e);
		}
	};

	self.addEntity = function(e){
		switch(e.type){
			case "Terrain":
				self.addToEntityList(e);
				break;
			case "enemy1":
				self.addToEntityList(e);
				break;
			case "enemy2":
				self.addToEntityList(e);
				break;
			case "enemy3":
				self.addToEntityList(e);
				break;
		}
	};

	self.removeEntity = function(x,y){
		var i = x/tile_width;
		var j = (y/tile_height)-gridShiftDown;

		if(self.isFilled(i,j)){
			var toBeRemoved = self.EntityList[self.tiles[i][j].type][self.tiles[i][j].id];
			delete self.EntityList[toBeRemoved.type][toBeRemoved.id];
			ctx_lg.clearRect(x,y,toBeRemoved.width,toBeRemoved.height);
			self.makeFreeSpace(toBeRemoved);
		}			
	};

	self.setBackgroundImage = function(imageName){
		self.backgroundImg = new Image();
		self.backgroundImg.src = imageName;
	};

	self.makeFreeSpace = function(e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - gridShiftDown;
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);

		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				self.tiles[i][j] = {};
			}
		}
	};

	self.update = function(){
		for(var type in self.EntityList){
			for(var id in self.EntityList[type]){
				self.EntityList[type][id].draw();
			}
		}
	};

	self.remove = function(e){
		delete self.EntityList[e.type][e.id];
	};

	return self;
};