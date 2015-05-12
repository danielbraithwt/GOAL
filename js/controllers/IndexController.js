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
        vm.removeSelectedGoals = removeSelectedGoals;
		vm.markDoneSelectedGoals = markDoneSelectedGoals;
		vm.isDone = isDone;
		vm.getDayImportance = getDayImportance;
		vm.getDayFinishedImportance = getDayFinishedImportance;

        ////////////////

        // Adds a goal to the array of goals
        function addGoal() {
			// Create a new goal
            var goal = {};
            goal.name = vm.goalName;
            goal.importance = parseInt(vm.goalImportance);
			goal.selected = false;
			goal.done = false;
            
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
		
		// Marks all the selected goals as being
		// done
		function markDoneSelectedGoals() {
			for (var i = 0; i < vm.goals.length; i++) {
				
				// If the goal is selected 
            	if (vm.goals[i].selected === true) {
					vm.goals[i].done = true;
					vm.goals[i].selected = false;
				}
			}	
		}
		
		// Given a goal object return wether it
		// is done or not
		function isDone(goal) {
			return !goal.done;	
		}
        
		// Get the importance of the current day
        function getDayImportance() {
            var total = 0;
			
			for (var i = 0; i < vm.goals.length; i++) {
				total += vm.goals[i].importance;
			}
			
			return total;
        }
		
		// Goes through the goals and adds up the
		// importance of the goals you have finished
		function getDayFinishedImportance() {
			var total = 0;
			
			for (var i = 0; i < vm.goals.length; i++) {
				if (vm.goals[i].done) {
					total += vm.goals[i].importance;
				}
			}

			return total;
		}
    }
})();