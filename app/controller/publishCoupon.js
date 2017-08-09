define(function (require) {
    var app = require('app');
    require('app/components/form.check.js');
    require('/app/components/editor.js');
    require('/app/services/goods.service.js');
    require('/app/services/coupon.service.js');
    require('/app/services/system.service.js');
    require('/app/services/city.service.js');
    app.useModule(['goods.service', 'coupon.service', 'system.service']);

    app.controller('publishCouponCategoryCtrl', ['$scope', '$state', 'goodsService', '$cookie', function ($scope, $state, goodsService, $cookie) {
        $scope.parentId = {id: '1', isParent: true, name: '服务类'};
        $scope.isSubmit = false;
        $scope.categoryName = [];
        $scope.categoryPath = [];
        //获取列表信息
        $scope.getCats = function (item, lv) {
            $scope.categoryName[lv - 1] = item.name;
            $scope.categoryName.length = lv;
            $scope.categoryPath[lv - 1] = item.id;
            $scope.categoryPath.length = lv;
            if (item.isParent) {
                $scope.isSubmit = false;
                goodsService.catsList(item.id).then(function (res) {
                    if (lv && lv === 1) {
                        $scope.firstLevel = res.data;
                        $scope.secondLevel = [];
                        $scope.thridLevel = [];
                    } else if (lv && lv === 2) {
                        $scope.secondLevel = res.data;
                        $scope.thridLevel = [];
                    } else if (lv && lv === 3) {
                        $scope.thridLevel = res.data;
                    }
                });
            } else {
                $scope.isSubmit = true;
                $scope.categoryId = item.id;
            }
        };
        $scope.getCats($scope.parentId, 1);
        $scope.publishCoupon = function () {
            console.log($scope.categoryName.join(','));
            console.log($scope.categoryPath.join(','));
            console.log($scope.categoryId);
            $cookie('categoryPath', $scope.categoryPath.join(','));
            $cookie('categoryName', $scope.categoryName.join(','));
            if ($scope.categoryId) {
                if ($state.params.type === 'SELF') {
                    $state.go('main.publishCoupon', {categoryId: $scope.categoryId, type: 1});
                } else if ($state.params.type === 'THIRDPARTY') {
                    $state.go('main.publishThirdCoupon', {categoryId: $scope.categoryId, type: 1});
                } else {
                    $scope.$toast('卡券销售类型错误！');
                }
            }
        }
    }]).controller('publishCouponCtrl', ['$scope', '$state', '$cookie', 'systemService', 'multRegionSelect', 'couponService', '$filter', '$http','apiUri', function ($scope, $state, $cookie, systemService, multRegionSelect, couponService, $filter, $http,apiUri) {
        var nowTime = Math.ceil(new Date().getTime() / (30 * 60 * 1000)) * 30 * 60 * 1000;
        $scope.canPreheatTime = nowTime + (30 * 60 * 1000);
        $scope.couponId = $state.params.id;
        $scope.isThirdCoupon = $state.current.name === 'main.publishThirdCoupon';
        $scope.isCreate = false;
        console.log($scope.isThirdCoupon);
        $scope.channelsParams = {
            index: 0,
            size: 1000,
            status: 1
        };
        $scope.supplierParams = {
            index: 0,
            size: 1000
        };
        $scope.getChannels = function () {
            systemService.getChannels($scope.channelsParams).then(function (res) {
                $scope.channelsList = res.data.content;
            });
        };
        $scope.getChannels();
        $scope.getSuppliers = function () {
            couponService.getSupplier($scope.supplierParams).then(function (res) {
                $scope.suppliers = res.data.content;
            });
        };
        $scope.getSuppliers();

        $scope.selectCheck = {
            anytimeRefund: false,
            invalidRefund: false,
            supportHoliday: false,
            supportWeekend: false
        };
        $scope.categoryName = $cookie('categoryName').split(',').join('->');
        $scope.salesChannel = [];
        if ($scope.couponId) {
            couponService.getCouponDetail($scope.couponId).then(function (res) {
                $scope.couponInfo = res.data;
                $scope.categoryName = res.data.categoryPathName;
                $scope.selectCheck = {
                    anytimeRefund: $scope.couponInfo.anytimeRefund === '1',
                    invalidRefund: $scope.couponInfo.invalidRefund === '1',
                    supportHoliday: $scope.couponInfo.supportHoliday === '1',
                    supportWeekend: $scope.couponInfo.supportWeekend === '1'
                };
                $scope.couponInfo = {
                    name: res.data.name,
                    outPrice: res.data.outPrice,
                    price: res.data.price,
                    batchNo: res.data.batchNo,
                    appointmentDays: res.data.appointmentDays,
                    appointmentHours: res.data.appointmentHours,
                    stock: res.data.stock,
                    limitNum: res.data.limitNum,
                    supplierId: res.data.supplierId,
                    serviceRules: res.data.serviceRules,
                    mainImgUrl: res.data.mainImgUrl,
                    sellType: res.data.sellType,
                    citys: res.data.citys,
                    consumeType: res.data.consumeType,
                    couponType: parseInt(res.data.couponType) || 1,
                    couponDesc: {
                        description: res.data.couponDesc.description
                    },
                    expiryStartDate: $filter('date')($scope.couponInfo.expiryStartDate, 'yyyy-MM-dd') || '',
                    expiryEndDate: $filter('date')($scope.couponInfo.expiryEndDate, 'yyyy-MM-dd') || '',
                    sellDatetime: $filter('date')($scope.couponInfo.sellDatetime, 'yyyy-MM-dd') || '',
                    salesChannel: res.data.salesChannel,
                    couponId: res.data.couponId,
                    categoryId: res.data.categoryId,
                    categoryName: res.data.categoryName,
                    categoryPath: res.data.categoryPath,
                };
                if ($scope.couponInfo.citys && $scope.couponInfo.citys.length > 0) {
                    $scope.cityIsSelected = true;
                }
                $scope.salesChannel = $scope.couponInfo.salesChannel.split(',');
                $scope.salesChannel.forEach(function (item) {
                    $scope.channelsList.forEach(function (elem) {
                        if (item === elem.salesChannelId) {
                            elem.selected = true;
                        }
                    });
                });
                if (($scope.couponInfo.status === '0' || $scope.couponInfo.status === '2') && ($scope.couponInfo.auditStat === '2')) {
                    $scope.$toast('该卡券不能编辑！');
                    $state.go('main.cardCouList');
                }
            });
        }

        $scope.selectChannel = function (item) {
            if ($scope.salesChannel.indexOf(item.salesChannelId) === -1) {
                $scope.salesChannel.push(item.salesChannelId);
                item.selected = true;
            } else {
                $scope.salesChannel.splice($scope.salesChannel.indexOf(item.salesChannelId), 1);
                item.selected = false;
            }
            $scope.couponInfo.salesChannel = $scope.salesChannel.join(',');
            console.log(item);
        };
        $scope.couponInfo = {
            categoryId: $state.params.categoryId,
            categoryName: $cookie('categoryName'),
            categoryPath: $cookie('categoryPath'),
            consumeType: '1',
            couponType: $state.params.type,
            citys: [],
            anytimeRefund: $scope.selectCheck.anytimeRefund ? 0 : 1,
            invalidRefund: $scope.selectCheck.invalidRefund ? 0 : 1,
            supportHoliday: $scope.selectCheck.supportHoliday ? 0 : 1,
            supportWeekend: $scope.selectCheck.supportWeekend ? 0 : 1,
            supplierId: '',
            sellType: 0
        };
        $scope.thirdParams = {
            fileName: ''
        };
        $scope.selectCity = function () {
            if ($scope.cityIsSelected) {
                multRegionSelect.open({selectedData: $scope.couponInfo.citys, key: 'regionCode'}).then(function (res) {
                    $scope.citys = res;
                });
            }
        };

        $scope.createCoupon = function () {
            $scope.citys.forEach(function (item) {
                var str = {regionCode: item.id, regionName: item.name};
                $scope.couponInfo.citys.push(str);
            });
            if ($scope.cityIsSelected) {
                $scope.couponInfo.citys = [{regionCode: '100000', regionName: '中国'}];
            }
            console.log($scope.couponInfo);
            if ($scope.isThirdCoupon) {
                couponService.createThirdCoupon($scope.couponInfo, $scope.couponId).then(function (res) {
                    $scope.thirdParams.id = res.data;
                    $scope.isCreate = true;
                });
            } else {
                couponService.createCoupon($scope.couponInfo, $scope.couponId).then(function (res) {
                    $scope.$toast('操作成功！');
                    $state.go('main.cardCouList');
                });
            }
        };
        $scope.importsSubmit = function () {
            var fd = new FormData();
            fd.append('fileName', document.getElementById('thirdParams').files[0]);
            $http({
                method: 'POST',
                url: apiUri+'couponthirds/imports/'+$scope.thirdParams.id,
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function (data) {
                //上传成功的操作
                $state.go('main.thirdCouponList');
            });
        }
    }]);
});