timer = function(){
	var self = {};
	self.startTime;
	self.pauseStart;
	self.pauseEnd;
	self.endTime;
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
		timeShift=(self.pauseEnd-self.pauseStart);
		self.updateStart(timeShift);
	}
	self.updateStart=function(timeShift){
		self.startTime=self.startTime+timeShift
	}
	self.end = function(){
		self.endTime = Date.now();
		self.totalTime = self.endTime-self.startTime;
		self.setEndTime(self.totalTime);
		// console.log(self.totalTime);
	}
	self.setEndTime=function(endtime){
		self.endTime=endtime;
	}
	self.getEndTime=function(){
		return self.endTime;
	}
	return self;
}
