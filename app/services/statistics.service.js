define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('statistics.service', []);

    ngModule.factory('statisticsService', ['$request', function ($request) {
        return {
            tradeDayCount: function (params) {       //订单下单量统计
                return $request.get('mall/daycount', params);
            },
            tradeDaySum: function (params) {        //订单成交量统计
                return $request.get('mall/daysum', params);
            }

        }
    }]);
    module.exports = ngModule
});