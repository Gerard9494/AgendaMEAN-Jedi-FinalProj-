var LoginCtrl = function($scope, LoginService, ToastService, $state) {
    $scope.user = {
        name: '',
        password: ''
    };

    $scope.posaSignUp = function() {
        $state.go('signUp');
    }

    $scope.login = function() {
        LoginService.login($scope.user)
            .then(function() {
                // Si todo correcto, vamos al estado tareas
                console.log("Ha logeado yeyeyeye");
                $state.go('tareas');
            }, function(err) {
                // Nuevamente discrimanos según el estado de la respuesta
                if (err.status === 401) {
                    ToastService.showToast("Wrong password");
                    $scope.user.password='';
                }
                else if (err.status === 404) {
                    ToastService.showToast("The user doesn't exists");
                    $scope.user.password='';
                    $scope.user.name='';
                }
                else if (err.status === 500) ToastService.showToast("An error occurred while signing in, try it again, please");
            });
    };
};


angular.module('ContactNOWApp').controller('LoginCtrl', ['$scope', 'LoginService', 'ToastService', '$state', LoginCtrl]);