define(function(require,exports,module){
    var angular = require('angular');
    var ngModule = angular.module('print.service',[]);

    ngModule.factory('print',[function(){
        return {
            debug:function(txt){
                console.log(txt);
            }
        }
    }]);
    module.exports = ngModule;
});