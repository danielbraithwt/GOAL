(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$cookies', '$http', '$filter'];

	/* @ngInject */
	function  factory($resource, $cookies, $http, $filter){
		var exports = {
			addTask: addTask,
			getTasks: getTasks,
			saveTasks: saveTasks,
			getMostImportantTask: getMostImportantTask
		};
		
		// Initilise the array of tasks we are storing
		var tasks = getTasksFromDB();
		//$cookies.putObject("TASKS", tasks);

		return exports;

		////////////////

		function addTask(task) {
			//var tasks = $cookies.getObject("TASKS");
			$http.post('/tasks', task).success(function(data) {
				tasks.push(data);	
				
				console.log(tasks);
			});
			//tasks.push(task);
			//$cookies.putObject("TASKS", tasks);
			
			return getTasks();
		}
		
		function saveTasks(tasks) {
			$cookies.putObject("TASKS", tasks);
			return getTasks();
		}
		
		function getTasks() {
			return $filter('orderBy')(tasks, getTaskImportance, true);
		}
		
		function getMostImportantTask() {
			var tasks = getTasks();
			
			for (var i = 0; i < tasks.length; i++) {
				if (tasks[i].done !== true) {
					return i;
				}
			}
		}
		
		// Returns a goals importance, used for sorting the array
		// of goals
		function getTaskImportance(goal) {
			return goal.importance;	
		}
		
		function getTasksFromDB() {
			var t = [];
			
			$http.get('/tasks').success(function(data) {
				angular.copy(data, t);
			});
			
			return t;
		}
	}
})();
