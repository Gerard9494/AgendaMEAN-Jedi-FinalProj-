// Este servicio lo vamos a utilizar para registrar nuevos usuarios,
// loguear (autenticar) usuarios, y para obtener la información
// del usuario que haya autenticado.

// $http y $q están explicados en tareas-service.js
// $window es un servicio que nos da angular y que utilizaremos
// para guardar el token cuando autentiquemos un usuario
AdressBookService = function($http, $q, $window) {
    var SERVER_URL_USERS = "http://localhost:8080/user"; //aqui tenim tot lo de adress book

    var user = null;

    this.getUser = function() {
        // Si ya lo tenemos lo devolvemos, sino dejamos el trabajo a reloadUser,
        // que lo va a obtener del servidor
        var q = $q.defer();
        if (user) {
            q.resolve(user);
            return q.promise;
        }
        else return this.reloadUser();
    }

    this.getAdressBook = function () {
        var user = null;
        var q = $q.defer();
        if (user) {
            q.resolve(user);
            return q.promise;
        }
        else return this.reloadUser();
    }

}

angular.module('ContactNOWApp').service('AdressBookService', ['$http', '$q', '$window', AdressBookService]);