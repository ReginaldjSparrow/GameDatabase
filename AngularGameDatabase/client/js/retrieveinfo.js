var app = angular.module("getGameApp", []);

app.controller('getGameCtrl', function($scope, $http) {
    $scope.games = [];
    $scope.consoles = [];

    $scope.get_records = function() {
        $http({
            method: "get",
            url: "http://localhost:3000/getinfo"

        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                $scope.games = responce.data.games
                $scope.consoles = getConsoles(responce.data.games);
                $scope.selectedConsole = $scope.consoles[0];
            }
        }, function(responce) {

        });
    }

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;

            $http({
                method: "get",
                url: "http://localhost:3000/getinfoByConsole",
                params: {console: Console} 
            }).then(function(responce) {
                if(responce.data.msg === "SUCCESS") {
                    $scope.games = responce.data.games;
                } else {
                    console.log(responce.data.games);
                }
            }, function(responce) {
                console.log(responce)
            });
    }

    $scope.deleteGame = function(GameTitle) {
        $http({
            method: "delete",
            url: "http://localhost:3000/deleteinfo",
            params: {gameTitle: gameTitle} 
        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(responce.data.games);
            }
        }, function(responce) {
            console.log(responce)
        });
    }
    $scope.get_records();
});

function getTypes(gameTableData) {
    var consoleExists;

    consolesArray = [{values:"", display:"ALL"}];

    for(var i=0; i<gameTableData.length; i++) {
            consoleExists = consolesArray.find(function(element) {
                return element.value === gameTableData[i].console;
            });

            if(consoleExists) {
                continue;
            } else {
                consolesArray.push({value: gameTableData[i].console, display: gameTableData[i].console.toUpperCase()})
            }
    }
    return consolesArray;
}
