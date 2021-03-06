var restify = require('restify');
var restifyPlugin = require('restify-plugins');
var config = require('./config');
//var config = require('config');

// 创建服务
var server = restify.createServer({
    "name": config.name,
    "version": config.version
});

// 中间件配置
server.use(restifyPlugin.jsonBodyParser({mapParams: true}));
server.use(restifyPlugin.acceptParser(server.acceptable));
server.use(restifyPlugin.queryParser({mapParams: true}));
server.use(restifyPlugin.bodyParser({mapParams: true}));
server.use(restifyPlugin.fullResponse());

// 监听 8088 端口
server.listen(config.port, function(){
    console.log('server listening');
});

// 路由
var route = require('./config/router')(server);