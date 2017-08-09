define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('message.service',[]);
    ngModule.factory('messageService', ['$request', function ($request) {
        return {
            getTemplatesList: function (params) {       //商户列表
                return $request.get('msgtemplets', params);
            },
            //批量删除消息
            deleteMsg:function(params) {
                return $request.delete('msgCenter/batch/'+params.toString());
            },
            //模板列表
            getTheTemplate:function (params) {
                return $request.get('msgtemplets/',params);
            },
            //编辑或者新增模板
            saveMsgtemplets:function(params){
                return $request.post('msgtemplets',params);
            },
            //检查模板编号是否存在
            checkExit:function(params){
                return $request.post('msgtemplets/onlyCode',params);
            },
            //保存消息类型发送形式
            messageFlag:function(params) {
                return $request.post('msgtemplets/messageFlag',params);
            },
            //编辑模板
            editMsgtemplets:function(params){
                return $request.get('msgtemplets/'+params.id,params);
            },
            getJpenums:function(){
                return $request.get('msgtemplets/jpenums');
            },
            getSdenums:function(){
                return $request.get('msgtemplets/sdenums');
            },
            getScens:function(){
                return $request.get('msgtemplets/scens');
            },
            getMsgtype:function(){
                return $request.get('msgtemplets/msgtype');
            },
            getMsgList:function(params){
                return $request.get('msgCenter',params);
            },
            sendMsg:function(params) {
                params.paramsType = 'JSON';
                return $request.post('msgCenter',params);
            }
        };
    }]);
    module.exports = ngModule;
});
