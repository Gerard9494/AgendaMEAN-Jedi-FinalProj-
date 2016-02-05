// Necesitamos obtener el secret para poder generar el token
var secret = require('../config').jwt_secret;
var authRouter = require('express').Router();
var async = require('async');

// Este módulo lo utilizaremos para generar el token
var jwt = require('jsonwebtoken');

// Obtenemos el modelo del usuario
var mongoose = require('mongoose');

var UserModel = mongoose.model('UserModel');
/**
 * En esta ruta se generará un token de autenticación a enviar al usuario. El cliente
 * usa este token para acceder a las rutas protegidas de la API, es decir,
 * aquellas que requieran de login.
 */
authRouter.post('/login', function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;

    async.waterfall([
        function(callback) {
            // Buscamos el usuario en la BD
            UserModel.findOne({ name: name }, callback);
        },
        function(user, callback) {
            // Si no existe respondemos con error
            if (!user) res.status(404).send("El usuario no existe");
            // Sino comparamos la contraseña `a pelo` que nos ha enviado el cliente
            // con la encriptada que habia en la BD
            else bcrypt.compare(password, user.password, callback);
        },
        function(equalPasswords, callback) {
            // Si no son iguales respondemos con error
            if (!equalPasswords) res.status(401).send("Contraseña incorrecta");
            else {
                // Si no creamos el token con info de username y password
                // (no ponemos el array de tareas porque podría ser grande,
                // y nos interesa mantener el token pequeñito)
                // y le pasamos tambien el string secreto que tenemos en config.js
                // y le ponemos que expire al cabo de 1 día

                // Ahora no hay que hacer toObject porque ya es un objeto javascript
                // No como antes que era una instancia de un modelo de mongoose
                var token = jwt.sign(
                    { name: name, password: password },
                    config.JWT_SECRET,
                    { expiresInSeconds: 24*60*60 } // 1 día
                );
                // Y se lo devolvemos al cliente
                res.status(200).send({ token: token });
            }
        }
    ], function(error) {
        // Si ha habido error en alguna de las callbacks, devolvemos error
        if (error) res.status(500).json(error);
    });
});

module.exports = authRouter;