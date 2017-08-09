"use strict";
define(function(require,exports,module){
    var angular = require('angular');
    var attendActShop = angular.module('attendActShop' , []);

    attendActShop.directive('shopList', ['$template',function($template) {
        return {
            restrict : 'EA',
            templateUrl : $template('template/attendActShop'),
            replace : true
        }
    }]);

    module.exports = attendActShop;
});
