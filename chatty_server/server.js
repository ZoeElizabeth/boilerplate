const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;



let clients = [];

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

  wss.broadcast = function broadcast(data) {
    
    wss.clients.forEach(function each(client) {
     
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
   
      }
    });
  };

wss.on('connection', (ws) => {
  console.log('Client connected');
  let count = {
    count: wss.clients.size,
    type: "count"
  };

  console.log(count, "1")
  wss.broadcast(JSON.stringify(count))
    
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  

    wss.clients.forEach(client => {
     
      if (client.readyState === WebSocket.OPEN) {

        client.send(message);
      }
    });
  });

  ws.on('close', () => { console.log('Client disconnected')
  let disconnectCount = {
    count: wss.clients.size,
    type: "count"
  };

  wss.broadcast(JSON.stringify(disconnectCount))
  });

});


