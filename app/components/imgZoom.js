"use strict";

define(function (require, exports, module) {
    var angular = require('angular');
    var layDate = angular.module('imgZoom', []);
    require("ng-dialog");
    /**
     * 
     */
    layDate.directive('imgZoom', ["$timeout", "ngDialog", function ($timeout, ngDialog) {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            link: function (scope, element, attr, ngModel) {
                element.on('click', function () {
                    ngDialog.open({
                        width:650,
                        template: '<img style="width:100%" src="' + attr.src + '" />',
                        plain: true
                    })
                })
            }
        }
    }]);
    module.exports = layDate;
});