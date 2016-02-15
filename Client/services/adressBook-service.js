// Este servicio lo vamos a utilizar para registrar nuevos usuarios,
// loguear (autenticar) usuarios, y para obtener la información
// del usuario que haya autenticado.

// $http y $q están explicados en tareas-service.js
// $window es un servicio que nos da angular y que utilizaremos
// para guardar el token cuando autentiquemos un usuario
AdressBookService = function($http, $q, $window) {
    var SERVER_URL_USERS = "http://localhost:8080/user"; //aqui tenim tot lo de adress book

    var user = null;

    this.addAdressBook = function(ab) {
        var q = $q.defer();

        // Post con primer parámetro la url, segundo el body, que será la tarea
        $http.post(SERVER_URL_USERS + "/newAdressBook", ab)
            .then(
                function(data) {
                    // La añadimos también en nuestro array
                    // Como tareas compartirá referencia con $scope.tareas
                    // en el controlador TareasCtrl, también se actualizará
                    // en la vista el cambio, sin necesidad de hacer nada
                    console.log("estoy en adressBook-service y la data que pondre es->"+data);
                    adressBookList.push(data.data);
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promiseer();
    }

}

angular.module('ContactNOWApp').service('AdressBookService', ['$http', '$q', '$window', AdressBookService]);