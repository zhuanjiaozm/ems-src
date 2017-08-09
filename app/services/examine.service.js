define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('examine.service', []);

    ngModule.factory('examineService', ['$request', function ($request) {
        return {
            auditMerchantList: function (params) {       //商户审核列表
                return $request.get('merchantAudit/auditMerchantList', params);
            },
            auditMerchantWorkFlow: function (params) {  //提交商户审核
                return $request.post('merchantAudit/auditWorkFlow', params);
            },
            getMerchantAuditRoute: function (id) {      //查看商户审核流程节点审核信息
                return $request.get('merchantAudit/getMerchantAuditRoute/'+id);
            },

            auditShopList: function (params) {       //店铺审核列表
                return $request.get('shopAudit/auditShopList', params);
            },
            auditShopWorkFlow: function (params) {  //提交店铺审核
                return $request.post('shopAudit/auditShopWorkFlow', params);
            },
            getShopAuditRoute: function (id) {      //查看店铺审核流程节点审核信息
                return $request.get('shopAudit/getShopAuditRoute/'+id);
            },

            auditProductList: function (params) {       //商品审核列表
                return $request.get('product/workflows', params);
            },
            auditProductWorkFlow: function (params) {   //提交商品审核
                return $request.post('product/auditWorkFlow', params);
            },
            getProductAuditRoute: function (id, type) {       //获取商品审核流程节点审核信息
                var params = {
                    ctype : type
                };
                return $request.get('product/audit/'+id, params);
            },

            auditAdvertList: function (params) {         //广告审核列表
                return $request.get('adverts/advertFlows', params);
            },
            auditAdvertWorkFlow: function (params) {    //提交广告审核
                return $request.post('adverts/auditWorkFlow', params);
            },
            getAdvertAuditRoute: function (id) {       //获取广告审核流程节点审核信息
                return $request.get('adverts/advertsAuditRoute/'+id);
            },

            auditInformationList:function(params){         //资讯审核列表
                return $request.get('hotInfoFlows/',params);
            },
            getNewsInfo:function(id){                       //审核资讯时获取资讯详情
                return $request.get('getHotInfo/'+id);
            },
            auditInformationWorkFlow:function(params){                 //提交资讯审核
                return $request.post('auditWorkFlow',params);
            },
            getNewsAuditRoute:function(id){                 //获取资讯审核流程节点审核信息
                return $request.get('hotInfoAuditRoute/'+id);
            },

            auditAnnouncementList: function (params) {       //公告审核列表
                return $request.get('announcements/flows', params);
            },
            auditAnnouncementWorkFlow: function (params) {  //提交公告审核
                return $request.post('announcements/auditWorkFlow', params);
            },
            getAnnouncementAuditRoute: function (id) {      //查看公告审核流程节点审核信息
                return $request.get('announcements/auditRoute/'+id);
            },

            auditCardCouponList: function (params) {       //卡券发布审核列表
                return $request.get('coupons/couponFlows', params);
            },
            auditCardCouponWorkFlow: function (params) {  //提交卡券发布审核
                return $request.post('coupons/auditWorkFlow', params);
            },
            getCardCouponAuditRoute: function (id) {      //查看卡券发布审核流程节点审核信息
                return $request.get('coupons/couponAuditRoute/'+id);
            }

        }
    }]);
    module.exports = ngModule
});
