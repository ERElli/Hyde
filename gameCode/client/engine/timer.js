timer = function(){
	self = {};
	self.startTime = Date.now();

	self.getCurrentTime = function(){
		self.currentTime = Date.now();
		self.totalTime = self.currentTime-self.startTime;
		console.log(self.totalTime);
	}
	self.end = function(){
		self.endTime = Date.now();
		self.totalTime = self.endTime-self.startTime;
		console.log(self.totalTime);
	}
	return self;
}