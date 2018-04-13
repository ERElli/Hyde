var USE_DB = true;
var mongojs = USE_DB ? require("mongojs") : null;
var db = USE_DB ? mongojs('localhost:27017/myGame', ['account','progress']) : null;
var levelName;

Database = {};/*
Database.levelSave = function(data){
  console.log(data.x, data.y, data.w, data.h, data.id, data.type);
  db.saveLevel.update({id:data.rand}, { $addToSet:{ items: {x:data.x, y: data.y, w: data.w,h: data.h,id: data.id,type: data.type} } }, {upsert: true});
  //db.saveLevel.update({username:username},{  $addToSet: {items: {level : "level 1", time: 130} }});
}*/
Database.addLevelItem = function(data, cb){
  //console.log("nice"+data.x, data.y, data.w, data.h, data.id, data.type);
  //db.saveLevel.remove({id:data.rand}, { $addToSet:{ items: {x:data.x, y: data.y, w: data.w,h: data.h,id: data.id,type: data.type} } }, {upsert: true});
  db.saveLevel.update({level:data.level},   { $addToSet:{ enemies: { id: data.id, items: {x:data.x, y: data.y, vx: data.vx,vy: data.vy,id: data.id,type: data.type} } } }, {upsert: true});
}
Database.addPlayerItem = function(data, cb){
  db.saveLevel.update({level:data.level},   { $addToSet:{ player: { id: data.id, items: {x:data.x, y: data.y, vx: data.vx,vy: data.vy,id: data.id,type: data.type} } } }, {upsert: true});
}
Database.addTerrainItem = function(data, cb){
  console.log("it works");
  db.saveLevel.update({level:data.level},   { $addToSet:{ terrain: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type} } } }, {upsert: true});
}
Database.addCheckpointItem = function(data, cb){
  console.log("add checkp");
  db.saveLevel.update({level:data.level},   { $addToSet:{ checkpoint: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type} } } }, {upsert: true});
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
   //db.saveLevel.update({level:data.level}, {$pull: {background:{} } } , function(err,res){
      // db.saveLevel.update({level:data.level},   { $addToSet:{ background: { id: data.background, items: { background:data.background } } } }, {upsert: true});
    //  db.saveLevel.update({level:data.level},   { $addToSet:{background: data.background } }, {upsert: true});
  // });
//db.saveLevel.update({level:"h"},   { $addToSet:{background:"world1"  }}, {upsert: true});

}
Database.addWeaponItem = function(data, cb){
  console.log("add checkp");
  db.saveLevel.update({level:data.level},   { $addToSet:{ weapon: { id: data.id, items: {x:data.x, y: data.y,id: data.id,type: data.type} } } }, {upsert: true});
}
///
/**/

//


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

  //  db.levelNames.update({level: data.level}, {level: data.level}, {upsert: true});


  //}
var n;
Database.getLevelObject = function(data, cb){
  n = data;
  //console.log("nice"+data.x, data.y, data.w, data.h, data.id, data.type);
  //db.saveLevel.remove({id:data.rand}, { $addToSet:{ items: {x:data.x, y: data.y, w: data.w,h: data.h,id: data.id,type: data.type} } }, {upsert: true});
  //db.saveLevel.update({id:data.id},   { $addToSet:{ items: {x:data.x, y: data.y, vx: data.vx,vy: data.vy,id: data.id,type: data.type} } }, {upsert: true});

  //db.saveLevel.find( function(err,res){
  //db.saveLevel.find({level: "ww"});
  db.saveLevel.find({level: data}, function(err,res){
    var arr  = JSON.stringify(res);
      console.log(arr);
    cb(arr);
   });
}
Database.getLevelObjectInterface = function(data, cb){
  //console.log("nice"+data.x, data.y, data.w, data.h, data.id, data.type);
  //db.saveLevel.remove({id:data.rand}, { $addToSet:{ items: {x:data.x, y: data.y, w: data.w,h: data.h,id: data.id,type: data.type} } }, {upsert: true});
  //db.saveLevel.update({id:data.id},   { $addToSet:{ items: {x:data.x, y: data.y, vx: data.vx,vy: data.vy,id: data.id,type: data.type} } }, {upsert: true});

  //db.saveLevel.find( function(err,res){
  //db.saveLevel.find({level: "ww"});

  console.log("this is gooo "+ n);
  db.saveLevel.find({level: n}, function(err,res){
    var arr  = JSON.stringify(res);
      console.log("we are getting" + arr);
    cb(arr);
   });
}
Database.getLevels = function(cb){

  db.saveLevel.find({},function(err,res){
		  var arr  = JSON.stringify(res);
			cb(arr);

	});
}
Database.deleteLevelItem = function(data, cb){
  //db.saveLevel.update({ level:"level 3"}, {$pull: {player: {id: "0.32591480354017077" } } } );
  console.log("removing enem");
  console.log("I am here "+ data.level);
    db.saveLevel.update({level:data.level},{$pull: {enemies : {id:data.id }  }    } );
}
Database.deletePlayerItem = function(data, cb){
  console.log("removing player");
    db.saveLevel.update({ level:data.level},{$pull: {player : {id:data.id }  }    } );
}
Database.deleteTerrainItem = function(data, cb){
  console.log("removing terrain");
  db.saveLevel.update({ level:data.level},{$pull: {terrain : {id:data.id }  }    } );
}
Database.deleteCheckpointItem = function(data, cb){
  //db.saveLevel.update({ level:"level 3"}, {$pull: {player: {id: "0.32591480354017077" } } } );
  console.log("removing checkpoint");
    db.saveLevel.update({ level:data.level},{$pull: {checkpoint : {id:data.id }  }    } );
}
Database.deleteWeaponItem = function(data, cb){
  //db.saveLevel.update({ level:"level 3"}, {$pull: {player: {id: "0.32591480354017077" } } } );
  console.log("removing weapon");
    db.saveLevel.update({ level:data.level},{$pull: {weapon : {id:data.id }  }    } );
}
//Database.deleteLevelItem = function(data, cb){

  //console.log("nice"+data.x, data.y, data.w, data.h, data.id, data.type);
  //db.saveLevel.remove({id:data.rand}, { $addToSet:{ items: {x:data.x, y: data.y, w: data.w,h: data.h,id: data.id,type: data.type} } }, {upsert: true});
//  db.saveLevel.update({id:data.rand},  { $pull: { "items" : { id: data.id } } } );

//db.saveLevel.update({ },{$pull: {terrain : {id:"0.5069357863064315" }  }    } );
//}

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

/*Database.checkAnswer = function(data,cb){
    if(!USE_DB)
        return cb(false);
	db.account.findOne({username:data.username,q1: data.a1, q2: data.a2, q3:data.a3},function(err,res){
    if(res)
      cb({success:true, password: res.password});
    else
      cb(false);

    });
}
*/
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
  db.progress.findOne({username:username},function(err,res){
    if(res){
      console.log("true "+ data.level);
      db.progress.update(
        {username:username},
        {  $addToSet:
          {
            items: {level : "level 1", time: 130}
          }
        });

    }
  });
}

/* db.progress.update({username: "aaa"}, { $set: { items: [{level: "level 1", time: 60}, {level:"level 2",time: 120}] } });
db.progress.find();
db.progress.findOne({username: "aaa", items: {level: "level 1"}} ) ;
db.progress.update({username: "bbbb"}, { $set: { items: {level: "level 3", time: 140} } });
db.progress.find( { items: {level : "level 2", time: 140} } );
db.saveLevel.find({id: 0.7325131413466066, item});
db.saveLevel.remove({});
db.account.remove({});

*/
