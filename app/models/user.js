var mongoose = require('mongoose')
    , crypto = require('crypto')
    , Schema = mongoose.Schema;

//数据库模型骨架  
var UserSchema = new Schema({
    username : { type: String, default: '' ,trim : true},
    password : { type: String, default: '' ,trim : true},
    email: { type: String, default: '' },
    register_time : { type: Date, default: Date.now }
},{collection: 'user'});


//中间件
//UserSchema.pre('save', function(next) {
//    this.password = this.encryptPassword(this.password);
//    next();
//});

//密码加密
UserSchema.path('password').set(function(v){
    console.log('========');
    return this.encryptPassword(v);
});

//数据验证
UserSchema.path('username').validate(function (username) {
    return username.length > 0;
}, '用户名不能为空');
UserSchema.path('password').validate(function (password) {
    return password.length > 0;
}, '密码不能为空');
UserSchema.path('username').validate(function (username,fn) {
    var User = mongoose.model('User');
    User.findOne({ username: username }).exec(function (err, user) {
        if(user == null) {
            fn(true);
        }else{
            fn(false);
        }
    });
}, '用户名已存在');

//实例方法
UserSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            var encrypred = crypto.createHash('sha1').update(password).digest('hex')
            return encrypred;
        } catch (err) {
            console.log(err);
            return '';
        }
    }
}

// 静态方法
UserSchema.statics = {
    list : function (options,callback) {
        var criteria = options.criteria || {};
        this.find(criteria)
            .sort({'_id': -1}) 
            //.limit(options.perPage)
            //.skip(options.perPage * options.page)
            .exec(callback);
    },
    findById : function(_id,callback){
        
    },
    doLogin : function(username,password,callback){
        var password = UserSchema.methods.encryptPassword(password);
        this.findOne({username:username,password:password}).exec(callback);
    }
};

//
mongoose.model('User', UserSchema);