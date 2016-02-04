var mongoose = require('mongoose');

var userRouter = require('express').Router();

var jwt_secret = require('../config').jwt_secret;
var express_jwt = require('express-jwt');

var User = mongoose.model('UserModel');
var Craftworld = mongoose.model('CraftworldModel');
var Libro = mongoose.model('BookModel');
var Puerta = mongoose.model('DoorModel');
var Arma = mongoose.model('WeaponModel');
var ObjectId = require('mongoose').Types.ObjectId;

userRouter.post('/crearAdmin', function(req, res, next) {
  var admin_instance = new User(req.body);
  admin_instance.save(function(err, newUser) {
    if (err) res.status(500).send(err);
    else res.status(200).json({ user: newUser });
  });
});

//Crear craftworld
userRouter.post('/crearCraftworld', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {

  console.log(req.admin);

  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
  	var craftworld_instance = new Craftworld(req.body);
  	craftworld_instance.save(function(err, newCraftworld) {
	    if (err) res.status(500).send(err);
	    else res.status(200).json({ craftworld: newCraftworld });
  	});
  }
});


userRouter.patch('/promote/:id1', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var userId = req.params.id1;
    User.findOne({_id: new ObjectId(userId)}, function(err, data) {
      if(!err) {
        //promte
        console.log("body"+data);
        console.log("body2 "+data.rango);
        if (data.rango == "Brujo") { //a soldado
          console.log("estoy donde brujo");
          var aux = {"rango": "Soldado"};
          User.update({_id: userId}, {$set: aux}, function(err) {
            if(!err) {
              res.status(200).end();
            }
          });
        } else if (data.rango == "Soldado"){ //a comandante
          console.log("estoy donde soldado");
          var aux = {"rango": "Comandante"};
          User.update({_id: userId}, {$set: aux}, function(err) {
            if(!err) {
              res.status(200).end();
            }
          });
        } else res.status(200).end();
      }
    })
  }
});

//Crear Libros
userRouter.post('/craftworld/:id_craftworld/crearLibro', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var libro_instance = new Libro(req.body);
    libro_instance.save(function(err, newLibro) {
      if (err) res.status(500).send(err);
      else res.status(200).json({ libro: newLibro });
    });
  }
});

//Modificar Libros
userRouter.patch('/craftworld/:id_craftworld/modificarLibro/:id_libro', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  var cwId = req.params.id_craftworld;
  var lbId = req.params.id_libro;
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var libData = req.body;
    Libro.update({_id: lbId}, {$set: libData}, function(err) {
      if(!err) {
        res.status(200).end();
      }
    });
  }
});

//Borrar Libros
userRouter.delete('/craftworld/:id_craftworld/borrarLibro/:id_libro', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  var cwId = req.params.id_craftworld;
  var lbId = req.params.id_libro;
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    Libro.remove({_id: new ObjectId(lbId)}, function(err){
    if(!err) {
      res.status(200).end();
    }
  });
  }
});

//Crear Armas
userRouter.post('/craftworld/:id_craftworld/crearArma', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var arma_instance = new Arma(req.body);
    arma_instance.save(function(err, newArma) {
      if (err) res.status(500).send(err);
      else res.status(200).json({ arma: newArma });
    });
  }
});

//Modificar Armas
userRouter.patch('/craftworld/:id_craftworld/modificarArma/:id_arma', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  var cwId = req.params.id_craftworld;
  var aId = req.params.id_arma;
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var armaData = req.body;
    Arma.update({_id: aId}, {$set: armaData}, function(err) {
      if(!err) {
        res.status(200).end();
      }
    });
  }
});

//Borrar Armas
userRouter.delete('/craftworld/:id_craftworld/borrarArma/:id_arma', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  var cwId = req.params.id_craftworld;
  var aId = req.params.id_arma;
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    Arma.remove({_id: new ObjectId(aId)}, function(err){
    if(!err) {
      res.status(200).end();
    }
  });
  }
});

//Crear Puertas
userRouter.post('/craftworld/:id_craftworld/crearPuerta', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var puerta_instance = new Puerta(req.body);
    puerta_instance.save(function(err, newPuerta) {
      if (err) res.status(500).send(err);
      else res.status(200).json({ puerta: newPuerta });
    });
  }
});
//Modificar Puertas
userRouter.patch('/craftworld/:id_craftworld/modificarPuerta/:id_puerta', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  var cwId = req.params.id_craftworld;
  var pId = req.params.id_puerta;
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    var pData = req.body;
    Puerta.update({_id: pId}, {$set: pData}, function(err) {
      if(!err) {
        res.status(200).end();
      }
    });
  }
});

//Borrar Puertas
userRouter.delete('/craftworld/:id_craftworld/borrarPuerta/:id_puerta', express_jwt({secret: jwt_secret, requestProperty: 'admin'}), function(req, res, next) {
  console.log(req.admin);
  var cwId = req.params.id_craftworld;
  var pId = req.params.id_puerta;
  if (req.admin.rango != "admin") res.status(200).json("No esta logeado con un usuario con poderes de administrador");
  else {
    Puerta.remove({_id: new ObjectId(pId)}, function(err){
    if(!err) {
      res.status(200).end();
    }
  });
  }
});

module.exports = userRouter;