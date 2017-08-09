define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('diy.service', []);
    ngModule.factory('diyService', ['$request', function ($request) {
        return {
            getCustomPageList:function(params){
               return $request.get('shopsubject', params);
            },
            addCustomPage:function(params){
               return $request.post('shopsubject', params);
            },
            getCustomPage:function(id){
               return $request.get('shopsubject/'+id);
            },
            updateCustomPage:function(params){
               return $request.put('shopsubject/'+params.id, params);
            },
            deleteCustomPage:function(id){
               return $request.delete('shopsubject/'+id);
            }
        }
    }]);
    module.exports = ngModule;
});
