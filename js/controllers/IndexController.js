(function() {
    'use strict';

    angular
        .module('goal')
        .controller('indexController', Controller);

    Controller.$inject = ['$scope'];

    /* @ngInject */
    function Controller($scope){
        var vm = this;
        vm.property = 'Controller';
        vm.goalName = '';
        vm.goals = [];
        vm.addGoal = addGoal;
        vm.removeGoal = removeGoal;

        ////////////////

        function addGoal() {
            vm.goals.push(vm.goalName);
            vm.goalName = '';
        }

        function removeGoal(index) {
            vm.goals.splice(index, 1);
        }
    }
})();