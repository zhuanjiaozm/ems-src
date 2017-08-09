define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('marketing.service',[]);

    ngModule.factory('marketingService', ['$request', function ($request) {
        return {
            LimitTimeAct: { //商户营销活动--限时优惠
                terminateAct:function(actId){   //限时优惠终止操作
                    return $request.put("limitTimeActs/"+actId+"/terminate");
                },
                getLimitTimeAct:function(id){   //限时优惠详情
                    return $request.get("limitTimeActs/"+id);
                },
                getLimitTimeActs:function(params){  //限时优惠列表
                    return $request.get("limitTimeActs", params);
                }
            },
            seckillAct:{
                getSeckillActs: function (params) { //秒杀活动列表
                    return $request.get('seckillActs', params);
                },
                getSeckillAct: function (actId) {      //秒杀活动详情
                    return $request.get('seckillActs/'+actId);
                },
                createSeckillAct: function (params) {   //秒杀活动创建
                    params.paramsType = 'JSON';
                    return $request.post('seckillActs', params);
                },
                selectableProducts: function (actId, params) {       //秒杀活动可选商品
                    return $request.get('seckillActs/' + actId + '/selectableProducts', params);
                },
                deleteProduct: function (actId, prodId) {      //秒杀活动商品删除
                    return $request.delete('seckillActs/'+actId+'/selectedProducts/'+prodId);
                },
                setSelectedProducts: function(actId, params) {          //秒杀活动商品设置
                    params.paramsType = 'JSON';
                    return $request.put('seckillActs/' + actId + '/selectedProducts', params);
                },
                getSelectProducts: function (actId, params) {        //获取秒杀活动已选商品
                    return $request.get('seckillActs/' + actId + '/selectedProducts', params);
                },
                selectProducts: function (actId, prodIds) {     //秒杀活动选择商品
                    var params = {
                        prodIds: prodIds
                    };
                    return $request.post('seckillActs/'+actId+'/selectedProducts', params);
                },
                terminateAct: function (actId) {        //秒杀活动终止
                    return $request.put('seckillActs/'+actId+'/terminate');
                },
                seckillActStatus: function () {     //秒杀活动状态集合
                    return {
                        all:'全部',
                        entryNotBegin:'待报名',
                        inEntry:'报名中',
                        preheatNotBegin:'待预热',
                        inPreheat:'预热中',
                        begin:'进行中',
                        end:'已结束',
                        terminate:'已终止'
                    }
                },
                seckillCanPreheatTime: 30*60*1000, //预热时间要比当前时间晚30分钟
            },
            enoughDiscount:{//满立减
                createAct:function (params) {
                    params.paramsType = 'JSON';
                    return $request.post('mkmlj',params);
                },
                putAct:function(actId,params){
                    params.paramsType = 'JSON';
                    return $request.put('mkmlj/'+actId,params);
                },
                getAct:function(params){
                    return $request.get('mkmlj',params);
                },
                delAct:function(actId){
                    return $request.delete('mkmlj/'+actId);
                },
                terminate:function(actId,params){
                    return $request.put('mkmlj/'+actId+'/terminate',params);
                },
                actDetail:function(actId){
                    return $request.get('mkmlj/'+actId);
                }
            },
            settleDiscount:{//买单减免
                getAct:function (params) {
                    return $request.get('mkcard',params);
                },
                terminate:function(actId,params){
                    return $request.put('mkcard/'+actId+'/terminate',params);
                },
                createAct:function (params) {
                    params.paramsType = 'JSON';
                    return $request.post('mkcard',params);
                },
                putAct:function(actId,params){
                    params.paramsType = 'JSON';
                    return $request.put('mkcard/'+actId,params);
                },
                delAct:function(actId){
                    return $request.delete('mkcard/'+actId);
                },
                actDetail:function(actId){
                    return $request.get('mkcard/'+actId);
                }
            },
            freightDiscount:{//满减运费
                getAct:function (params) {
                    return $request.get('mkfreight',params);
                },
                terminate:function(actId,params){
                    return $request.put('mkfreight/'+actId+'/terminate',params);
                },
                createAct:function (params) {
                    params.paramsType = 'JSON';
                    return $request.post('mkfreight',params);
                },
                putAct:function(actId,params){
                    params.paramsType = 'JSON';
                    return $request.put('mkfreight/'+actId,params);
                },
                delAct:function(actId){
                    return $request.delete('mkfreight/'+actId);
                },
                actDetail:function(actId){
                    return $request.get('mkfreight/'+actId);
                }
            },
            couponDiscount:{//平台优惠券
                getActs: function (params) { //平台优惠券活动列表
                    return $request.get('mkticket', params);
                },
                actDetail: function (actId) {      //平台优惠券活动详情
                    return $request.get('mkticket/'+actId);
                },
                createAct: function (params) {   //平台优惠券活动创建
                    params.paramsType = 'JSON';
                    return $request.post('mkticket', params);
                },
                putAct: function (actId, params) {  //平台优惠券活动修改
                    params.paramsType = 'JSON';
                    return $request.put('mkticket/'+actId, params);
                },
                delAct:function(actId){     //删除平台优惠券
                    return $request.delete('mkticket/'+actId);
                },
                terminate:function(actId,params){   //终止活动
                    return $request.put('mkticket/'+actId+'/terminate',params);
                },
                couponActStatus: function(){        //平台优惠券活动状态集合
                    return {
                        all:'全部',
                        notBegin:'未开始',
                        begin:'进行中',
                        end:'已结束',
                        terminate:'已终止'
                    }
                }
            },
            getActLevelCN: function (key) {
                switch (key) {
                    case 'spu':
                        return '商品级';
                    case 'sku':
                        return 'SKU级';
                }
            },
            getActType: function (key) {
                switch (key) {
                    case 'fix':
                        return '促销价';
                    case 'discount':
                        return '打折';
                    case 'reduce':
                        return '减价';
                }
            }
        }
    }]);
    module.exports = ngModule
});