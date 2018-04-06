Animation=function(){
	var self={};

	//Updates animation stage, takes in an entity,counter of current animation and number of animations per sequence.
	self.updateEntityAnimation=function(en,numAnimations){
		if(en.vx==0){
			return  0;
		}
		if(frameCount%5==0){			
			en.aniCount++;
			if(en.aniCount==numAnimations){
				en.aniCount=1;
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
	//Sword animation
	self.swordAnimation=function(entity,numAnimation,x,y,img,fW,fH){
		Sound.sword.play();
		n=Math.floor(numAnimation/2);
			switch(numAnimation){
				case 0:
					if(entity.x>x){
						theX=x-entity.width;
					}
					else{
						theX=x+entity.width;
					}
					theY=y-5;
					break;
				case 1:
					if(entity.x>x){
						theX=x-entity.width;
					}
					else{
						theX=x+entity.width;
					}
					theY=y-10;
					break;
				case 2:
					if(entity.x>x){
						theX=x-entity.width;
					}
					else{
						theX=x+entity.width;
					}
					theY=y-15;
					break;
				case 3:
					if(entity.x>x){
						theX=x-entity.width;
					}
					else{
						theX=x+entity.width;
					}
					theY=y-20;
					break;
				case 4:
					if(entity.x>x){
						theX=x-entity.width;
					}
					else{
						theX=x+entity.width;
					}
					theY=y-25;
					break;
				case 5:
					if(entity.x>x){
						theX=x-entity.width+5;
					}
					else{
						theX=x+entity.width-5;
					}
					theY=y-30;
					break;
				case 6:
					if(entity.x>x){
						theX=x-entity.width+10;
					}
					else{
						theX=x+entity.width-10;
					}
					theY=y-35;
					break;
				case 7:
					if(entity.x>x){
						theX=x-entity.width+15;
					}
					else{
						theX=x+entity.width-15;
					}
					theY=y-40;
					break;
				case 8:
					if(entity.x>x){
						theX=x-entity.width+20;
					}
					else{
						theX=x+entity.width-20;
					}
					theY=y-45;
					break;
			}
			gui.quickAniWeaponDraw(img,entity,gui.fg_ctx,n,dir,fW,fH,theX,theY);

	};
	//Fire animation for guns
	self.fireAnimation=function(entity,numAnimation,x){
		n=Math.floor(numAnimation/2);
		if(entity.type=="assaultRifle"){
			Sound.assaultRifle.play();
			if(numAnimation==0){

			}else if(numAnimation%8<=2){

				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepFour,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepFour,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
			else if(numAnimation%8<5){
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepTwo,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepTwo,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
			else if(numAnimation%8<7){
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepThree,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepThree,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
			else{
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepFour,x-entity.width/2,entity.y-entity.height/4.5,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepFour,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
		}
		else{
			if(numAnimation==0){
			}else if(numAnimation<=2){
				if (entity.type=="pistol"){
					Sound.pistol.play();
				}else{
					Sound.shotgun.play();
				}
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepOne,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepOne,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
			else if(numAnimation<5){
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepTwo,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepTwo,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
			else if(numAnimation<7){
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepThree,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepThree,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
			else{
				if(entity.x>x){
					gui.aniDraw(Img.muzzleFlash.stepFour,x-entity.width/2,entity.y-entity.height/7,40,25);
				}
				else{
					gui.aniDraw(Img.muzzleFlash.stepFour,x+entity.width/2,entity.y-entity.height/7,40,25);
				}
			}
		}
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

	self.breakable1x6=function(entity,aniStep){
			fW=Img.terrain1x6Ani.width/3;
		if(aniStep<=4){

			aniX=0;

			gui.onlyAnimation(Img.terrain1x6Ani,entity,gui.fg_ctx,aniX,fW,150,300,entity.x-25,entity.y-300);
		}else if(aniStep<=8){
			aniX=1;
			gui.onlyAnimation(Img.terrain1x6Ani,entity,gui.fg_ctx,aniX,fW,150,300,entity.x-25,entity.y-300);


		}else if(aniStep<=12){
			aniX=2;
			gui.onlyAnimation(Img.terrain1x6Ani,entity,gui.fg_ctx,aniX,fW,150,300,entity.x-25,entity.y-300);
		}else{

		}
	};
	self.transformAnimation=function(entity,aniStep){
		fW=Img.transformAnimation.width/3;
		img=Img.transformAnimation;
		if(aniStep<=5){
			aniX=0;
			gui.onlyAnimation(img,entity,gui.fg_ctx,aniX,fW, entity.width, entity.height, entity.x-entity.width/2, entity.y-entity.height/2)
		}else if(aniStep<=10){
			aniX=1;
			gui.onlyAnimation(img,entity,gui.fg_ctx,aniX,fW, entity.width, entity.height, entity.x-entity.width/2, entity.y-entity.height/2)
		}else if(aniStep<=15){
			aniX=2;
			gui.onlyAnimation(img,entity,gui.fg_ctx,aniX,fW, entity.width, entity.height, entity.x-entity.width/2, entity.y-entity.height/2)
		}else{

		}
	};

	
//####################################################
//Sound Functions
	//Jump sounds
	self.jumpSound=function(entity){
		if(entity.isBig==true){
			Sound.bigJump.play();
		}
		else{
			Sound.smallJump.play();
		}
	};
	self.hurtSound=function(entity){
		if(entity.isBig==true){
			Sound.bigHurt.play();
		}
		else{
			Sound.smallHurt.play();
		}
	};
	self.deathSound=function(){
		Sound.death.play();
	};
	self.checkpointSound=function(){
		Sound.checkpoint.play();
	};
	self.transformSound=function(){
		Sound.transform.play();
	};
	self.winGameSound=function(){
		Sound.winGame.play();
	};
	self.weaponPickUpSound=function(){
		Sound.weaponPickUp.play();
	};
	self.playBackgroundMusic=function(worldnum){
		if (worldnum==1){
			Sound.worldOne.play();
		}else if(worldnum==2){
			Sound.worldTwo.play();
		}else if(worldnum==3){
			Sound.worldThree.play();
		}else{

		}
	};
	return self;
}
