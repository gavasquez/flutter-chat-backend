/*
  path: /api/mensajes 
*/
const { Router } = require( 'express' );
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { obtenerChat } = require( '../controllers/mensajes' );

const router = Router();

// de: quien es la persona a la cual nos interesa leer los mensajes
router.get( '/:de', validarJWT, obtenerChat );

module.exports = router;