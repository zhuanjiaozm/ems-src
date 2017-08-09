define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('trade.service',[]);

    ngModule.factory('tradeService', ['$request', function ($request) {
        return {
            getOrderList: function (params) {       //商户列表
                return $request.get('orders', params);
            },
            getOrderDetail:function(id){
                return $request.get("orders/"+id);
            },
            deleteOrder: function (id) {
                return $request.delete("orders/"+id);
            },
        }
    }]);
    module.exports = ngModule
});