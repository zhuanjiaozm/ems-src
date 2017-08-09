define(function(require) {
    var app = require('app');
    require('ztree');
    require('/app/services/message.service.js'); //引入模块
    require('app/components/selectComponent.js');
    require('/app/services/member.service.js');
    app.useModule(['message.service', 'member.service']);
    app.controller('messageListCtrl', ['$scope', '$state', '$cookie', 'messageService', 'memberService', function($scope, $state, $cookie, messageService, memberService) {
            $scope.conf = {
                total: 10,
                currentPage: 1,
                itemPageLimit: 15,
                isLinkPage: true
            };
            $scope.userParams = {
                index: 0,
                size: 15
            };
            var searchParams = angular.copy($scope.userParams);
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function() {
                searchParams.index = ($scope.conf.currentPage - 1) * $scope.conf.itemPageLimit;
                $scope.getMsgList();
            });
            if ($cookie('sdenums')) {
                $scope.sdenums = $cookie('sdenums');
                $scope.sdenumsObj = {};
                angular.forEach($scope.sdenums, function(data) {
                    $scope.sdenumsObj[data.id] = data.name;
                });
            } else {
                messageService.getSdenums().then(
                    function(req) {
                        $scope.sdenums = [];
                        $scope.sdenumsObj = {};
                        for (var i in req.data) {
                            $scope.sdenums.push({
                                id: req.data[i].code,
                                name: req.data[i].name
                            });
                            $scope.sdenumsObj[req.data[i].code] = req.data[i].name;
                        }
                        $cookie('sdenums', $scope.sdenums);
                    },
                    function(err) {
                        $scope.$toast('获取发送形式失败');
                    }
                );
            }
            $scope.getMsgList = function() {
                for (var i in searchParams) {
                    if (searchParams[i] === '') {
                        delete searchParams[i];
                    }
                }
                messageService.getMsgList(searchParams).then(function(res) {
                    $scope.conf.total = res ? res.data.total : 0;
                    $scope.list = res.data.content;
                }, function(err) {
                    $scope.$toast('加载出错，请刷新重试！');
                });
            };
            $scope.searchList = function() {
                searchParams = angular.copy($scope.userParams);
                if (searchParams.receiver) {
                    if (!(/^1[34578]\d{9}$/.test(searchParams.receiver))) {
                        $scope.$toast('请输入正确的手机号码格式');
                        return;
                    }
                }

                $scope.getMsgList();
            };
            //获取消息类型
            if ($cookie('msgtype')) {
                $scope.msgtypes = $cookie('msgtype');
            } else {
                messageService.getMsgtype().then(
                    function(req) {
                        $scope.msgtypes = req.data;
                        $cookie('msgtypes', req.data);
                        $scope.msgtypesObj = {};
                        for (var e in $scope.msgtypes) {
                            $scope.msgtypesObj[$scope.msgtypes[e].id] = $scope.msgtypes[e].name;
                        }
                    },
                    function(err) {
                        $scope.$toast('获取消息类型失败');
                    }
                );
            }
            //阅读操作
            $scope.forDetail = function(message) {
                $scope.$dialog.open({
                    template: 'forDetail',
                    width: 600,
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                        $scope.m = message;
                    }]
                });
            };

            //删除消息
            $scope.delMsg = function(type, del) {
                var msgReadId = [];
                type == 1 ? msgReadId.push(del) : msgReadId = $scope.sendType;
                $scope.$dialog.$confirm({
                    message: '确定要删除此消息列表吗？'
                }).then(
                    function() {
                        messageService.deleteMsg(msgReadId).then(function(res) {
                            setTimeout(function() {
                                $scope.getMsgList();
                            }, 1000);
                            $scope.$toast(res.message);
                        });
                    },
                    function() {}
                );
            };

            //checkbox start
            setTimeout(function() {
                //创建变量用来保存选中结果
                $scope.sendType = [];
                var updateSelected = function(action, id) {
                    if (action == 'add' && $scope.sendType.indexOf(id) == -1) $scope.sendType.push(id);
                    if (action == 'remove' && $scope.sendType.indexOf(id) != -1) $scope.sendType.splice($scope.sendType.indexOf(id), 1);
                };
                //更新某一列数据的选择
                $scope.updateSelection = function($event, id) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id);
                };
                //全选操作
                $scope.selectAll = function($event) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    for (var i = 0; i < $scope.list.length; i++) {
                        var contact = $scope.list[i];
                        updateSelected(action, contact.msgReadId);
                    }
                };
                $scope.isSelected = function(id) {
                    return $scope.sendType.indexOf(id) >= 0;
                };
                $scope.isSelectedAll = function() {
                    return $scope.sendType.length === $scope.list.length;
                };
            }, 1000);
            //checkbox end

            //发送信息
            $scope.userSeleted = [];
            $scope.sendMsg = function() {
                $scope.$dialog.open({
                    template: 'sendMsg',
                    width: 800,
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                        $scope.add = {
                            title: '',
                            content: ''
                        };
                        if ($cookie('sdenums')) {
                            $scope.sdenums = $cookie('sdenums');
                        } else {
                            messageService.getSdenums().then(
                                function(req) {
                                    $scope.sdenums = [];
                                    for (var i in req.data) {
                                        if (req.data[i].code != '1') {
                                            $scope.sdenums.push({
                                                id: req.data[i].code,
                                                name: req.data[i].name
                                            });
                                        }
                                    }
                                    $cookie('sdenums', $scope.sdenums);
                                },
                                function(err) {
                                    $scope.$toast('获取发送形式失败');
                                }
                            );
                        }
                        $scope.numbers = [];

                        $scope.backfn = function(checked, index) {
                            $scope.sendType = [];
                            angular.forEach($scope.sdenums, function(sdenum, index) {
                                if (sdenum.selected === true) {
                                    $scope.sendType.push(sdenum.id);
                                }
                            });
                        };
                        $scope.checkPhoneNumber = function(str) {
                            var strArray = str.split(' ');
                            var result = '';
                            angular.forEach(strArray, function(data, index) {
                                if (/^1[34578]\d{9}$/.test(data)) {
                                    if ($scope.numbers.indexOf(data) < 0) {
                                        $scope.numbers.push(data);
                                    }
                                } else {
                                    result += data + ' ';
                                }
                            });
                            $scope.add.phone = result.substring(0, result.length  -  1);
                        };

                        $scope.delNum = function(index) {
                            $scope.numbers.splice(index, 1);
                        };

                        $scope.enter = function() {

                            if (!$scope.add.receiverGroup) {
                                $scope.$toast('请选择接收组');
                                return;
                            }
                            if (!$scope.add.sendTarget) {
                                $scope.$toast('请选择发送给指定或者是所有人');
                                return;
                            }
                            if ($scope.add.sendTarget == '1') {
                                if ($scope.numbers.length < 1 || $scope.numbers.length > 200) {
                                    $scope.$toast('请指定1-200个接收人');
                                    return;
                                }
                            }
                            if ($scope.add.mesgFlag) {
                                console.log('$scope.add.mesgFlag:', $scope.add.mesgFlag);
                                console.log('$scope.msgtypesObj:', $scope.msgtypesObj);
                                $scope.mesgFlagName = $scope.msgtypesObj[$scope.add.mesgFlag];
                            } else {
                                $scope.$toast('请填写消息类型');
                                return;
                            }
                            if ($scope.add.title.length < 1) {
                                $scope.$toast('请填写消息标题');
                                return;
                            }
                            if ($scope.add.content < 1) {
                                $scope.$toast('请填写消息内容');
                                return;
                            }
                            // if ($scope.sendType.length < 1) {
                            //     $scope.$toast('请选择发送形式');
                            //     return;
                            // }
                            messageService.sendMsg({
                                content: $scope.add.content,
                                mesgFlag: $scope.add.mesgFlag,
                                mesgFlagName: $scope.mesgFlagName,
                                queryMobile: $scope.numbers.toString(),
                                sendTypes: $scope.sendType.toString(),
                                receiverGroup: $scope.add.receiverGroup,
                                receiverType: $scope.add.sendTarget,
                                title: $scope.add.title
                            }).then(
                                function(req) {
                                    $scope.closeThisDialog(0);
                                    $scope.$toast('新增成功！');
                                    $scope.getMsgList();
                                }
                            );
                        };
                    }]
                });
            };
        }])
        .controller('templateCtrl', ['$scope', '$state', '$cookie', 'messageService', function($scope, $state, $cookie, messageService) {
            $scope.conf = {
                total: 10,
                currentPage: 1,
                itemPageLimit: 10,
                isLinkPage: true
            };
            $scope.params = {
                index: 0,
                size: 10
            };
            var searchParams = angular.copy($scope.params);
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function() {
                searchParams.index = $scope.conf.currentPage - 1;
                $scope.getTemplateList();
            });
            $scope.getTemplateList = function() {
                messageService.getTheTemplate(searchParams).then(function(res) {
                    $scope.conf.total = res ? res.data.total : 0;
                    $scope.list = res.data.content;
                    for (var a in $scope.list) {
                        var tempStr = '';
                        if ($scope.list[a].sendType) {
                            var sendTypeArray = $scope.list[a].sendType.split(',');
                            for (var b in sendTypeArray) {
                                for (var c in $scope.sdenums) {
                                    if (sendTypeArray[b] == $scope.sdenums[c].id) {
                                        tempStr = tempStr + $scope.sdenums[c].name + ',';
                                    }
                                }
                            }
                            $scope.list[a].sendTypeStr = tempStr.substr(0, tempStr.length - 1);
                        }
                    }

                }, function(err) {
                    $scope.$toast('加载出错，请刷新重试！');
                });
            };
            $scope.searchList = function() {
                searchParams = angular.copy($scope.params);
                $scope.getTemplateList();
            };
            if ($cookie('jpenums')) {
                $scope.jpenums = $cookie('jpenums');
            } else {
                messageService.getJpenums().then(
                    function(req) {
                        $scope.jpenums = req.data;
                        $cookie('jpenums', req.data);
                    },
                    function(err) {
                        $scope.$toast('获取跳转类型失败');
                    }
                );
            }
            messageService.getSdenums().then(
                function(req) {
                    $scope.sdenums = [];
                    $scope.sdenumsObj = {};
                    for (var i in req.data) {
                        $scope.sdenums.push({
                            id: req.data[i].code,
                            name: req.data[i].name
                        });
                        $scope.sdenumsObj[req.data[i].code] = req.data[i].name;
                    }
                    $cookie('sdenums', $scope.sdenums);
                },
                function(err) {
                    $scope.$toast('获取发送形式失败');
                }
            );
            if ($cookie('msgtype')) {
                $scope.msgtypes = $cookie('msgtype');
            } else {
                messageService.getMsgtype().then(
                    function(req) {
                        $scope.msgtypes = req.data;
                        $cookie('msgtypes', req.data);
                        $scope.msgtypesObj = {};
                        for (var e in $scope.msgtypes) {
                            $scope.msgtypesObj[$scope.msgtypes[e].code] = $scope.msgtypes[e].name;
                        }
                    },
                    function(err) {
                        $scope.$toast('获取消息类型失败');
                    }
                );
            }
            $scope.scensObj = {};
            for (var d in $scope.scens) {
                $scope.scensObj[$scope.scens[d].code] = $scope.scens[d].name;
            }

            //checkbox start
            setTimeout(function() {
                //创建变量用来保存选中结果
                $scope.sendType = [];
                var updateSelected = function(action, id) {
                    if (action == 'add' && $scope.sendType.indexOf(id) == -1) $scope.sendType.push(id);
                    if (action == 'remove' && $scope.sendType.indexOf(id) != -1) $scope.sendType.splice($scope.sendType.indexOf(id), 1);
                };
                //更新某一列数据的选择
                $scope.updateSelection = function($event, id) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id);
                };
                //全选操作
                $scope.selectAll = function($event) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    for (var i = 0; i < $scope.list.length; i++) {
                        var contact = $scope.list[i];
                        updateSelected(action, contact.id);
                    }
                };
                $scope.isSelected = function(id) {
                    return $scope.sendType.indexOf(id) >= 0;
                };
                $scope.isSelectedAll = function() {
                    return $scope.sendType.length === $scope.list.length;
                };
            }, 1000);
            //checkbox end

            //保存消息类型发送形式
            $scope.messageFlag = function(choose, id, sendChnl) {
                console.log(id);
                choose = choose === '1' ? 0 : 1;
                var params = {
                    choose: choose,
                    id: id,
                    sendChnl: sendChnl
                };
                messageService.messageFlag(params).then(
                    function(req) {
                        $scope.$toast(req.message);
                    }
                );
            };

            //编辑模板 start
            $scope.editMsgtemplets = function(templateid, sendTypeid, mesgFlagName) {
                if (templateid && sendTypeid > -1) {
                    var params = {
                        id: templateid,
                        sendChnl: sendTypeid
                    };
                    $scope.$dialog.open({
                        template: 'editMsgtemplets',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            $scope.sendTypeid = sendTypeid;
                            messageService.editMsgtemplets(params).then(
                                function(req) {
                                    $scope.m = req.data;
                                }
                            );
                            $scope.checkExit = function(inputValue) {
                                var params = {
                                    code: inputValue
                                };
                                messageService.checkExit(params).then(
                                    function(req) {
                                        $scope.m.flag = req.data;
                                        $scope.m.msg = $scope.m.flag ? '模板编码已存在' : '模板编码可用';
                                    }
                                );
                            };
                            $scope.enter = function(parmas) {

                                if (!parmas.title && parmas.sendChnl !== '1') {
                                    $scope.$toast('请填写模板标题');
                                    return;
                                }
                                if (!parmas.code) {
                                    $scope.$toast('请填写模板编码');
                                    return;
                                } else {
                                    if (parmas.flag === false) {
                                        $scope.$toast('模板编码已存在，请重试');
                                        return;
                                    }
                                }
                                if (!parmas.content) {
                                    $scope.$toast('请填写模板内容');
                                    return;
                                }
                                if (!parmas.content) {
                                    $scope.$toast('请填写模板内容');
                                    return;
                                }
                                for (var i in parmas) {
                                    if (parmas[i] === null) {
                                        delete parmas[i];
                                    }
                                }
                                parmas.mesgFlag = templateid;
                                parmas.mesgFlagName = mesgFlagName;
                                parmas.sendChnl = params.sendChnl;
                                messageService.saveMsgtemplets(parmas).then(
                                    function(req) {
                                        $scope.$toast(req.message);
                                        $scope.closeThisDialog(0);
                                        $scope.getTemplateList();
                                    }
                                );
                            };
                        }]
                    });
                }
            };
        }]);
});