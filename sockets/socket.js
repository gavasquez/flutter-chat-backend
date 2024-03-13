const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    // Cliente con jwt
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    console.log(valido, uid)
    if (!valido) {
        return client.disconnect();
    }
    // Cliente autenticado
    usuarioConectado(uid);
    console.log('Cliente autenticado')

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    //client.on('mensaje', (payload) => {
    //    console.log('Mensaje', payload);
    //
    //    io.emit('mensaje', { admin: 'Nuevo mensaje' });
    //
    //});


});
