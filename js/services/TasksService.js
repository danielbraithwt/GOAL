(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$cookies'];

	/* @ngInject */
	function  factory($resource, $cookies){
		var exports = {
			addTask: addTask,
			getTasks: getTasks
		};
		
		// Initilise the array of tasks we are storing
		$cookies.putObject("TASKS", []);

		return exports;

		////////////////

		function addTask(task) {
			var tasks = $cookies.getObject("TASKS");
			tasks.push(task);
			$cookies.putObject("TASKS", tasks);
			
			return tasks;
		}
		
		function getTasks() {
			return $cookies.getObject("TASKS");
		}
	}
})();
