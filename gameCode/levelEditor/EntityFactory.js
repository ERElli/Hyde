EntityFactory = function(levelString,isLevelEditor){
	console.log(levelString);
	var self = {};

	//creating a JSON object from a strin
	let LevelObject = JSON.parse(levelString);
	console.log("Level Object",LevelObject);

	for(let generalType in LevelObject){
		// console.log(generalType);
		// console.log(Object.keys(LevelObject[generalType]).length);
		self[generalType] = {};
		if(generalType === 'enemies' || generalType === 'terrain' || generalType === 'player'){
			for(let id in LevelObject[generalType]){
				let object = LevelObject[generalType][id];
				let mX = object.x;
				let mY = object.y;
				let mObject = self[generalType];

				switch(generalType){
					case "terrain":
						switch(object.type){
							case "Terrain1x1":
								mObject[id] = Terrain1x1(id,mX,mY);
								break;	
							case "Terrain1x1Breakable":
								mObject[id] = Terrain1x1Breakable(id,mX,mY);
								break;
							case "Terrain3x2":
								mObject[id] = Terrain3x2(id,mX,mY);
								break;
							case "Terrain3x2Breakable":
								mObject[id] = Terrain3x2Breakable(id,mX,mY);
								break;
							case "Terrain3x4":
								mObject[id] = Terrain3x4(id,mX,mY);
								break;
							case "Terrain3x4Breakable":
								mObject[id] = Terrain3x4Breakable(id,mX,mY);
								break;
							case "Terrain3x6":
								mObject[id] = Terrain3x6(id,mX,mY);
								break;
							case "Terrain3x6Breakable":
								mObject[id] = Terrain3x6Breakable(id,mX,mY);
								break;
						}
						break;
					case "player":
						self[generalType][id] = Player(id,mX,mY,0,0,Img.playerSmall,null,false);
						break;
					case "enemies":
						switch(object.type){
							case "basic enemy":
								mObject[id] = BasicEnemy(id,mX,mY,0,0,Img.basicEnemy1,'red',null);
								break;
							case "flying enemy":
								mObject[id] = FlyingEnemy(id,mX,mY,0,0,Img.basicEnemy2,'red',null);
								break;
							case "tank enemy":
								mObject[id] = TankEnemy(id,mX,mY,0,0,Img.basicEnemy3,'red',null);
						}
						break;
				}
				if(isLevelEditor){
					mObject[id].y = mObject[id].y+100;
					map.tryToPlaceEntity(mObject[id]);
				}
			}
		}
		
		// console.log(Object.keys(self[generalType]).length);
	}

	self.name = LevelObject.name;
	self.width = LevelObject.width;
	self.height = LevelObject.height;
	console.log("ENTITY FACTORY",self);

	return self;
}