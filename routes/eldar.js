var mongoose = require('mongoose');

var userRouter = require('express').Router();

var jwt_secret = require('../config').jwt_secret;
var express_jwt = require('express-jwt');

var User = mongoose.model('UserModel');
var Craftworld = mongoose.model('CraftworldModel');
var Libro = mongoose.model('BookModel');
var Arma = mongoose.model('DoorModel');
var Puerta = mongoose.model('WeaponModel');

//Crear craftworld
userRouter.post('/craftworld/:id_craftworld/crearEldar', function(req, res, next) {
  Craftworld.findOne({_id: req.params.id_craftworld}, function(err, infoPort) {
    if (infoPort==null) res.status(200).json("No existe el craftworld");
    else if (req.body.rango == "Comandante") res.status(200).json("No se puede crear un eldar con rango Comandante");
    else if(!err) {
      var eldar_instance = new User(req.body);
      eldar_instance.save(function(err, newEldar) {
      if (err) res.status(500).send(err);
      else res.status(200).json({ eldar: newEldar });
      });
    }
  });
});

module.exports = userRouter;