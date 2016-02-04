var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var bookModelSchema = new Schema({
    titulo: String,
    npaginas: Number,
    craftworld: {type: Schema.Types.ObjectId, ref: 'CraftworldModel'}
  });

  mongoose.model('BookModel', bookModelSchema, 'bookModels');
};