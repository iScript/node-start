var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils');

exports.index = function(req,res){
    if(req.session.user == undefined) {
        res.redirect('/login');return;
    }

    var _id = req.session.user._id;
    User.findOne({_id:_id},function(err,result){
        if(result){
            res.render('user',{user:result});
        }
    });
} 

exports.register = function(req,res){
    res.render('register');
}

exports.doRegister = function(req,res){
    var user = new User(req.body);
    user.save(function(err){
        if(err) {
            console.log(err);
            res.render('error',{errors: utils.errors(err),backTo:'/register'});
            return;
        }
        res.redirect('/login');
    });
}

exports.login = function(req,res){
    res.render('login');
}

exports.doLogin = function(req,res){
    console.log(req.body);
    User.doLogin(req.body.username,req.body.password,function(err,result){
        if(result){
            req.session.user = {};
            req.session.user.username = result.username;
            req.session.user._id = result._id;
            res.redirect('/user');
        }else{
            var err = {"name":"loginErr","message":"用户名或密码错误~"};
            res.render('error',{errors: utils.errors(err),backTo:'/login'});
        }
    });
}