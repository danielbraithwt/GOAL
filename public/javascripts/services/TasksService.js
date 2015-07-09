(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$rootScope', '$http', '$filter'];

	/* @ngInject */
	function  factory($resource, $rootScope, $http, $filter){
		var exports = {
			addTask: addTask,
			removeTask: removeTask,
			updateTask: updateTask,
			getTasks: getTasks,
			getMostImportantTask: getMostImportantTask,
		};
		
		// Initilise the array of tasks we are storing
		var tasks = undefined;
		//$http.get('/tasks').success(function(data) {
			//$filter('orderBy')(data, getTaskImportance, true);
		//	tasks = data;		
		//});
		
		getTasksFromDB();
		
		return exports;

		////////////////
		
		function addTask(task) {
			$http.post('/tasks', task).success(function(data) {
				tasks.push(data);	
				
				emitTasksReady();
			});
		}
		
		function removeTask(task) {
			$http.delete('/tasks/' + task._id, task).success(function(data) {
				getTasksFromDB();
			});
		}
		
		function updateTask(task) {
			$http.put('/tasks/' + task._id, task).success(function(data) {
				getTasksFromDB();
			});
		}
		
		function getTasks() {
			getTasksFromDB();
		}
		
		function emitTasksReady() {
			$rootScope.$broadcast("tasksReady", tasks);
		}
		
		function getMostImportantTask() {
			
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
			$http.get('/tasks').success(function(data) {
				tasks = $filter('orderBy')(data, getTaskImportance, true);;
				emitTasksReady();
			});
		}
	}
})();
