"use strict";

define(function (require, exports, module) {
    var angular = require('angular');
    var ngclipboard = angular.module('ngclipboard', []),
    Clipboard = require('clipboard');
    require("ng-dialog");
    
    /**
     * 
     */
    ngclipboard.directive('ngclipboard', function() {
        return {
            restrict: 'A',
            scope: {
                ngclipboardSuccess: '&',
                ngclipboardError: '&'
            },
            link: function(scope, element) {
                var clipboard = new Clipboard(element[0]);

                clipboard.on('success', function(e) {
                  scope.$apply(function () {
                    scope.ngclipboardSuccess({
                      e: e
                    });
                  });
                });

                clipboard.on('error', function(e) {
                  scope.$apply(function () {
                    scope.ngclipboardError({
                      e: e
                    });
                  });
                });

            }
        };
    });
    module.exports = ngclipboard;
});