var LoginCtrl = function($scope, LoginService, ToastService, $state) {
    $scope.user = {
        username: '',
        password: ''
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