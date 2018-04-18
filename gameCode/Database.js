var USE_DB = true;
var mongojs = USE_DB ? require("mongojs") : null;
var db = USE_DB ? mongojs('localhost:27017/myGame', ['account','progress']) : null;
var levelName;

Database = {};

Database.addLevelItem = function(data, cb){
  db.saveLevel.update({level:data.level},   { $addToSet:{ enemies: { id: data.id, items: {x:data.x, y: data.y, vx: data.vx,vy: data.vy,id: data.id,type: data.type} } } }, {upsert: true});
}

Database.addPlayerItem = function(data, cb){
  db.saveLevel.update({ level:data.level},{$set: {player : []  }  } , function(err,res){

    db.saveLevel.update({level:data.level}, { $addToSet:{ player: { id: data.id, items: {x:data.x, y: data.y, vx: data.vx,vy: data.vy,id: data.id,type: data.type} } } }, {upsert: true});
  });
}

Database.addTerrainItem = function(data, cb){
  db.saveLevel.update({level:data.level},   { $addToSet:{ terrain: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type, mod: data.mod} } } }, {upsert: true});
}

Database.addCheckpointItem = function(data, cb){
  db.saveLevel.update({level:data.level},   { $addToSet:{ checkpoint: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type} } } }, {upsert: true});
}

Database.addPlatformItem = function(data, cb){
  console.log("add platform");
  db.saveLevel.update({level:data.level},   { $addToSet:{ terrain: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type, direction:data.direction,mod: data.mod, finalVal: data.finalVal} } } }, {upsert: true});
}

Database.addBossItem = function(data, cb){
  console.log("add boss");
  db.saveLevel.update({ level:data.level},{$set: {boss : []  }  } , function(err,res){

    db.saveLevel.update({level:data.level},  { $addToSet:{ boss: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type} } } }, {upsert: true});
  });

}

Database.addSpikeItem = function(data, cb){
  console.log("add spike");
  db.saveLevel.update({level:data.level},   { $addToSet:{ terrain : { id: data.id, items: {x:data.x, y: data.y,id: data.id, type: data.type, orientation: data.orientation} } } }, {upsert: true});
}

Database.addBackgroundItem = function(data, cb){
  db.saveLevel.update(
     { level: data.level },
     { $set:
        {
          background: data.background

        }
     }
  );
  console.log("add background");

}

Database.addWeaponItem = function(data, cb){
  db.saveLevel.update({level:data.level},   { $addToSet:{ weapon: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type} } } }, {upsert: true});
}

Database.newLevel = function(data, cb){

    levelName = data.level;
    db.saveLevel.insert({width: data.width, level: data.level, background: "world1" });

  //  db.saveLevel.findOne({level:levelName},function(err,res){
  	//	if(res){
    //    console.log("it exists");
    //    cb(false);

    //  }
  	//	else {
  		//
};

var n;

Database.getLevelObject = function(data, cb){
  n = data;

  db.saveLevel.find({level: data}, function(err,res){
    var arr  = JSON.stringify(res);
      console.log(arr);
    cb(arr);
   });
}

Database.getLevelObjectInterface = function(data, cb){

  db.saveLevel.find({level: n}, function(err,res){
    var arr  = JSON.stringify(res);
      console.log("we are getting" + arr);
    cb(arr);
   });
}

Database.getLevels = function(cb){

  db.saveLevel.find({}, {level: 1, _id: 0}, function(err,res){
		  var arr  = JSON.stringify(res);
			cb({result: arr, levels: res});

	});

}

Database.deleteLevelItem = function(data, cb){

    db.saveLevel.update({level:data.level},{$pull: {enemies : {id:data.id }  }    } );
}

Database.deletePlayerItem = function(data, cb){
  console.log("removing player");
    db.saveLevel.update({ level:data.level},{$pull: {player : {id:data.id }  }    } );
}

Database.deleteTerrainItem = function(data, cb){
  console.log("removing terrain or platform");
  db.saveLevel.update({ level:data.level},{$pull: {terrain : {id:data.id }  }    } );
}

Database.deleteCheckpointItem = function(data, cb){

  console.log("removing checkpoint");
    db.saveLevel.update({ level:data.level},{$pull: {checkpoint : {id:data.id }  }    } );
}

Database.deleteWeaponItem = function(data, cb){

  console.log("removing weapon");
    db.saveLevel.update({ level:data.level},{$pull: {weapon : {id:data.id }  }    } );
}

Database.deletePlatformItem = function(data, cb){

  console.log("removing deletePlatformItem");
    db.saveLevel.update({ level:data.level},{$pull: {terrain : {id:data.id }  }    } );
}

Database.deleteBossItem = function(data, cb){

  console.log("removing deleteBossItem");
    db.saveLevel.update({ level:data.level},{$pull: {boss : {id:data.id }  }    } );
}

Database.deleteSpikeItem = function(data, cb){

  console.log("removing deleteSpikeItem");
    db.saveLevel.update({ level:data.level},{$pull: {spike : {id:data.id }  }    } );
}

Database.changeMod = function(data, cb){

  console.log("changing mod"+ data.mod);
  db.saveLevel.update({ level:data.level},{$pull: {terrain : {id:data.id }  }  } , function(err,res){

    db.saveLevel.update({level:data.level}, { $addToSet:{ terrain: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type, mod: data.mod} } } }, {upsert: true});
  });

}

Database.isValidPassword = function(data,cb){
    if(!USE_DB)
        return cb(true);
	db.account.findOne({username:data.username,password:data.password},function(err,res){
		if(res)
			cb(true);
		else
			cb(false);
	});
}

Database.isUsernameTaken = function(data,cb){
    if(!USE_DB)
        return cb(false);
	db.account.findOne({username:data.username},function(err,res){
		if(res)
			cb(true);
		else
			cb(false);
	});
}

Database.checkAnswer = function(data,cb){
    if(!USE_DB)
        return cb(false);
	db.account.findOne({username:data.username,q1: data.a1, q2: data.a2, q3:data.a3},function(err,res){
    if(res)
      cb({success:true, password: res.password});
    else
      cb(false);

    });
}

Database.addUser = function(data,cb){
    if(!USE_DB)
        return cb();
	db.account.insert({username:data.username,password:data.password, q1:data.q1, q2:data.q2, q3:data.q3},function(err){
        Database.savePlayerProgress({username:data.username,items:[]},function(){
            cb();
        })
	});
}
Database.getPlayerProgress = function(username,cb){
    if(!USE_DB)
        return cb({items:[]});

	db.progress.findOne({username:username},function(err,res){
		cb({items:res.items});
	});
}
Database.savePlayerProgress = function(data,cb){
    cb = cb || function(){}
    if(!USE_DB)
        return cb();
    db.progress.update({username:data.username},data,{upsert:true},cb);
}

Database.levelUpdate = function(username,data){
  console.log("hereeee  "+ data.level + " " + data.time);
  db.progress.findOne({username:username},function(err,res){
    if(res){
      console.log("true "+ data.level);
      db.progress.update(
        {username:username},
        {  $addToSet:
          {
            items: {level : data.level, time: data.time}
          }
        }, {upsert: true});

    }
  });
}
