(function () {
	'use strict';
	angular
		.module('goal')
		.factory('auth', factory);

	factory.$inject = ['$http', '$window'];

	/* @ngInject */
	function factory($http, $window){
		var exports = {
			isLoggedIn: isLoggedIn,
			currentUser: currentUser,
			register: register,
			login: login,
			logout: logout,
			getToken: getToken
		};
		

		return exports;

		////////////////

		function saveToken(token) {
			$window.localStorage['goal-token'] = token;
		}
		
		function getToken() {
			return $window.localStorage['goal-token'];
		}
		
		function isLoggedIn() {
			var token = getToken();
			
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				
				return payload.exp > Date.now() / 1000;
			} else {
				return false;	
			}
		}
		
		function currentUser() {
			if (isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				
				return payload.username;
			}
		}
		
		function register(user) {
			return $http.post('/register', user).success(function(data) {
				saveToken(data, data.token);
			});
		}
		
		function login(user) {
			return $http.post('/login', user).success(function(data) {
					console.log(data.token);
					saveToken(data.token);
			});
		}
		
		function logout() {
			$window.localStorage.removeItem('goal-token');	
		}
	}
})();