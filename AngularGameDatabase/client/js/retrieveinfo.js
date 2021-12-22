var app = angular.module("getGameApp", []);

app.controller('getGameCtrl', function($scope, $http) {
    $scope.games = [];
    $scope.gameConsoles = [];

    $scope.get_records = function() {
        $http({
            method: "get",
            url: "http://localhost:3000/getinfo"

        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                $scope.games = responce.data.gameDatabase
                $scope.gameConsoles = getGameConsoles(responce.data.gameDatabase);
                $scope.selectedGameConsole = $scope.gameConsoles[0];
            }
        }, function(responce) {

        });
    }

    $scope.redrawTable = function() {
        var gameConsole = $scope.selectedGameConsole.value;
        console.log('game type is: ' + gameConsole)
            $http({
                method: "get",
                url: "http://localhost:3000/getinfoByGameConsole",
                params: {gameConsole: gameConsole} 
            }).then(function(responce) {
                if(responce.data.msg === "SUCCESS") {
                    $scope.games = responce.data.gameDatabase;
                } else {
                    console.log(responce.data.msg);
                }
            }, function(responce) {
                console.log(responce)
            });
    }

    $scope.deleteGame = function(ID) {
        $http({
            method: "delete",
            url: "http://localhost:3000/deleteinfo",
            params: {gameID: ID} 
        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(responce.data.gameDatabase);
            }
        }, function(responce) {
            console.log(responce)
        });
    }
    $scope.get_records();

    $scope.editGame = function(gameNumber) {
        $scope.gameTitle = $scope.games[gameNumber].gameTitle;
        $scope.gameConsole = $scope.games[gameNumber].gameConsole;
        $scope.category = $scope.games[gameNumber].category;
        $scope.esrb = $scope.games[gameNumber].esrb;
        $scope.rating = $scope.games[gameNumber].rating;
        $scope.review = $scope.games[gameNumber].review;
        $scope.gameID = $scope.games[gameNumber]['_id'];

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.cancelUpdate = function() {
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    $scope.updateGame = function() {
        if($scope.gameTitle === "" || $scope.gameConsole === "" || $scope.category === "" || $scope.esrb === "" || $scope.rating === "" || $scope.review === "") {
            return
        }

        console.log("Game ID check: " + $scope.gameID);

        $http({
            method: "put",
            url: "http://localhost:3000/updateinfo",
            data: {
                "gameID": $scope.gameID,
                "gameTitle": $scope.gameTitle,
                "gameConsole": $scope.gameConsole.toLowerCase(),
                "category": $scope.category,
                "esrb": $scope.esrb,
                "rating": $scope.rating,
                "review": $scope.review
            }

        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                $scope.hideTable = false;
                $scope.hideForm = true;
                $scope.redrawTable();

                $scope.gameTitle = "";
                $scope.gameConsole = "";
                $scope.category = "";
                $scope.esrb = "";
                $scope.rating = "";
                $scope.review = "";
            } else {
                console.log(responce);
            }
            console.log(responce);
        }, function(responce) {
            console.log(responce);
        });
    }
});

function getGameConsoles(gameTableData) {
    var gameConsoleExists;
console.log(gameTableData);
    gameConsolesArray = [{value:"", display:"ALL"}];

    for(var i=0; i<gameTableData.length; i++) {
        gameConsoleExists = gameConsolesArray.find(function(element) {
                return element.value === gameTableData[i].gameConsole;
            });

            if(gameConsoleExists) {
                continue;
            } else {
                gameConsolesArray.push({value: gameTableData[i].gameConsole, display: gameTableData[i].gameConsole.toUpperCase()})
            }
    }
    return gameConsolesArray;
}
