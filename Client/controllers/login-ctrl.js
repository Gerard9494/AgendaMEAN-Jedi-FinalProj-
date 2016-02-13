var LoginCtrl = function($scope, LoginService, ToastService, $state) {
    $scope.user = {
        username: '',
        password: ''
    };

    // Para registrar el usuario
    $scope.register = function() {
        // Usamos nuestro servicio LoginService
        // Es asíncrono, por lo que debemos usar la promise, con 
        // .then(funcion_todo_correcto, funcion_cuando_error)
        LoginService.register($scope.user)
            .then(function() {
                ToastService.showToast("Welcome " + $scope.user.username + ", you user has been created");
            }, function(err) {
                // Si ha habido error,
                console.log(err);
                // Discriminamos el error
                // Este code es el que devuelve mongoose cuando se viola la regla unique de username
                if (err.code === 11000) ToastService.showToast("The user already exists");
                // Y este es el estado cuando el error es mas general (no sabemos exactamente)
                else if (err.status === 500) ToastService.showToast("An error occurred while creating your user, try it again, please");
            });
    };

    $scope.login = function() {
        LoginService.login($scope.user)
            .then(function() {
                // Si todo correcto, vamos al estado tareas
                $state.go('tareas');
            }, function(err) {
                // Nuevamente discrimanos según el estado de la respuesta
                if (err.status === 401) ToastService.showToast("Wrong password");
                else if (err.status === 404) ToastService.showToast("The user doesn't exists");
                else if (err.status === 500) ToastService.showToast("An error occurred while signing in, try it again, please");
            });
    };
};


angular.module('ContactNOWApp').controller('LoginCtrl', ['$scope', 'LoginService', 'ToastService', '$state', LoginCtrl]);