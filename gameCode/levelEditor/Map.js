var socket = io();

Map = function(width, height,tile_width, tile_height) {
	var nameL ;
	var self = {};
	self.width = width;
	self.height = height;
	self.numTilesX = width/tile_width;
	self.numTilesY = height/tile_height;
	self.tiles = [];
	self.checkpointTiles = [];
	self.weaponTiles = [];
	//self.tiles is only used to make sure that no two entities are placed in the same position

	self.ObjectList = {
		enemies: {},
		terrain: {},
		player: {},
		checkpoints: {},
		weapons: {},
		// music: {},
		// ghost: {},
	};
	//self.ObjectList is a list of lists of objects. There will be list for terrain, one for enemies, one for weapons, etc.
	//The format of this list is still flexible

	//Filling tiles with empty objects
	for(var i=0; i<self.numTilesX; i++){
		self.tiles.push([]);
		self.checkpointTiles.push([]);
		self.weaponTiles.push([]);
		for(var j=0; j<self.numTilesY; j++){
			self.tiles[i].push({});
			self.checkpointTiles[i].push({});
			self.weaponTiles[i].push({});
		}
	}
	//Collection of the different tile maps
	var tileMaps  = [self.checkpointTiles, self.tiles, self.weaponTiles];

	var gridShiftDown = 2; //The grid is shifted down 2 tile widths to make space for the buttons

	//Function to return the list objects of type t are stored in.
	self.getList = function(t){
		//Checking if type matches a reg ex
		if(t.includes("Terrain") || t.includes("spike") || t.includes("platform")){
			console.log("PLATFORM LIST");
			return self.ObjectList['terrain'];
		}else if(t.includes("enemy")){
			return self.ObjectList['enemies'];
		}else if(t.includes("player")){
			return self.ObjectList['player'];
		}else if(t.includes("checkpoint")){
			return self.ObjectList['checkpoints'];
		}else if(t.includes("weapon")){
			return self.ObjectList['weapons'];
		}
	};

	//Function to check if tile at coordinate x,y is filled
	self.isFilled = function(tileMap,x,y){
		return !(Object.keys(tileMap[x][y]).length === 0 && tileMap[x][y].constructor === Object);
	};

	//Function to add entity to it's corresponding list
	self.addToObjectList = function(object){
		let id = object.id;
		let type = object.type;

		var list = self.getList(type);

		if(type === "player"){
			let size = Object.keys(list).length;
			if(size === 1){
				for(var key in list){
					self.makeFreeSpace(self.tiles,list[key]);
				}
				delete list;
				self.ObjectList['player'] = {};
				self.ObjectList['player'][id] = object;
			}
		}

		if(state == "new"){
			console.log("inside console");
			nameL = levelNameField.value;
		}
		else if (state == "load"){
			nameL =levelNameField2.value;
		}
		console.log("the nameL is "+nameL);

		console.log("PLATFORM being added",object);
		list[id] = object;
		var temp = type;
		console.log("field 1: "+levelNameField.value+ " field 2:" + levelNameField2.value+ " name:"+ nameL);
		//console.log("awesomenoss"+levelNameField1.value);
	//	console.log("not awesomenoss"+nameL);
		//adding objects to the database



		if (type.includes("enemy") ){
			socket.emit('addLevelItem', {level:nameL, x: object.x, y:object.y, id: object.id, vx: object.vx, vy: object.vy, type: object.type});
		}else if(type.includes("player")){
			socket.emit('addPlayerItem', {level:nameL, x: object.x, y:object.y, id: object.id, vx: object.vx, vy: object.vy, type: object.type});
		}else if(type.includes("Terrain")){
			socket.emit('addTerrainItem', {level:nameL,x: object.x, y:object.y, id: object.id, type: object.type});
		}
		else if (type.includes("checkpoint")){
			socket.emit('addCheckpointItem', {level:nameL,x: object.x, y:object.y, id: object.id, type: object.type});
		}
		else if (type.includes("weapon")){
			socket.emit('addWeaponItem', {level:nameL,x: object.x, y:object.y, id: object.id, type: object.weaponType});
		}
		//{x: object.x, y:object.y, id: object.id, vx: object.vx, vy: object.vy, type: object.type}
		console.log("Adding "+type+": ", object);
		console.log("Updated ObjectList",self.ObjectList);
	};

	//Function to check if the object, o, can be placed in the spot where the user clicks
	self.tryToPlaceEntity = function(object){
		console.log(object);
		var x = object.x/tile_width;
		var y = (object.y/tile_height) - gridShiftDown;
		var w = x + (object.width/tile_width);
		var h = y + (object.height/tile_height);
		var type = object.type;
		var filled = true;
		var tileMap;

		//Referencing the appropriate tileMap;
		if(type.includes("enemy") || type.includes("Terrain") || type.includes("player") || type.includes("spike") || type.includes("platform")){
			console.log("SPIKE TRAP TILEMAP");
			tileMap = self.tiles;
			//console.log("ENTITY TILE MAP",tileMap);
		}else if(type.includes("checkpoint")){
			tileMap = self.checkpointTiles;
			console.log("CHECKPOINT TILE MAP",tileMap);
		}else if(type.includes("weapon") || type.includes("assault") || type.includes("shotgun") || type.includes("sword")){
			console.log("TRY TO PLACE WEAPONS");

			tileMap = self.weaponTiles;
		}

		//Checking if tiles in tileMap are filled
		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				filled = self.isFilled(tileMap,i,j);
				if(filled){
					break;
				}
					/* do not delete
					console.log("Cell: ",i,j);
					console.log("Filled:", filled);
					*/
			}
			if(filled){
				console.log(tileMap[i][j].type,"already placed in this location");
				break;
			}
		}

		if(!filled){
			for(var k=x; k<w; k++){
				for(var l=y; l<h; l++){
					tileMap[k][l].id = object.id;
					tileMap[k][l].type = object.type;
				}
			}
			self.addToObjectList(object);
		}
	};

	//Function to remove entity from list
	self.removeEntity = function(x,y){
		let i = x/tile_width;
		let j = (y/tile_height)-gridShiftDown;
		let currentMap;
		let toBeRemoved;

		for(let map in tileMaps){
			console.log("MAP COUNT",map);
			currentMap = tileMaps[map];

			let type = currentMap[i][j].type;
			let id = currentMap[i][j].id;
			let filled = self.isFilled(currentMap,i,j);

			// console.log("COUNT IS FILLED",isFilled(currentMap,i,j));
			if(filled/*self.isFilled(currentMap,i,j)*/){
				console.log("FILLED LOOP",map);
				let list = self.getList(type);
				toBeRemoved = list[id];
				if(list[id]!= {}){
					console.log("TO BE REMOVED",toBeRemoved);
					delete list[id];
					console.log("UPDATE LIST",self.ObjectList);

					self.makeFreeSpace(currentMap,toBeRemoved);
					console.log("MAKE FREE SPACE ENTITY:",toBeRemoved);
					gui.fg_ctx.clearRect(x,y,toBeRemoved.width, toBeRemoved.height);
					console.log("delete here " + nameL);
					if (type.includes("enemy") ){
						socket.emit('deleteLevelItem', {level:nameL, x: toBeRemoved.x, y:toBeRemoved.y, id: toBeRemoved.id, vx: toBeRemoved.vx, vy: toBeRemoved.vy, type: toBeRemoved.type});
					} else if (type.includes("player")){
						socket.emit('deletePlayerItem', {level:nameL, x: toBeRemoved.x, y:toBeRemoved.y, id: toBeRemoved.id, vx: toBeRemoved.vx, vy: toBeRemoved.vy, type: toBeRemoved.type});
					}else if (type.includes("Terrain")){
						socket.emit('deleteTerrainItem', {level:nameL, x: toBeRemoved.x, y:toBeRemoved.y, id: toBeRemoved.id, type: toBeRemoved.type});
					}
					else if (type.includes("checkpoint")){
				socket.emit('deleteCheckpointItem', {level:nameL, x: toBeRemoved.x, y:toBeRemoved.y, id: toBeRemoved.id, type: toBeRemoved.type});
			}
			else if (type.includes("weapon")){
				socket.emit('deleteWeaponItem', {level:nameL, x: toBeRemoved.x, y:toBeRemoved.y, id: toBeRemoved.id, type: toBeRemoved.weaponType});
			}

				}
			}else{
				console.log("Nothing to remove on this map!");
			}


		}
	};

	self.setBackgroundImage = function(worldName){
		socket.emit('addBackgroundItem', imageName);
		self.Background = worldName;
	};

	//Function to clear spaces on the tile array
	self.makeFreeSpace = function(tileMap,e){
		var x = e.x/tile_width;
		var y = (e.y/tile_height) - gridShiftDown;
		var w = x + (e.width/tile_width);
		var h = y + (e.height/tile_height);

		for(var i=x; i<w; i++){
			for(var j=y; j<h; j++){
				tileMap[i][j] = {};
			}
		}
	};

	//function to draw all objects in ObjectList
	self.update = function(){
		var object = null;
		for(let type in self.ObjectList){
			for(let id in self.ObjectList[type]){
				object = self.ObjectList[type][id];
				object.draw(gui.fg_ctx,true);
			}
		}
	};


	/*
		function to download json level files
	*/
	self.convertToString = function(){
		var form = document.getElementById("form");
		var levelName = document.getElementById("levelName").value;
		var filename = levelName+".json";
		var Level = self.makeLevel();
		Level.name = levelName;

		var str = JSON.stringify(Level).toString();
		var a = document.createElement("a");
		document.body.appendChild(a);
		var file = new Blob([str],{type: 'application/json'});
		a.href = URL.createObjectURL(file);
		a.download = filename;
		a.click();
	};



	/*
		Function to make an Level Object from the ObjectList and other attributes
	*/
	self.makeLevel = function(){
		var Level = {};

		Level.width = self.width;
		Level.height = self.height;
		Level.enemies = self.ObjectList.enemies;
		Level.terrain = self.ObjectList.terrain;
		Level.player = self.ObjectList.player;
		for(var type in Level){
			for(var key in Level[type]){
				Level[type][key].y = (Level[type][key].y)-100;
			}
		}
		console.log("Level Object:",Level);
		return Level;
	}

	return self;
};


/*
[{
"_id":"5ac3ceec22bb96f1b7fcf90b","level":"level1","enemies":[{"id":0.7827006398238396,"items":{"x":350,"y":250,"vx":0,"vy":0,"id":0.7827006398238396,"type":"basic enemy"}},{"id":0.13818070969281204,"items":{"x":450,"y":200,"vx":0,"vy":0,"id":0.13818070969281204,"type":"basic enemy"}}],"player":[{"id":0.3154181557039857,"items":{"x":500,"y":250,"vx":0,"vy":0,"id":0.3154181557039857,"type":"player"}}]
}]
*/
