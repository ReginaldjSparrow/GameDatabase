var games = [];
var activeGame = 0;

var app = angular.module("browseGamesApp", []);
console.log('something');
app.controller('browseGamesCtrl', function($scope, $http) {
    console.log('something23');
    $scope.obj = [];
    $scope.get_records = function() {
        $http({
            method: "get",
            url: "http://localhost:3000/getinfo"
        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                games = responce.data.gameDatabase;
                $scope.obj = games[activeGame];
                $scope.showhide();
            } else {
                console.log(responce);
            }
        }, function(responce) {
            alert(responce);
            console.log(responce);
        });
    }

    $scope.get_records();

    $scope.changeGame = function(direction) {
        activeGame += direction;
        $scope.obj = games[activeGame];
        $scope.showhide();
    }

    $scope.showhide = function() {
        $scope.hidePrev = (activeGame === 0) ? true : false;
        $scope.hideNext = (activeGame === games.length-1) ? true : false;
    }
});