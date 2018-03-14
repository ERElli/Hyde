GUI = function(container){
	var self={};
	self.container=container;
	var Img = {};
	var backgroundImg= new Image();
	backgroundImg.src="img/worldTwoBackground.png";
	Img.playerSmall = new Image();
	Img.playerSmall.src = "img/scientistMain.png";
	Img.playerBig = new Image();
	Img.playerBig.src = "img/bigGuy.png";
	Img.basicEnemy=new Image();
	Img.basicEnemy.src="img/bigGuy.png";
	Img.pistol=new Image();
	Img.pistol.src="img/weaponButton.png";
	Img.bullet=new Image();
	Img.bullet.src="img/bullet.png";

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
	self.bgDraw=function(bg_ctx){
		backgroundImg.onload = function () {
    			bg_ctx.drawImage(backgroundImg,0,0,1250,750);
		}
			
	};
	//draws Entities
	self.drawEntity=function(entity){
		gui.fg_ctx.save();
			//Drawing humanoids
			if(entity.type=="player"){
				//console.log(Img.player);
				if(entity.isBig==true){
					gui.fg_ctx.drawImage(Img.playerBig,entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
					Img.playerBig.onload=function(){}	
				}
				else{
					gui.fg_ctx.drawImage(Img.playerSmall,entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
					Img.playerSmall.onload=function(){}	
				}		
			}	
			else if(entity.type=="basic enemy"){
				gui.fg_ctx.drawImage(Img.basicEnemy,entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);				
				entity.img.onload=function(){

				}
			}
			else if(entity.type=="flying enemy"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
		
			}
			else if(entity.type=="tank enemy"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
		
			}
			else if(entity.type=="ghost"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
		
			}
			//Drawing special terrain
			else if(entity.type=="moving plaform"){
				gui.fg_ctx.fillStyle=color;
				gui.fg_ctx.fillRect(x-width/2,y-height/2,width,height);
				gui.fg_ctx.restore();
			}
			else if(entity.type=="friction modifier"){
				gui.fg_ctx.fillStyle=color;
				gui.fg_ctx.fillRect(x-width/2,y-height/2,width,height);
				gui.fg_ctx.restore();
			}
			else if(entity.type=="spike trap"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
			}
			//Drawing Useables
			else if(entity.type=="pistol"){
				gui.fg_ctx.drawImage(Img.pistol,x-width/2,y-height/2);
		
			}
			else if(entity.type=="shotgun"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
		
			}
			else if(entity.type=="sword"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
		
			}
			else if(entity.type=="assault rifle"){
				gui.fg_ctx.drawImage(img,x-width/2,y-height/2);
		
			}
			//Draw projectiles
			else if(entity.type=="bullet"){
				gui.fg_ctx.drawImage(Img.bullet,entity.x+entity.width/2,entity.y-entity.height,entity.width,entity.height);
				Img.bullet.onload=function(){}
			}			
			else{
			
			}
			gui.fg_ctx.restore();		
	};
	
	self.fgDraw=function(fg_ctx,playerHealth,playerMomentum,ammo){
		var healthX=0;
		var healthY=30;
		var momentX=0;
		var momentY=60;
		var ammoX=1150;
		var ammoY=30;
		var weaponX=1150;
		var weaponY=60;
		//var weaponImg=image.jpeg;
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
	};
	return self;
}
