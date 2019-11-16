const http = require('http').Server();
const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('Usuário conectado!');
    socket.on('user-connected', user => {
        socket.user = user;
        console.log('Usuário conectado: ' + user)
        socket.broadcast.emit('users-changed', { user: user, event: 'conectado'});
    });

    socket.on('message', data => {
        io.emit('message', data);
        console.log(data);
    });

    socket.on('disconnect', () => {
        io.emit('users-changed', { user: socket.user, event: 'disconectado'});
    });
});

let port = Number(process.env.PORT || 3000);
http.listen(port, () => {
    console.log("Listening on: " + port);
});