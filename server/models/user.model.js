var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var userModelSchema = new Schema({
        name: {type: String, required: true},
        password: {type: String, required: true}
    });
    mongoose.model('UserModel', userModelSchema, 'userModels');
};