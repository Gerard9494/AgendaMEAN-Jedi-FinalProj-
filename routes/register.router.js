var bcrypt = require('bcrypt');
var async  = require('async');
var mongoose = require('mongoose');
var userRouter = require('express').Router();
var jwt_secret = require('../config').jwt_secret;
var express_jwt = require('express-jwt');

userRouter.post('/login/register', function(req, res, next) {
    bcrypt.hash(req.body.password, 12, function(error, contraseña_encriptada) {
        //guardem password encrpt.
        console.log(contraseña_encriptada);
        var user = new User(req.body);

        user.password = contraseña_encriptada;

        user.save(function(err, newEldar) {
            if (err) res.status(500).send(err);
            else res.status(200).json({ user: newUser });
        });

        /*
        bcrypt.compare('mi-contraseña', contraseña_encriptada, function(err, sonIguales) {
            console.log("asincrono: Deberia ser true: " + sonIguales);
            bcrypt.compare('mi_contraseña', contraseña_encriptada, function(err, sonIguales2) {
                console.log("asincrono: Deberia ser false: " + sonIguales2);
            });
        });
        */
    });
});

module.exports = userRouter;