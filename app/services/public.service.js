define(function(require,exports,module){
    var angular = require('angular');
    var ngModule = angular.module('public.service',[]);

    ngModule.factory('publicService',['$request','$cookie',function($request,$cookie){
        return {
            imgUploadParam: function (callback, module) {
                return $request.get('user/upload/form', {
                    callback: callback,
                    module: module,
                    terminal: 'pc',
                    memberId: $cookie('profile').memberId,
                    token: $cookie('profile').token
                });
            }
        }
    }]);

    module.exports = ngModule;
});