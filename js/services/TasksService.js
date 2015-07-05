(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$cookieStore'];

	/* @ngInject */
	function  factory($resource, $cookieStore){
		var exports = {
			addTask: addTask,
			getTasks: getTasks
		};
		
		// Initilise the array of tasks we are storing
		$cookieStore.put("TASKS", []);

		return exports;

		////////////////

		function addTask(task) {
			console.log(task);
			
			var tasks = $cookieStore.get("TASKS");
			tasks.push(task);
			$cookies.put("TASKS", tasks);
			
			return tasks;
		}
		
		function getTasks() {
			return $cookieStore.get("TASKS");
		}
	}
})();
