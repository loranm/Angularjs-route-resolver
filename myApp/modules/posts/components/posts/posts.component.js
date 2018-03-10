var component = {
    templateUrl: './myApp/modules/posts/components/posts/posts.component.html',
    controller: controller
}

controller.$inject = ['postsService','$timeout'];

function controller(postsService, $timeout) {
    var ctrl = this;
    ctrl.posts = undefined;
    ctrl.firstPost = undefined;
    ctrl.sendPost = sendPost;
    ctrl.$onInit = onInit;

    function onInit() {
        getPost(12)
            .then(function (post) {
                return ctrl.firstPost = post;
            })

            $timeout(function(){
                getPosts()
                    .then (function(posts){
                        return ctrl.posts = posts
                    })

            },3000)
    }

    function getPosts() {
        return postsService.getPosts()
            .then(function (posts) {
                return posts
            })
    }

    function getPost(id) {
        return postsService.getPosts()
            .then(function (response) {
                return postsService.getPostById(response, id)
            })
            .then(function (response) {
                return response
            })
            .catch(function (err) {
                console.warn(err);
            })
    }


    function sendPost() {
        postsService.postPost()
            .then(function (response) {
                ctrl.posts.unshift(response)
            })
    }
}

angular
    .module('postsModule')
    .component('postsComponent', component);