const Mensaje = require( '../models/mensaje' );
const { response } = require( 'express' );

const obtenerChat = async ( req, res = response ) => {

  try {
    // Mi uid que obtenemos del token
    const miId = req.uid;
    // Parametro de la peticion
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find( {
      $or: [
        {
          de: miId,
          para: mensajesDe,
        },
        {
          de: mensajesDe,
          para: miId,
        }
      ]
    } ).sort( { createdAt: 'desc' } ).limit( 30 );
    res.json( {
      ok: true,
      mensajes: last30,
    } );
  } catch ( error ) {
    return res.status( 500 ).json( {
      ok: 'false',
      msg: 'hable con el administrador'
    } );
  }
};

module.exports = {
  obtenerChat,
};