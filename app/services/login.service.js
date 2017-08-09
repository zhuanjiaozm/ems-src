define(function(require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('login.service', []);

    ngModule.factory('loginService', ['$request', function($request) {
        return {
            //登录
            login: function(params) {
                return $request.post('sys/login', params);
            },
            //获取当前用户信息
            info: function() {
                return $request.post('sys/user/info');
            },
            captchaToken: function() {
                return $request.get('user/captcha/token')
            },
            user: function(memberId) {
                return $request.get('user/' + memberId)
            },
            putUser: function(params) {
                return $request.put('user/update', params)
            },
            password: function(params) {
                return $request.put('user/reset_pwd', params)
            },
            logout: function() {
                return $request.get('user/logout');
            },
            //查询用户菜单
            authMenu: function() {
                return $request.get('sys/menu/user');
            }

        }
    }]);
    module.exports = ngModule
});