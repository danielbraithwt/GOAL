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
		vm.finishedGoals = [];
        vm.addGoal = addGoal;
        vm.removeSelectedGoals = removeSelectedGoals;
		vm.markDoneSelectedGoals = markDoneSelectedGoals;
		vm.getDayImportance = getDayImportance;
		vm.getDayFinishedImportance = getDayFinishedImportance;

        ////////////////

        // Adds a goal to the array of goals
        function addGoal() {
            var goal = {};
            goal.name = vm.goalName;
            goal.importance = parseInt(vm.goalImportance);
			goal.selected = false;
            
            // Insert the new goal into goals
            vm.goals.push(goal);
            
            // Reset the form fields
            vm.goalName = '';
            vm.goalImportance = '';
        }

        // Removes the goal at index from the array
        // of goals
        function removeSelectedGoals() {
			for (var i = 0; i < vm.goals.length; i++) {
				
				// If the goal is selected 
            	if (vm.goals[i].selected === true) {
					vm.goals.splice(i, 1);
				}
			}
        }
		
		function markDoneSelectedGoals() {
			for (var i = 0; i < vm.goals.length; i++) {
				
				// If the goal is selected 
            	if (vm.goals[i].selected === true) {
					vm.finishedGoals.push(vm.goals.splice(i, 1)[0]);
				}
			}	
		}
        
		// Get the importance of the current day
        function getDayImportance() {
            var total = 0;
			
			for (var i = 0; i < vm.goals.length; i++) {
				total += vm.goals[i].importance;
			}
			
			total += vm.getDayFinishedImportance();
			
			return total;
        }
		
		function getDayFinishedImportance() {
			var total = 0;
			
			for (var i = 0; i < vm.finishedGoals.length; i++) {
				total += vm.finishedGoals[i].importance;
			}

			return total;
		}
    }
})();