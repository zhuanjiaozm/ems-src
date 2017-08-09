"use strict";

define(function (require, exports, module) {
    var angular = require('angular');
    /*
    * 用于限制输入框只能输入数字。
    * 参数 is-float：是否允许输入小数
    * 参数 is-negative：是否允许负数
    * 参数 ng-can-change：用于判断是否输入值有效的表达式。计算结果为true有效，false无效
    * 参数 ng-max：最大值，对于超过16位的值，会出现不正确的情况
    * 参数 ng-min：最小值，对于超过16位的值，会出现不正确的情况
    * 使用实例：
    * 只能输入数字<input ng-model="model" is-float="true" is-negative="true">
    * 只能输入整数<input ng-model="model"  is-negative="true">
    * 只能输入正整数数<input ng-model="model">
    * 只能输入最大值100000000和小数不超过两位<input ng-model="model" is-float='true' ng-max='100000000' ng-can-change='model * 100 % 1 == 0'>
    * by yechy
    */
    var numInput = angular.module('numInput', []);
    numInput.directive('numInput', ['$timeout', function ($timeout) {
        return {
            replace: true,
            require: '?ngModel',
            restrict: 'A',
            scope: {
                ngModel: '=',
                isNegative: "=", //是否允许负数
                isFloat: "=", //是否允许小数
                ngChange: '&',
                ngMax: "=",
                ngMin: "="
            },
            link: function (scope, element, attr, ngModel) {
                $timeout(function () {
                    var oldVal = '';
                    //限制输入值
                    element.on("keypress", function (e) {

                        function falseResult() {
                            e.preventDefault(); //阻止input事件继续处理
                            return false;
                        }

                        oldVal = e.currentTarget.value;
                        var key = e.key;                        
                        var num = parseFloat(oldVal + key);//parseFloat处理超出16位的值会不正确

                        if (scope.ngMax && num >= scope.ngMax) {
                            return falseResult();
                        }
                        if (scope.ngMin && num < scope.ngMin) {
                            return falseResult();
                        }

                        if (!/[-.\d]/.test(key)) {
                            return falseResult();
                        }
                        if (key == "-") {
                            if (scope.ngModel || scope.ngModel == 0 || !scope.isNegative) {
                                return falseResult();
                            }
                            return;
                        }
                        if (key == ".") {
                            if (!scope.isFloat) {
                                return falseResult();
                            }
                            if (scope.ngModel && String(scope.ngModel).indexOf('.') != -1) {
                                return falseResult();
                            }
                        }
                    });

                    element.on("input", function (e) {
                        var value = e.currentTarget.value;
                        //处理中文输入法
                        if (isNaN(value)) {
                            scope.ngModel = e.currentTarget.value = oldVal;
                            scope.$apply();
                            return;
                        }

                        if (attr.ngCanChange && !scope.$parent.$eval(attr.ngCanChange)) {
                            scope.ngModel = e.currentTarget.value = oldVal;
                            scope.$apply();
                            return;
                        }

                        oldVal = value;
                    })
                }, 0);
            }
        }
    }]);
    module.exports = numInput;
});