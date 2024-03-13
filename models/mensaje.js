
const { Schema, model } = require( 'mongoose' );


const MensajeSchema = Schema( {
  de: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
  },
  para: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  mensaje: {
    type: String,
    require: true,
  }
}, {
  timestamps: true
});

MensajeSchema.method( 'toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return object;
} );

module.exports = model( 'Mensaje', MensajeSchema );