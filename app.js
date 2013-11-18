var express = require('express'),
	http = require('http'),
	fs = require("fs");
	d = require("domain").create(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

d.on('error', function () {
	delete err.domain;
	console.log('domain err');
});

// 注册全局变量
global.g = {};      	
g.root = path.dirname(process.argv[1]);

// 连接数据库及加载模型
mongoose.connect(config.dsn);
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path + '/' + file)
});

//express配置及路由配置
require('./config/express')(app,config);
require('./config/routes')(app);

//socket
io.sockets.on('connection', require('./app/controllers/socket'));

server.listen(app.get('port'));
console.log('Express app started on port ' + app.get('port'));