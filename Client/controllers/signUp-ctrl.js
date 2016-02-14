var SignUpCtrl = function($scope, LoginService, ToastService, $state) {
    $scope.user = {
        name: '',
        password: '',
        email: '',
        adressBooks: []
    };
    $scope.password2 = '';

    // Para registrar el usuario
    $scope.register = function() {
        if ($scope.user.password !== $scope.password2) {
            window.alert("The password aren not equals");
            $scope.user.password = '';
            $scope.password2 = '';
        }
        else {
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

            $state.go('login');
        }
    };
};

angular.module('ContactNOWApp').controller('SignUpCtrl', ['$scope', 'LoginService', 'ToastService', '$state', SignUpCtrl]);