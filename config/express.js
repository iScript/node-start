var express = require('express')
    , mongoStore = require('connect-mongo')(express);

module.exports = function(app,config){
    // all environments
    app.set('port', process.env.PORT || config.port);
    app.set('views', g.root + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(g.root + '/public'));
    app.use(express.cookieParser('8e518fbe75fb557523ac1d6398569285'));
    app.use(express.session({ 
        secret: "8e518fbe75fb557523ac1d6398569285" ,        //session 秘钥
        //store : new mongoStore({                          //session 存储方式
        //    url: config.dsn,
        //    collection : 'sessions',
        //    auto_reconnect:true
        //})
    }));
    app.use(app.router);

    // development only
    if (app.get('env') === 'development') {
        app.use(express.errorHandler());
    }

    // production only
    if (app.get('env') === 'production') {

    };



    //app.all('*', function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By",' 3.2.1')
    //next();
    //});
}