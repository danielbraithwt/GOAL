(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$cookies'];

	/* @ngInject */
	function  Factory($resource, $cookies){
		var exports = {
			addTask: addTask,
			getTasks: getTasks
		};
		
		// Initilise the array of tasks we are storing
		$cookies.put("TASKS", []);

		return exports;

		////////////////

		function addTask(task) {
			var tasks = $cookies.get("TASKS");
			tasks.push(task);
			$cookies.put("TASKS", tasks);
			
			return tasks;
		}
		
		function getTasks() {
			return $cookies.get("TASKS");
		}
	}
})();
