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
			
		}
	}
})();