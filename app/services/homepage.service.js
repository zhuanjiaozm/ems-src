define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('homepage.service', []);

    ngModule.factory('homepageService', ['$request', function ($request) {
        return {
            homepage: function () {     //首页主界面
                return $request.get('homepage', {});
            }
        }
    }]);
    module.exports = ngModule
});