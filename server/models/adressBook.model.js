var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var adressBookSchema = new Schema({
        name: {type: String, required: true},
        contacts: [{type: Schema.Types.ObjectId, ref: 'ContactModel'}]
    });
    mongoose.model('AdressBookModel', adressBookSchema, 'adressBookModels');
};