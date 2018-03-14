Enemy = function(id, type, x, y, width, height){
	
	var self = {
		id: id,
		type: type,
		x: x,
		y: y,
		width: width,
		height: height,
	};

	var enemy1Image = new Image();
	enemy1Image.src = "../../images/enemy1.png";

	var enemy2Image = new Image();
	enemy2Image.src = "../../images/enemy2.png";

	var enemy3Image = new Image();
	enemy3Image.src = "../../images/enemy3.png";


	self.draw = function() {

		if(self.type === "enemy1"){

			ctx_lg.drawImage(enemy1Image, self.x, self.y, self.width, self.height);
		
		} else if(self.type === "enemy2"){

			ctx_lg.drawImage(enemy2Image, self.x, self.y, self.width, self.height);
		
		} else if(self.type === "enemy3"){

			ctx_lg.drawImage(enemy3Image, self.x, self.y, self.width, self.height);

		} else {

			console.log("enemy.js error");
		}
		
	
	}

	console.log(self);
	return self;
}

Enemy.add = function(enemy) {
	Enemy.list[enemy.id] = enemy;
	console.log("Adding an enemy: ", enemy);
}

Enemy.update = function() {
	for (var key in Enemy.list){
		var rect = Enemy.list[key];
		rect.draw();
	}