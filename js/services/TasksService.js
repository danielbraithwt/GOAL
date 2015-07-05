(function () {
	'use strict';
	angular
		.module('goal')
		.factory('tasks', factory);

	factory.$inject = ['$resource'];

	/* @ngInject */
	function  Factory($resource){
		var exports = {
			addTask: addTask,
			removeTask: removeTask,
			updateTask: updateTask
		};
		

		return exports;

		////////////////

		function addTask() {
			
		}
		
		function removeTask() {
			
		}
		
		function updateTask() {
			
		}
	}
})();