define(function(require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('system.service', []);
    ngModule.factory('systemService', ['$request', function($request) {
        return {
            // 获取空间数据
            getSpaceList: function(params) {
                return $request.post('sys/space/tree', params);
            },
            //获取设备列表
            getDivicesList: function(params) {
                return $request.post('sys/devicebase/list', params);
            },
            //获取设备类型列表
            getDivicesTypeList: function(params) {
                return $request.post('sys/device/list', params);
            },
            //新增设备
            addDevices: function(params) {
                return $request.post('sys/devicebase/save', params);
            }
        };
    }]);
    module.exports = ngModule;
});