var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var userModelSchema = new Schema({
    nombre: {type: String, required: true},
    codigo_acceso: {type: String, required: true},
    craftworld: {type: Schema.Types.ObjectId, ref: 'CraftworldModel'},
    rango: String
  });

  mongoose.model('UserModel', userModelSchema, 'userModels');
};