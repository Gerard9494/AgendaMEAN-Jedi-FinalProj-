var LayoutCtrl = function($scope, $state, LoginService) {
    $scope.pageName = function() {
        if ($state.includes('login')) return "Login";
        else return "Contacts List";
    };
};


angular.module('ContactNOWApp').controller('LayoutCtrl', ['$scope', '$state', 'LoginService', LayoutCtrl]);