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
                AdressBookService.addAdressBook({ name: $scope.name, contacts: [] }).then(
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
    $scope.adressBookList = [
        {
            name: "Girona",
            contacts: [
                {
                    name: "Nom1",
                    apellidos: "Cognom1",
                    compania: "x",
                    telefono: 973231233,
                    mail: "x@x.com"
                },
                {
                    name: "Nom2",
                    apellidos: "Cognom2",
                    compania: "x",
                    telefono: 973231233,
                    mail: "x@x.com"
                },
                {
                    name: "Nom3",
                    apellidos: "Cognom3",
                    compania: "x",
                    telefono: 973231233,
                    mail: "x@x.com"
                },
                {
                    name: "Nom4",
                    apellidos: "Cognom4",
                    compania: "x",
                    telefono: 973231233,
                    mail: "x@x.com"
                },
                {
                    name: "Nom5",
                    apellidos: "Cognom5",
                    compania: "x",
                    telefono: 973231233,
                    mail: "x@x.com"
                }
            ]

        },
        {
            name: "Barcelona",
            contacts: []
        },
        {
            name: "Lleida",
            contacts: []
        },
        {
            name: "Tarragona",
            contacts: []
        }
    ];
    console.log("abans");
    console.log("despres");

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