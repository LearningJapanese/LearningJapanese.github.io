(function () {

    var app = angular.module("pimsleur");

    var LessonController = function ($scope, $interval, $location, $routeParams, $http, $window) {

        $scope.lid = $routeParams.lid;
        $scope.lsn = $routeParams.lsn;
        $scope.enabled = [];
        $scope.unitData = [];
        $scope.showUnits = false;

        var r = Math.floor((Math.random() * 1000) + 1);

        $http.get("js/data/level" + $scope.lid + ".json").success(function (data) {
            $scope.lsnCount = data.lessons.length;
            $scope.lessons = data.lessons;
        });

        $http.get("js/data/Level" + $scope.lid + "/lesson" + $scope.lsn + ".json").success(function (data) {
            angular.forEach(data.phrases, function (phrase, index) {
                $scope.enabled.push(false);
            });
            $scope.unitData = data.phrases;
        });

        $scope.hideTxt = function (txt) {
            var t = "";
            for (var i = 0; i < txt.length; i++) t += (txt.charAt(i) == " ") ? " " : "░";
            return t;
        }

        $scope.showHide = function (v) {
            angular.forEach($scope.enabled, function (value, index) {
                $scope.enabled[index] = v;
            });
        }

        $scope.navUnit = function (v) {
            var l = parseInt($scope.lid);
            var x = $scope.lsn;
            x = parseInt(x);
            x += (v) ? 1 : -1;
            if (x > 0 && x < ($scope.lsnCount + 1)) {
                $window.location.href = './#/level/' + $scope.lid + '/' + x;
            } else if (x > $scope.lsnCount) {
                l += (v) ? 1 : -1;
                if (l > 0) $window.location.href = './#/level/' + l;
            }
        }

        $scope.goDown = function (x) {
            if (x) $("html, body").animate({ scrollTop: $(document).height() }, 1);
            else window.scrollTo(0, 0);
        };

    };

    app.controller("LessonController", LessonController);

})();