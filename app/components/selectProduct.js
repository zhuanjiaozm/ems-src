"use strict";
define(function (require) {
    var app = require('app');
    require('app/services/goods.service.js');
    require('underscore');

    app.useModule(['shop.service', 'goods.service']);

    app.directive('selectProduct', ['$template', '$rootScope', 'goodsService', '$cookie', '$uploadParams',
        function ($template, $rootScope, goodsService, $cookie, $uploadParams) {
            return {
                restrict: 'EA',
                template:
                '<ul class="img-list clearfix">' +
                '<li ng-repeat="item in ngModel track by $index">' +
                '<a ng-href="{{item.url}}" target="_blank">' +
                '<span ng-click="delete(item)" class="img-list-btndel j-delgoods"><i class="gicon-trash white"></i></span>' +
                '<span class="img-list-overlay"></span>' +
                '<img ng-src="{{_imgBaseUrl+item.mainPicUrl}}">' +
                '</a>' +
                '</li>' +
                '<li ng-click="add()" class="img-list-add j-addgoods">+</li>' +
                '</ul>',
                replace: true,
                scope: {
                    ngModel: '=',
                    eventSelected: '&'
                },
                link: function ($scope, element, attr) {
                    $scope._imgBaseUrl = $uploadParams.baseUrl;
                    $scope.ngModel = $scope.ngModel || [];
                    var userInfo = $cookie('userInfo');
                    $scope.productParams = {//获取商品所需参数
                        index: 0,
                        size: 5,
                        auditStatus: 3,
                        productStatus: 1
                    };
                    $scope.delete = function (item) {
                        var index = $scope.ngModel.indexOf(item);
                        $scope.ngModel.splice(index, 1);
                    }
                    $scope.add = function () {
                        $rootScope.$dialog.open({
                            template: $template('template/selectProduct'),
                            width: 800,
                            scope: $scope,
                            controller: ['$scope', function (scope) {
                                var selectedItems = [];
                                scope.conf = {
                                    total: 1,
                                    currentPage: 1,
                                    itemPageLimit: 5,
                                    isLinkPage: true,
                                    type: 0
                                };

                                var searchParams = angular.copy(scope.productParams);
                                scope.getProduct = function (type) {
                                    goodsService.getProducts(searchParams, type).then(function (res) {
                                        scope.list = res.data.content;
                                        scope.conf.total = res.data.total;
                                        scope.conf.type = type;
                                        scope.checkAlls = (selectedItems.length === scope.list.length);
                                    });
                                };
                                scope.search = function () {
                                    searchParams = angular.copy(scope.productParams);
                                    scope.getProduct(scope.conf.type);
                                };
                                scope.$watch('conf.currentPage', function () {
                                    searchParams.index = scope.conf.currentPage - 1;
                                    scope.getProduct(scope.conf.type);
                                }, true);

                                scope.checkAll = function () {//全选操作
                                    scope.checkAlls = !scope.checkAlls;
                                    if (scope.checkAlls) {
                                        scope.list.forEach(function (item) {
                                            item.checked = true;
                                            if (_.findIndex(selectedItems, { id: item.id }) === -1) {
                                                selectedItems.push(item.id);
                                            }
                                        });
                                    } else {
                                        scope.list.forEach(function (item) {
                                            item.checked = false;
                                        });
                                        selectedItems = [];
                                    }
                                };
                                scope.check = function (item) {//单选操作
                                    item.checked = !item.checked;
                                    if (item.checked && _.findIndex(selectedItems, { id: item.id }) === -1) {
                                        selectedItems.push(item);
                                    } else {
                                        selectedItems.splice(_.findIndex(selectedItems, { id: item.id }), 1);
                                    }
                                    console.log(selectedItems);
                                    scope.checkAlls = (selectedItems.length === scope.list.length);
                                };

                                scope.enter = function () {//确定操作
                                    $scope.ngModel = $scope.ngModel.concat(selectedItems);
                                    if (!$scope.eventSelected || $scope.eventSelected()) {
                                        scope.closeThisDialog(0);
                                    }
                                };
                            }]
                        });
                    }
                }
            }
        }]);

});
