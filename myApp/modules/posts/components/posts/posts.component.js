var component = {
    templateUrl: './myApp/modules/posts/components/posts/posts.component.html',
    controller: controller
}

controller.$inject = ['postsService'];

function controller(postsService) {
    var vm = this;
    vm.posts = undefined;
    vm.sendPost = sendPost;
    vm.$onInit = onInit;

    function onInit() {
        getFirstPost()
    }


    function getPosts() {
        postsService.getPosts()
            .then(function (posts) {
                return vm.posts = posts
            })
    }

    function getFirstPost() {
        postsService.getPosts()
            .then(function (response) {
                return postsService.getFirstPost(response)
            })
            .then(function(response) {
                console.warn(response); 
                debugger;
            })
            .catch(function(err){
                console.warn(err);
            })
    }


    function sendPost() {
        postsService.postPost()
            .then(function (response) {
                vm.posts.unshift(response)
            })
    }
}

angular
    .module('postsModule')
    .component('postsComponent', component);
