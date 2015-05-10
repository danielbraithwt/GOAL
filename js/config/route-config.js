angular.module('goal').config(configuration);

configuration.$inject = ['$routeProvider'];

/* @ngInject */
function configuration ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index.html',
            controller: 'indexController'
        });
}