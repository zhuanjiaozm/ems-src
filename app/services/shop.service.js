define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('shop.service', []);

    ngModule.factory('shopService', ['$request', function ($request) {
        return {
            merchantList: function (params) {       //商户列表
                return $request.get('merchants', params);
            },
            exportsMerchant: function (params) {    //商户列表导出
                var paramsTxt = '?r=' + (new Date().getTime());
                for(var i in params){
                    paramsTxt += '&' + i + '=' + params[i];
                }
                location.href='/manager/exports/merchant' + paramsTxt;
            },
            merchantDetail: function (merchantId) {     //商户详情
                return $request.get('merchantDetail/'+merchantId, {})
            },
            lockedMerchant: function(merchantId){         //商户锁定,解锁
                return $request.put('lockedMerchant/'+merchantId,{paramsType:'JSON'})
            },
            shopList: function(params){                   //店铺管理列表
                return $request.get('shops', params);
            },
            shopDetail: function(shopId){                 //店铺详情
                return $request.get('shopDetail/'+shopId, {});
            },
            normalShop: function(shopId){                 //店铺状态回复正常
                return $request.put('normalShop/'+shopId,{paramsType:'JSON'})
            },
            shieldShop: function(shopId){                 //屏蔽店铺
                return $request.put('shieldShop/'+shopId,{paramsType:'JSON'})
            },
            storeList: function(params){                   //门店管理列表
                return $request.get('shopBranchs/list', params);
            },
            storeDetail: function(storeId){                 //门店详情
                return $request.get('shopBranchs/find/'+storeId);
            },
            normalStore: function(params){                 //门店状态回复正常
                params.paramsType = 'JSON';
                return $request.put('normalShopBranch', params);
            },
            closeStore: function(params){                 //关闭门店
                params.paramsType = 'JSON';
                return $request.put('closeShopBranch', params);
            },
            shopTagsList: function(params){                 //店铺标签列表
                return $request.get('shopTags', params);
            },
            addShopTags: function(params){                  //增加店铺标签
                return $request.post('shopTags', params);
            },
            modifyShopTags: function(id, params){           //修改店铺标签
                return $request.put('shopTags/'+id, params);
            },
            deleteShopTags: function(id){                   //删除店铺标签
                return $request.detele('shopTags/'+id, {});
            },
            saveBusinessCategory: function(params){         //新增经营类目
                params.paramsType = 'JSON';
                return $request.post('businessCategory/saveBusinessCategory',params);
            },
            deleteBusinessCategorys: function (id) {        //删除经营类目
                return $request.delete('businessCategory/deleteBusinessCategorys/'+id);
            },
            updateBusinessCategorysStat: function (params) {    //更新经营类目状态（不更新关联的商品分类）
                params.paramsType  = 'JSON';
                return $request.put('businessCategory/updateBusinessCategorysStat/'+params.id, params);
            },
            updateBusinessCategorys: function (params) {        //更新经营类目
                params.paramsType  = 'JSON';
                return $request.put('businessCategory/updateBusinessCategorys/'+params.id, params);
            },
            findBusinessChildCategorys: function (id) {    //获取子类目（不包含子类目关联的商品分类信息）
                return $request.get('businessCategory/findBusinessChildCategorys?id='+id);
            },
            getBusinessCategorys: function (id) {           //获取某个经营类目信息
                return $request.get('businessCategory/getBusinessCategorys/'+id);
            }

        }
    }]);
    module.exports = ngModule
});