Img = function(pathToRoot) {
	var self = {};
	//background images
	self.background1= new Image();
	self.background1.src="img/worldOneBackground.png";
	self.background2= new Image();
	self.background2.src="img/worldTwoBackground.png";
	self.background3= new Image();
	self.background3.src="img/worldThreeBackground.png";
	//player images	
	self.playerSmall = new Image();
	self.playerSmall.src = "img/movingCharacter.png";
	self.playerBig = new Image();
	self.playerBig.src = "img/bigGuy.png";
	//enemy images
	self.basicEnemy1=new Image();
	self.basicEnemy1.src=pathToRoot+"client/interface/img/enemy1.png";
	self.basicEnemy2=new Image();
	self.basicEnemy2.src="img/enemy2.png";
	self.basicEnemy3=new Image();
	self.basicEnemy3.src="img/enemy3.png";
	
	self.bearEnemy=new Image();
	self.bearEnemy.src="img/bear.png";
	
	
	//weapons and ammo
	self.pistol=new Image();
	self.pistol.src="img/pistolWeapon.png";
	self.assaultWeapon=new Image();
	self.assaultWeapon.src="img/assaultWeapon.png";
	self.swordWeapon=new Image();
	self.swordWeapon.src="img/swordWeapon.png";
	self.shotgun=new Image();
	self.shotgun.src="img/shotgun.png";
	self.bullet=new Image();
	self.bullet.src="img/bullet.png";

	self.terrain1x1=new Image();
	self.terrain1x1.src="img/terrain/terrain3x2.png";

	return self;
};

