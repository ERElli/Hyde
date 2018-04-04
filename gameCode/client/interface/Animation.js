Animation=function(){
	var self={};

	//Updates animation stage, takes in an entity,counter of current animation and number of animations per sequence.
	self.updateEntityAnimation=function(en,numAnimations){
		if(en.vx==0){
			return 0;
		}
		if(frameCount%5==0){
			en.aniCount++;
			if(en.aniCount==numAnimations){
				en.aniCount=0;
			}
		}
	};

	//returns players direction based on aim angle
	self.getPlayDirection=function(entity){
		//Checks if entity is player since image is reversed from other entities
		if(entity.type=='player' || entity.type=="pistol" ||entity.type=="assaultRifle" ||entity.type=="shotgun"||entity.type=="sword"){
			if(entity.aimAngle<=90 && entity.aimAngle>-90){
				return 0;
			} 
			else{
				return 1;
			}
		}else{
			if(entity.aimAngle<=90 && entity.aimAngle>-90){
				return 1;
			} 
			else{
				return 0;
			}

		}
	};
	//returns entity direction based on vx
	/*self.getImgDir=function(entity){
		if(entity.vx>=0){
			return 0;
		}
		else{
			return 1;
		}
	};*/
	//Weapon animation;
	self.getWeaponPosition=function(entity){
		newX=entity.x;
		if(entity.isWeapon){
			var dir=self.getPlayDirection(entity);
			if(dir==0){
				newX=newX+30;
			}else{
				newX=newX-30;
			}
		}else{}
		return newX;
	};
	//Fire animation for guns
	self.fireAnimation=function(entity,numAnimation){
		n=numAnimation;
		en=entity;
		return n;		
	};
	//Player jumping animation;
	self.playJumpAnimation=function(entity,playDir){
		if(playDir==0){
			entity.aniCount=0;	
		}else{
			entity.aniCount=1;
		}
		playDir=2;
		return playDir;	
	};
		
	return self;
}

