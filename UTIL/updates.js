var node_ip = '127.0.0.1', node_port = '1337';

var srvtoken = "<enter random string>";

var express = require('express'), app = express();
var server = require('http').createServer(app);

//SOCKET.IO [npm install socket.io]
var io = require('socket.io').listen(server);

io.set('log level', 0);
io.set('browser client minification', true); 

io.sockets.on('connection', function (socket) {
    socket.on('srvmsg', function(data) {
    	console.log(data);
    	if(typeof data.srvtoken === 'undefined' || data.srvtoken !== srvtoken || typeof data.room === 'undefined') return;
        io.sockets.in(data.room).emit('update', {token: data.clitoken, timestamp: data.timestamp});
    });
    socket.on('subscribe', function(room) {
    	socket.join(room);
    });
});

server.listen(node_port, node_ip);