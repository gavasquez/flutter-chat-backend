const { response } = require( 'express' );
const Usuario = require( '../models/usuario' );
const bcrypt = require( 'bcryptjs' );
const { generarJWT } = require( '../helpers/jwt' );

const crearUsuario = async ( req, res = response ) => {

  try {
    const { email, password } = req.body;
    const existeEmail = await Usuario.findOne( { email } );
    if ( existeEmail ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El email ya se encuentra registrado.'
      } );
    }
    const usuario = new Usuario( req.body );
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );
    await usuario.save();
    // Generar JWT
    const token = await generarJWT( usuario.id );
    // Respuesta
    res.json( {
      ok: true,
      usuario,
      token
    } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Hable con el administrador'
    } );
  }
};

const login = async ( req, res = response ) => {

  try {
    const { email, password } = req.body;
    const usuarioDB = await Usuario.findOne( { email } );
    if ( !usuarioDB ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'El email no existe.'
      } );
    }
    // Verificar la contraseña
    const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
    if ( !validarPassword ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'El password no es valido.'
      } );
    }
    // Generar token
    const token = await generarJWT( usuarioDB.id );
    res.json( {
      ok: true,
      usuario: usuarioDB,
      token
    } );
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Hable con el administrador'
    } );
  }

};

const renewToken = async ( req, res = response ) => {
  const uid = req.uid;
  const usuarioDB = await Usuario.findById(uid);
  // Generar token
  const token = await generarJWT( usuarioDB.id );
  res.json( {
    ok: true,
    usuario: usuarioDB,
    token
  } );
};

module.exports = {
  crearUsuario,
  login,
  renewToken
};