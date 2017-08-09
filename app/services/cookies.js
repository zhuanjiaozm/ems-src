define(function(require,exports,module){
   var angular = require('angular'),
       ngCookies = require('angular-cookies');
   var ngModule = angular.module('cache.factory',['ngCookies']);
   ngModule.factory('cache',['$cookies',function($cookies){
       return {
           set:function(key,value){
               if(value){
                   $cookies.put(key,value);
               }else{
                   return $cookies.get(key)?$cookies.get(key):false
               }
           },
           remove:function(key){
               $cookies.remove(key);
           }
       }
   }]);
   module.exports = ngModule;
});