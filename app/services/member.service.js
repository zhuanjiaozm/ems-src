define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('member.service', []);
    ngModule.factory('memberService', ['$request', function ($request) {
        return {
            // 会员管理
            memberList: function (req) {
                return $request.get('member', req);
            },
            memberDetail: function (memberId) {
                return $request.get('member/detail/' + memberId);
            },
            operateMember: function (memberId, params) {
                return $request.put('member/' + memberId, params);
            },
            blackList: function (req) {
                return $request.get('member/blacklist', req);
            },
            // 系统用户管理
            systemUserList: function (params) {
                return $request.get('user/paged',params);
            },
            addSystemUser: function (params) {
                // params.paramsType='JSON';
                return $request.post('user/add', params);
            },
            putSystemUser: function (userId,params) {
                // params.paramsType='JSON';
                return $request.put('user/update/'+userId, params);
            },
            limitUser:function (id,type) {
                return $request.put('user/limited',{
                    id:id,
                    operType:1,
                    unlimit:type
                });
            },
            labelList:function(params){
                return $request.get('labels/page',params);
            },
            exportsMember:function (params) {
                var paramsTxt = '?r=' + (new Date().getTime());
                for(var i in params){
                    paramsTxt += '&' + i + '=' + params[i];
                }
                location.href='/manager/exports/user' + paramsTxt;
            },
            importMember:function (params) {
                return $request.post('import/user',params);
            },
            createLabel:function (params) {
                return params.labelId?$request.put('labels',params):$request.post('labels',params);
            },
            deleteLabel:function (labelId) {
                return $request.delete('labels/'+labelId);
            },
            labels:function () {
                return $request.get('labels/user');
            }
        }
    }]);
    module.exports = ngModule;
});