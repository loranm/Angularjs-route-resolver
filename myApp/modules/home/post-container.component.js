(function() {
  const component = {
    template: '<li ng-repeat="post in $ctrl.props.posts">{{post}}</li></ul>',
    bindings: {
      props: "<"
    }
  };
  angular.module("HomeModule").component("postsContainer", component);
})();
