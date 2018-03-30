GUI = function(container){
	var self={};
	self.container=container;
	var sPAnimation=0;
	var bearAnimationStage=0;
	var backgroundPositionCounter=0;
	self.create= function(type, id, left, top, width, height){
		var element= document.createElement(type);
		element.id=id;
		element.style.position='absolute';
		if(left!=0){element.style.left=left;}
		if(top!=0){element.style.top=top;}
		if(height!=0){
			if(type=='canvas'){
				element.height=height;
			}else{
				element.style.height=height;
			}				
		}
		if(width!=0){
			if(type=='canvas'){
				element.width=width;
			}else{
				element.style.width=width;
			}
		}
		self.container.appendChild(element);
		return element;
	}

	self.createCanvas=function(width, height){
		self.bg=self.create('canvas','bg',0,0,width,height);
		self.fg=self.create('canvas','fg',0,0,width,height);
		self.ep=self.create('canvas','ep',0,0,width,height);
		self.gr=self.create('canvas','gr',0,0,width,height);
		self.bg.style.zIndex = 0;
		self.fg.style.zIndex = 1;
		self.ep.style.zIndex = 2;
		self.gr.style.zIndex = 3;
		self.bg_ctx = self.bg.getContext("2d");
		self.fg_ctx = self.fg.getContext("2d");
		self.ep_ctx = self.ep.getContext("2d");
		self.gr_ctx = self.gr.getContext("2d");
		self.ep_ctx.globalAlpha = 0.5;
	}

	//draws background
	self.drawMap=function(){
		gui.bg_ctx.clearRect(0,0,self.bg.width,self.bg.height);
		//
		//!!!!!!!!!!!e.x will need to be changed once level object is used!!!!!!!!!!!
		//
		//n is number of canvas distance the player has travelled
		n=backgroundPositionCounter;
		x=self.bg.width-e.x;
		y=0;
		Img.background2.onload=function(){	
		}

		//continuously loops backgrounds	
		gui.bg_ctx.drawImage(Img.background2,x+self.bg.width*(n-1),y,self.bg.width,self.bg.height);
		gui.bg_ctx.drawImage(Img.background2,x+self.bg.width*n,y,self.bg.width,self.bg.height);
		gui.bg_ctx.drawImage(Img.background2,x+self.bg.width*(n-2),y,self.bg.width,self.bg.height);
		if(x<self.bg.width-self.bg.width*n){
			backgroundPositionCounter++;
		}
		else if(x>(-self.bg.width)*n){
			backgroundPositionCounter--;
		}
	}

	//draws Entities
	self.drawEntity=function(entity,ctx,isLevelEditor){
		if(isLevelEditor){
			playX=0;
		}
		else{
			playX=e.x-self.fg.width/2;
		}
		var en=entity;
		ctx.save();
		switch(en.type){
			case "player":
				if(en.isBig==true){
					playDir=self.getPlayDirection(en);
					if(playDir==1){
						//ctx.drawImage(Img.playerBig,self.fg.width/2,en.y-en.height/2,en.width,en.height);
						self.quickDraw(Img.playerBig,en,ctx);
					}
					else{
						ctx.save()
						ctx.translate(en.x+fg.width/2-playX,y);
    						// scaleX by -1; this "trick" flips horizontally
    						ctx.scale(-1,1);
						//ctx.drawImage(Img.playerBig,self.fg.width/2-en.width/2,en.y-en.height/2,en.width,en.height);
						self.quickDraw(Img.playerBig,en,ctx);						
						ctx.restore();
					}
				}
				else{
					var fW=Img.playerSmall.width/5;
					var fH=Img.playerSmall.height/2;
					playDir=self.getPlayDirection(en);
					//updates player animation every 5th frame
					sPAnimation=self.updateEntityAnimation(en,sPAnimation,5);
					self.quickPlayerDraw(Img.playerSmall,en,ctx,sPAnimation,playDir,fW,fH);
				}
				break;
			case "basic enemy":
				enemyImg=Img.basicEnemy1;
				self.quickDraw(enemyImg,en,ctx);
				break;
			case "flying enemy":
				enemyImg=Img.basicEnemy2;
				self.quickDraw(enemyImg,en,ctx);
				break;
			case "tank enemy":
				var fW=Img.bearEnemy.width/8;
				var fH=Img.bearEnemy.height/8;
				dir=self.getImgDir(entity);
				bearAnimationStage=self.updateEntityAnimation(en,bearAnimationStage,16);	
				if(en.vx==0){
					bearAniY=0;
				}
				else if(bearAnimationStage/8>=1){
					bearAniY=2;
				}
				else{
					bearAniY=1;
				}
				self.quickAnimatedDraw(Img.bearEnemy,en,ctx,bearAnimationStage%8,bearAniY,fW,fH,dir);

				break;
			case "ghost":
				self.quickDraw(Img,en,ctx);
				break;
			case "pistol":
				weapImg=Img.pistol;
				self.quickDraw(weapImg,en,ctx);
				break;
			case "shotgun":
				weapImg=Img.shotgun;
				self.quickDraw(weapImg,en,ctx);
				break;
			case "sword":
				weapImg=Img.swordWeapon;
				self.quickDraw(weapImg,en,ctx);
				break;
			case "assaultRifle":
				weapImg=Img.assaultWeapon
				self.quickDraw(weapImg,en,ctx);
				break;
			case "bullet":
			case "meleeBullet":
				self.quickDraw(Img.bullet,en,ctx);
				break;
		}
		entity.img.onload=function(){};
		ctx.restore();		
	};
	//draws terrain
	self.drawTerrain=function(terrain,ctx,isLevelEditor){
		if(isLevelEditor){
			playX=0;
		}
		else{
			playX=e.x-self.fg.width/2;
		}		
		var t=terrain;
		ctx.save();
		switch(terrain.type){
			case "Terrain1x1":
				ctx.drawImage(Img.terrain1x1,t.x-playX,t.y,t.width,t.height);
			break;

		}
		terrain.img.onload=function(){};
		ctx.restore();
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
	//Function to update the entitys Animations
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
	//Method to draw enemies(readability)
	self.quickDraw=function(img,entity,ctx){
		ctx.drawImage(img,(entity.x-entity.width/2)-playX,entity.y-entity.height/2,entity.width,entity.height);
	}

	self.quickPlayerDraw=function(img,en,ctx,aniX,aniDir,fW,fH){
		ctx.drawImage(img,aniX*fW,aniDir*fH,fW,fH,en.x-en.width/2-playX,en.y-en.height/2,en.width,en.height);
	}
	
	self.quickAnimatedDraw=function(img,en,ctx,aniStepX,aniStepY,spriteW,spriteH,dir){
		if (dir==0){
			ctx.drawImage(img,aniStepX*spriteW,aniStepY*spriteH,spriteW,spriteH,en.x-en.width/2-playX,en.y-en.height/2,en.width,en.height);
		}else{
			ctx.save()
    			// scaleX by -1; 
    			ctx.scale(-1,1);
			ctx.translate(-fg.width,0);
			ctx.drawImage(img,aniStepX*spriteW,aniStepY*spriteH,spriteW,spriteH,en.x-en.width/2-playX,en.y-en.height/2,en.width,en.height);
			ctx.restore();
		}	
	}

		
	self.fgDraw=function(fg_ctx,playerHealth,playerMomentum,ammo){
		var healthX=0;
		var healthY=30;
		var momentX=0;
		var momentY=60;
		var ammoX=1050;
		var ammoY=30;
		var weaponX=1050;
		var weaponY=60;
		var weaponImgX=1125;
		var weaponImgY=50;
		fg_ctx.save();
		
		fg_ctx.clearRect(0,0,self.fg.width,self.fg.height);
		fg_ctx.font="18px Arial";
		//draw bar outlines
		fg_ctx.strokeRect(healthX,healthY,100,10);
		fg_ctx.strokeRect(momentX,momentY,100,10);		
		//draw Healthbar
		fg_ctx.fillStyle="#FF0000";		
		fg_ctx.fillRect(healthX,healthY,playerHealth,10);
		//draw Momentumbar
		fg_ctx.fillStyle="#0000FF";
		fg_ctx.fillRect(momentX,momentY,playerMomentum,10);
		//Colour Text
		fg_ctx.fillStyle="#FFFFFF";
		fg_ctx.fillText('Health:',healthX,healthY);
		fg_ctx.fillText('Momentum:',momentX,momentY);
		//draw ammo
		fg_ctx.fillText('Ammo: '+ammo,ammoX,ammoY);
		fg_ctx.fillText('Weapon: '/*+weaponImg*/,weaponX,weaponY);
		//draw current weapon image
 		gui.fg_ctx.drawImage(Img.pistol,weaponImgX,weaponImgY,Img.pistol.width,Img.pistol.height);
		Img.pistol.onload=function(){}
	};
	return self;
}
