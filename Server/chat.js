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
  var connection = request.accept('echo-protocol', request.origin);
  let prevname;
  //On message
  connection.on('message', function(message) {
    let receivedMessage = JSON.parse(message.utf8Data);
    console.log('receivedMessage is =>', receivedMessage)
    let namelist = [];
    if(receivedMessage.name != prevname){
      connections.push(connection);
      console.log('client origin is =>', connections);
      console.log('connections.length is =>',connections.length);
      namelist.push(receivedMessage.name);
      prevname = receivedMessage.name;
    } else {
      return;
    }
    if (message.type === 'utf8') {
        console.log('Received Message: ' + message.utf8Data);
        for(var i = 0; i < connections.length; i++) {
          if (i == namelist.indexOf[`${receivedMessage.name}`]) {
            continue;
          } else {
            connections[i].sendUTF(receivedMessage.message);
          }
          
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



    