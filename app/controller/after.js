define(function (require) {
    var app = require('app');
    var tree = require('ztree');
    require('app/services/after.service.js');
    require("/app/components/imgZoom.js");
    app.useModule(['after.service', 'imgZoom']);
    var itemPageLimit = 15;

    app.controller('refundCtrl', ['$scope', '$state', 'afterService', function ($scope, $state, afterService) {//退款管理列表
        console.log($state.$current.self.name);

        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };

        $scope.params = $state.p ? JSON.parse($state.p) : { index: 0, orderType: 'o2o' };
        $scope.params.size = itemPageLimit;

        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage', function (news) {
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            $scope.loadData($scope.conf.currentPage - 1);
        });


        $scope.loadData = function (index) {
            $scope.params.index = index || 0;
            afterService.getRefundList($scope.params).then(
                function (resp) {
                    $scope.vm = resp.data.content;
                    $scope.conf.total = resp.data.content.total;
                },
                function () {
                    //TODO:错误处理
                }
            )
        }

    }]).controller('refundDetailCtrl', ['$scope', '$state', 'afterService', function ($scope, $state, afterService) {//退款详情
        console.log($state.$current.self.name);

        var id = $state.params.id;

        afterService.getRefund(id).then(function (resp) {
            $scope.vm = resp.data;
        });

    }]).controller('refundReasonCtrl', ['$scope', '$state', '$dialog', 'afterService', function ($scope, $state, $dialog, afterService) {//退款原因列表
        console.log($state.$current.self.name);        
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };

        var params = $scope.params = $state.p ? JSON.parse($state.p) : { index: 0, orderType: 'o2o' };
        $scope.params.size = itemPageLimit;

        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage', function (news) {
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            $scope.params = params;
            $scope.loadData($scope.conf.currentPage - 1);
        });


        $scope.loadData = function (index) {
            $scope.params.index = index || 0;            
            params = angular.copy( $scope.params);
            afterService.getRefundReasonList($scope.params).then(
                function (resp) {
                    $scope.vm = resp.data;
                    $scope.conf.total = resp.data.total;
                },
                function () {
                    //TODO:错误处理
                }
            )
        }
        $scope.editReason = function (item) {
            $scope.$dialog.open({
                template: 'editReason',
                width: 500,
                controller: ['$scope', function ($scope) {
                    $scope.vm = angular.copy(item);
                    $scope.enter = function () {
                        item ? update($scope.vm) : add($scope.vm);
                        $scope.closeThisDialog(0);
                    }
                }]
            });
        }

        $scope.deleteReason = function (id) {
            $scope.$dialog.$confirm({ message: "确定删除？" }).then(function () {
                afterService.deleteRefundReason(id).then(function (resp) {
                    $scope.$toast("删除成功");
                    $scope.loadData();
                })
            })
        }

        $scope.updateOrdinal = function (item) {
            if (item.ordinal || "0" === item.ordinal) {
                update(item);
            }
        };

        function update(item) {
            afterService.updateRefundReason(item).then(function (resp) {
                $scope.$toast("修改成功");
                $scope.loadData();
            })
        }

        function add(item) {
            afterService.addRefundReason(item).then(function (resp) {
                $scope.$toast("添加成功");
                $scope.loadData();
            })
        }

    }]).controller('commentCtrl', ['$scope', '$state', '$uploadParams', 'afterService', function ($scope, $state, $uploadParams, afterService) {//评价管理列表
        console.log($state.$current.self.name);
        $scope.imgBaseUrl = $uploadParams.baseUrl;


        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };

        $scope.params = $state.p ? JSON.parse($state.p) : { index: 0, orderType: 'o2o' };
        $scope.params.size = itemPageLimit;

        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage', function (news) {
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            $scope.loadData($scope.conf.currentPage - 1);
        });


        $scope.loadData = function (index) {
            $scope.params.index = index || 0;
            afterService.getCommentList($scope.params).then(
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

        //查看评论
        $scope.commentInfo = function (item) {
            $scope.$dialog.open({
                template: 'commentInfo',
                controller: function ($scope, afterService) {
                    $scope.vm = item;
                    $scope.imgBaseUrl =  $uploadParams.baseUrl;
                },
                width: 500
            });
        }

        //删除
        $scope.delete = function (item) {
            $scope.$dialog.$confirm({ message: "确定要删除？" }).then(function () {
                afterService.deleteComment(item.id).then(function () {
                    $scope.loadData();
                })
            }, function () { })
        }

        //屏蔽
        $scope.block = function (item) {
            $scope.$dialog.$confirm({ message: "确定要屏蔽？" }).then(function () {
                afterService.blockComment(item.id).then(function () {
                    $scope.loadData();
                })
            }, function () { })
        }

        //转换评价类型为中文
        $scope.convertCommentType = function (key) {
            switch (key) {
                case "good": return "好评";
                case "normal": return "中评";
                case "bad": return "差评";
            }
        }
    }]).controller('tipOffCtrl', ['$scope', '$state', function ($scope, $state) {//举报管理列表
        console.log($state.$current.self.name);
        $scope.conf = {
            // 总条数
            total: 1,
            // 当前页
            currentPage: 1,
            // 一页展示多少条
            itemPageLimit: itemPageLimit,
            // 是否显示一页选择多少条
            isSelectPage: false,
            // 是否显示快速跳转
            isLinkPage: true
        };
        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage + conf.itemPageLimit', function (news) {
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
        });
        $scope.handle = function (id) {//新增原因
            console.log(id);
            $scope.$dialog.open({
                template: 'handleTipOff',
                controller: ['$scope', function ($scope) {
                    $scope.enter = function () {
                        console.log('处理举报');
                        $scope.closeThisDialog(0);
                    }
                }]
            });
        }

    }]);
});