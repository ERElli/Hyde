GUI = function(container){
	var self={};
	self.container=container;
	
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
	self.bgDraw=function(bg_ctx,backgroundImg){
		backgroundImg.onload = function () {
    			bg_ctx.drawImage(backgroundImg,0,0,750,1250);
		}
			
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
		fg_ctx.fillStyle="#000000";
		fg_ctx.fillText('Health:',healthX,healthY);
		fg_ctx.fillText('Momentum:',momentX,momentY);

		//draw ammo
		fg_ctx.fillText('Ammo: '+ammo,ammoX,ammoY);
		fg_ctx.fillText('Weapon: '/*+weaponImg*/,weaponX,weaponY); 	
	};
	return self;
}
