(function() {
    'use strict';

    angular
        .module('goal')
        .controller('tasksController', Controller);

    Controller.$inject = ['$scope'];

    /* @ngInject */
    function Controller($scope){
        var vm = this;
		vm.adding = false;
		
		vm.searchText = '';
		
        vm.property = 'Controller';
        vm.goalName = '';
        vm.goalImportance = '';
        vm.goals = [];
        vm.addGoal = addGoal;
        vm.removeSelectedGoals = removeSelectedGoals;
		vm.markDoneSelectedGoals = markDoneSelectedGoals;
		
		// Filtering
		vm.filterGoal = filterGoal;
		
		// Sorting
		vm.getGoalImportance = getGoalImportance;
		
		// Stats
		vm.getDayImportance = getDayImportance;
		vm.getDayFinishedImportance = getDayFinishedImportance;

        ////////////////

        // Adds a goal to the array of goals
        function addGoal() {
			if (vm.adding == false) {
				vm.adding = true;
				return;
			}
			
			// Make sure that there are values in the
			// fields
			if (vm.goalName === '' || vm.goalImportance === '') {
				return;
			}
			
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
			
			vm.adding = false;
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
		function filterGoal(goal) {
			if (goal.done === true) {
				return false;	
			}
			
			if (vm.searchText !== '' && goal.name.toLowerCase().indexOf(vm.searchText.toLowerCase()) === -1) {
				return false;	
			}
			
			return true;
		}
		
		// Returns a goals importance
		function getGoalImportance(goal) {
			return goal.importance;	
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