(function() {
	'use strict';

	angular
		.module('goal')
		.controller('headerController', Controller);

	Controller.$inject = ['$location', 'auth'];

	/* @ngInject */
	function Controller($location, auth){
		var vm = this;
		vm.property = 'Controller';
		
		vm.logout = auth.logout;
		
		vm.currentUser = auth.currentUser;
		
		vm.isLoggedIn = auth.isLoggedIn;

		////////////////
		
		function logout() {
			auth.logout();
		}
	}
})();