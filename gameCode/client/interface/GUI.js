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
		self.bg_ctx = self.bg.getContext("2d");
		self.fg_ctx = self.fg.getContext("2d");
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
	self.drawEntity=function(entity,ctx){
		var en=entity;
		ctx.save();
		//
		//!!!!!!!!!!!e.x will need to be changed once level object is used!!!!!!!!!!!
		//
		playX=e.x-self.fg.width/2;
		switch(en.type){
			case "player":
				if(en.isBig==true){
					playDir=self.getImageDirection(en);
					if(playDir==0){
						ctx.drawImage(Img.playerBig,self.fg.width/2,en.y-en.height/2,en.width,en.height);
					}
					else{
						ctx.save()
						ctx.translate(x+Img.playerBig.width,y);
    						// scaleX by -1; this "trick" flips horizontally
    						ctx.scale(-1,1);
						ctx.drawImage(Img.playerBig,self.fg.width/2-en.width/2,en.y-en.height/2,en.width,en.height);
						ctx.restore();
					}
					//Img.playerBig.onload=function(){}	
				}
				else{
					var fW=Img.playerSmall.width/5;
					var fH=Img.playerSmall.height/2;
					playDir=self.getImageDirection(entity);
					//updates player animation every 5th frame
					sPAnimation=self.updateEntityAnimation(entity,sPAnimation,5);				
					ctx.drawImage(Img.playerSmall,sPAnimation*fW,playDir*fH,fW,fH,self.fg.width/2-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
				}
				break;
			case "basic enemy":
				enemyImg=Img.basicEnemy1;
			case "flying enemy":
				enemyImg=Img.basicEnemy2;
				self.quickDraw(enemyImg,en,ctx);
				break;
			case "tank enemy":
				self.quickDraw(enemyImg,en,ctx);
			case "ghost":
				self.quickDraw(Img,en,ctx);
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
		/*
		//Drawing humanoids
			if(entity.type=="player"){
				//console.log(Img.player);
				if(entity.isBig==true){
					playDir=self.getImageDirection(entity);
					if(playDir==0){
						ctx.drawImage(Img.playerBig,self.fg.width/2,entity.y-entity.height/2,entity.width,entity.height);
					}
					else{
						ctx.save()
						ctx.translate(x+Img.playerBig.width,y);
    						// scaleX by -1; this "trick" flips horizontally
    						ctx.scale(-1,1);
						ctx.drawImage(Img.playerBig,self.fg.width/2-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
						ctx.restore();
					}
					//Img.playerBig.onload=function(){}	
				}
				else{
					var fW=Img.playerSmall.width/5;
					var fH=Img.playerSmall.height/2;
					playDir=self.getImageDirection(entity);
					//updates player animation every 5th frame
					sPAnimation=self.updateEntityAnimation(entity,sPAnimation,5);				
					ctx.drawImage(Img.playerSmall,sPAnimation*fW,playDir*fH,fW,fH,self.fg.width/2-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);

					//Img.playerSmall.onload=function(){}	
				}		
			}
	
			else if(entity.type=="basic enemy"){
				ctx.drawImage(Img.basicEnemy1,(entity.x-entity.width/2)-playX,entity.y-entity.height/2,entity.width,entity.height);				
				//entity.img.onload=function(){}
			}

			else if(entity.type=="flying enemy"){
				ctx.drawImage(Img.basicEnemy2,(entity.x-entity.width/2)-playX,entity.y-entity.height/2,entity.width,entity.height);				
				//entity.img.onload=function(){}
		
			}

			else if(entity.type=="tank enemy"){
				var fW=Img.bearEnemy.width/8;
				var fH=Img.bearEnemy.height/8;
				playDir=self.getImageDirection(entity);
				bearAnimationStage=self.updateEntityAnimation(entity,bearAnimationStage,16);
				
				if(entity.vx==0){
					bearAniY=0;
				}
				else if(bearAnimationStage/8>=1){
					bearAniY=2;
				}
				else{
					bearAniY=1;
				}
				console.log(bearAnimationStage);
				console.log(bearAniY);
				ctx.drawImage(Img.bearEnemy,bearAnimationStage%8*fW,bearAniY*fH,fW,fH,(entity.x-entity.width/2)-playX,entity.y-entity.height/2,entity.width,entity.height);				
				//entity.img.onload=function(){}
			}
			else if(entity.type=="ghost"){
				ctx.drawImage(img,x-width/2,y-height/2);
			}
			//Drawing special terrain
			else if(entity.type=="moving plaform"){
				ctx.fillStyle=color;
				ctx.fillRect(x-width/2,y-height/2,width,height);
				ctx.restore();
			}
			else if(entity.type=="friction modifier"){
				ctx.fillStyle=color;
				ctx.fillRect(x-width/2,y-height/2,width,height);
				ctx.restore();
			}
			else if(entity.type=="spike trap"){
				ctx.drawImage(img,x-width/2,y-height/2);
			}
			//Drawing Useables
			else if(entity.type=="pistol"){
				//ctx.save();
				//ctx.translate((entity.x-entity.width/2)-playX,entity.y);
				//ctx.rotate(-e.aimAngle*Math.PI/180);	
				ctx.drawImage(Img.pistol,(entity.x-entity.width/2)-playX+30,entity.y-entity.height/2,entity.width,entity.height);
				//ctx.restore();
				//entity.img.onload=function(){}
			}
			else if(entity.type=="shotgun"){
				ctx.drawImage(Img.shotgun,(entity.x-entity.width/2)-playX+30,entity.y-entity.height/2,entity.width,entity.height);
				
				//entity.img.onload=function(){}
			}
			else if(entity.type=="sword"){
				ctx.drawImage(Img.swordWeapon,(entity.x-entity.width/2)-playX+30,entity.y-entity.height/2,entity.width,entity.height);
				
				//entity.img.onload=function(){}
			}
			else if(entity.type=="assaultRifle"){
				ctx.drawImage(Img.assaultWeapon,(entity.x-entity.width/2)-playX+30,entity.y-entity.height/2,entity.width,entity.height);
				
				//entity.img.onload=function(){}
			}
			//Draw projectiles
			else if(entity.type=="bullet"){
				ctx.drawImage(Img.bullet,(entity.x-entity.width/2)-playX,entity.y-entity.height/2,entity.width,entity.height);
			}
			else if(entity.type=="meleeBullet"){
				ctx.drawImage(Img.bullet,(entity.x-entity.width/2)-playX,entity.y-entity.height/2,entity.width,entity.height);
				
			}			
			else{
			}*/
			entity.img.onload=function(){};
			ctx.restore();		
	};
	//draws terrain
	self.drawTerrain=function(terrain,ctx){
		var t=terrain
		var playX=e.x-self.fg.width/2;
		ctx.save();
		switch(terrain.type){
			case "Terrain1x1":
				ctx.drawImage(Img.terrain1x1,t.x-playX,t.y,t.width,t.height);
			break;

		}
		terrain.img.onload=function(){};
		ctx.restore();
	};

	
	self.getImageDirection=function(entity){
		if(entity.aimAngle<=90 && entity.aimAngle>-90){
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
