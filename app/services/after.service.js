define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('after.service',[]);

    ngModule.factory('afterService', ['$request', function ($request) {
        return {
            getCommentList: function (params) {       //商户列表
                return $request.get('comments', params);
            },
            deleteComment : function(id){
                return $request.delete('comments/'+id);
            },
            blockComment : function(id){
                //TODO:对接屏蔽接口
            },
            getRefundReasonList:function(params){
                return $request.get('refunds/reasons', params);
            },
            updateRefundReason:function(params){
                return $request.put('refunds/reasons', params);
            },
            addRefundReason:function(params){
                return $request.post('refunds/reasons', params);
            },
            deleteRefundReason:function(id){
                return $request.delete('refunds/reasons/'+id);
            },
            getRefundList:function(params){
                return $request.get('refunds', params);
            },
            getRefund:function(id){
                return $request.get('refunds/'+id);
            }
        }
    }]);
    module.exports = ngModule
});