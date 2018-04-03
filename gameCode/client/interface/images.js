Img = function(pathToRoot) {
	var self = {};
	//background images
	self.background1= new Image();
	self.background1.src= pathToRoot+"client/interface/img/background/worldOneBackground.png";
	self.background2= new Image();
	self.background2.src= pathToRoot+"client/interface/img/background/worldTwoBackground.png";
	self.background3= new Image();
	self.background3.src= pathToRoot+"client/interface/img/background/worldThreeBackground.png";
	//player images	
	self.playerSmall= new Image();
	self.playerSmall.src= pathToRoot+"client/interface/img/entity/humanoid/movingCharacter.png";
	self.playerBig= new Image();
	self.playerBig.src= pathToRoot+"client/interface/img/entity/humanoid/bigGuy.png";
	//enemy images
	self.basicEnemy1= new Image();
	self.basicEnemy1.src= pathToRoot+"client/interface/img/entity/humanoid/basicEnemy.png";
	self.basicEnemy2= new Image();
	self.basicEnemy2.src= pathToRoot+"client/interface/img/entity/humanoid/flyingEnemy.png";
	self.basicEnemy3= new Image();
	self.basicEnemy3.src= pathToRoot+"client/interface/img/enemy3.png";
	
	self.bearEnemy= new Image();
	self.bearEnemy.src= pathToRoot+"client/interface/img/bear.png";
	
	self.infinity=new Image();
	self.infinity.src= pathToRoot+"client/interface/img/inf.png";
	//weapons and ammo
	self.pistol= new Image();
	self.pistol.src= pathToRoot+"client/interface/img/entity/weapon/pistolAttack.png";
	self.assaultWeapon= new Image();
	self.assaultWeapon.src= pathToRoot+"client/interface/img/entity/weapon/assaultAttack.png";
	self.swordWeapon= new Image();
	self.swordWeapon.src= pathToRoot+"client/interface/img/entity/weapon/swordAttack.png";
	self.shotgun= new Image();
	self.shotgun.src= pathToRoot+"client/interface/img/entity/weapon/shotgunAttack.png";
	self.bullet= new Image();
	self.bullet.src= pathToRoot+"client/interface/img/bullet.png";

	//Terrain Images
	self.terrain1x1= new Image();
	self.terrain1x1.src= pathToRoot+"client/interface/img/terrain/terrain3x2.png";
	self.terrain1x1Breakable= new Image();
	self.terrain1x1Breakable.src= pathToRoot+"client/interface/img/terrain/breakableTerrain3x2.png";
	self.terrain3x2= new Image();
	self.terrain3x2.src= pathToRoot+"client/interface/img/terrain/terrain3x2.png";
	self.terrain3x2Breakable= new Image();
	self.terrain3x2Breakable.src= pathToRoot+"client/interface/img/terrain/breakableTerrain3x2.png";
	self.terrain3x4= new Image();
	self.terrain3x4.src= pathToRoot+"client/interface/img/terrain/terrain3x4.png";
	self.terrain3x4Breakable= new Image();
	self.terrain3x4Breakable.src= pathToRoot+"client/interface/img/terrain/breakableTerrain3x4.png";
	self.terrain3x6= new Image();
	self.terrain3x6.src= pathToRoot+"client/interface/img/terrain/terrain3x4.png";
	self.terrain3x6Breakable= new Image();
	self.terrain3x6Breakable.src= pathToRoot+"client/interface/img/terrain/breakableTerrain3x4.png";

	return self;
};

