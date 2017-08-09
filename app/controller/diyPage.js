
define(function (require) {
    var app = require('app');
    require('app/components/diyPage/diy.core.js');
    require('angular-sanitize');
    require('ngclipboard')
    require('app/services/diy.service.js');
    var $ = require("jquery");
    app.useModule(['diy.service', 'ngSanitize', 'ngclipboard']);
    var itemPageLimit = 15;

    app.controller('diyPageDemoCtrl', ['$scope', '$state', '$sce', '$timeout', 'diyService', function ($scope, $state, $sce, $timeout, diyService) {
        var id = $state.params.id;
        var url;
        if (id) {
            diyService.getCustomPage(id).then(function (resp) {
                var data = resp.data;
                $scope.title = data.title;
                $scope.data = JSON.parse(data.subData);
                url = data.subUrl;
            })
        }

        $scope.save = function (success) {
            $timeout(function () {//避免编辑器内容还没更新到ngModel的时候，已经提交了数据
                if (id) {
                    diyService.updateCustomPage({ paramsType: 'JSON', id: id, subData: JSON.stringify($scope.data), title: $scope.title, subHtml: $scope.output }).then(function () {
                        $scope.$toast("保存成功");
                        !success || success();
                    })
                } else {
                    diyService.addCustomPage({ paramsType: 'JSON', subData: JSON.stringify($scope.data), title: $scope.title, subHtml: $scope.output }).then(function (resp) {
                        console.log(resp)
                        id = resp.data.id;
                        url = resp.data.subUrl;
                        $scope.$toast("保存成功");
                        !success || success();
                    })
                }
            })
        }

        Object.defineProperty($scope, "url", {
            get: function () {
                return $sce.trustAsResourceUrl(url + '?r=' + new Date().getTime());
            }
        })

        $scope.saveAndPreview = function () {
            $scope.save(function () {
                $scope.$dialog.open({
                    template: 'mobile', className:'ngdialog-theme-diy', scope: $scope, width: 0, height: 0, showClose:false, onOpenCallback: function () {
                        var iframe = document.getElementById("mobilePreview").contentWindow.document;
                        iframe.open();
                        iframe.write($scope.output);
                        iframe.close();
                    }
                })
            });
        }
    }])

    app.controller('customPageList', ['$scope', '$state', 'diyService', function ($scope, $state, diyService) {
        console.log($state.$current.self.name);
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };

        $scope.params = $state.p ? JSON.parse($state.p) : { index: 0 };
        $scope.params.size = itemPageLimit;

        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage', function (news) {
            // 把你的http请求放到这里
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            $scope.loadData($scope.conf.currentPage - 1);
        });


        $scope.loadData = function (index) {
            $scope.params.index = index || 0;
            diyService.getCustomPageList($scope.params).then(
                function (resp) {
                    $scope.vm = resp.data.content;
                    $scope.conf.total = resp.data.total;
                },
                function () {
                    //TODO:错误处理
                }
            )
        }

        $scope.delete = function (item) {
            $scope.$dialog.$confirm({ message: "确定删除？" }).then(function () {
                diyService.deleteCustomPage(item.id).then(function (resp) {
                    $scope.$toast("删除成功");
                    $scope.loadData();
                })
            }, function () { })
        }

        $scope.copySuccess = function () {
            $scope.$toast('复制成功');
        }
    }])
})