define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('goods.service', []);
    ngModule.factory('goodsService', ['$request', function ($request) {
        return {
            //商品属性
            attrList: function (catId, attrId) {
                var attrId = attrId || '';
                return $request.get('cats/' + catId + '/attrs/' + attrId)
            },
            addAttr: function (cateId, params) {
                return $request.post('cats/' + cateId + '/attrs', params)
            },
            editAttr: function (cateId, attrId, params) {
                return $request.put('cats/' + cateId + '/attrs/' + attrId, params)
            },
            delAttr: function (cateId, attrId, params) {
                return $request.delete('cats/' + cateId + '/attrs/' + attrId, params)
            },
            getAttrValue: function (catId, attrId) {
                return $request.get('cats/' + catId + '/attrs/' + attrId + '/vals');
            },
            addAttrValue: function (catId, attrId, params) {
                return $request.post('cats/' + catId + '/attrs/' + attrId + '/vals', params);
            },
            delAttrValue: function (catId, attrId, valId) {
                return $request.delete('cats/' + catId + '/attrs/' + attrId + '/vals/' + valId);
            },
            //商品分类管理
            catsList: function (parentId) {
                return $request.get('cats/children', {parentId: parentId})
            },
            addCats: function (params) {
                return $request.post('cats', params)
            },
            editCats: function (cateId, params) {
                return $request.put('cats/' + cateId, params)
            },
            detailCats: function (cateId) {
                return $request.get('cats/' + cateId)
            },
            delCats: function (cateId) {
                return $request.delete('cats/' + cateId);
            },
            getProducts: function (params,type) {//商品列表
                console.log(type);
                if(type=='0'){
                    return $request.get('reals', params);
                }else if(type=='1'){
                    return $request.get('services', params);
                }
            },
            productDetail: function (id) {
                return $request.get('product/' + id)
            },
            productServicePic: function (params) {
                return $request.get('product/pic/' + params.id, params)
            },
            productServiceDesc: function (params) {
                return $request.get('product/desc/' + params.id, params)
            },
            productServiceSku: function (params) {
                return $request.get('product/sku/' + params.id, params)
            },
            productServiceAttrs: function (params) {
                return $request.get('product/attr/' + params.id, params)
            },
            //获取违规商品列表
            getIllegalProduct: function (params) {
                return $request.get('illegalproduct/paged', params);
            },

            //添加违规商品
            addLllega: function (params) {
                params.paramsType = 'JSON';
                return $request.post('illegalproduct/add', params);
            },
            operateLllega: function (ids,params,type) {
                params.paramsType = 'JSON';
                return $request.put((type=='0'?'real':'service')+'product/batch/'+ids, params);
            },
            batchProduct: function (params) {
                params.paramsType = 'JSON';
                return $request.put('illegalproduct/batch', params);
            }
        }
    }]);
    module.exports = ngModule;
});
