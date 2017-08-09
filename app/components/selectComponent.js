"use strict";
define(function (require) {
    var app = require('app');
    require('app/services/shop.service.js');
    require('app/services/goods.service.js');

    app.useModule(['shop.service', 'goods.service']);

    app.directive('selectShop', ['$template', '$rootScope', 'shopService', 'goodsService','$cookie', function ($template, $rootScope, shopService, goodsService,$cookie) {
        return {
            restrict: 'EA',
            template: '<a class="blue_txt" ng-click="openShopList()">{{sparams.type=="product"?"选择商品":"选择店铺"}}</a>',
            replace: true,
            scope: {
                sparams: '=',
                select: '@',
                eventSelected:'&'
            },
            link: function ($scope, element, attr) {
                var userInfo = $cookie('userInfo');
                $scope.productParams = {//获取商品所需参数
                    index: 0,
                    size: 5,
                    auditStatus:3,
                    productStatus:1
                };
                $scope.openShopList = function () {
                    $rootScope.$dialog.open({
                        template: $template('template/selectComponent'),
                        width: 800,
                        scope: $scope,
                        controller: ['$scope', function ($scope) {
                            var sids=angular.copy($scope.sparams.sids),oids=angular.copy($scope.sparams.oids);
                            $scope.vm = {
                                sid:angular.copy($scope.sparams.sid)
                            };
                            $scope.sparams.type == 'shop' ? $scope.ngDialogTitle = '选择店铺' : $scope.ngDialogTitle = '选择商品';
                            $scope.shopParams = {//获取店铺所需参数
                                index: 0,
                                size: 5,
                                organizeIds:userInfo.organizeIds
                            };
                            $scope.conf = {
                                total: 1,
                                currentPage: 1,
                                itemPageLimit: 5,
                                isLinkPage: true,
                                type:0
                            };
                            if($scope.sparams&&$scope.sparams.category==='REAL'){
                                $scope.conf.type = 0;
                                $scope.shopParams.categoryType = 0;
                            }else if($scope.sparams&&$scope.sparams.category==='SERVICE'){
                                $scope.conf.type = 1;
                                $scope.shopParams.categoryType = 1;
                            }
                            var searchParams = angular.copy($scope.productParams);
                            $scope.getProduct = function(type){
                                goodsService.getProducts(searchParams,type).then(function (res) {
                                    $scope.list = res.data.content;
                                    $scope.conf.total = res.data.total;
                                    $scope.conf.type = type;
                                    $scope.selectedCheckbox();
                                    $scope.checkAlls = ($scope.sparams.sids.length === $scope.list.length);
                                });
                            };
                            $scope.getList = function (type) {//获取店铺列表
                                if ($scope.sparams.type === 'shop') {
                                    shopService.shopList($scope.shopParams).then(function (res) {
                                        $scope.list = res.data.content;
                                        $scope.conf.total = res.data.total;
                                        $scope.selectedCheckbox();
                                        $scope.checkAlls = ($scope.sparams.sids.length === $scope.list.length);
                                    },function (err) {})
                                } else if ($scope.sparams.type === 'product') {
                                    $scope.getProduct(type);
                                }
                            };
                            $scope.search = function(){
                                searchParams = angular.copy($scope.productParams);
                                $scope.getList($scope.conf.type);
                            };
                            $scope.$watch('conf.currentPage', function () {
                                searchParams.index = $scope.conf.currentPage - 1;
                                $scope.shopParams.index = $scope.conf.currentPage - 1;
                                $scope.sparams.sids = sids;
                                $scope.sparams.oids = oids;
                                $scope.sparams.sid = $scope.vm.sid;
                                $scope.getList($scope.conf.type);
                            }, true);

                            $scope.checkAll = function () {//全选操作
                                $scope.checkAlls = !$scope.checkAlls;
                                if ($scope.checkAlls) {
                                    $scope.list.forEach(function (item) {
                                        item.checked = true;
                                        if (sids.indexOf(item.id) === -1) {
                                            sids.push(item.id);
                                            if($scope.sparams.type==='product'&&$scope.sparams.oids){
                                                oids.push(item.shopId);
                                            }
                                        }
                                    });
                                } else {
                                    $scope.list.forEach(function (item) {
                                        item.checked = false;
                                    });
                                    sids = [];
                                    if($scope.sparams.type==='product'&&$scope.sparams.oids){
                                        oids = [];
                                    }
                                }
                            };
                            $scope.check = function (item) {//单选操作
                                item.checked = !item.checked;
                                if (item.checked && sids.indexOf(item.id) === -1) {
                                    sids.push(item.id);
                                    if($scope.sparams.type==='product'&&$scope.sparams.oids){
                                        oids.push(item.shopId);
                                    }
                                } else {
                                    sids.splice(sids.indexOf(item.id), 1);
                                    if($scope.sparams.type==='product'&&$scope.sparams.oids){
                                        oids.splice(oids.indexOf(item.shopId), 1);
                                    }
                                }
                                // console.log(sids);
                                $scope.checkAlls = ($scope.sparams.sids.length === $scope.list.length);
                            };

                            $scope.selectedCheckbox = function () {//反选操作
                                console.log($scope.sparams.sids);
                                $scope.list.map(function (item) {
                                    $scope.sparams.sids.forEach(function (ele) {
                                        if (item.id === ele) {
                                            item.checked = true;
                                        }
                                    });
                                    return item;
                                });
                                $scope.checkAlls = ($scope.sparams.sids.length === $scope.list.length);
                            };

                            $scope.enter = function () {//确定操作
                                $scope.sparams.sids = sids;
                                $scope.sparams.oids = oids;
                                $scope.sparams.sid = $scope.vm.sid;
                                if ($scope.eventSelected) {
                                    $scope.eventSelected();
                                }
                                // console.log($scope.sparams);
                                $scope.closeThisDialog(0);
                            };
                        }]
                    });
                }
            }
        }
    }]);

});
