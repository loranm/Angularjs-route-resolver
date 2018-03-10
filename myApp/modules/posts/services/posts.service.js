(function(){
    'use strict'; 

    postsService.$inject = ['$http'];

    function postsService ($http){
        var url = "https://jsonplaceholder.typicode.com/posts/"
        return {
            getPosts: getPosts,
            getFirstPost: getFirstPost,
            postPost: postPost
        }

        function getPosts(){
            return $http.get(url)
                .then (getPostsSuccess)
                .catch(getPostsError)
        }

        function getPostsSuccess (response) {
            return response.data
        }

        function getPostsError (err){
            return err
        }

        function getFirstPost (array){
            var forgedUrl = url + array[0]['id']
            return $http.get(forgedUrl)
                .then(getFirstPostSuccess)
                .catch(getFirstPostError);
        }

        function getFirstPostSuccess(response){
            return response.data
        }

        function getFirstPostError(err) {
            console.warn(err);
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
                .then(function(response){
                    deferred.resolve(data)
                })
                .catch(function(err){
                    debugger;
                })

            return deferred.promise;
        }
    }

    angular
        .module('postsModule')
        .factory('postsService', postsService)
})()