(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource', '$rootScope', '$http', '$filter', 'auth', 'socketio'];

	/* @ngInject */
	function  factory($resource, $rootScope, $http, $filter, auth, socketio){
		var exports = {
			addTask: addTask,
			removeTask: removeTask,
			updateTask: updateTask,
			getTasks: getTasks,
			getMostImportantTask: getMostImportantTask,
		};
		
		
		
		// When the update event is recived then update the data
		// on the webpage from the database
		socketio.on('update', function(data) {
			console.log("Recived 'update', Updating data")
			getTasksFromDB();
		});
//		socket.on('update', function(data) {
//			console.log("Recived 'update', Updating data")
//			getTasksFromDB();
//		});
		
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
			$http.post('/tasks', task, {headers: {Authorization: 'Bearer ' + auth.getToken()}}).success(function(data) {
				tasks.push(data);	
				emitUpdated();
				emitTasksReady();
			});
		}
		
		function removeTask(task) {
			console.log(auth.getToken());
			$http.delete('/tasks/' + task._id, {headers: {Authorization: 'Bearer ' + auth.getToken()}, data: task._id}).success(function(data) {
				emitUpdated();
				getTasksFromDB();
			});
		}
		
		function updateTask(task) {
			$http.put('/tasks/' + task._id, task, {headers: {Authorization: 'Bearer ' + auth.getToken()}}).success(function(data) {
				emitUpdated();
				getTasksFromDB();
			});
		}
		
		function getTasks() {
			getTasksFromDB();
		}
		
		function emitTasksReady() {
			$rootScope.$broadcast("tasksReady", tasks);
		}
		
		function emitUpdated() {
			socketio.emit("updated", {username: auth.currentUser()});
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
			$http.get('/tasks', {headers: {Authorization: 'Bearer ' + auth.getToken()}}).success(function(data) {
				tasks = $filter('orderBy')(data, getTaskImportance, true);;
				emitTasksReady();
			});
		}
	}
})();
