define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('agent.service', []);

    ngModule.factory('agentService', ['$request', function ($request) {
        return {
            getAgent:function (params) {//代理商列表
                return $request.get('couponAgents/page',params);
            },
            postAgent:function (params,id) {//添加/修改卡券代理商
                params.paramsType = 'JSON';
                return id?$request.put('couponAgents',params):$request.post('couponAgents',params);
            },
            deleteAgent:function (id) {//删除代理供应商
                return $request.delete('couponAgents/'+id);
            },
            detailAgent:function (id) {//卡券代理商详情
                return $request.get('couponAgents/'+id);
            },
            couponAgentsAmount:function (id, amount) {
                return $request.put('couponAgents/'+id,{amount:parseInt(amount)});
            }
        }
    }]);
    module.exports = ngModule;
});