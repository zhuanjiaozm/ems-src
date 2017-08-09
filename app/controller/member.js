define(function (require) {
    var app = require('app');
    var memberService = require('/app/services/member.service.js');
    app.useModule(['member.service']);
    require('/app/components/ngLayDate.js');

    var itemPageLimit = 15;

    app.controller('memberListCtrl', ['$scope', '$state', 'memberService', '$stateParams', '$rootScope', '$http', 'apiUri', function ($scope, $state, memberService, $stateParams, $rootScope, $http, apiUri) {
        $scope.memberArray = [];
        // 查看参数处理
        $scope.params = {
            size: itemPageLimit,
            index: 0
        };
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };
        var searchParams = angular.copy($scope.params);
        $scope.$watch('conf.currentPage + conf.itemPageLimit', function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getMemberList();
        });
        $scope.getMemberList = function () {
            memberService.memberList(searchParams).then(function (res) {
                $scope.memberArray = res.data.content;
                $scope.conf.total = res.data.total;
            }, function (err) {
                console.log(err);
            });
        };
        $scope.search = function (req) {
            searchParams = angular.copy($scope.params);
            $scope.getMemberList();
        };
        $scope.exportsMember = function () {//导出excel
            memberService.exportsMember($scope.params);
        };

        $scope.importMember = function () {//导入excel
            $scope.$dialog.open({
                template: 'importUser',
                width: 500,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    memberService.labels().then(function (res) {
                        $scope.labels = res.data;
                    });
                    $scope.selectLabel = function (labelId) {
                        $scope.labels.forEach(function (item) {
                            if (item.labelId === labelId) {
                                item.selected = !item.selected;
                            }
                        })
                    };
                    $scope.enter = function () {
                        var labels = [], labelObj = {};
                        var labelItem = {
                            labelId: '',
                            labelName: ''
                        };
                        $scope.labels.forEach(function (item) {
                            if (item.selected) {
                                labelItem.labelId = item.labelId;
                                labelItem.labelName = item.labelName;
                                labels.push(labelItem);
                            }
                        });
                        var fd = new FormData();
                        var files = document.getElementById('userFile').files[0];
                        if (files) {
                            fd.append('fileName', files);
                            fd.labels = labels;
                            $http({
                                method: 'POST',
                                url: apiUri + 'import/user',
                                data: fd,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).then(function (data) {
                                //上传成功的操作
                                $scope.closeThisDialog(0);
                                $scope.getMemberList();
                            });
                        } else {
                            $scope.$toast('文件不能为空！')
                        }
                    };
                }]
            });
        };

        $scope.bindLabel = function () {//设置标签

        };

        $scope.operateMemberStatus = function (item, operationType, unlimit) {
            switch (operationType) {
                case 1:
                    $scope.ngDialogTitle = (unlimit === 1 ? '移除' : '加入') + '黑名单';
                    break;
                case 2:
                    $scope.ngDialogTitle = (unlimit === 1 ? '解锁' : '锁定') + '会员';
                    break;
                case 3:
                    $scope.ngDialogTitle = (unlimit === 1 ? '取消禁止' : '禁止') + '交易';
                    break;
            }
            $scope.operParams = {
                operationType: operationType,
                reason: '',
                unlimit: unlimit
            };
            if (unlimit === 0) {
                $scope.$dialog.open({
                    template: 'operMember',
                    width: 600,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.enter = function () {
                            memberService.operateMember(item.id, $scope.operParams).then(function (res) {
                                $scope.$root.$toast($scope.ngDialogTitle + '成功');
                                $scope.closeThisDialog(0);
                                $scope.getMemberList();
                            }, function (err) {
                                console.log(err);
                            });
                        };
                    }]
                });
            } else {
                $scope.$dialog.open({
                    template: 'app/view/template/dialogMsg.html',
                    width: 400,
                    scope: $scope,
                    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                        $scope.dialogMsg = '确定要' + $scope.ngDialogTitle + '吗?';
                        $scope.enter = function () {
                            memberService.operateMember(item.id, $scope.operParams).then(function (res) {
                                $scope.$root.$toast($scope.ngDialogTitle + '成功！');
                                $scope.closeThisDialog(0);
                                $scope.getMemberList();
                            }, function (err) {
                                console.log(err);
                            });
                        };

                    }]
                });
            }
        };
    }]).controller('detailCtrl', ['$rootScope', '$scope', '$state', 'memberService', '$uploadParams', function ($rootScope, $scope, $state, memberService, $uploadParams) {
        $scope.imgServerUrl = $uploadParams.baseUrl;
        var memberId = $rootScope.$stateParams.memberId;
        $scope.goBack = function () {
            $state.params.flag == 1 ? ($state.go('main.memberList')) : ($state.go('main.memberBlackList'));
        };
        $scope.memberInfo = {};
        $scope.memberDetail = function () {
            memberService.memberDetail(memberId).then(function (res) {
                $scope.memberInfo = res.data;
            }, function (err) {
                console.log(err);
            });
        };
        $scope.memberDetail();
    }]).controller('blackListCtrl', ['$scope', '$state', 'memberService', '$stateParams', function ($scope, $state, memberService, $stateParams) {
        $scope.params = {
            size: itemPageLimit,
            index: 0,
            account: '',
            memberId: ''
        };

        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: false
        };

        $scope.$watch('conf.currentPage + conf.itemPageLimit', function (news) {
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit);
            $scope.params.index = ($scope.conf.currentPage - 1) * $scope.conf.itemPageLimit;
            $scope.params.size = $scope.conf.itemPageLimit;
            $scope.getBlackList($scope.params);
        });
        $scope.blackArray = [];
        $scope.getBlackList = function (req) {
            memberService.blackList(req).then(function (res) {
                $scope.blackArray = res.data.content;
                $scope.conf.total = res.data.total;
            }, function (err) {
                console.log(err);
            });
        };

        $scope.operateMemberStatus = function (memberId) {
            if (!memberId) {
                $scope.$root.$toast('无法获取会员ID!');
                return;
            } else {
                var params = {
                    operationType: 1,
                    reason: '没啥原因',
                    unlimit: 1,
                    paramsType: 'Form'
                };
                $scope.$dialog.open({
                    template: 'app/view/template/dialogMsg.html',
                    width: 400,
                    scope: $scope,
                    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                        $scope.dialogMsg = '确定要恢复该用户吗?';
                        $scope.enter = function () {
                            memberService.operateMember(memberId, params).then(function (res) {
                                $scope.$root.$toast("已恢复该用户为正常账户！");
                                $scope.closeThisDialog(0);
                                $scope.getBlackList($scope.params);
                            }, function (err) {
                                console.log(err);
                            });
                        };

                    }]
                });
            }
        };
        $scope.search = function () {
            console.log($scope.params);
            $scope.getBlackList($scope.params);
        };
    }]).controller('tagCtrl', ['$scope', 'memberService', function ($scope, memberService) {
        $scope.labelParams = {
            index: 0,
            size: itemPageLimit,
            labelName: ''
        };
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };
        $scope.$watch('conf.currentPage', function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getTag();
        });
        var searchParams = angular.copy($scope.labelParams);
        $scope.getTag = function () {
            memberService.labelList(searchParams).then(function (res) {
                $scope.conf.total = res ? res.data.total : 0;
                $scope.tagList = res.data.content;
            });
        };
        $scope.searchTag = function () {
            searchParams = angular.copy($scope.labelParams);
            $scope.getTag();
        };
        $scope.deleteLabel = function (labelId) {
            $scope.$dialog.$confirm({message: '确认删除此信息？'}).then(function () {
                memberService.deleteLabel(labelId).then(function () {
                    $scope.$toast('操作成功！');
                    $scope.getTag();
                })
            }, function () {
            });
        };
        $scope.operateLabel = function (item) {
            $scope.$dialog.open({
                template: 'addLabel',
                width: 500,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.addParams = {
                        labelName: item ? item.labelName : '',
                        remark: item ? item.remark : ''
                    };
                    if (item) {
                        $scope.dialogTitle = '编辑标签';
                        $scope.addParams.labelId = item.labelId;
                    } else {
                        $scope.dialogTitle = '添加标签';
                    }

                    $scope.enter = function () {
                        if ($scope.addParams.labelName !== '') {
                            memberService.createLabel($scope.addParams).then(function (res) {
                                $scope.closeThisDialog(0);
                                $scope.getTag();
                            });
                        } else {
                            $scope.$toast('标签名不能为空！');
                        }
                    };
                }]
            });
        };
    }]);
});
