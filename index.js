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
    socket.on('new user', user => {
        console.log(user + "Joined")
    })
    console.log('User Connected');
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})

http.listen(process.env.PORT, () => {
  console.log('listening on *:3000');
});