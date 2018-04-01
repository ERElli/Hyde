Animation=function(){
	var self={};
	//Updates animation stage, takes in an entity,counter of current animation and number of animations per sequence.
	self.updateEntityAnimation=function(entity,animationCounter,numAnimations){
		if(entity.vx==0){
			return 0;
		}
		if(frameCount%5==0){
			animationCounter++;
				if(animationCounter==numAnimations){
					animationCounter=0;
				}
		}
		return animationCounter;
	};

	//returns players direction based on aim angle
	self.getPlayDirection=function(entity){
		if(entity.aimAngle<=90 && entity.aimAngle>-90){
			return 0;
		} 
		else{
			return 1;
		}
	};
	//returns entity direction based on vx
	self.getImgDir=function(entity){
		if(entity.vx>=0){
			return 0;
		}
		else{
			return 1;
		}
	};
	//Weapon animation;
	self.getWeaponPosition=function(entity){
		newX=entity.x;
		if(entity.isWeapon){
			var dir=self.getPlayDirection(player);
			if(dir==0){
				newX=newX+30;
			}else{
				newX=newX-30;
			}
		}else{}
		return newX;
	}
	
	return self;
}

