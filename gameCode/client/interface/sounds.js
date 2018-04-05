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
	self.worldTwo=new sound(pathToRoot+"client/interface/soundFX/atmospheric/worldTwo.wav");
	self.worldTwo.volume=0.25;
	self.pistol=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/pistol.wav");
	self.pistol.volume=0.5;
	self.shotgun=new sound(pathToRoot+"client/interface/soundFX/weaponEffects/shotgun.wav");
	self.shotgun.volume=0.5;
	return self;
}
