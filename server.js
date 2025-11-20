// importing node modules 
const http = require('http');
const { WebSocketServer } = require('ws');

// setting up http server (basic connection)
 const server = http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Websocket server is running.')

      let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
    } else {
      res.writeHead(200);
      res.end(content);
    }
  });
 })

 // passing HTTP server into Web Socket Server
 const wss = new WebSocketServer({server});

// telling server what to do when it receives a new connection
 wss.on('connection', (socket) => {
    console.log('Client connected.');

    // telling server what to do when it receives a new message
    socket.on('message', (data) => {
        console.log('Received: ', data.toString());
        
        // going through all of the connected clients
        wss.clients.forEach((client) =>{
        if(client != socket && client.readyState === client.OPEN){
            //sending data to each client
            client.send(data.toString());
        }
            
        })
    })

    wss.on('close',() => { console.log('Client disconnected.')})
})

const PORT = 3001; 
server.listen(PORT, () => { console.log(`Server listening on http://localhost:${PORT}`)});

// function writeSomething(somethingA,function somethingElse(somethingC) {

// }){

// }