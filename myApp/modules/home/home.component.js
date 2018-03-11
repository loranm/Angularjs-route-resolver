(function () {
    'use strict';

    var component = {
        template: '{{ $ctrl.title }}',
        controller: controller
    };

    function controller() {
        var ctrl = this;
        ctrl.title = 'Home component'
    }

    angular
        .module('HomeModule')
        .component('homeComponent', component);
})()