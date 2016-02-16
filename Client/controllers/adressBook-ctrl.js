// Este controlador es para el dialog de añadir una agenda
angular.module('ContactNOWApp').controller('createAdressBookController',
    ['$scope', '$mdDialog', 'AdressBookService', 'ToastService',
        function ($scope, $mdDialog, AdressBookService, ToastService) {
            $scope.name = '';

            $scope.cancel = function() {
                // Cierra el dialog
                $mdDialog.cancel();
            }

            $scope.answer = function() {
                // Usamos AdressBookService para añadir la tarea (asíncrono)
                console.log("entro");
                AdressBookService.addAdressBook({ name: $scope.name }).then(
                    function() {
                        ToastService.showToast("The adress book has been crated");
                        $mdDialog.hide();
                    },
                    function(err) {
                        console.log("error");
                        ToastService.showToast("An error occurred while creating the new adress book, try it again, please");
                        $mdDialog.hide();
                    }
                );
            }
        }]);

angular.module('ContactNOWApp').controller('modifyAdressBookController',
    ['$scope', '$mdDialog', 'AdressBookService', 'ToastService',
        function ($scope, $mdDialog, AdressBookService, ToastService) {
            $scope.nameB = '';
            $scope.nameA = '';

            $scope.cancel = function() {
                // Cierra el dialog
                $mdDialog.cancel();
            }

            $scope.modify = function() {
                // Usamos AdressBookService para añadir la tarea (asíncrono)
                AdressBookService.modifyAdressBook($scope.nameB, $scope.nameA).then(
                    function() {
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

    AdressBookService.getAdressBook().then(function(ab) {
        $scope.adressBookList = ab;
    }, function(err) {
        ToastService.showToast("Se ha producido un error al cargar las adress book");
    });

    $scope.deleteAB = function (index) {
        var nomAB = $scope.adressBookList[index].name;
        AdressBookService.deleteAdressBook({ name: nomAB }).then(
            function() {
                ToastService.showToast("The adress book has been deleted");
                $mdDialog.hide();
            },
            function(err) {
                console.log("error");
                ToastService.showToast("An error occurred while deleting the adress book, try it again, please");
                $mdDialog.hide();
            }
        );
    }

    // Cuando se pulsa el boton de añadir tarea abrimos un dialog
    // con el servicio $mdDialog que nos da angular-material
    $scope.mostrarDialogAdress = function(event) {
        $mdDialog.show({
            controller: 'createAdressBookController',
            templateUrl: 'views/partials/add-adressBook.html',
            parent: angular.element(document.body),
            targetEvent: event
        });
    };

    // Cuando se pulsa el boton de añadir tarea abrimos un dialog
    // con el servicio $mdDialog que nos da angular-material
    $scope.mostrarDialogAdress2 = function(event) {
        $mdDialog.show({
            controller: 'modifyAdressBookController',
            templateUrl: 'views/partials/modify-adressBook.html',
            parent: angular.element(document.body),
            targetEvent: event
        });
    };
};

angular.module('ContactNOWApp').controller('AdressBookCtrl', ['$scope', 'AdressBookService', 'ToastService', '$mdDialog', AdressBookCtrl]);