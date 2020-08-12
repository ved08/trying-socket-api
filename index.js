var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('chat message', msg => {
        console.log(msg)
        io.emit('chat message', msg)
    })
    console.log('User Connected');
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});