const http = require('http');
const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('BBXR-BXP OK');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    wss.clients.forEach(c => {
      if (c !== ws && c.readyState === 1) c.send(msg.toString());
    });
  });
});

server.listen(PORT, () => console.log('Listening on', PORT));
