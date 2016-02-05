var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var userModelSchema = new Schema({
        name: {type: String, required: true, index: { unique: true }}, //El name es PK 
        password: {type: String, required: true}
    });
    mongoose.model('UserModel', userModelSchema, 'userModels');
};