var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var contactSchema = new Schema({
        name: {type: String, required: true},
        apellidos: String,
        compañia: String,
        telefono: String,
        mail: String
    });
    mongoose.model('ContactModel', contactSchema, 'contactModels');
};