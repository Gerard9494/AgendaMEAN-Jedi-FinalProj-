var models = [ './modelo_Arma', './modelo_Libro', './modelo_Puerta', './modelo_Craftworld', './modelo_User'];

/**
 Funcion para inicializar los modulos, basado en el array definido arriba 
 con los paths de los modulos
 */
exports.initialize = function() {
  models.forEach(function(model){
    require(model)();
  });
};