var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var userModelSchema = new Schema({
        name: {type: String, required: true, index: { unique: true }}, //El name es PK
        password: {type: String, required: true},
        adressBooks: [{type: Schema.Types.ObjectId, ref: 'AdressBookModel', default:[]}]
    });
    mongoose.model('UserModel', userModelSchema, 'userModels');
};