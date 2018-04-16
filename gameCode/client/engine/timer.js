timer = function(){
	var self = {};
	self.startTime;
	self.pauseStart;
	self.pauseEnd;
	self.start=function(){

		self.startTime=Date.now();
	}
	self.getCurrentTime = function(){
		self.currentTime = Date.now();
		self.totalTime = self.currentTime-self.startTime;
		return self.totalTime;
	}
	self.pause=function(){
		self.pauseStart=Date.now();
	}
	self.unpause=function(){
		self.pauseEnd=Date.now();
		self.startTime+=(self.pauseEnd-self.pauseStart);
	}
	self.end = function(){
		self.endTime = Date.now();
		self.totalTime = self.endTime-self.startTime;
		console.log(self.totalTime);
		return self.totalTime;
	}
	return self;
}
