(function() {
	'use strict';

	angular
		.module('goal')
		.controller('indexController', Controller);

	Controller.$inject = ['$location', 'auth'];

	/* @ngInject */
	function Controller($location, auth){
		var vm = this;
		vm.property = 'Controller';
		

		activate();

		////////////////

		function activate() {
			if (auth.isLoggedIn()) {
				$location.path('/overview');
			}
			
			// When ever the window resizes then
			// we want to update the title text size
			$(window).resize(resizeTitle);
			
			// And as the page loads we also want to update the
			// title text size
			$(document).ready(resizeTitle);
		}
		
		// Handles updating the text size of the title
		// gets he width of the title div, scales it
		// and sets the text size
		function resizeTitle() {
			var width = $("#title").width()/3;
			
			$("#title").css({'font-size': width});
		}
	}
})();