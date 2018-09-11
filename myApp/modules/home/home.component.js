(function() {
  "use strict";

  var component = {
    templateUrl: "/myApp/modules/home/home.component.html",
    controller: controller
  };

  function controller($q, $http) {
    var ctrl = this;
    var url = "https://jsonplaceholder.typicode.com/posts";

    ctrl.$onInit = onInit;
    ctrl.state = {
      title: "Home component",
      posts: []
    };

    function onInit() {
      getPosts()
        .then(posts => {
          return getDetails(posts);
        })
        .then(posts => {
          var _state = Object.assign({}, ctrl.state);
          _state.posts = [...posts];
          setState(_state);
        });
    }

    function getPosts() {
      const deferred = $q.defer();

      $http.get(url).then(posts => {
        const uris = posts.data.map(post => {
          return `${url}/${post.id}`;
        });
        deferred.resolve(uris);
      });

      return deferred.promise;
    }

    function setState(state) {
      Object.assign(ctrl.state, state);
    }

    function getDetails(uriArray) {
      var deferred = $q.defer();
      const promises = uriArray.map(uri => $http.get(uri));
      $q.all(promises).then(results => {
        deferred.resolve(
          results.map(result => {
            return result.data.body;
          })
        );
      });

      return deferred.promise;
    }
  }

  angular.module("HomeModule").component("homeComponent", component);
})();
