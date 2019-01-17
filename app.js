var restify = require('restify');

// 定义响应方法
function respond(req, res, next) {
    res.send('hello' + req.params.name);
}

// 创建服务
var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

// 监听 3900 接口
server.listen(3900, function(){
    console.log('%s listening at %s', server.name, server.url);
});