angular.module('goal').config(configuration);

configuration.$inject = ['$routeProvider'];

/* @ngInject */
function configuration ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/overview.html',
            controller: 'indexController',
            controllerAs: 'vm'
        })
		.when('/tasks', {
			templateUrl: 'pages/tasks.html',
			controller: 'tasksController',
			controllerAs: 'vm'
		});
}