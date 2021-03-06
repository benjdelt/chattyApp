const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function sendNumberOfUsers(num) {
  wss.clients.forEach(function each(client) {
    
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(num));
    }
  });
}

function pickColor() {
  const colors = ['tomato', 'dodgerblue', 'mediumseagreen', 'orange'];
  const index = Math.floor(Math.random() * 4);
  return colors[index];
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  sendNumberOfUsers({numberOfUsers: wss.clients.size});
  ws.send(JSON.stringify({color: pickColor()}));

  // Broadcast number of connected users to every user

  ws.on('message', function incoming (data) {
    const message = JSON.parse(data);
    message.id = uuidv4();
    console.log(message.id)
    console.log(`User ${message.username} said ${message.content} with type ${message.type}`);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    
    
    
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')

    sendNumberOfUsers({numberOfUsers: wss.clients.size});

  });

  

});