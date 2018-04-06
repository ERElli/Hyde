var socket = io();
EntityFactory = function(levelString,isLevelEditor){
	 console.log(levelString);
	var self = {};

	//creating a JSON object from a string
	// var LevelString = JSON.stringify(levelString);
	// console.log("LEVEL",LevelString);


	let LevelObject = JSON.parse(levelString);
	console.log("Level Object",LevelObject);

	var player;

	for(let generalType in LevelObject[0]){
		console.log(generalType);
		// console.log(Object.keys(LevelObject[generalType]).length);
		if(generalType === 'enemies' || generalType === 'terrain' || generalType === 'player'){
			self[generalType] = {};
			// for(let id in LevelObject[0][generalType][0]){
			for(let i=0;i<LevelObject[0][generalType].length;i++){
				let object = LevelObject[0][generalType][i].items;

				let mID = object.id;
				let mX = object.x;
				let mY = object.y;
				let mObject = self[generalType];
				switch(generalType){
					case "terrain":
						switch(object.type){
							case "Terrain1x1":
								mObject[mID] = Terrain1x1(mID,mX,mY);
								break;
							case "Terrain1x1Breakable":
								mObject[mID] = Terrain1x1Breakable(mID,mX,mY);
								break;
							case "Terrain3x2":
								mObject[mID] = Terrain3x2(mID,mX,mY);
								break;
							case "Terrain3x2Breakable":
								mObject[mID] = Terrain3x2Breakable(mID,mX,mY);
								break;
							case "Terrain3x4":
								mObject[mID] = Terrain3x4(mID,mX,mY);
								break;
							case "Terrain3x4Breakable":
								mObject[mID] = Terrain3x4Breakable(mID,mX,mY);
								break;
							case "Terrain3x6":
								mObject[mID] = Terrain3x6(mID,mX,mY);
								break;
							case "Terrain3x6Breakable":
								mObject[mID] = Terrain3x6Breakable(mID,mX,mY);
								break;
							case "Terrain1x6Breakable":
								mObject[mID] = Terrain1x6Breakable(mID,mX,mY);
								break;
						}
						break;
					case "player":
						let weapID = Math.random();
						let weapon = Pistol(weapID, mX, mY, 0, 0, 25, 25, Img.pistol, 'red', mID);
						mObject[mID] = Player(mID,mX,mY,0,0,Img.playerSmall,weapon,false);
						player = mObject[mID];
						break;
					case "enemies":
						switch(object.type){
							case "basic enemy":
								mObject[mID] = BasicEnemy(mID,mX,mY,0,0,Img.basicEnemy1,'red',null);
								break;
							case "flying enemy":
								mObject[mID] = FlyingEnemy(mID,mX,mY,0,0,Img.basicEnemy2,'red',null);
								break;
							case "tank enemy":
								mObject[mID] = TankEnemy(mID,mX,mY,0,0,Img.basicEnemy3,'red',null);
						}
						break;
				}
				if(isLevelEditor){
					// mObject[id].y = mObject[id].y+100;
					map.tryToPlaceEntity(mObject[mID]);
				}
			}
		}


		// console.log(Object.keys(self[generalType]).length);
	}

	//Giving all enemies a target
	for(let id in self['enemies']){
		self['enemies'][id].target = player;
	}

	self.name = LevelObject[0].level;

	self.width = LevelObject[0].width;
	self.height = LevelObject[0].height;

	console.log("ENTITY FACTORY",self);

	return self;
}
