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
			on: on,
		};

		// Create a socket to the webserver
		var socket = io();
		
		return exports;

		////////////////

		// Emit the message with the data to the server
		function emit(message, data) {
			socket.emit(message, data);
		}
		
		// When a socket recives the message
		// run the callback passed in
		function on(message, callback) {
			socket.on(message, callback);
		}
	}
})();