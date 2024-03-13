const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require( '../controllers/socket' );
const { comprobarJWT } = require( '../helpers/jwt' );
const { io } = require( '../index' );


// Mensajes de Sockets
io.on( 'connection', ( client ) => {
  // Cliente con jwt
  const [ valido, uid ] = comprobarJWT( client.handshake.headers[ 'x-token' ] );
  if ( !valido ) {
    return client.disconnect();
  }
  // Cliente autenticado
  usuarioConectado( uid );
  // Ingresar al usuario a una sala especifica


  // Sala global, cliente id, 
  client.join( uid );
  //client.to(uid).emit('');

  // escuchar del cliente mensaje-personal
  client.on( 'mensaje-personal',async ( payload ) => {
    //! Grabar mensaje
    await grabarMensaje( payload );
    io.to( payload.para ).emit( 'mensaje-personal', payload );
  } );

  client.on( 'disconnect', () => {
    console.log( 'Cliente desconectado' );
    usuarioDesconectado( uid );
  } );

  //client.on('mensaje', (payload) => {
  //    console.log('Mensaje', payload);
  //
  //    io.emit('mensaje', { admin: 'Nuevo mensaje' });
  //
  //});


} );
