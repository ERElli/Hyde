var socket = io();
Map = function(width, height,tile_width, tile_height) {
	var rand = Math.random();
	var self = {};
	self.width = width;
	self.height = height;
	self.numTilesX = width/tile_width;
	self.numTilesY = height/tile_height;
	self.tiles = [];
	//self.tiles is only used to make sure that no two entities are placed in the same position

	self.EntityList = {
		enemies: {},
		terrain: {},
		player: {},
		checkpoints: {},
		weapons: {},
		music: {},
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
	//socket.emit('saveLevel',{x:"u"});

	var gridShiftDown = 2; //The grid is shifted down 2 tile widths to make space for the buttons

	self.isFilled = function(x,y){
		return !(Object.keys(self.tiles[x][y]).length === 0 && self.tiles[x][y].constructor === Object);
	};

	self.addToEntityList = function(entity){
		var type = entity.type;
		var id = entity.id;

		//Regex patterns to place objects in their correct lists
		var terrainPattern = new RegExp("Terrain");
		var enemyPattern = new RegExp("enemy");

		//Checking if type matches any of the RegexPatterns
		//Is there a way to use a switch case instead
		//Regex may not be the best way to do this either
		//Maybe switchcase fall-through is better
		if(terrainPattern.test(type)){
			self.EntityList['terrain'][id] = entity;
		}else if(enemyPattern.test(type)){
			self.EntityList['enemies'][id] = entity;
		}

		console.log("Adding "+type+": ", entity);
		console.log("Updated EntityList",self.EntityList);
	};

	//Function to check if the entity, e, can be placed in the spot where the user clicks
	self.tryToPlaceEntity = function(e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - gridShiftDown;
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);
		var filled;
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
			for(var k=x; k<w; k++){
				for(var l=y; l<h; l++){
					self.tiles[k][l].id = e.id;
					self.tiles[k][l].type = e.type;

				}
			}
			self.addToEntityList(e);
		//	socket.emit('saveLevel',{x:x,y:y, w:w, h:h, id: e.id, type: e.type, rand: rand });
		}
	};

	//Function to
	self.removeEntity = function(x,y){
		var i = x/tile_width;
		var j = (y/tile_height)-gridShiftDown;

		var type = self.tiles[i][j].type;
		var id = self.tiles[i][j].id;
		var toBeRemoved;

		if(self.isFilled(i,j)){

			//Regex patterns to place objects in their correct lists
			var terrainPattern = new RegExp("Terrain");
			var enemyPattern = new RegExp("enemy");

			//Checking if type matches any of the RegexPatterns
			if(terrainPattern.test(type)){
				toBeRemoved = self.EntityList['terrain'][id];
				delete self.EntityList['terrain'][id];
			}else if(enemyPattern.test(type)){
				toBeRemoved = self.EntityList['enemies'][id];
				delete self.EntityList['enemies'][id];
			}

			// delete toBeRemoved;
			// var toBeRemoved = self.EntityList[self.tiles[i][j].type][self.tiles[i][j].id];
			// delete self.EntityList[toBeRemoved.type][toBeRemoved.id];
			ctx_lg.clearRect(x,y,toBeRemoved.width,toBeRemoved.height);
			self.makeFreeSpace(toBeRemoved);
			console.log("Removing Entity:",toBeRemoved);
			console.log("Updated EntityList:",self.EntityList);
		}else {
			console.log("Nothing to remove!");
		}
	};

	self.setBackgroundImage = function(imageName){
		self.backgroundImg = new Image();
		self.backgroundImg.src = imageName;
	};

	//Function to clear spaces on the tile array
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
		socket.emit('deleteLevelItem',{x:x,y:y, w:w, h:h, id: e.id, type: e.type, rand: rand });
	};

	//function to draw all entities in EntityList
	self.update = function(){
		for(let type in self.EntityList){
			for(let id in self.EntityList[type]){
				let entity = self.EntityList[type][id];
				entity.draw();
			}
		}
	};

	console.log(self.EntityList);
	return self;
};
