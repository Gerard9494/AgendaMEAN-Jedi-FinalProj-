var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var express_jwt = require('express-jwt');
var config = require('../config');
var ObjectId = require('mongoose').Types.ObjectId;


var router = require('express').Router();


var UserModel = mongoose.model('UserModel');
var AdressBookModel = mongoose.model('AdressBookModel');

// A partir de aquí todas las rutas van a requerir estar autenticado
// Por eso usamos el middleware de express_jwt, pasandole el SECRET para
// que pueda desencriptar el token y comprobar que es correcto
// Como especificamos requestProperty: 'usuario' en req.usuario tendremos
// la info del usuario desencriptada
router.use(express_jwt({ secret: config.JWT_SECRET, requestProperty: 'user' }));

// Obtener agendas del usuario
router.get('/adressBook', function(req, res) {
    UserModel.findOne({ name: req.user.name }, function(err, user) {
        if (err) res.status(500).json(err);
        else {
            AdressBookModel.find({ _id: {$in: user.adressBooks} }, function(err, agendas) {
                if (err) res.status(500).json(err);
                else res.status(200).json(agendas);
            });
        }
    });
});

// Crear agenda
router.post('/newAdressBook', function(req, res) {
    var adressBookInstance = new AdressBookModel(req.body);
    adressBookInstance.save(function(err, newAdressBookInstance) {
        if (err) res.status(500).send(err);
        else {
            //ahora ya hemos creado la nueva agenda, entonces, vamos a añadirla al usuario
            UserModel.update({name: req.user.name}, {$push: { adressBooks: newAdressBookInstance._id }}, function(err) {
                if(!err) {
                    res.status(200).end();
                }
            });
        }
    });
});

// Modificar agenda
router.patch('/updateAdressBook/:id', function(req, res) {
    //comprobar que el ususario tenga la agenda que quiere modificar
    //modificar la agenda
    var abId = req.params.id;
    UserModel.findOne({ name: req.user.name }, function(err, user) {
        if (err) res.status(500).json(err);
        else if (!user.adressBooks.contains(abId)) res.status(500).json("No tiene la agenda solicitada");
        else {
            var abData = req.body;
            AdressBookModel.update({_id: abId}, {$set: abData}, function(err, agenda) {
                if (err) res.status(500).json(err);
                else res.status(200).json(agenda);
            });
        }
    });
});

// Borrar agenda
router.delete('/deleteAdressBook/:id', function(req, res) {
    var abId = req.params.id;
    UserModel.findOne({ name: req.user.name }, function(err, user) {
        if (err) res.status(500).json(err);
        else if (!user.adressBooks.contains(abId)) res.status(500).json("No tiene la agenda solicitada");
        else {
            var abData = req.body;
            AdressBookModel.remove({_id: new ObjectId(abId)}, function(err){
                if(!err) {
                    res.status(200).end();
                }
            });
        }
    });
});

module.exports = router;










