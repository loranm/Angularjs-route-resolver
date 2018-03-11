(function () {
    'use strict';
    angular
        .module('postsModule')
        .config(config)

    config.$inject = ['$routeProvider']

    function config($routeProvider) {
        $routeProvider
            .when('/posts', {
                template: '<posts-component posts="$resolve.getPosts"></posts-component>',
                resolve: {
                    getPosts: getPosts
                }
            })

        getPosts.$inject = ['postsService']
        function getPosts(postsService) {
            return postsService.getPosts();
            debugger;
        }
    }
})()