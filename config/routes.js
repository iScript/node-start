var index = require('../app/controllers/index');
var user = require('../app/controllers/user');
var wechat = require('../app/controllers/wechat');

module.exports = function (app) {
    
    app.get('/',index.index);
    
    app.get('/user',user.index);
    app.get('/login',user.login);
    app.get('/register',user.register);
    app.post('/doLogin',user.doLogin);
    app.post('/doRegister',user.doRegister);

    app.get('/wechat',wechat.index);
    app.post('/wechat',wechat.receive);
}

