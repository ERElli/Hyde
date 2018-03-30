Enemy = function(id, type, x, y){
	
	var self = {
		id: id,
		type: type,
		x: x,
		y: y,
		width: 50,
		height: 50,
	};

	var enemyImage = new Image();

	self.draw = function(context) {
		switch(self.type){
			case "enemy1":
				enemyImage.src = "../../images/enemy1.png";
				break;
			case "enemy2":
				enemyImage.src = "../../images/enemy2.png";
				break;
			case "enemy3":
				enemyImage.src = "../../images/enemy3.png";
				break;
			default:
				console.log("enemy.js error");
		}
		context.drawImage(enemyImage, self.x, self.y, self.width, self.height);
	}

	return self;
};