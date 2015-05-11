angular
    .module('goal')
    .controller('indexController', ['$scope', Controller]);

function Controller($scope) {

    $scope.goalName = '';
    $scope.goals = [];
    $scope.addGoal = addGoal;
    $scope.removeGoal = removeGoal;

    ///////////////
    // Functions //
    
    function addGoal() {
        $scope.goals.push($scope.goalName);
        $scope.goalName = '';
    }
    
    function removeGoal(index) {
        $scope.goals.splice(index, 1);
    }
};