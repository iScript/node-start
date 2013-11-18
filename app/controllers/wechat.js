var wechat = require('../../lib/wechat');
var crypto = require('crypto');
var token = 'ykq';

exports.index = function(req,res){
    var signature = req.query.signature;
    console.log(signature);
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var arr = [token,timestamp,nonce].sort();
    var encStr = crypto.createHash('sha1').update(arr.join('')).digest('hex');
    
    console.log(encStr);
    if(shasum.digest('hex') === signature){
        res.end(echostr);
    }else{
        res.end(echostr);
    }
    //return shasum.digest('hex') === signature;
} 

exports.receive = function(req,res){
    console.log(req.body);
}