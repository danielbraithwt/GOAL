(function () {
	'use strict';
	angular
		.module('goal')
		.factory('socketio', factory);

	factory.$inject = [];

	/* @ngInject */
	function factory(){
		var exports = {
			emit: emit,
			on, on,
		};

		// Create a socket to the webserver
		var socket = io('http://localhost:3000');
		
		return exports;

		////////////////

		function emit(message, data) {
			console.log("Emmiting: " + message + " -> " + data);
			socket.emit(message, data);
		}
		
		function on(message, callback) {
			socket.on(message, callback);
		}
	}
})();