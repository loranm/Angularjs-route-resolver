var component = {
    templateUrl: './myApp/modules/posts/components/posts/posts.component.html',
    bindings: {
        posts: '<'
    },
    controller: controller
}

controller.$inject = ['postsService', '$location']
function controller(postsService, $location) {
    var ctrl = this;
    ctrl.sendPost = sendPost;
    ctrl.getComments = getComments;

    function getComments(id) {
        return postsService.getPostComments(id)
            .then(function (comments) {
                var index = ctrl.posts.findIndex(function (post) {
                    return post.id === id;
                })
                ctrl.posts[index].comments = comments;
            })
    }


    //useless for now since we call postsService.getPosts() in $resolve
    function getPosts() {
        return postsService.getPosts()
            .then(function (posts) {
                return posts;
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
                ctrl.posts.unshift(response);
            })
    }
}

angular
    .module('postsModule')
    .component('postsComponent', component);