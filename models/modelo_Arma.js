var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var weaponModelSchema = new Schema({
    modelo: String,
    calibre: Number,
    craftworld: {type: Schema.Types.ObjectId, ref: 'CraftworldModel'}
  });

  mongoose.model('WeaponModel', weaponModelSchema, 'weaponModels');
};