(function() {
    
    var app = angular.module("pimsleur");

    var UnitListController = function($scope, $interval, $location, $http, $routeParams) {

        $scope.lid = $routeParams.lid;
        console.log($scope.lid)
        
        $http.get( "js/data/level1.json").success(function(data) {
            $scope.level1Data = data;
        });
    };
    
    app.controller("UnitListController", UnitListController);

})();