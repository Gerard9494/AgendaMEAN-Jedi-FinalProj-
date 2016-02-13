var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var express_jwt = require('express-jwt');
var config = require('../config');
var ObjectId = require('mongoose').Types.ObjectId;


var router = require('express').Router();


var UserModel = mongoose.model('UserModel');
var AdressBookModel = mongoose.model('AdressBookModel');
var ContactModel = mongoose.model('ContactModel');

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
                else res.status(200).json(agendas); //devolvemos toda la info de las agendas que tiene el usuario
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
        else if (!user.adressBooks.contains(abId)) res.status(500).json("You don't have that Adressbook");
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

    AdressBookModel.remove({_id: new ObjectId(abId)}, function(err){
        if(!err) {
            res.status(200).end();
        } else {
            var query = { name: req.usuario.name };

            // Eliminamos la agenda con _id = req.params.id
            // del array de agendas del usuario
            var update = { $pull: { "adressBooks._id": req.params.id } };

            // Explicado más arriba
            var options = { 'new': true };

            UserModel.findOneAndUpdate(query, update, options, function(err, updated) {
                if (err) res.status(500).json(err);
                else res.status(200).json(updated);
            });
        }
    });
});

// Crear contacto
router.post('/newContact', function(req, res) {
    var contactInstance = new ContactModel(req.body);
    contactInstance.save(function(err, newContact) {
        if (err) res.status(500).send(err);
        else {
            ContactModel.save(function(err, newContact) {
                if (err) res.status(500).send(err);
                else res.status(200).json({ contact: newContact });
            });
        }
    });
});

// Modificar contacto
router.patch('/updateContact/:id', function(req, res) {
    var cId = req.params.id;
    var cData = req.body;
    ContactModel.update({_id: cId}, {$set: cData}, function(err) {
        if(!err) {
            res.status(200).end();
        }
    });
});

// Borrar contacto
router.delete('/deleteContact/:id', function(req, res) { //s'ha de borrar de tot arreu eh!
    var cId = req.params.id;

    ContactModel.remove({_id: new ObjectId(cId)}, function(err){
        if(!err) {
            res.status(200).end();
        } else {
            var query = {};

            // Eliminamos la agenda con _id = req.params.id
            // del array de agendas del usuario
            var update = { $pull: { "contacts._id": cId } };

            // Explicado más arriba
            var options = { 'new': true };

            AdressBookModel.findAndUpdate(query, update, options, function(err, updated) {
                if (err) res.status(500).json(err);
                else res.status(200).json(updated);
            });
        }
    });
});


// Si no ha entrado en ninguna ruta anterior, error 404 not found
router.all('*', function(req, res) { res.status(404).send("Error 404 not found"); });

module.exports = router;










