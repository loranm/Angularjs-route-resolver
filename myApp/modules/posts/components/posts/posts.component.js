var component = {
    templateUrl: './myApp/modules/posts/components/posts/posts.component.html',
    bindings: {
        posts: '<'
    },
    controller: controller
}


function controller() {
    var ctrl = this;
    ctrl.firstPost = undefined;
    ctrl.sendPost = sendPost;

    
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