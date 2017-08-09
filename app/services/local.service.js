define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('local.service', []);
    ngModule.factory('localService', ['$request', function ($request) {
        return {

        };
    }]);
    module.exports = ngModule;
});
