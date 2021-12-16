var app = angular.module("addGameApp", []);

app.controller('addGameCtrl', function($scope, $http) {
    $scope.addResults = " ";

    $scope.submitGame = function() {
        if($scope.name === "" || $scope.type === "" || $scope.effect === "") {
            $scope.addResults = "Game Title, Game Console, Category, ESRB, Rating, and Review are required";
            return;
        }

        $http({
            method: "post",
            url: "http://localhost:3000/writeinfo",
            data: {
                "gameTitle": $scope.gameTitle,
                "gameConsole": $scope.gameConsole,
                "category": $scope.category,
                "esrb": $scope.esrb,
                "rating": $scope.rating,
                "review": $scope.review
            }
        }).then(function(responce) {
            if(responce.data.msg === "SUCCESS") {
                $scope.addResults = "Game Is Added!";
                $scope.gameTitle = "";
                $scope.gameConsole = "";
                $scope.category = "";
                $scope.esrb = "";
                $scope.rating = "";
                $scope.review = "";
            } else {
                $scope.addResults = responce.data.msg
            }
        }, function(responce) {
            alert(responce);
            console.log(responce);
        });
    }

    $scope.startNew = function() {
        $scope.addResults = "";
    }
});
