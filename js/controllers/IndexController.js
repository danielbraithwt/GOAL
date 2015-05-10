angular
    .module('goal')
    .controller('indexController', ['$scope', Controller]);

function Controller($scope) {

    $scope.goalName = '';
    $scope.goals = [];
    $scope.addGoal = addGoal;

    function addGoal() {
        $scope.goals.push($scope.goalName);
        $scope.goalName = '';
    }
};