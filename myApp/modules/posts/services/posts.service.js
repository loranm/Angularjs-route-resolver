(function () {
    'use strict';

    postsService.$inject = ['$http'];

    function postsService($http) {
        var url = "https://jsonplaceholder.typicode.com/posts/"
        return {
            getPosts: getPosts,
            getPostComments: getPostComments,
            getPostById: getPostById,
            postPost: postPost
        }

        function getPosts() {
            return $http.get(url)
                .then(getPostsSuccess)
                .catch(getPostsError)
        }

        function getPostComments(id){
            return $http.get(url + id +  '/comments/')
                .then(getPostsSuccess)
                .catch(getPostsError)
        }

        function getPostsSuccess(response) {
            return response.data
        }

        function getPostsError(err) {
            return err
        }

        function getPostById(array, id) {
            var forgedUrl = url + array[id - 1]['id']
            return $http.get(forgedUrl)
                .then(getPostByIdSuccess)
                .catch(getPostByIdError);
        }

        function getPostByIdSuccess(response) {
            return response.data
        }

        function getPostByIdError(err) {
            return err
        }


        function postPost() {
            var deferred = $q.defer();
            var url = "https://jsonplaceholder.typicode.com/posts"


            var data = {
                title: 'that is a new one',
                body: 'made it my self'
            };
            $http.post(url, data)
                .then(function (response) {
                    deferred.resolve(data)
                })
                .catch(function (err) {
                    debugger;
                })

            return deferred.promise;
        }
    }

    angular
        .module('postsModule')
        .factory('postsService', postsService)
})()