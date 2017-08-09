define(function (require, exports, module) {
    var angular = require("angular");
    var ngModel = angular.module("coupon.service", []);
    ngModel.factory("couponService", ["$request", function ($request) {
            return {
                getCoupons: function (params) {
                    return $request.get("coupons/page", params);
                },
                createCoupon: function (params, id) {
                    params.paramsType = "JSON";
                    return id ? $request.put("coupons", params) : $request.post("coupons", params);
                },
                getCouponDetail: function (id) {
                    return $request.get("coupons/" + id);
                },
                getSupplier: function (params) {
                    //供应商列表
                    return $request.get("couponSuppliers/page", params);
                },
                getCardCouponDetail: function (id) {
                    return $request.get("coupons/" + id);
                },
                couponTypes: function () {
                    //卡券类型集合
                    return {
                        "1": "代金",
                        "2": "折扣",
                        "3": "满减"
                    };
                },
                consumeTypes: function () {
                    //卡券消费方式集合
                    return {
                        "0": "直接消费",
                        "1": "预约消费"
                    };
                },
                //卡券转让管理列表
                getTransferList: function (params) {
                    return $request.get("transfers/page", params);
                },
                //终止转让卡券
                deals: function (id) {
                    return $request.put("transfers/deals/" + id);
                },
                //卡券转让详情
                getTransferDeatil: function (id) {
                    return $request.get("transfers/" + id);
                },
                getThirdCoupon:function (params) {//第三方卡券列表
                    return $request.get('couponthirds/page',params);
                },
                createThirdCoupon:function (params,id) {//添加第三方卡券
                    params.paramsType = 'JSON';
                    return $request.post('couponthirds',params);
                },
                detailThirdCoupon:function (id) {//第三方卡券详情
                    return $request.post('couponthirds/'+id);
                },
                importsThirdCoupon:function (params) {//第三方卡券批量导入
                    return $request.post('couponthirds/imports/'+params.id,params);
                },
                exportsThirdCoupon:function () {//卡券导入模板下载
                    return $request.get('couponthirds/exports');
                }
            };
        }
    ]);
    module.exports = ngModel;
});
