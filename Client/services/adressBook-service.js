// Este servicio lo vamos a utilizar para registrar nuevos usuarios,
// loguear (autenticar) usuarios, y para obtener la información
// del usuario que haya autenticado.

// $http y $q están explicados en tareas-service.js
// $window es un servicio que nos da angular y que utilizaremos
// para guardar el token cuando autentiquemos un usuario
AdressBookService = function($http, $q, LoginService) {
    var SERVER_URL_USERS = "http://localhost:8080/user"; //aqui tenim tot lo de adress book

    var user = null;

    var adressBookList = null;

    // Función pública, obtener todas las tareas
    this.getAdressBook = function() {
        var q = $q.defer();
        $http.get(SERVER_URL_USERS+"/getAdressBook")
            .then(
                function(data) {
                    // Y asignamos la variable local user a los datos obtenidos
                    q.resolve(data.data);
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;

    }

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
                    console.log("d->"+data);
                    console.log("dd->"+data.data);
                    console.log("ddn->"+data.data.name);

                    $http.get(SERVER_URL_USERS+"/getAdressBook")
                        .then(
                            function(data) {
                                // Y asignamos la variable local user a los datos obtenidos
                                q.resolve(data.data.adressBooks);
                            },
                            function(err) {
                                q.reject(err);
                            }
                        );

                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }
}

angular.module('ContactNOWApp').service('AdressBookService', ['$http', '$q', 'LoginService', AdressBookService]);