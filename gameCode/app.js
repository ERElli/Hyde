//var mongojs = require("mongojs");
var db = null;//mongojs('localhost:27017/myGame', ['account','progress']);



var express = require('express');
var app = express();
var serv = require('http').Server(app);


app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log("Server started.");


var isValidPassword = function(data,cb){
  return cb(true); /*
    db.account.find({username:data.username,password:data.password},function(err,res){
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });*/
}
var isUsernameTaken = function(data,cb){
  return cb(false);
  /*
    db.account.find({username:data.username},function(err,res){
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });*/
}
var addUser = function(data,cb){
  return cb(); /*
    db.account.insert({username:data.username,password:data.password},function(err){
        cb();
    });*/
}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');

    socket.emit('serverMsg',{
        msg:'hello',
    });

		//
		socket.on('signIn',function(data){
        isValidPassword(data,function(res){
            if(res){
                socket.emit('signInResponse',{success:true});
            } else {
                socket.emit('signInResponse',{success:false});
            }
        });
    });
    socket.on('signUp',function(data){
        isUsernameTaken(data,function(res){
            if(res){
                socket.emit('signUpResponse',{success:false});
            } else {
                addUser(data,function(){
                    socket.emit('signUpResponse',{success:true});
                });
            }
        });
    });

});
