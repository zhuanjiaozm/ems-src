define(function (require) {
    var app = require("app");
    require("ztree");
    require("/app/services/goods.service.js");
    require("/app/services/coupon.service.js");
    require("/app/services/examine.service.js");
    app.useModule(["goods.service", "coupon.service", "examine.service"]);
    var itemPageLimit = 15;

    app.controller("cardCouListCtrl", ["$scope", "couponService", function ($scope, couponService) {
        // 卡券列表
        $scope.couponTypes = couponService.couponTypes();
        $scope.conf = {
            total: 10,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.cardCouponParams = {
            index: 0,
            size: itemPageLimit,
            couponSaleType: "SELF_SALES"
        };
        var searchParams = angular.copy($scope.cardCouponParams);
        $scope.$watch("conf.currentPage", function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getCardCoupons();
        });
        $scope.getCardCoupons = function () {
            couponService.getCoupons(searchParams).then(function (res) {
                $scope.couponList = res.data.content;
                $scope.conf.total = res.data.total;
            });
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.productParams);
            $scope.getCardCoupons();
        };
        $scope.statusName = function (val) {
            switch (val) {
                case "0":
                    return "未上架";
                case "1":
                    return "上架";
                case "2":
                    return "下架";
                default:
                    return "状态出错";
            }
        };
    }]).controller("cardCouTransferCtrl", ["$state", "$scope", "couponService", function ($state, $scope, couponService) {
        $scope.conf = {
            total: 10,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.cardCouponParams = {
            index: 0,
            size: 10
        };
        var searchParams = angular.copy($scope.cardCouponParams);
        $scope.$watch("conf.currentPage", function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getCardCoupons();
        });
        $scope.getCardCoupons = function () {
            couponService.getTransferList(searchParams).then(function (res) {
                $scope.couponList = res.data.content;
                $scope.conf.total = res.data.total;
            });
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.cardCouponParams);
            if (
                (searchParams.minPrice && isNaN(searchParams.minPrice)) ||
                (searchParams.maxPrice && isNaN(searchParams.maxPrice))
            ) {
                $scope.$toast("转价格范围必须输入数字");
                return;
            } else if (!isNaN(searchParams.minPrice) &&
                !isNaN(searchParams.maxPrice) &&
                searchParams.maxPrice < searchParams.minPrice
            ) {
                $scope.$toast("转让价格范围的最大高价不能小于最低价格");
                return;
            }
            $scope.getCardCoupons();
        };
        // 终止转让
        $scope.deals = function (id) {
            if (!id) {
                $scope.$toast("获取ID失败，无法终止转让该卡券！");
                return;
            }
            $scope.$dialog.$confirm({message: "确定改变此关键词的状态吗"}).then(function () {
                couponService.deals(id).then(
                    function (res) {
                        $scope.getCardCoupons();
                        $scope.$toast("终止转让该卡券成功!");
                    }, function (err) {
                        $scope.$toast(err.message);
                    });
            });
        };

        // 卡券详情
        $scope.getDetail = function (id) {
            if (!id) {
                $scope.$toast("获取ID失败，无法终止转让该卡券！");
                return;
            }
            $state.go("main.cardCouponTransferDetail", {id: id});
        };
    }
    ]).controller("cardCouponDetailCtrl", ["$scope", "$state", "couponService", "examineService", "$uploadParams", function ($scope, $state, couponService, examineService, $uploadParams) {
        var id = $state.params.id; // 卡券ID
        var taskId = $state.params.tid; // 审核流程taskId
        $scope.isExamine = taskId ? true : false;
        $scope.couponTypes = couponService.couponTypes();
        $scope.consumeTypes = couponService.consumeTypes();
        $scope.imgBaseUrl = $uploadParams.baseUrl;

        // 获取详情数据
        couponService.getCardCouponDetail(id).then(
            function (res) {
                $scope.cardCouponInfo = res.data;
            }, function (err) {
                // 获取商户管理列表失败
            });

        if ($scope.isExamine) {
            // 获取当前流程节点
            $scope.taskData = {};
            if (taskId) {
                $scope.taskData.taskId = taskId;
            }
        }

        // 获取审核流程信息
        $scope.getExamine = function () {
            $scope.showMain = "examine";
            if (!$scope.auditInfo) {
                examineService.getCardCouponAuditRoute(id).then(
                    function (res) {
                        $scope.auditInfo = res.data;
                    }, function (err) {
                        // 获取审核流程信息失败
                    });
            }
        };
    }]).controller("thirdPartyCouponCtrl", ["$scope", "couponService", function ($scope, couponService) {
        // 第三方卡券列表
        $scope.conf = {
            total: 10,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.thirdCouponParams = {
            index: 0,
            size: itemPageLimit,
            couponSaleType: "THIRDPARTY_SALES"
        };
        var searchParams = angular.copy($scope.thirdCouponParams);
        $scope.$watch("conf.currentPage", function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getThirdCoupons();
        });
        $scope.getThirdCoupons = function () {
            couponService.getThirdCoupon(searchParams).then(function(res){
                $scope.couponList = res.data.content;
                $scope.conf.total = res.data.total;
            });
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.productParams);
            $scope.getThirdCoupons();
        };
        $scope.exportsThirdCoupon = function () {
            couponService.exportsThirdCoupon().then(function (res) {
            });
        };
    }]).controller("cardCouponTransferDetailCtrl", ["$uploadParams", "$state", "$scope", "couponService", function ($uploadParams, $state, $scope, couponService) {
        $scope.couponTypes = couponService.couponTypes();
        $scope.consumeTypes = couponService.consumeTypes();
        $scope.imgBaseUrl = $uploadParams.baseUrl;
        if ($state.params.id) {
            couponService.getTransferDeatil($state.params.id).then(function (res) {
                $scope.cardCouponInfo = res.data;
                console.log($scope.cardCouponInfo.couponDto);
            });
        } else {
            $scope.$toast("获取卡券ID失败，无法获取卡券详情");
            return;
        }
    }]);
});
