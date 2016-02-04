var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var doorModelSchema = new Schema({
    piso: Number,
    acceso_a: String,
    codigo_acceso: String,
    rangos: [String],
    craftworld: {type: Schema.Types.ObjectId, ref: 'CraftworldModel'}
  });

  mongoose.model('DoorModel', doorModelSchema, 'doorModels');
};