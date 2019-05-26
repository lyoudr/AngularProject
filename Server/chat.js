/*Server WebSocket*/
const WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var socket = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});
var connections = [];
socket.on('request', function(request) {
  console.log('request origin is =>', request.origin);
  var connection = request.accept('echo-protocol', request.origin);
  connections.push(connection);
  console.log('client origin is =>', connections);
  //On message
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
        console.log('Received Message: ' + message.utf8Data);
        for(var i = 0; i < connections.length; i++) {
          connections[i].sendUTF(message.utf8Data);
        }
    }
    else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        connection.sendBytes(message.binaryData);
    }
  });
  
  //On Close
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

});



    