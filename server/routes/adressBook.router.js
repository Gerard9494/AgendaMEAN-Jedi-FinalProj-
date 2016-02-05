var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var express_jwt = require('express-jwt');
var config = require('../config');

var authRouter = require('express').Router();


var UserModel = mongoose.model('UserModel');


authRouter.use(express_jwt({ secret: config.JWT_SECRET, requestProperty: 'user' }));
    // Obtener un usuario y sus agendas
    authRouter.get('/', function(req, res) {
        Usuario.findOne({ username: req.usuario.username }, function(err, user) {
            if (err) res.status(500).json(err);
            else res.status(200).json(user);
    });
});