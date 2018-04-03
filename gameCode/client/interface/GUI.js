
GUI = function(container){

	var seconds = 0;
	var minutes = 0;
	var stop = false; //stop is true when level is finished

    //calculate time for finishing the level
    if(!stop){
	  setInterval(function () {
	     seconds++;
		if(seconds == 60){
				seconds =0;
				minutes++;
		}
	  }, 1000);

    };

	var self={};
	self.container=container;
	var sPAnimation=0;
	var bearAnimationStage=0;
	var backgroundPositionCounter=0;
	var editorBackgroundCounter=0;
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
	//draw level editor background
	self.editorBackground=function(offsetX,offsetY,img){
		x=self.bg.width+offsetX;
		y=0;
		gui.bg_ctx.clearRect(0,0,self.bg.width,self.bg.height);
		n=editorBackgroundCounter;
		var image;
		console.log(img);
		switch(img){
			case 'world1':
				image = Img.background1;
				break;
			case 'world2':
				image = Img.background2;
				break;
			case 'world3':
				image = Img.background3;
				break;
		}
		console.log(image);
		if(image != null){
			gui.bg_ctx.drawImage(image,x+self.bg.width*(n-1),y,self.bg.width,self.bg.height);
			gui.bg_ctx.drawImage(image,x+self.bg.width*n,y,self.bg.width,self.bg.height);
			gui.bg_ctx.drawImage(image,x+self.bg.width*(n-2),y,self.bg.width,self.bg.height);
			image.onload=function(){};
			if(x<self.bg.width-self.bg.width*n){
				editorBackgroundCounter++;
			}
			else if(x>(-self.bg.width)*n ){
				editorBackgroundCounter--;
			}
		}
	}
	//draws gameplay background
	self.drawMap=function(){
		gui.bg_ctx.clearRect(0,0,self.bg.width,self.bg.height);
		n=backgroundPositionCounter;
		x=self.bg.width-level['player'].x;
		y=0;
		Img.background2.onload=function(){
		}
		//continuously loops backgrounds
		gui.bg_ctx.drawImage(Img.background2,x+self.bg.width*(n-1),y,self.bg.width,self.bg.height);
		gui.bg_ctx.drawImage(Img.background2,x+self.bg.width*n,y,self.bg.width,self.bg.height);
		gui.bg_ctx.drawImage(Img.background2,x+self.bg.width*(n-2),y,self.bg.width,self.bg.height);
    /*
		//reached the end of the level
		if(backgroundPositionCounter ==3){
			 document.getElementById('canvas').onkeypress=function()
			{
				 stop = true;
				 return false;
			 };
		}
		*/

		if(x<self.bg.width-self.bg.width*n){
			backgroundPositionCounter++;
		}
		else if(x>(-self.bg.width)*n ){
			backgroundPositionCounter--;
		}
	};

	//draws Entities
	self.drawEntity=function(entity,ctx,isLevelEditor){
		if(isLevelEditor){
			playX=0;
			xOffset=0;
			yOffset=0;
		}
		else{
			playX=level['player'].x-self.fg.width/2;
			xOffset=entity.width/2;
			yOffset=entity.height/2;
		}
		var en=entity;
		ctx.save();
		switch(en.type){
			case "player":
				if(en.isBig==true){
					if(!isLevelEditor){
						playDir=ani.getPlayDirection(en);
					}else{
						playDir = 1;
					}
					var fW=Img.playerBig.width/5;
					var fH=Img.playerBig.height/2;
					ani.updateEntityAnimation(en,5);
					self.quickAnimatedDraw(Img.playerBig,en,ctx,playDir,fW,fH); 
				}else{
					var fW=Img.playerSmall.width/5;
					var fH=Img.playerSmall.height/2;

					if(!isLevelEditor){
						playDir=ani.getPlayDirection(en);
						//updates player animation every 5th frame
						ani.updateEntityAnimation(en,5);
					}else{
						playDir=1;
					}
          				self.quickAnimatedDraw(Img.playerSmall,en,ctx,playDir,fW,fH); 
				}
				break;
			case "basic enemy":
				enemyImg=Img.basicEnemy1;
				var fW=Img.basicEnemy1.width/4;
				var fH=Img.basicEnemy1.height/2;
				dir=ani.getPlayDirection(en);
				ani.updateEntityAnimation(en,4);
				self.quickAnimatedDraw(enemyImg,en,ctx,dir,fW,fH);
				break;
			case "flying enemy":
				enemyImg=Img.basicEnemy2;
				var fW=Img.basicEnemy2.width/4;
				var fH=Img.basicEnemy2.height/2;
				dir=ani.getPlayDirection(en);
				ani.updateEntityAnimation(en,4);
				self.quickAnimatedDraw(enemyImg,en,ctx,dir,fW,fH);
				break;
			case "tank enemy":
				var fW=Img.bearEnemy.width/8;
				var fH=Img.bearEnemy.height/8;
				dir=ani.getPlayDirection(entity);
				bearAnimationStage=ani.updateEntityAnimation(en,bearAnimationStage,16);

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
				self.quickDraw(Img,en,ctx,en.x,en.y);
				break;
			case "pistol":
				var weapImg=Img.pistol;
				var fW=weapImg.width/5;
				var fH=weapImg.height/2;
				if(!isLevelEditor){
					xOffset=fW/2;
					yOffset=fH/2;
				}
				aniX=0
				newx=ani.getWeaponPosition(en);
				dir=ani.getPlayDirection(en);
				if (en.isFiring==true){
					aniX=ani.fireAnimation(en,en.fireTimer);
				}
				self.quickAniWeaponDraw(weapImg,en,ctx,aniX,dir,fW,fH,newx,en.y);
				break;
			case "shotgun":
				weapImg=Img.shotgun;
				newx=ani.getWeaponPosition(en);
				self.quickDraw(weapImg,en,ctx,newx,en.y);
				break;
			case "sword":
				weapImg=Img.swordWeapon;
				//console.log(weapImg.width);
				newx=ani.getWeaponPosition(en);
				self.quickDraw(weapImg,en,ctx,newx,en.y);
				break;
			case "assaultRifle":
				weapImg=Img.assaultWeapon
				newx=ani.getWeaponPosition(en);
				self.quickDraw(weapImg,en,ctx,newx,en.y);
				break;
			case "bullet":
			case "meleeBullet":
				self.quickDraw(Img.bullet,en,ctx,en.x,en.y);
				break;
		}
		//console.log(entity);
		//entity.img.onload=function(){};
		ctx.restore();
	};
	//draws terrain
	self.drawTerrain=function(terrain,ctx,isLevelEditor){
		var t=terrain;		
		if(isLevelEditor){
			playX=0;
			xOffset=0;
			yOffset=0;
		}
		else{
			playX=level['player'].x-self.fg.width/2;
			xOffset=0;
			yOffset=0;
			
		}
		ctx.save();
		switch(terrain.type){
			case "Terrain1x1":
				self.quickDraw(Img.terrain1x1,t,ctx,t.x,t.y);
				break;
			case "Terrain1x1Breakable":
				self.quickDraw(Img.terrain1x1Breakable,t,ctx,t.x,t.y);
				break;
			case "Terrain3x2":
				self.quickDraw(Img.terrain3x2,t,ctx,t.x,t.y);
				break;
			case "Terrain3x2Breakable":
				self.quickDraw(Img.terrain3x2Breakable,t,ctx,t.x,t.y);
				break;
			case "Terrain3x4":
				self.quickDraw(Img.terrain3x4,t,ctx,t.x,t.y);
				break;
			case "Terrain3x4Breakable":
				self.quickDraw(Img.terrain3x4Breakable,t,ctx,t.x,t.y);
				break;
			case "Terrain3x6":
				self.quickDraw(Img.terrain3x6,t,ctx,t.x,t.y);
				break;
			case "Terrain3x6Breakable":
				self.quickDraw(Img.terrain3x6Breakable,t,ctx,t.x,t.y);
				break;
			

		}
		terrain.img.onload=function(){};
		ctx.restore();
	};

	//QuickDraw Methods(For improved readability)
	self.quickDraw=function(img,entity,ctx,x,y){
		ctx.drawImage(img,(x-xOffset)-playX,y-yOffset,entity.width,entity.height);

	}

	self.quickPlayerDraw=function(img,en,ctx,aniX,aniDir,fW,fH){
		ctx.drawImage(img,aniX*fW,aniDir*fH,fW,fH,en.x-xOffset-playX,en.y-yOffset,en.width,en.height);
	}		
	self.quickAniWeaponDraw=function(img,en,ctx,aniX,dir,fW,fH,x,y){
		ctx.drawImage(img,aniX*fW,dir*fH,fW,fH,x-xOffset-playX,y-yOffset,fW,fH);
	}
	self.quickAnimatedDraw=function(img,en,ctx,aniStepY,fW,fH){
		ctx.drawImage(img,en.aniCount*fW,aniStepY*fH,fW,fH,en.x-xOffset-playX,en.y-yOffset,en.width,en.height);
	
	};

	self.HUD=function(ctx,player){

		var timeX=0;
		var timeY=90;
		var healthX=0;
		var healthY=30;
		var timeX=0;
		var timeY=90;
		var momentX=0;
		var momentY=60;
		var ammoX=1050;
		var ammoY=30;
		var weaponX=1050;
		var weaponY=80;
		var weaponImgX=1125;
		var weaponImgY=50;
		var healthBar=player.health/player.maxHealth*100
		var momentumBar=(Math.abs(player.getMomentum())/player.maxMomentum)*100
		var ammo;
		var weaponImg=player.weapon.img;

		ctx.save();

		ctx.clearRect(0,0,self.fg.width,self.fg.height);
		ctx.font="18px Arial";
		//draw bar outlines
		ctx.strokeRect(healthX,healthY,100,10);
		ctx.strokeRect(momentX,momentY,100,10);
		//draw Healthbar
		ctx.fillStyle="#FF0000";
		ctx.fillRect(healthX,healthY,healthBar,10);

		//draw Momentumbar
		ctx.fillStyle="#0000FF";
		ctx.fillRect(momentX,momentY,momentumBar,10);
		//Colour Text
		ctx.fillStyle="#FFFFFF";
		ctx.fillText('Health:',healthX,healthY);
		ctx.fillText('Momentum:',momentX,momentY);

		//draws time
		ctx.fillText('Time: '+ minutes +" min "+ seconds+ " seconds ",timeX,timeY); 

		//draw ammo
		if(player.weapon.type=="sword"){
			ammo=Img.infinity;
			ctx.fillText('Ammo: ',ammoX,ammoY);
			ctx.drawImage(ammo,ammoX+75,ammoY-25,75,40);
			ammo.onload=function(){};
		}else{
			ammo=player.weapon.ammo;
			//draw ammo
			ctx.fillText('Ammo: '+ammo,ammoX,ammoY);
			ctx.fillText('Weapon: ',weaponX,weaponY);
		}
		//ctx.fillText('Ammo: '+ammo,ammoX,ammoY);
		ctx.fillText('Weapon: ',weaponX,weaponY);
		//draw current weapon image
		fW=weaponImg.width/5;
		fH=weaponImg.height/2;
 		ctx.drawImage(weaponImg,0,0,fW,fH,weaponImgX,weaponImgY,player.weapon.width,player.weapon.height);
		weaponImg.onload=function(){};
	};
	return self;
}
