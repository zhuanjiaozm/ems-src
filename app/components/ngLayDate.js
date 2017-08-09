"use strict";

define(function (require,exports,module) {
    var angular = require('angular');
    var layDate = angular.module('ngLayDate',[]);
    require('layDate');
    /**
     * 使用示例
     *  <input ng-laydate type="text" ng-model="startTime"  max-date="{{model.max}}" min-date="{{model.min}}"/>
     *  <input ng-laydate type="text" ng-model="startTime"  max-date="{{model.max}}" min-date="{{model.min}}"/>
     * by yechy
     */
    layDate.directive('ngLaydate',["$timeout","$template",function ($timeout,$template) {
        return {
            require: '?ngModel',
            restrict: 'A',
            replace:true,
            template:'<input type="text" />',
            scope: {
                ngModel: '=',
                maxDate: '@',
                minDate: '@'
            },
            link: function (scope, element, attr, ngModel) {
                var _date = null, _config = {};
                var id = "date"+scope.$id;
                element.attr("id", id);
                // 渲染模板完成后执行
                $timeout(function () {
                    // 初始化参数
                    _config = {
                        elem: '#' + id,
                        format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                        max: scope.maxDate || '',
                        min: scope.minDate || '',
                        istime: attr.hasOwnProperty('istime')? eval(attr.istime) : false,
                        istoday:attr.hasOwnProperty('istoday')? eval(attr.istoday) : false,
                        issecond:attr.hasOwnProperty('issecond')? eval(attr.issecond) : true,
                        minuteSet:attr.hasOwnProperty('minuteset')? attr.minuteset: 'default',//处理分钟选项 default 全部可选， half只有0和30  quater只有0，15，30，45
                        choose: function (data) {
                            scope.$apply(setViewValue);
                        },
                        clear: function () {
                            ngModel.$setViewValue(null);
                        }
                    };
                    // 初始化
                    _date = laydate(_config);

                    // 监听日期最大值
                    if (attr.hasOwnProperty('maxDate')) {
                        attr.$observe('maxDate', function (val) {
                            _config.max = val;
                        })
                    }
                    // 监听日期最小值
                    if (attr.hasOwnProperty('minDate')) {
                        attr.$observe('minDate', function (val) {
                            _config.min = val;
                        })
                    }

                    // 模型值同步到视图上
                    ngModel.$render = function () {
                        element.val(ngModel.$viewValue || '');
                    };

                    // 监听元素上的事件
                    element.on('blur keyup change', function () {
                        scope.$apply(setViewValue);
                    });

                    setViewValue();

                    // 更新模型上的视图值
                    function setViewValue() {
                        var val = element.val();
                        ngModel.$setViewValue(val);
                    }
                }, 0);
            }
        }
    }]);
    module.exports = layDate;
});