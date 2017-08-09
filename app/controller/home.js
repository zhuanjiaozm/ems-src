define(function(require) {
    var app = require('app'),
        layDate = require('layDate'),
        login = require('app/services/login.service.js'),
        homepage = require('app/services/homepage.service.js');

    app.useModule(['login.service', 'homepage.service']);
    // app.useModule('cache.factory');

    app.controller('mainCtrl', ['$scope', '$state', '$removeCookie', '$cookie', 'loginService', function($scope, $state, $removeCookie, $cookie, loginService) {
        //读取用户信息
        $scope.profile = $cookie('userInfo');
        //获取当前用户菜单
        loginService.authMenu().then(function(res) {
            $scope.menuList = res.menuList;
            setTimeout(function() {
                var aside = $('.aside_nav');
                aside.find('dl dd').hide();
                aside.find('dt').on('click', function() {
                    $(this).parent().find('dd').toggle();
                    $(this).parent().siblings('dl').find('dd').hide();
                });
            }, 10);
        });
        $scope.logout = function() {
            $scope.profile = $removeCookie('userInfo');
            publicService.logout().then(
                function(res) {
                    console.log('退出成功：', res);
                    $state.go('login');
                },
                function(err) {
                    console.error('退出失败：', err);
                }
            );
        };

    }]).controller('homeCtrl', ['$scope', '$cookie', '$state', 'homepageService', '$filter', function($scope, $cookie, $state, homepageService, $filter) {
        // homepageService.homepage().then(function(res) {
        //     $scope.homepage = res.data;

        //     //处理图表
        //     var startTime = new Date().getTime() - 15 * 24 * 3600 * 1000; //默认取15天
        //     var endTime = new Date().getTime();

        //     //最近下单量
        //     var dayCountData = {};
        //     for (item in res.data.mallOrderDaycount) {
        //         dayCountData[res.data.mallOrderDaycount[item].days] = res.data.mallOrderDaycount[item];
        //     }

        //     $scope.orderCountData = [{
        //         name: '最近下单量',
        //         datapoints: (function() {
        //             var data = [];
        //             for (var i = startTime; i < endTime; i = i + 24 * 3600 * 1000) {
        //                 var thisDate = $filter('date')(i, 'yyyyMMdd');
        //                 data.push({
        //                     x: thisDate,
        //                     y: (dayCountData[thisDate] ? dayCountData[thisDate].daycount : 0)
        //                 });
        //             }
        //             return data;
        //         })()
        //     }];

        //     //最近交易额
        //     var daySumData = {};
        //     for (item in res.data.mallOrderDaysum) {
        //         daySumData[res.data.mallOrderDaysum[item].days] = res.data.mallOrderDaysum[item];
        //     }

        //     $scope.orderAmountData = [{
        //         name: '最近交易额',
        //         datapoints: (function() {
        //             var data = [];
        //             for (var i = startTime; i < endTime; i = i + 24 * 3600 * 1000) {
        //                 var thisDate = $filter('date')(i, 'yyyyMMdd');
        //                 data.push({
        //                     x: thisDate,
        //                     y: daySumData[thisDate] ? daySumData[thisDate].daysum : 0
        //                 });
        //             }
        //             return data;
        //         })()
        //     }];
        // }, function(err) {
        //     //console.log(err);
        // });
        // // var pageload = {
        // //     name: '访问量',
        // //     datapoints: [
        // //         {x: 15 + '日', y: 482},
        // //         {x: 16 + '日', y: 523},
        // //         {x: 17 + '日', y: 745},
        // //         {x: 18 + '日', y: 862},
        // //         {x: 19 + '日', y: 882},
        // //         {x: 20 + '日', y: 1040},
        // //         {x: 21 + '日', y: 1023},
        // //         {x: 22 + '日', y: 790},
        // //         {x: 23 + '日', y: 612},
        // //         {x: 24 + '日', y: 512}
        // //     ]
        // // };
        // $scope.config = {
        //     //title: 'Line Chart',
        //     //subtitle: 'Line Chart Subtitle',
        //     debug: true,
        //     showXAxis: true,
        //     showYAxis: true,
        //     showLegend: false,
        //     stack: false
        // };

    }]).controller('echartsCtrl', ['$scope', function($scope) {
        var pageload = {
            name: 'page.load',
            datapoints: [
                { x: 2001, y: 1012 },
                { x: 2002, y: 1023 },
                { x: 2003, y: 1045 },
                { x: 2004, y: 1062 },
                { x: 2005, y: 1032 },
                { x: 2006, y: 1040 },
                { x: 2007, y: 1023 },
                { x: 2008, y: 1090 },
                { x: 2009, y: 1012 },
                { x: 2010, y: 1012 }
            ]
        };

        var firstPaint = {
            name: 'page.firstPaint',
            datapoints: [
                { x: 2001, y: 22 },
                { x: 2002, y: 13 },
                { x: 2003, y: 35 },
                { x: 2004, y: 52 },
                { x: 2005, y: 32 },
                { x: 2006, y: 40 },
                { x: 2007, y: 63 },
                { x: 2008, y: 80 },
                { x: 2009, y: 20 },
                { x: 2010, y: 25 }
            ]
        };

        $scope.config = {
            //title: 'Line Chart',
            //subtitle: 'Line Chart Subtitle',
            debug: true,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            stack: false
        };
        $scope.data = [pageload];
        $scope.multiple = [pageload, firstPaint];
    }]).controller('listCtrl', ['$scope', function($scope) {
        laydate({
            elem: '#J-xl'
        });
    }]).controller('listDetailCtrl', ['$scope', function($scope) {

    }]).controller('formCtrl', ['$scope', function($scope) {

    }]);
});