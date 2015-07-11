angular.module('goal').config(configuration);

configuration.$inject = ['$routeProvider'];

/* @ngInject */
function configuration ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index.html',
            controller: 'indexController',
            controllerAs: 'vm'
        })
		.when('/overview', {
            templateUrl: 'pages/overview.html',
            controller: 'overviewController',
            controllerAs: 'vm'
        })
		.when('/tasks', {
			templateUrl: 'pages/tasks.html',
			controller: 'tasksController',
			controllerAs: 'vm'
		})
		.when('/register', {
			templateUrl: 'pages/register.html',
			controller: 'authController',
			controllerAs: 'vm',
		})
		.when('/login', {
			templateUrl: 'pages/login.html',
			controller: 'authController',
			controllerAs: 'vm'
		});
}