//
Map = function(width, height,tile_width, tile_height) {
	var self = {};
	self.width = width;
	self.height = height;
	self.numTilesX = width/tile_width;
	self.numTilesY = height/tile_height;
	self.tiles = [];
	//self.tiles is only used to make sure that no two entities are placed in the same position

	self.ObjectList = {
		enemies: {},
		terrain: {},
		player: {},
		// checkpoints: {},
		// weapons: {},
		// music: {},
		// ghost: {},
	};
	//self.ObjectList is a list of lists of objects. There will be list for terrain, one for enemies, one for weapons, etc.
	//The format of this list is still flexible

	//Filling tiles with empty objects
	for(var i=0; i<self.numTilesX; i++){
		self.tiles.push([]);
		for(var j=0; j<self.numTilesY; j++){
			self.tiles[i].push({});
		}
	}

	var gridShiftDown = 2; //The grid is shifted down 2 tile widths to make space for the buttons

	//Function to check if tile at coordinate x,y is filled
	self.isFilled = function(x,y){
		return !(Object.keys(self.tiles[x][y]).length === 0 && self.tiles[x][y].constructor === Object);
	};


	//Function to return the list objects of type t are stored in.
	self.getList = function(t){
		//Regex patterns to place objects in their correct lists
		let terrainPattern = new RegExp("Terrain");
		let enemyPattern = new RegExp(' enemy');
		let playerPattern = new RegExp('player');

		//Checking if type matches any of the RegexPatterns
		//Is there a way to use a switch case instead
		//Regex may not be the best way to do this either
		//Maybe switchcase fall-through is better
		if(terrainPattern.test(t)){
			return self.ObjectList['terrain'];
		}else if(enemyPattern.test(t)){
			return self.ObjectList['enemies'];
		}else if(playerPattern.test(t)){
			return self.ObjectList['player'];
		}
	}

	//Function to add entity to it's corresponding list
	self.addToObjectList = function(object){
		let id = object.id;
		let type = object.type;

		console.log("TYPE",type);
		let list = self.getList(type);
		list[id] = object;

		console.log("Adding "+type+": ", object);
		console.log("Updated ObjectList",self.ObjectList);
	};

	//Function to check if the object, o, can be placed in the spot where the user clicks
	self.tryToPlaceEntity = function(o){
		var x = o.x/tile_width;
		var y = (o.y/tile_height) - gridShiftDown;
		var w = x + (o.width/tile_width);
		var h = y + (o.height/tile_height);
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
					self.tiles[k][l].id = o.id;
					self.tiles[k][l].type = o.type;

				}
			}
			self.addToObjectList(o);
		}
	};

	//Function to remove entity from list
	self.removeEntity = function(x,y){
		let i = x/tile_width;
		let j = (y/tile_height)-gridShiftDown;

		let type = self.tiles[i][j].type;
		let id = self.tiles[i][j].id;
		let toBeRemoved;

		if(self.isFilled(i,j)){
			let list = self.getList(type);
			toBeRemoved = list[id];
			delete list[id];

			gui.fg_ctx.clearRect(x,y,toBeRemoved.width,toBeRemoved.height);
			self.makeFreeSpace(toBeRemoved);
			console.log("Removing Entity:",toBeRemoved);
			console.log("Updated ObjectList:",self.ObjectList);
		}else {
			console.log("Nothing to remove!");
		}
	};

	self.setBackgroundImage = function(imageName){
		self.img = imageName;
		self.backgroundImg = new Image();
		self.backgroundImg.src = self.img;
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
	};

	//function to draw all objects in ObjectList
	self.update = function(){
		let object = null;
		for(let type in self.ObjectList){
			for(let id in self.ObjectList[type]){
				object = self.ObjectList[type][id];
				object.draw(gui.fg_ctx,true);
			}
		}
	};


	// self.convertToString = function(){
	// 	var filename = "levelEditor.txt";

	// 	var str = JSON.stringify(self.ObjectList).toString();
	// 	var a = document.createElement("a");
	// 	document.body.appendChild(a);
	// 	var file = new Blob([str],{type: 'application/json'});
	// 	a.href = URL.createObjectURL(file);
	// 	a.download = filename;
	// 	a.click();
	// 	console.log(a);


		// console.log("Stringified:",str);
		// var parsed = JSON.parse(str);
		// console.log("Parsed:",parsed);

		// var file = new File([""],filename,self.ObjectList);
		// console.log(file);

	//};

	self.makeLevel = function(){
		var Level = {};
		Level.width = self.width;
		Level.height = self.height;
		Level.name = "1-1";
		Level.enemies = self.ObjectList.enemies;
		Level.terrain = self.ObjectList.terrain;
		Level.player = self.ObjectList.player;
		console.log("Level Object:",Level);
	}

	console.log(self.ObjectList);
	return self;
};
