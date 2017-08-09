define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('supplier.service', []);

    ngModule.factory('supplierService', ['$request', function ($request) {
        return {
            getSupplier:function (params) {//供应商列表
                return $request.get('couponSuppliers/page',params);
            },
            postSupplier:function (params,id) {//添加/修改卡券供应商
                return id?$request.put('couponSuppliers',params):$request.post('couponSuppliers',params);
            },
            deleteSupplier:function (id) {//删除卡券供应商
                return $request.delete('couponSuppliers/'+id);
            },
            detailSupplier:function (id) {//卡券供应商详情
                return $request.get('couponSuppliers/'+id);
            }
        }
    }]);
    module.exports = ngModule;
});