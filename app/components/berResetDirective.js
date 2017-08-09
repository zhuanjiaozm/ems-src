(function() {
    "use strict";
    define(function (require,exports,module) {
        var angular = require('angular');
        var berResert = angular.module('berResert' , []);
        berResert.directive('berResert', function () {
            return {
                restrict: 'EA',
                replace:true,
                template:'<input type="button" class="reset_btn" value="重置">',
                scope: {
                    resetObj: '=',
                    retainObj:'='
                },
                link: function (scope, element, attr) {
                    element.bind('click',function(){
                        if(scope.resetObj){
                            scope.$apply(function(){
                                scope.resetObj={
                                    index:0,
                                    size:15
                                };
                            });
                        }
                        if(scope.retainObj){
                            scope.resetObj=Object.assign(scope.resetObj,scope.retainObj);
                        }
                    });
                }
            };
        });
        module.exports = berResert;
    })
})();
