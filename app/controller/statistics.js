define(function (require) {
    var app = require('app'),
        shop = require('app/services/statistics.service.js');
    app.useModule(['statistics.service']);

    app.controller('tradeStatisticsCtrl', ['$scope', '$state', 'statisticsService', '$filter', function ($scope, $state, statisticsService, $filter) {

        $scope.params = {};
        $scope.nowDate = new Date();

        var getStatistics = function () {
            var params = {
                'starttime' : $scope.params.starttime || $filter('date')((new Date().getTime() - 30*24*3600*1000), 'yyyy-MM-dd'),   //默认取30天
                'endtime' : $scope.params.endtime || $filter('date')(new Date(), 'yyyy-MM-dd')
            };

            var type = $scope.showMain == 'tradeDaySum' ? 'tradeDaySum' : 'tradeDayCount';
            statisticsService[type](params).then(
                function (res) {
                    var resData = {};
                    var flag = $scope.showMain == 'tradeDaySum' ? 'daysum' : 'daycount';
                    for (item in res.data) {
                        resData[res.data[item].days] = res.data[item][flag];
                    }
                    $scope.config = {
                        //title: 'Line Chart',
                        //subtitle: 'Line Chart Subtitle',
                        debug: true,
                        showXAxis: true,
                        showYAxis: true,
                        showLegend: false,
                        stack: false,
                        forceClear: true
                    };

                    $scope.statisticsData = [{
                        name: $scope.showMain == 'tradeDaySum' ? '交易额' : '下单量',
                        datapoints: (function () {
                            var data = [];
                            var startTime = new Date(params.starttime).getTime();
                            var endTime = new Date(params.endtime).getTime();
                            for(var i=startTime ; i<endTime; i = i + 24*3600*1000){
                                var thisDate = $filter('date')(i, 'yyyyMMdd');
                                data.push({
                                    x: thisDate,
                                    y: resData[thisDate] || 0
                                });
                            }
                            return data;
                        })()
                    }];
                },
                function (err) {
                }
            );
        };

        $scope.goSearch = function () {     //搜索按钮
            getStatistics();
        };
        $scope.changeType = function (type) {   //切换类型
            $scope.showMain = type == 'tradeDaySum' ? 'tradeDaySum' : 'tradeDayCount';
            getStatistics();
        };
        $scope.changeType('tradeDayCount');

        // $scope.config = {
        //     //title: 'Line Chart',
        //     //subtitle: 'Line Chart Subtitle',
        //     debug: true,
        //     showXAxis: true,
        //     showYAxis: true,
        //     showLegend: false,
        //     stack: false
        // };

    }])

});