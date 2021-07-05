const express = require('express');
const app = express()

app.set('view engine', 'ejs');
const server = require("http").Server(app);
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, { debug: true });
app.use(express.static('public'));
app.use('/peerjs', peerServer);



app.get('/', function(req, res) {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', function(req, res) {
    res.render('room', { roomId: req.params.room })

})

io.on('connection', socket => {

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })
})

















server.listen(port = process.env.PORT || 3030);