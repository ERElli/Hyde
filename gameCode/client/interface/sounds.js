function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

Sound=function(pathToRoot){
	var self={};
	self.worldOne=new sound(pathToRoot+"client/interface/soundFX/atmospheric/worldOne.mp3");
	self.worldTwo=new sound(pathToRoot+"client/interface/soundFX/atmospheric/worldTwo.wav");
	self.worldThree=new sound(pathToRoot+"client/interface/soundFX/atmospheric/worldTwo.wav");
	self.worldOne.volume=0.25;
	self.worldTwo.volume=0.25;
	self.worldThree.volume=0.25;
	
	self.pistol=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/pistol.wav");
	self.shotgun=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/shotgun.wav");
	self.assaultRifle=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/assaultRifle.wav");
	self.sword=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/sword.wav");
	self.weaponPickUp=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/weaponPickup.wav");
	self.pistol.volume=0.2;
	self.shotgun.volume=0.2;
	self.assaultRifle.volume=0.2;
	self.sword.volume=0.2;

	self.bigJump=new sound(pathToRoot+"client/interface/soundFX/playerSounds/bigPlayer/bigJump.wav");
	self.bigHurt=new sound(pathToRoot+"client/interface/soundFX/playerSounds/bigPlayer/bigHurt.wav");
	self.smallJump=new sound(pathToRoot+"client/interface/soundFX/playerSounds/smallPlayer/smallJump.wav");
	self.smallJump=new sound(pathToRoot+"client/interface/soundFX/playerSounds/smallPlayer/smallHurt.wav");
	self.death=new sound(pathToRoot+"client/interface/soundFX/playerSounds/deathSound.wav");
	
	self.transform=new sound(pathToRoot+"client/interface/soundFX/transform.wav");
	self.winGame=new sound(pathToRoot+"client/interface/soundFX/WinGame.wav");
	self.checkpoint=new sound(pathToRoot+"client/interface/soundFX/checkpoint.wav");
	
	return self;
}
