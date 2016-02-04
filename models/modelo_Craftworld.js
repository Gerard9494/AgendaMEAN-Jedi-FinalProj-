var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var craftworldModelSchema = new Schema({
	nombre: String,
    poblacion: Number
  });

  mongoose.model('CraftworldModel', craftworldModelSchema, 'craftworldModelSchemaModels');
};