define(function(require){
    var app = require('app');
    var layDate = require('layDate');
    var ueditorConfig = require('ueditorConfig');
    var ueditorAll = require('ueditorAll');
    var itemPageLimit = 15;

    app.controller('flowDataCtrl',['$scope','$state',function($scope,$state){
        console.log($state.$current.self.name);
        laydate({
            elem: '#start',
            min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16 23:59:59', //最大日期
            istime: true,
            istoday: false,
            choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        });
        laydate({
            elem: '#end',
            min: laydate.now(),
            max: '2099-06-16 23:59:59',
            istime: true,
            istoday: false,
            choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        });
        var pageload = {
            name: '访问量',
            datapoints: [
                {x: 15+'日', y: 482},
                {x: 16+'日', y: 523},
                {x: 17+'日', y: 745},
                {x: 18+'日', y: 862},
                {x: 19+'日', y: 882},
                {x: 20+'日', y: 1040},
                {x: 21+'日', y: 1023},
                {x: 22+'日', y: 790},
                {x: 23+'日', y: 612},
                {x: 24+'日', y: 512},
            ]
        };
        $scope.config = {
            //title: 'Line Chart',
            //subtitle: 'Line Chart Subtitle',
            debug: true,
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            stack: false
        };

        $scope.data = [pageload];
    }]).controller('userCountCtrl',['$scope','$state',function($scope,$state){
        console.log($state.$current.self.name);
        laydate({
            elem: '#start',
            min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16 23:59:59', //最大日期
            istime: true,
            istoday: false,
            choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        });
        laydate({
            elem: '#end',
            min: laydate.now(),
            max: '2099-06-16 23:59:59',
            istime: true,
            istoday: false,
            choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        });
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };
        $scope.$watch('conf.currentPage + conf.itemPageLimit', function (news) {
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
        });
    }])

});