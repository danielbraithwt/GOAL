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
        vm.goalImportance = '';
        vm.goals = [];
        vm.addGoal = addGoal;
        vm.removeGoal = removeGoal;
		vm.getDayImportance = getDayImportance;

        ////////////////

        // Adds a goal to the array of goals
        function addGoal() {
            var goal = {};
            goal.name = vm.goalName;
            goal.importance = parseInt(vm.goalImportance);
            
            // Insert the new goal into goals
            vm.goals.push(goal);
            
            // Reset the form fields
            vm.goalName = '';
            vm.goalImportance = '';
        }

        // Removes the goal at index from the array
        // of goals
        function removeGoal(index) {
            vm.goals.splice(index, 1);
        }
        
		// Get the importance of the current day
        function getDayImportance() {
            var total = 0;
			
			for (var i = 0; i < vm.goals.length; i++) {
				total += vm.goals[i].importance;
			}
			
			return total;
        }
    }
})();