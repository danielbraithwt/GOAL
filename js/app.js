// Create the angular app 'goal'
angular.module('goal', ['ngRoute'])
        .config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/index.html',
        controller: 'indexController'
    });
}