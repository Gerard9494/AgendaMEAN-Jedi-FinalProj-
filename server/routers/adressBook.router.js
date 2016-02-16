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

// Obtener usuario
router.get('/', function(req, res) {
    UserModel.findOne({ name: req.user.name }, function(err, user) {
        if (err) res.status(500).json(err);
        else res.status(200).json(user);
    });
});

// Obtener agendas del usuario
router.get('/getAdressBook', function(req, res) {
    UserModel.findOne({ name: req.user.name }, function(err, user) {
        console.log("ab->"+user.adressBooks);
        if (err) res.status(500).json(err);
        else {
            AdressBookModel.find({ _id: {$in: user.adressBooks} }, function(err, agendas) {
                if (err) res.status(500).json(err);
                else {
                    res.status(200).json(agendas);//devolvemos toda la info de las agendas que tiene el usuario
                }
            });
        }
    });
});

// Crear agenda
router.post('/newAdressBook', function(req, res) {
    var aux = {"name": req.body.name};
    var adressBookInstance = new AdressBookModel(aux);
    adressBookInstance.save(function(err, newAdressBookInstance) {
        if (err) {
            res.status(500).send(err);
        } else {
            var query = { name: req.user.name};
            var update = { $push: { adressBooks: newAdressBookInstance._id } };

            // Indica que queremos que el objeto que nos devuelva la callback (updated)
            // sea el nuevo (después de haberle aplicado la actualización) y no el viejo
            // Si no lo ponemos por defecto nos pone el viejo
            var options = { 'new': true };

            UserModel.findOneAndUpdate(query, update, options, function(err, updated) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.status(200).json(updated);
                }
            });
        }
    });
});

// Modificar agenda
router.patch('/updateAdressBook/:nameB/:nameA', function(req, res) {
    //comprobar que el ususario tenga la agenda que quiere modificar
    //modificar la agenda
    var nB = req.params.nameB;
    var nA = req.params.nameA;
    console.log("nb->"+nB);
    console.log("na->"+nA);
    AdressBookModel.findOne({ name: nB }, function(err, agenda) {
        if (err) res.status(500).json(err);
        else if (agenda == null) res.status(150).json("This adressBook doesn't exists");
        else {
            UserModel.findOne({ name: req.user.name }, function(err, user) {
                if (err) res.status(500).json(err);
                else {
                    console.log("ag->"+agenda._id);

                    var trobat = false;
                    for (i = 0; i < user.adressBooks.length && !trobat && agenda._id!=null; i++) {
                        trobat = (user.adressBooks[i].equals(agenda._id));
                        //console.log(user.adressBooks[i]+"<-     ->");

                    }
                    if (!trobat) res.status(500).json("You don't have that Adressbook");
                    else {
                        AdressBookModel.update({name: nB}, {$set: {name: nA}}, function(err, agenda) {
                            if (err) res.status(500).json(err);
                            else res.status(200).json(agenda);
                        });
                    }
                }
            });
        }
    });
});

// Borrar agenda
router.delete('/deleteAdressBook/:name', function(req, res) {

    AdressBookModel.findOne({name: req.params.name}, function(err, agenda) {
        console.log(agenda);
        var id = agenda._id;
        if (err) res.status(500).json(err);
        else {
            AdressBookModel.remove({name: req.params.name}, function(err){
                if(!err) {
                    res.status(200).end();
                } else {
                    var query = { name: req.user.name};

                    // Eliminamos la agenda con _id = req.params.id
                    // del array de agendas del usuario
                    var update = { $pull: { "adressBooks._id": id} };

                    // Explicado más arriba
                    var options = { 'new': true };

                     UserModel.findOneAndUpdate(query, update, options, function(err, updated) {
                         if (err) res.status(500).json(err);
                         else res.status(200).json(updated);
                     });
                }
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










