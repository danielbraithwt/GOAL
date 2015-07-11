(function() {
	'use strict';

	angular
		.module('goal')
		.controller('authController', Controller);

	Controller.$inject = ['$scope', '$location', 'auth'];

	/* @ngInject */
	function Controller($scope, $location, auth){
		var vm = this;
		vm.property = 'Controller';

		vm.user = {}
		
		vm.register = register;
		vm.login = login;
		
		////////////////

		function register() {
			console.log(vm.user);
			auth.register(vm.user).error(function(error) {
				vm.error = error;
			}).then(function() {
				$location.path('/overview');
			});;
		}
		
		function login() {
			auth.login(vm.user).error(function(error) {
				vm.error = error;
			}).then(function() {
				$location.path('/overview');
			});
		}
	}
})();