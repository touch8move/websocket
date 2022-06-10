import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 9999 });
// var clients = [];
wss.on('connection', function connection(ws, req) {
  // clients.push(ws);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  console.log('connected '+Date.now()+" id:");
  ws.on('pong', function(){console.log('pong');});

  ws.on('close', function close(){
    console.log('disconnected');
  });
});