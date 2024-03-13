const express = require( 'express' );
const path = require( 'path' );
// Variables de entorno dotenv
require( 'dotenv' ).config();
// DB Config
require( './database/config' ).dbConnection();

// App de Express
const app = express();

// Lectura y parseo
app.use( express.json() ); // Parsea el body en formato JSON

// Node Server
const server = require( 'http' ).createServer( app );
module.exports.io = require( 'socket.io' )( server );
require( './sockets/socket' );




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// Mis rutas
app.use( '/api/login', require( './routes/auth' ) );
// Usuarios
app.use( '/api/usuarios', require( './routes/ususarios' ) );





server.listen( process.env.PORT, ( err ) => {

  if ( err ) throw new Error( err );

  console.log( 'Servidor corriendo en puerto', process.env.PORT );

} );


