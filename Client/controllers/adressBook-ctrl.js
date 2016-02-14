// Este controlador es para el dialog de añadir una agenda
angular.module('ContactNOWApp').controller('createAdressBookController',
    ['$scope', '$mdDialog', 'AdressBookService', 'ToastService',
        function ($scope, $mdDialog, AdressBookService, ToastService) {
            $scope.titulo = '';

            $scope.cancel = function() {
                // Cierra el dialog
                $mdDialog.cancel();
            }

            $scope.answer = function() {
                // Usamos AdressBookService para añadir la tarea (asíncrono)
                AdressBookService.addAdressBook({ name: $scope.name }).then(
                    function() {
                        AdressBookService.showToast("The adress book has been crated");
                        $mdDialog.hide();
                    },
                    function(err) {
                        ToastService.showToast("An error occurred while creating the new adress book, try it again, please");
                        $mdDialog.hide();
                    }
                );
            }
        }]);

var AdressBookCtrl = function($scope, AdressBookService, ToastService,$mdDialog ) {
    $scope.adressBookList = [];

    // Cuando se pulsa el boton de añadir tarea abrimos un dialog
    // con el servicio $mdDialog que nos da angular-material
    $scope.mostrarDialogAdress = function(event) {
        $mdDialog.show({
            controller: 'createAdressBookController',
            templateUrl: 'views/partials/add-task.html',
            parent: angular.element(document.body),
            targetEvent: event
        });
    };
};

angular.module('ContactNOWApp').controller('AdressBookCtrl', ['$scope', 'AdressBookService', 'ToastService', '$mdDialog', AdressBookCtrl]);