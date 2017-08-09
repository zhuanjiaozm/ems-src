define(function (require) {
    var app = require('app'),
        system = require('app/services/system.service.js'),
        content = require('app/services/content.service.js'),
        examine = require('app/services/examine.service.js');
        cardCoupon = require('app/services/coupon.service.js');
    app.useModule(['examine.service', 'system.service', 'content.service', 'coupon.service']);

    var itemPageLimit = 15,

        examineStatus = {
            '1' : '待办',
            '2' : '已办'
        },

        //审核列表通用处理
        examineFunction = function (scope, state, examineService, flagData) {

            //查询参数处理
            scope.params = {
                index:0,
                size:itemPageLimit,
                taskStatus:'1'
            };
            //分页参数
            scope.conf = {
                total : 1,
                currentPage : 1,
                itemPageLimit : itemPageLimit,
                isSelectPage: false,
                isLinkPage : true
            };
            scope.$watch('conf.currentPage' , function(news){
                //console.log(scope.conf.currentPage, scope.conf.itemPageLimit);
                scope.params.index = scope.conf.currentPage -1;
                scope.getList();
            });
            scope.goSearch = function () {
                if(scope.conf.currentPage == 1){
                    scope.getList();
                }else{
                    scope.conf.currentPage = 1;
                }
            };
            //获取列表数据
            scope.getList = function(){
                examineService[flagData.listRequest](scope.params).then(function(res){
                    scope[flagData.listResult] = res.data.content;
                    scope.conf.total = res.data.total;
                    //scope.canBatch = scope.params.taskStatus==1 ? true :false;
                }, function(err){
                    //获取审核列表失败
                    //console.log(err);
                });
            };
        };

    //商户审核列表
    app.controller('merchantExamineCtrl', ['$scope', '$state', 'examineService', function ($scope, $state, examineService) {
        var flagData = {
            listRequest : 'auditMerchantList',      //查询列表请求接口名
            listResult : 'merchantList',            //请求结果list
            currentRoute : 'main.merchantExamine'   //当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state,examineService,flagData);

    //店铺审核列表
    }]).controller('shopExamineCtrl', ['$scope', '$state', 'examineService', '$uploadParams',function ($scope, $state, examineService, $uploadParams) {
        var flagData = {
            listRequest : 'auditShopList',       //查询列表请求接口名
            listResult : 'shopList',               //请求结果list
            currentRoute : 'main.shopExamine'      //当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state,examineService,flagData);

    //商品审核列表
    }]).controller('goodsExamineCtrl', ['$scope', '$state', 'examineService', '$uploadParams',function ($scope, $state, examineService, $uploadParams) {
        var flagData = {
            listRequest : 'auditProductList',       //查询列表请求接口名
            listResult : 'goodsList',               //请求结果list
            currentRoute : 'main.goodsExamine'      //当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state,examineService,flagData);
        $scope.imgBaseUrl = $uploadParams.baseUrl;

    //活动审核列表
    }]).controller('mkActExamineCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.conf = {
            // 总条数
            total : 1,
            // 当前页
            currentPage : 1,
            // 一页展示多少条
            itemPageLimit : 15,
            // 是否显示一页选择多少条
            isSelectPage : false,
            // 是否显示快速跳转
            isLinkPage : true
        };
        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage + conf.itemPageLimit' , function(news){
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage , $scope.conf.itemPageLimit)
        })

    //活动审核详情
    }]).controller('mkActExamineDetailCtrl', ['$scope', '$state', function($scope, $state){
        console.log($state.$current.self.name);

    }]).controller('secKillExamineCtrl', ['$scope', '$state', function ($scope, $state) {
        console.log($state.$current.self.name);
        $scope.conf = {
            // 总条数
            total : 1,
            // 当前页
            currentPage : 1,
            // 一页展示多少条
            itemPageLimit : 15,
            // 是否显示一页选择多少条
            isSelectPage : false,
            // 是否显示快速跳转
            isLinkPage : true
        };
        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage + conf.itemPageLimit' , function(news){
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage , $scope.conf.itemPageLimit)
        })
    }]).controller('secKillExamineDetailCtrl', ['$scope', '$state', function($scope, $state){
        console.log($state.$current.self.name);

    //资讯审核列表
    }]).controller('informationExamineCtrl', ['$scope', '$state','examineService', function ($scope, $state, examineService) {
        //console.log($state.$current.self.name);
        var flagData = {
            listRequest : 'auditInformationList',   //查询列表请求接口名
            listResult : 'newsList',                //请求结果list
            currentRoute : 'main.informationExamine'//当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state,examineService,flagData);

    //资讯审核详情页
    }]).controller('informationExamineDetailCtrl', ['$scope', '$state','$stateParams','$uploadParams','$sce','examineService', function($scope, $state,$stateParams,$uploadParams,$sce,examineService){
        $scope.imgBaseUrl = $uploadParams.baseUrl;
        var id = $stateParams.id,
            tId = $stateParams.tid;
        $scope.taskData = {};
        if(tId){
            $scope.taskData.taskId = tId;
        }
        //获取资讯详情
        examineService.getNewsInfo(id).then(
            function (res) {
                $scope.newsInfo=res.data;
                //获取资讯内容
                $scope.infoContents=$sce.trustAsHtml($scope.newsInfo.infoContent);
            }, function (err) {
                $scope.$root.$toast(err.message);
            }
        );
        //获取审核流程信息
        $scope.getExamine = function(){
            $scope.showMain='examine';
            if(!$scope.auditInfo) {
                examineService.getNewsAuditRoute(id).then(function (res) {
                    if(res.data){
                        $scope.auditInfo = res.data;
                    }else{
                        $scope.$root.$toast("获取审核流程信息失败");
                    }
                }, function (err) {
                    $scope.$root.$toast("获取审核流程信息失败");
                    return;
                });
            }
        };
    //广告审核列表
    }]).controller('advertExamineCtrl', ['$scope', '$state', 'examineService', 'systemService', 'contentService','$uploadParams',function ($scope, $state, examineService, systemService,contentService,$uploadParams) {
        //获取展示端
        contentService.getAdvertsChannels().then(
            function (res) {
                $scope.channelList = res.data;
                if($scope.params.displayChannel){
                    $scope.getDisplayPages();
                }
            },
            function (err) {
            }
        );
        //根据所选展示端查找展示页面
        $scope.getDisplayPages = function () {
            var channel = $scope.params.displayChannel;
            $scope.displayPageList = [];
            if(channel){
                contentService.getAdvertsAllPage(channel).then(function (res) {
                    $scope.displayPageList = res.data;
                }, function (err) {
                });
            }else{
                $scope.params.displayPage = '';
            }
        };
        //获取根据展示页面查找城市
        systemService.getSites().then(function (res) {
            $scope.siteList = res.data.content;
        },function (err) {
        });
        $scope.imgBaseUrl = $uploadParams.baseUrl;

        var flagData = {
            listRequest : 'auditAdvertList',        //查询列表请求接口名
            listResult : 'advertList',              //请求结果list
            currentRoute : 'main.advertExamine'     //当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state,examineService,flagData);

    //广告审核详情
    }]).controller('advertExamineDetailCtrl', ['$scope', '$state', '$stateParams','$uploadParams', 'examineService', 'contentService',function($scope, $state, $stateParams,$uploadParams,examineService,contentService){
        $scope.imgBaseUrl = $uploadParams.baseUrl;
        var id = $stateParams.id,
            tId = $stateParams.tid;
        $scope.taskData = {};
        if(tId){
            $scope.taskData.taskId = tId;
        }
        //获取广告详情
        contentService.getAdvertInfo(id).then(function (res) {
            //$scope.advertInfo = Object.assign($scope.advertInfo,res.data);
            if(res.data){
                $scope.advertInfo = res.data;
            }else {
                $scope.$root.$toast("获取广告信息失败");
            }
        }, function (err) {
            $scope.$root.$toast("获取广告信息失败");
        });
        //获取审核流程信息
        $scope.getExamine = function(){
            $scope.showMain='examine';
            if(!$scope.auditInfo) {
                examineService.getAdvertAuditRoute(id).then(function (res) {
                    if(res.data){
                        $scope.auditInfo = res.data;
                    }else{
                        $scope.$root.$toast("获取审核流程信息失败");
                    }
                }, function (err) {
                    $scope.$root.$toast("获取审核流程信息失败");
                });
            }
        };

    //公告审核列表
    }]).controller('announcementExamineCtrl', ['$scope', '$state', 'examineService', function ($scope, $state, examineService) {
        //console.log($state.$current.self.name);
        var flagData = {
            listRequest : 'auditAnnouncementList',   //查询列表请求接口名
            listResult : 'announcementList',                //请求结果list
            currentRoute : 'main.announcementExamine'//当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state, examineService, flagData);

    //公告审核详情
    }]).controller('announcementDetailCtrl', ['$scope', '$state', '$stateParams', 'examineService', 'contentService', '$sce', function ($scope, $state, $stateParams, examineService, contentService, $sce) {
        //console.log($state.$current.self.name);
        var id = $stateParams.id;
        $scope.taskId = $stateParams.tid;

        //获取公告详情
        contentService.getNoticeDetail(id).then(function (res) {
            if(res.data){
                $scope.announcement = res.data;
                $scope.announcement.content = $sce.trustAsHtml($scope.announcement.content);
            }else {
                $scope.$root.$toast("获取公告信息失败");
            }
        }, function (err) {
            $scope.$root.$toast("获取公告信息失败");
        });
        //获取审核流程信息
        $scope.getExamine = function(){
            $scope.showMain='examine';
            if(!$scope.auditInfo) {
                examineService.getAnnouncementAuditRoute(id).then(function (res) {
                    if(res.data){
                        $scope.auditInfo = res.data;
                    }else{
                        $scope.$root.$toast("获取审核流程信息失败");
                    }
                }, function (err) {
                    $scope.$root.$toast("获取审核流程信息失败");
                });
            }
        };

    //卡券发布审核
    }]).controller('cardCouponExamineCtrl', ['$scope', '$state', 'examineService', 'couponService', function ($scope, $state, examineService, couponService) {

        $scope.couponTypes = couponService.couponTypes();
        var flagData = {
            listRequest : 'auditCardCouponList',      //查询列表请求接口名
            listResult : 'cardCouponList',            //请求结果list
            currentRoute : 'main.cardCouponExamine'   //当前页面（搜索、翻页）
        };
        $scope.examineStatus = examineStatus;
        examineFunction($scope,$state,examineService,flagData);

    }]);
});
