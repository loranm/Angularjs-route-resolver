(function () {
    'use strict';
    angular
        .module('myApp')
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider']

    function config($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: true
        });

        $routeProvider
            .when('/home', {
                template: '<home-component></home-component>'
            })

            .otherwise({
                redirectTo: '/home'
            });
    }
})()