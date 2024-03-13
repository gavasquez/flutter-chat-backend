const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    try {
        const usuarios = await Usuario
            // Filtrar para que no muestre al usuario que esta logueado
            .find({ _id: { $ne: req.uid } })
            .sort('-online')
            // Paginacion
            .skip(desde)
            .limit(10);
        res.json({
            ok: true,
            usuarios,
            desde,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getUsuarios,
}