define(function (require) {
    var app = require('app');
    var tree = require('ztree');
    require('app/services/trade.service.js');
    require('app/services/logistics.service.js');
    app.useModule(['trade.service', 'logistics.service']);
    var itemPageLimit = 15;
    app.controller('b2cOrderListCtrl', ['$scope', '$state', 'tradeService', '$uploadParams', function ($scope, $state, tradeService, $uploadParams) {//订单列表
        console.log($state.$current.self.name);
        $scope.imgBaseUrl = $uploadParams.baseUrl;
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };


        var params = $scope.params = { index: 0, orderType: 'b2c', size: itemPageLimit };

        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage + conf.itemPageLimit', function (news) {
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            $scope.params = params;
            $scope.loadData($scope.conf.currentPage - 1);
        })

        $scope.loadData = function (index) {
            $scope.params.index = index || 0;
            params = angular.copy($scope.params);
            tradeService.getOrderList($scope.params).then(
                function (resp) {
                    $scope.vm = resp.data.content;
                    $scope.conf.total = resp.data.total;
                },
                function () {
                    //TODO:错误处理
                }
            )
        }

        $scope.loadData();

    }]).controller('tradeDetailCtrl', ['$scope', '$state', 'tradeService', '$uploadParams', 'logisticsService',
        function ($scope, $state, tradeService, $uploadParams, logisticsService) {//订单详情
            console.log($state.$current.self.name);
            $scope.imgBaseUrl = $uploadParams.baseUrl;
            var id = $state.params.id;
            tradeService.getOrderDetail(id).then(
                function (resp) {
                    $scope.vm = resp.data;
                    if ($scope.vm.other && $scope.vm.other.logisticsId) {
                        logisticsService.getLogisticsTrack({ logisticCode: $scope.vm.other.logisticsId, shipperCode: $scope.vm.other.logisticsCode }).then(function (resp) {
                            $scope.logisticsTracks = resp.data;
                            $scope.logisticsTracks.tracesList = $scope.logisticsTracks.tracesList.reverse()
                        })
                    }
                },
                function () {
                    //TODO:错误处理
                }
            )

        }]).controller('o2oOrderListCtrl', ['$scope', '$state', 'tradeService', '$uploadParams', function ($scope, $state, tradeService, $uploadParams) {//缴费记录列表
            console.log($state.$current.self.name);
            $scope.imgBaseUrl = $uploadParams.baseUrl;
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            };

            var params = $scope.params = { index: 0, orderType: 'o2o', size: itemPageLimit };

            // 监控你的页码 ， 发生改变既请求
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function (news) {
                // 把你的http请求放到这里
                console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
                $scope.params = params;
                $scope.loadData($scope.conf.currentPage - 1);
            })

            $scope.loadData = function (index) {
                $scope.params.index = index || 0;
                params = angular.copy($scope.params);
                tradeService.getOrderList($scope.params).then(
                    function (resp) {
                        $scope.vm = resp.data.content;
                        $scope.conf.total = resp.data.total;
                    },
                    function () {
                        //TODO:错误处理
                    }
                )
            }

            $scope.loadData();

            //操作处理，暂时没用上     
            // var merchantOperation = {
            //     '退款': {
            //         text: "退款",
            //         click: function (item) {
            //             console.log(this.text);
            //         }
            //     },
            //     "冻结": {
            //         text: "冻结",
            //         click: function (item) {
            //         }
            //     }
            // }

            // $scope.convertMerchantOperation = function (val) {
            //     if (!val) {
            //         return [];
            //     }
            //     var result = [];
            //     var array = val.split('|');
            //     for (var index = 0; index < array.length; index++) {
            //         var element = array[index];
            //         result.push(merchantOperation[element]);
            //     }
            //     return result;
            // }

        }]).controller('paymentDetailCtrl', ['$scope', '$state', function ($scope, $state) {//缴费记录详情
            console.log($state.$current.self.name);
        }]);
});