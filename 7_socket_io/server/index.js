
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

console.log(`Open this url in the browser => file://${__dirname}/../app/index.html`)

http.listen(8080, () => console.log('listening on http://localhost:8080') );


 
