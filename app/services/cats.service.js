define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('cats.service', []);
    ngModule.factory('catsService', ['$request', function ($request) {
        return {
            //商品分类管理
            catsList: function (parentId) {
                return $request.get('cats/children', {parentId: parentId})
            }
        }
    }]);
    module.exports = ngModule;
});
