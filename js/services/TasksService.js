(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$cookies', '$filter'];

	/* @ngInject */
	function  factory($resource, $cookies, $filter){
		var exports = {
			addTask: addTask,
			getTasks: getTasks,
			saveTasks: saveTasks,
		};
		
		// Initilise the array of tasks we are storing
		$cookies.putObject("TASKS", []);

		return exports;

		////////////////

		function addTask(task) {
			var tasks = $cookies.getObject("TASKS");
			tasks.push(task);
			$cookies.putObject("TASKS", tasks);
			
			return getTasks();
		}
		
		function saveTasks(tasks) {
			$cookies.putObject("TASKS", tasks);
			return getTasks();
		}
		
		function getTasks() {
			return $filter('orderBy')($cookies.getObject("TASKS"), getTaskImportance, true);
		}
		
		// Returns a goals importance, used for sorting the array
		// of goals
		function getTaskImportance(goal) {
			return goal.importance;	
		}
	}
})();
