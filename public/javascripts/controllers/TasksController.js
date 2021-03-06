(function() {
	'use strict';

	angular
		.module('goal')
		.controller('tasksController', Controller);

	Controller.$inject = ['$scope', 'tasks', 'auth'];

	/* @ngInject */
	function Controller($scope, tasks, auth){
		var vm = this;
		vm.adding = false;

		vm.searchText = '';

		vm.property = 'Controller';
		vm.goalName = '';
		vm.goalImportance = '';
		vm.goals = undefined;//= tasks.getTasks();
		vm.addGoal = addGoal;
		vm.removeSelectedGoals = removeSelectedGoals;
		vm.markDoneSelectedGoals = markDoneSelectedGoals;

		// Filtering
		vm.filterGoal = filterGoal;

		// Stats
		vm.getDayImportance = getDayImportance;
		vm.getDayFinishedImportance = getDayFinishedImportance;

		tasks.getTasks();

		if (!auth.isLoggedIn()) {
			$location.path('/login');
		}

		////////////////

		$scope.$on("tasksReady", function(e, tasks) {
			vm.goals = tasks;	
			console.log("Recived Tasks: " + vm.goals);
		});

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
			goal.task = vm.goalName;
			goal.importance = parseInt(vm.goalImportance);
			goal.selected = false;
			goal.done = false;

			// Insert the new goal into goals
			tasks.addTask(goal);
			vm.goals.push(goal);

			// Reset the form fields
			vm.goalName = '';
			vm.goalImportance = '';

			vm.adding = false;
			
			console.log(vm.goals);
		}

		// Removes the goal at index from the array
		// of goals
		function removeSelectedGoals() {
			for (var i = 0; i < vm.goals.length; i++) {

				// If the goal is selected 
				if (vm.goals[i].selected === true) {
					var task = vm.goals.splice(i, 1);
					console.log(task[i]);
					tasks.removeTask(task[0]);
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

					tasks.updateTask(vm.goals[i]);
				}
			}	

			//vm.goals = tasks.saveTasks(vm.goals);
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

		// Get the importance of the current day
		function getDayImportance() {
			if (vm.goals === undefined) {
				return;
			}

			var total = 0;

			for (var i = 0; i < vm.goals.length; i++) {
				total += vm.goals[i].importance;
			}

			return total;
		}

		// Goes through the goals and adds up the
		// importance of the goals you have finished
		function getDayFinishedImportance() {
			if (vm.goals === undefined) {
				return;
			}

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