define(function(require) {
    var app = require('app')
    require('ztree')
    require('/app/services/content.service.js'); // 引入模块
    require('/app/services/system.service.js'); // 引入模块
    require('app/components/selectComponent.js')
    require('/app/components/editor.js')
    var itemPageLimit = 15

    app.useModule(['content.service', 'system.service']); // 模块注入
    app.controller('noticeCtrl', ['$scope', '$state', 'contentService', function($scope, $state, contentService) {
            $scope.params = {
                index: 0,
                size: itemPageLimit
            }
            $scope.getNoticesArray = function(params) {
                contentService.getNoticesList(params)
                    .then(function(res) {
                        $scope.noticesList = res.data.content
                        $scope.conf.total = res.data.total
                    }, function(err) {
                        // console.log(err)
                    })
            }

            $scope.deleteNotice = function(id) {
                contentService.deleteNotice(id)
                    .then(function(res) {
                        if (res.code == '000000') {
                            $scope.$root.$toast('删除成功！')
                        } else {
                            $scope.$root.$toast('删除失败！')
                        }
                        $scope.getNoticesArray($scope.params)
                    }, function(err) {
                        $scope.$root.$toast('删除失败！')
                        console.log(err)
                    })
            }
            $scope.searchNotice = function(params) {
                    contentService.searchNotice(params)
                        .then(function(res) {
                            if (res.status == 200) {
                                $scope.noticesList = res.data.content
                                $scope.conf.total = res.data.total
                            } else {
                                $scope.$root.$toast('查询失败！')
                            }
                        }, function(err) {
                            console.log(err)
                            $scope.$root.$toast('查询失败！')
                        })
                }
                // 删除公告 开始
            $scope.delete = function(id) {
                    // console.log(id)
                    $scope.$dialog.open({
                        template: 'delete-notice',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            $scope.enter = function() {
                                contentService.deleteNotice(id)
                                    .then(function(res) {
                                        if (res.status == 200) {
                                            setTimeout(function() {
                                                $scope.getNoticesArray($scope.params)
                                            }, 1000)
                                            $scope.$root.$toast('删除成功！')
                                        } else {
                                            $scope.$root.$toast('删除失败！')
                                        }
                                        $scope.closeThisDialog(0)
                                    }, function(err) {
                                        console.log(err)
                                        $scope.$root.$toast('删除失败！')
                                    })
                            }
                        }]
                    })
                }
                // 删除公告  结束

            // 改变公告状态 开始
            $scope.toggle = function(num, id) {
                    if (!id) {
                        $scope.$toast('获取公告id失败，无法改变状态')
                        return
                    } else {
                        if (num == 1) {
                            contentService.noticeStatusUnEnable({
                                id: id
                            }).then(
                                function(res) {
                                    $scope.$toast(res.message)
                                    $scope.getNoticesArray($scope.params)
                                }
                            )
                        } else if (num == 2) {
                            contentService.noticeStatusEnable({
                                id: id
                            }).then(
                                function(res) {
                                    $scope.$toast(res.message)
                                    $scope.getNoticesArray($scope.params)
                                }
                            )
                        }
                    }
                };
                // 改变公告状态 结束

            // 公告提交审核
            var isLoading = false;
            $scope.startWorkFlow = function(id) {
                if (isLoading) {
                    $scope.$root.$toast('请不要重复提交');
                    return false;
                }
                isLoading = true;
                contentService.noticeStartWorkFlow(id).then(
                    function(res) {
                        isLoading = false;
                        if (res.status == 200) {
                            setTimeout(function() {
                                $scope.getNoticesArray($scope.params);
                            }, 1000);
                            $scope.$root.$toast('提交审核成功！');
                        } else {
                            $scope.$root.$toast('提交审核失败！');
                        }
                    },
                    function(err) {
                        console.log(err);
                        isLoading = false;
                        $scope.$root.$toast('提交审核失败！');
                    }
                );
            };

            // $scope.getNoticesArray($scope.params)
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            };

            $scope.$watch('conf.currentPage + conf.itemPageLimit', function(news) {
                // $scope.params.index = ($scope.conf.currentPage - 1)*$scope.conf.itemPageLimit
                $scope.params.index = $scope.conf.currentPage - 1;
                $scope.getNoticesArray($scope.params);
            });
        }])
        .controller('floorCtrl', ['$scope', '$state', 'contentService', function($scope, $state, contentService) {
            contentService.getAdvertsChannels()
                .then(function(res) {
                    if (res.status == 200) {
                        $scope.channels = res.data;
                    }
                });
            $scope.channelChange = function(channelID) {
                $scope.req.advertSpace = '';
                $scope.req.advertField = '';
                contentService.getAdvertsSpaces(channelID)
                    .then(function(res) {
                        if (res.status == 200) {
                            $scope.spaces = res.data;
                        }
                    });
            };

            $scope.spaceChange = function(channelID, fieldsID) {
                $scope.req.advertField = '';
                contentService.getAdvertsFields(channelID, fieldsID)
                    .then(function(res) {
                        if (res.status == 200) {
                            $scope.fields = res.data;
                        }
                    });
            };
            $scope.floorParams = {
                index: 0,
                size: itemPageLimit
            };
            $scope.getFloorArray = function() {
                contentService.getFloorList($scope.floorParams)
                    .then(function(res) {
                        $scope.list = res.data.content;
                        $scope.conf.total = res.data.total;
                    }, function(err) {
                        console.log(err);
                    });
            };
            $scope.getFloorArray();
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            };
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function(news) {
                // console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            });
        }])
        .controller('addNoticeCtrl', ['$scope', '$state', '$stateParams', '$sce', 'contentService', function($scope, $state, $stateParams, $sce, contentService) {
            var flag = $stateParams.flag;
            var noticeId = $stateParams.id;
                // console.log($stateParams)
                // 公告详情开始
            if (flag > 0 && noticeId !== 0) {
                console.log('公告ID:', noticeId);
                contentService.getNoticeDetail(noticeId)
                    .then(function(res) {
                        if (res.data) {
                            $scope.notice = res.data;
                            $scope.notice.flag = flag;
                            if ($scope.notice.flag == 1) {
                                $scope.infoContent = $sce.trustAsHtml($scope.notice.content);
                            }
                        } else {
                            $scope.$root.$toast('获取公告失败');
                        }
                    }, function(err) {
                        console.log(err);
                    });
            }
            // 公告详情结束

            // 取消
            $scope.goBack = function() {
                $state.go('main.notice');
            };

            // 提交公告 开始
            $scope.sub = function(notice) {
                if (!notice.title) {
                    $scope.$toast('请填写公告标题');
                    return;
                }
                if (notice.title.length < 1 || notice.title.length > 30) {
                    $scope.$toast('请填写公告标题字数在1-30字');
                    return;
                }
                if (!notice.summary) {
                    $scope.$toast('请填写公告标题');
                    return;
                }
                if (notice.summary.length < 1 || notice.summary.length > 100) {
                    $scope.$toast('请填写公告摘要字数在1-100字');
                    return;
                }
                if (!notice.content) {
                    $scope.$toast('请填写公告内容');
                    return;
                }
                if (notice.id) {
                    contentService.subNotice({
                        title: notice.title,
                        content: notice.content,
                        summary: notice.summary,
                        id: notice.id
                    }).then(function(res) {
                        if (res.status == 200) {
                            $scope.$root.$toast('修改成功！');
                            $state.go('main.notice');
                        } else {
                            $scope.$root.$toast('修改失败！');
                        }
                    }, function(err) {
                        $scope.$root.$toast('修改失败！');
                    });
                } else {
                    contentService.addNotice({
                        title: notice.title,
                        summary: notice.summary,
                        content: notice.content
                    }).then(function(res) {
                            if (res.status == 200) {
                                $scope.$root.$toast('新增成功！');
                                setTimeout(function() {
                                    $state.go('main.notice');
                                }, 1000);
                            } else {
                                $scope.$root.$toast('新增失败！');
                            }
                        },
                        function(err) {
                            console.log(err);
                            $scope.$root.$toast('新增失败！');
                        });
                }
            };
        }])
        .controller('advertCtrl', ['$scope', '$state', '$cookie', '$uploadParams', 'contentService', 'systemService', function($scope, $state, $cookie, $uploadParams, contentService, systemService) {
            var operater = $cookie('userInfo')
            $scope.req = {
                organizeIds: operater.organizeIds
            }
            var columnCodeObj = {}
            if ($state.params.flag === '0' || $state.params.flag == '1') {
                $scope.flag = $state.params.flag
            } else {
                console.error('您请求的地址为非法路径，请联系管理员！')
                return
            }
            $scope.new = {}; // 新增广告的对象
            $scope.imgServerUrl = $uploadParams.baseUrl
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            }
            $scope.content = {
                index: 0,
                size: itemPageLimit,
                orgType: $state.params.flag,
                organizeIds: operater.organizeIds
            }
            var searchParams = angular.copy($scope.content)

            $scope.$watch('conf.currentPage + conf.itemPageLimit', function(news) {
                // console.log($scope.conf.currentPage, $scope.conf.itemPageLimit, $scope.conf.total)
                searchParams.index = $scope.conf.currentPage - 1; // 去掉 (* $scope.conf.itemPageLimit) 接口统一用页码。@modifyBy: Yuliang Tao
                $scope.showContent()
            })

            // 加载默认列表
            $scope.showContent = function() {
                // console.log("$scope.content:",$scope.content)
                contentService.getAdverts(searchParams).then(
                    function(res) {
                        $scope.conf.total = parseInt(res.data.total)
                        $scope.items = res.data.content
                    },
                    function(err) {
                        $scope.$root.$toast(err.message)
                    }
                )
            }

            // 搜索
            $scope.search = function() {
                searchParams = angular.copy($scope.content)
                $scope.content = Object.assign(searchParams, $scope.req)
                for (var i in $scope.content) {
                    if ($scope.content[i] === '') {
                        delete $scope.content[i]
                    }
                }
                $scope.conf.currentPage = 1
                $scope.showContent($scope.content)
            }
            contentService.getAdvertsFinalStatus().then(function(res) {
                if (res.status == 200) {
                    $scope.advertsFinalStatus = res.data
                }
            })
            contentService.getAdvertsChannels().then(function(res) {
                if (res.status == 200) {
                    $scope.channels = res.data
                }
            })
            $scope.channelChange = function(channelID) {
                    $scope.spaces = []
                    if (!channelID) {
                        return
                    }
                    contentService.getAdvertsSpaces(channelID, $scope.flag).then(function(res) {
                        if (res.status == 200) {
                            $scope.spaces = res.data
                        }
                    })
                }
                // 新增广告时，改变页面，重置已有的城市/机构选择
            $scope.resetOrganize = function() {
                    if ($scope.new.organizeIds) {
                        delete $scope.new.organizeIds
                    }
                    if ($scope.organizeId) {
                        delete $scope.new.organizeId
                    }
                    if ($scope.new.citySiteId) {
                        delete $scope.new.citySiteId
                    }
                    if ($scope.new.organizeNames) {
                        delete $scope.new.organizeNames
                    }
                }
                // 点击列表中的图片进行放大查看
            $scope.checkPicInDialog = function(src) {
                if (!src) {
                    $scope.checkPicInDialogMsg = '获取图片异常！'
                    return
                }
                $scope.$dialog.open({
                    template: 'img',
                    width: 500,
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                        $scope.src = $scope.imgServerUrl + src
                    }]
                })
            }

            systemService.getSites({
                index: 0,
                size: 1000
            }).then(function(res) {
                $scope.sitesArray = res.data.content
            }, function(err) {
                // console.log( err )
            })

            $scope.add = function() {
                    $scope.$dialog.open({
                        template: 'addAdvert',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            $scope.enter = function(newInfo) {
                                $scope.addResultMsg = ''
                                if (!newInfo.displayPage) {
                                    $scope.addResultMsg = '请先选择展示端及页面！'
                                    return
                                }
                                if ($scope.flag === '1' && newInfo.displayPage == '21') {
                                    if (!newInfo.citySiteId) {
                                        $scope.addResultMsg = '请选择城市！'
                                        return
                                    } else {
                                        for (var i = 0; i < $scope.sitesArray.length; i++) {
                                            if ($scope.sitesArray[i].siteId == newInfo.citySiteId) {
                                                $cookie('citySiteName', $scope.sitesArray[i].siteName)
                                            }
                                        }
                                    }
                                }
                                if ($scope.flag === '1' && newInfo.displayPage == '20') {
                                    if (!newInfo.organizeIds) {
                                        $scope.addResultMsg = '请选择机构！'
                                        return
                                    }
                                    if (!newInfo.organizeIds.includes(',')) {
                                        $scope.addResultMsg = '请选择2级机构！'
                                        return
                                    }
                                }
                                $cookie('newInfo', newInfo)
                                $scope.closeThisDialog(0)
                                $state.go('main.addBanner', newInfo)
                            }
                        }]
                    })
                }
                // 广告编辑或详情
            $scope.showAdvertDetail = function(newInfo, editAbled) {
                    newInfo.editAbled = editAbled
                    if (newInfo.organizeId) {
                        $cookie('newInfo', newInfo)
                    } else {
                        $cookie('newInfo', null)
                    }
                    $state.go('main.addBanner', newInfo)
                }
                // 删除广告
            $scope.delete = function(id) {
                    // console.log(id)
                    $scope.$dialog.open({
                        template: 'delete',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            $scope.enter = function() {
                                contentService.deleteAdvert(id)
                                    .then(function(res) {
                                        setTimeout(function() {
                                            $scope.showContent()
                                        }, 1000)
                                        $scope.$toast(res.message)
                                        $scope.closeThisDialog(0)
                                    }, function(err) {
                                        setTimeout(function() {
                                            $scope.showContent()
                                        }, 1000)
                                        $scope.$toast(err.message)
                                    })
                            }
                        }]
                    })
                }
                // 广告失效/生效
            $scope.toggle = function(item, status) {
                    item.status = status
                    contentService.toggleAdverts(item)
                        .then(function(res) {
                            if (res.status == '200') {
                                setTimeout(function() {
                                    $scope.showContent()
                                }, 1000)
                                $scope.$root.$toast(res.message)
                            } else {
                                $scope.$root.$toast(res.message)
                            }
                        }, function(err) {
                            $scope.$root.$toast(err.message)
                        })
                }
                // 提交审核
            var isLoading = false
            $scope.startWorkFlow = function(id) {
                if (isLoading) {
                    $scope.$root.$toast('请不要重复提交')
                    return false
                }
                isLoading = true
                contentService.startWorkFlow(id)
                    .then(function(res) {
                        isLoading = false
                        if (res.status == 200) {
                            setTimeout(function() {
                                $scope.showContent()
                            }, 1000)
                            $scope.$root.$toast('提交审核成功！')
                        } else {
                            $scope.$root.$toast('提交审核失败！')
                        }
                    }, function(err) {
                        console.log(err)
                        isLoading = false
                        $scope.$root.$toast('提交审核失败！')
                    })
            }
        }])
        .controller('categoryCtrl', ['$scope', '$state', function($scope, $state) {
            // console.log($state.$current.self.name)
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            }
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function(news) {
                // console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            })
        }])
        .controller('addCategoryCtrl', ['$scope', '$state', 'imageUploadService', function($scope, $state, imageUploadService) {
            console.log($state.$current.self.name)
            $scope.imageUpload = imageUploadService
            var zTreeObj
                // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
            var setting = {
                    callback: {
                        onClick: function(event, treeId, treeNode) {
                            console.log(treeNode.id + ', ' + treeNode.name)
                        }
                    }
                }
                // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
            var zNodes = [{
                name: 'test1',
                open: true,
                children: [{
                    name: 'test1_1',
                    id: '0101'
                }, {
                    name: 'test1_2',
                    id: '0102'
                }]
            }, {
                name: 'test2',
                open: true,
                children: [{
                    name: 'test2_1',
                    id: '0201'
                }, {
                    name: 'test2_2',
                    id: '0202'
                }]
            }]

            $(document).ready(function() {
                zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes)
            })
        }])
        .controller('imagesCtrl', ['$scope', '$state', function($scope, $state) {
            // console.log( $state.$current.self.name )
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            }
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function(news) {
                console.log($scope.conf.currentPage, $scope.conf.itemPageLimit)
            })
        }])
        .controller('addAdvertCtrl', ['$scope', '$state', '$filter', '$uploadParams', '$cookie', 'contentService', function($scope, $state, $filter, $uploadParams, $cookie, contentService) {
            var columnCodeObj = {}
            $scope.imgServerUrl = $uploadParams.baseUrl
            $scope.params = $state.params
            $scope.goBack = function() {
                // $state.go('main.advert')
                window.history.go(-1)
            }
            $scope.content = {
                index: 0,
                size: itemPageLimit
            }
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            }
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function(news) {
                    // console.log($scope.conf.currentPage, $scope.conf.itemPageLimit, $scope.conf.total)
                    $scope.content.index = ($scope.conf.currentPage - 1) * $scope.conf.itemPageLimit
                    $scope.content.size = $scope.conf.itemPageLimit
                        // $scope.showAdvert()
                })
                // 点击列表中的图片进行放大查看
            $scope.checkPicInDialog = function(src) {
                    if (!src) {
                        $scope.checkPicInDialogMsg = '获取图片异常！'
                        return
                    }
                    $scope.$dialog.open({
                        template: 'img',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            $scope.src = $scope.imgServerUrl + src
                        }]
                    })
                }
                // 展示栏位对应的广告
            $scope.showAdvert = function(columnCode, limitType) {
                if (undefined === limitType) {
                    $cookie('limitType', 99)
                } else {
                    $cookie('limitType', limitType)
                }
                $scope.params.columnCode = columnCode
                if (!$scope.advertListInPagesList) {
                    $scope.advertListInPagesList = []
                }
                if (!columnCode) {
                    console.error('显示栏位广告列表时参数异常')
                    return
                } else {
                    $scope.new = {
                        columnCode: columnCode
                    }
                    if ($state.params.displayPage == '20') {
                        $scope.new.organizeId = $cookie('newInfo').organizeId
                        $scope.new.organizeIds = $cookie('newInfo').organizeIds
                    }
                    columnCodeObj = columnCode
                    contentService.getAdvertListInPages($scope.new).then(function(res) {
                        if (res.status == '200') {
                            $scope.advertListInPagesList = res.data
                                // console.log($scope.advertListInPagesList)
                            contentService.getFindAdvertColumnInfo({
                                columnCode: columnCode
                            }).then(function(res) {
                                if (res.status == '200') {
                                    $scope.findAdvertColumnInfo = res.data
                                }
                            }, function(err) {
                                console.log('err:', err)
                            })
                        }
                    }, function(err) {
                        console.log('err:', err)
                    })
                }
            }
            if ($state.params.columnCode) {
                // console.log($state.params)
                $scope.showAdvert($state.params.columnCode)
            }
            if ($state.params.id) {
                $scope.currentID = $state.params.id
            }
            // 生失效
            $scope.changeAdvertStatus = function(id, status) {
                    contentService.changeAdvertStatus({
                        id: id,
                        status: status
                    }).then(function(res) {
                        if (res.status == '200') {
                            console.log('res:', res)
                            setTimeout(function() {
                                $scope.showAdvert($state.params.columnCode)
                            }, 1000)
                            $scope.$root.$toast(res.message)
                        }
                        console.log(res)
                    }, function(err) {
                        $scope.$root.$toast(err.message)
                    })
                }
                // 提交审核
            var isLoading = false
            $scope.startWorkFlow = function(id) {
                    if (isLoading) {
                        $scope.$root.$toast('请不要重复提交')
                        return false
                    }
                    isLoading = true
                    contentService.startWorkFlow(id).then(
                        function(res) {
                            isLoading = false
                            if (res.status == 200) {
                                setTimeout(function() {
                                    $scope.showAdvert($state.params.columnCode)
                                }, 1000)
                                $scope.$root.$toast('提交审核成功！')
                            } else {
                                $scope.$root.$toast('提交审核失败！')
                            }
                        },
                        function(err) {
                            console.log(err)
                            isLoading = false
                            $scope.$root.$toast('提交审核失败！')
                        })
                }
                // 广告列表中排序
            $scope.sortAdvert = function(id, num) {
                    if (num) {
                        if (!isNaN(num)) {
                            num = parseInt(num)

                            contentService.sortAdvert({
                                id: id,
                                ordinal: num
                            }).then(function(res) {
                                setTimeout(function() {
                                    $scope.showAdvert(columnCodeObj)
                                }, 1000)
                                $scope.$root.$toast(res.message)
                            }, function(err) {
                                if (err.message) {
                                    $scope.$root.$toast(err.message)
                                } else {
                                    $scope.$root.$toast('排序发生错误')
                                }
                            })
                        } else {
                            $scope.$root.$toast('排序值必须是数字！')
                        }
                    }
                }
                // 删除广告
            $scope.deleteAdvert = function(adID) {
                $scope.$dialog.$confirm({
                    message: '确定要删除此广告吗？'
                }).then(
                    function() {
                        contentService.deleteAdvert(adID).then(function(res) {
                            setTimeout(function() {
                                $scope.showAdvert(columnCodeObj)
                            }, 1000)
                            $scope.$toast(res.message)
                        }, function(err) {
                            if (err.message) {
                                $scope.$toast(err.message)
                            } else {
                                $scope.$toast('删除广告时发生网络错误!')
                            }
                        })
                    },
                    function() {}
                )
            }

            function IsURL(str_url) {
                var strRegex = '^((https|http|ftp|rtsp|mms)?://)' + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + '(([0-9]{1,3}.){3}[0-9]{1,3}' + '|' + "([0-9a-z_!~*'()-]+.)*" + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + '[a-z]{2,6})' + '(:[0-9]{1,4})?' + '((/?)|' + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
                var re = new RegExp(strRegex)
                    // re.test()
                if (re.test(str_url)) {
                    return (true)
                } else {
                    return (false)
                }
            }

            $scope.addAdvertInfo = function(obj, readonly) {
                console.log('limitType:',$cookie('limitType'));
                $scope.limitType = $cookie('limitType') < 10 ? $cookie('limitType') : 0
                $scope.advertModeArray = [{
                    name: '商品',
                    id: '1'
                }, {
                    name: '店铺',
                    id: '2'
                }, {
                    name: '类目',
                    id: '3'
                }, {
                    name: 'URL',
                    id: '4'
                }, {
                    name: '快捷入口',
                    id: '5'
                }]
                if ($scope.limitType) {
                    var temp = []
                    angular.forEach($scope.advertModeArray, function(data, index) {
                        if (data.id == $scope.limitType) {
                            temp.push(data)
                        }
                    })
                    $scope.advertModeArray = temp
                }
                $scope.readonly = readonly == 'readonly' ? true : false
                $scope.$dialog.open({
                    template: 'add-advert',
                    width: 700,
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                        $scope.advertProductId = {
                            sid: '',
                            sids: [],
                            type: 'product' // shop--选择店铺，product--选择商品
                        }
                        $scope.advertShopId = {
                            sid: '',
                            sids: [],
                            type: 'shop' // shop--选择店铺，product--选择商品
                        }
                        if (obj) {
                            $scope.new = angular.copy(obj)
                            $scope.new.advertStartDate = $filter('date')(obj.advertStartDate, 'yyyy-MM-dd HH:mm:ss')
                            $scope.new.advertEndDate = $filter('date')(obj.advertEndDate, 'yyyy-MM-dd HH:mm:ss')
                            if (obj.advertProductId) {
                                $scope.advertProductId.sid = obj.advertProductId
                            }
                            if (obj.advertShopId) {
                                $scope.advertShopId.sid = obj.advertShopId
                            }
                        }
                        var target = true
                        $scope.enter = function(auditStatus) {
                            if (target) {
                                target = false
                                if (auditStatus) {
                                    $scope.new.auditStatus = auditStatus
                                }
                                if (!obj) {
                                    $scope.new.id = ''
                                }
                                $scope.errMsg = ''
                                if (!$scope.new.advertTitle) {
                                    $scope.errMsg = '广告标题不能为空！'
                                    return
                                }
                                if (!$scope.new.advertMode) {
                                    $scope.errMsg = '广告跳转类型不能为空！'
                                    return
                                } else {
                                    if ($scope.advertProductId.sid && $scope.new.advertMode == '1') {
                                        $scope.new.advertProductId = $scope.advertProductId.sid
                                    }
                                    if ($scope.advertShopId.sid && $scope.new.advertMode == '2') {
                                        $scope.new.advertShopId = $scope.advertShopId.sid
                                    }
                                }
                                if ($scope.new.advertMode == 1 && !$scope.new.advertProductId) {
                                    $scope.errMsg = '请选择对应商品！'
                                    return
                                }
                                if ($scope.new.advertMode == 2 && !$scope.new.advertShopId) {
                                    $scope.errMsg = '请选择对应店铺！'
                                    return
                                }
                                if ($scope.new.advertMode == 3 && !$scope.new.advertCategoryId) {
                                    $scope.errMsg = '请选择对应类目！'
                                    return
                                }
                                if ($scope.new.advertMode == 4) {
                                    if (!$scope.new.advertForwardUrl) {
                                        $scope.errMsg = '请填写URL地址！'
                                        return
                                    } else {
                                        if (!IsURL($scope.new.advertForwardUrl)) {
                                            $scope.errMsg = '请填写正确的URL地址'
                                            return
                                        }
                                    }
                                }
                                if ($scope.new.advertMode == 5) {
                                    if (!$scope.new.advertShortcutId) {
                                        $scope.errMsg = '请填写快捷入口！'
                                        return
                                    } else {
                                        if (isNaN($scope.new.advertShortcutId)) {
                                            $scope.errMsg = '快捷入口ID为数字！'
                                            return
                                        }
                                    }
                                }
                                if ($scope.new.advertMode == 6 && !$scope.new.advertShortcutId) {
                                    $scope.errMsg = '请选择活动！'
                                    return
                                }
                                if (!$scope.new.advertIcon) {
                                    $scope.errMsg = '请上传广告图片！'
                                    return
                                }
                                if (!$scope.new.advertStartDate || !$scope.new.advertEndDate) {
                                    $scope.errMsg = '请选择完整的有效时间！'
                                    return
                                }
                                $scope.new = Object.assign($cookie('newInfo'), $scope.new)
                                if ($scope.new.createDatetime) {
                                    delete $scope.new.createDatetime
                                }
                                if ($scope.new.updateDatetime) {
                                    delete $scope.new.updateDatetime
                                }
                                if ($scope.new.finalStatus) {
                                    delete $scope.new.finalStatus
                                }
                                if ($scope.new.updator) {
                                    delete $scope.new.updator
                                }
                                for (var i in $scope.new) {
                                    if ($scope.new[i] === '' || $scope.new[i] === null) {
                                        delete $scope.new[i]
                                    }
                                }
                                if ($state.params.citySiteId && $cookie('citySiteName')) {
                                    $scope.new.citySiteName = $cookie('citySiteName')
                                    $cookie('citySiteName', null)
                                }
                                contentService.saveAdvert($scope.new).then(
                                    function(res) {
                                        setTimeout(function() {
                                            $scope.closeThisDialog(0)
                                            $scope.showAdvert(columnCodeObj,$scope.limitType);
                                        }, 1000)
                                        $scope.$root.$toast(res.message)
                                        target = true
                                    },
                                    function(err) {
                                        if (err.message) {
                                            $scope.$root.$toast(err.message)
                                        } else {
                                            $scope.$root.$toast('新增广告时发生网络错误!')
                                        }
                                        $scope.closeThisDialog(0)
                                        target = true
                                    }
                                )
                            }
                        }
                    }]
                })
            }
        }])
        .controller('addNewsCtrl', ['$scope', '$state', '$filter', '$uploadParams', '$cookie', '$sce', 'contentService', function($scope, $state, $filter, $uploadParams, $cookie, $sce, contentService) {
            var tip = ''
            contentService.getNewsAllPages().then(
                    function(res) {
                        $scope.newsAllPages = res.data
                    },
                    function(err) {
                        // console.log(err)
                    }
                )
                // 取消
            $scope.goBack = function() {
                    $state.go('main.news')
                }
                // 资讯详情
            if ($state.params.id) {
                tip = '修改'
                contentService.getNewsDetail($state.params.id).then(
                    function(res) {
                        if (res.data) {
                            $scope.item = res.data
                            $scope.item.flag = $state.params.flag
                            if ($scope.item.flag == 1) {
                                $scope.infoContent = $sce.trustAsHtml($scope.item.infoContent)
                            }
                        } else {
                            $scope.$root.$toast('获取公告失败')
                        }
                    },
                    function(err) {
                        console.log(err)
                    }
                )
            } else {
                tip = '新增'
            }
            $scope.sub = function(item, auditStatus) {
                var submitObj = {}
                $scope.msg = ''
                if (auditStatus) {
                    submitObj.auditStatus = auditStatus
                }

                if (item.id) {
                    submitObj.id = item.id
                }

                if (!item.infoTitle) {
                    $scope.msg = '资讯标题不能为空'
                    return
                } else {
                    submitObj.infoTitle = item.infoTitle
                }

                if (!item.infoPage) {
                    $scope.msg = '请选择资讯页面'
                    return
                } else {
                    submitObj.infoPage = item.infoPage
                }

                if (!item.imgUrl) {
                    $scope.msg = '请上传广告图'
                    return
                } else {
                    submitObj.imgUrl = item.imgUrl
                }

                if (!item.infoContent) {
                    $scope.msg = '请填写资讯内容'
                } else {
                    submitObj.infoContent = item.infoContent
                }
                contentService.subNews(submitObj).then(
                    function(res) {
                        if (res.status == 200) {
                            $state.go('main.news')
                            $scope.$root.$toast(tip + '成功！')
                        } else {
                            $scope.$root.$toast(tip + '失败！')
                        }
                    },
                    function(err) {
                        // console.log(err)
                        $scope.$root.$toast(tip + '失败！')
                    })
            }
        }])
        .controller('newsCtrl', ['$scope', '$state', 'contentService', function($scope, $state, contentService) {
            $scope.params = {
                index: 0,
                size: itemPageLimit
            }
            contentService.getNewsAllPages().then(
                function(res) {
                    $scope.newsAllPages = res.data
                    $scope.newsAllPagesObj = {}
                    for (var i in $scope.newsAllPages) {
                        $scope.newsAllPagesObj[$scope.newsAllPages[i].code] = $scope.newsAllPages[i].name
                    }
                },
                function(err) {
                    // console.log(err)
                }
            )
            contentService.getNewsFinalStatus().then(
                    function(res) {
                        $scope.newsFinalStatus = res.data
                        $scope.newsFinalStatusObj = {}
                        for (var i in $scope.newsFinalStatus) {
                            $scope.newsFinalStatusObj[$scope.newsFinalStatus[i].code] = $scope.newsFinalStatus[i].name
                        }
                    },
                    function(err) {
                        // console.log(err)
                    }
                )
                // 改变资讯状态
            $scope.toggleStatus = function(id, statusNum) {
                    var url = statusNum == '5' ? 'statusUnEnable' : 'statusEnable'
                    contentService.toggleStatus(id, url).then(
                        function(res) {
                            $scope.$root.$toast(res.message)
                            $scope.getNoticesArray($scope.params)
                        },
                        function(err) {
                            $scope.$root.$toast(err.message)
                        }
                    )
                }
                // 搜索资讯
            $scope.getNoticesArray = function(params) {
                    contentService.getNewsList(params).then(
                        function(res) {
                            $scope.newsList = res.data.content
                            $scope.conf.total = res.data.total
                        },
                        function(err) {
                            $scope.$root.$toast(err.message)
                        }
                    )
                }
                // 列表页面提交审核
            var isLoading = false
            $scope.startWorkFlow = function(id) {
                    if (!id) {
                        console.error('提交审核时获取资讯ID失败')
                        return
                    }
                    if (isLoading) {
                        $scope.$root.$toast('请不要重复提交')
                        return false
                    }
                    isLoading = true
                    contentService.newsStartWorkFlow(id).then(
                        function(res) {
                            isLoading = false
                            $scope.$root.$toast(res.message)
                            $scope.getNoticesArray($scope.params)
                        },
                        function(err) {
                            isLoading = false
                            $scope.$root.$toast(err.message)
                        }
                    )
                }
                // 删除资讯
            $scope.delete = function(id) {
                    // console.log(id)
                    $scope.$dialog.open({
                        template: 'delete-news',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            $scope.enter = function() {
                                if (!id) {
                                    console.error('获取删除的资讯ID失败')
                                    return
                                }
                                contentService.deleteNews(id).then(
                                    function(res) {
                                        $scope.closeThisDialog(0)
                                        $scope.getNoticesArray($scope.params)
                                        $scope.$toast(res.message)
                                    },
                                    function(err) {
                                        $scope.closeThisDialog(0)
                                        $scope.$toast(err.message)
                                    }
                                )
                            }
                        }]
                    })
                }
                // 删除资讯  结束

            // $scope.getNoticesArray($scope.params)
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            }

            $scope.$watch('conf.currentPage + conf.itemPageLimit', function() {
                $scope.params.index = $scope.conf.currentPage - 1
                $scope.getNoticesArray($scope.params)
            })
        }])
        .controller('keywordsCtrl', ['$scope', '$state', 'contentService', function($scope, $state, contentService) {
            $scope.conf = {
                total: 1,
                currentPage: 1,
                itemPageLimit: itemPageLimit,
                isLinkPage: true
            }
            $scope.userParams = {
                index: 0,
                size: itemPageLimit
            }
            var searchParams = angular.copy($scope.userParams)
            $scope.$watch('conf.currentPage + conf.itemPageLimit', function() {
                searchParams.index = $scope.conf.currentPage - 1
                $scope.getList()
            })
            $scope.searchList = function() {
                searchParams = angular.copy($scope.userParams)
                $scope.getList()
            }
            $scope.getList = function() {
                for (var a in searchParams) {
                    if (searchParams[a] === '') {
                        delete searchParams[a]
                    }
                }
                contentService.getKeyWordsList(searchParams).then(
                    function(res) {
                        $scope.conf.total = res ? res.data.total : 0
                        $scope.list = res.data.content
                    },
                    function(err) {}
                )
            }
            $scope.changeStatus = function(id, status) {
                if (!id || status === '') {
                    $scope.$toast('获取id或者改变后的状态出异常！')
                    return
                }
                $scope.$dialog.$confirm({
                    message: '确定改变此关键词的状态吗'
                }).then(
                    function() {
                        contentService.editKeyWords(id, {
                            id: id,
                            keywordStatus: status
                        }).then(function(res) {
                            $scope.getList()
                            $scope.$toast('更改状态成功')
                        }, function(err) {
                            $scope.$toast(err.message)
                        })
                    },
                    function() {}
                )
            }
            $scope.sort = function(l) {
                if (isNaN(l.ordinal)) {
                    $scope.$toast('序号必须为数字否则不能排序')
                    return
                }
                $scope.$dialog.$confirm({
                        message: '确定改变此关键词的排序吗'
                    })
                    .then(
                        function() {
                            contentService.editKeyWords(l.id, {
                                ordinal: l.ordinal,
                                id: l.id
                            }).then(function(res) {
                                $scope.getList()
                                $scope.$toast('关键词排序成功')
                            }, function(err) {
                                $scope.$toast('排序发生错误！')
                            })
                        },
                        function() {}
                    )
            }

            $scope.deleteKeyWord = function(id) {
                if (!id) {
                    $scope.$toast('获取关键词ID失败，无法删除。')
                    return
                }
                $scope.$dialog.$confirm({
                        message: '确定要删除该关键词吗？'
                    })
                    .then(
                        function() {
                            contentService.deleteKeyWords(id).then(function(res) {
                                $scope.getList()
                                $scope.$toast('删除关键词成功')
                            }, function(err) {
                                $scope.$toast(err.message)
                            })
                        },
                        function() {}
                    )
            }

            $scope.edit = function(flag, l) {
                if (flag === 0 || flag == 1) {
                    $scope.$dialog.open({
                        template: 'edit',
                        width: 500,
                        scope: $scope,
                        controller: ['$scope', function($scope) {
                            if (flag === 0) {
                                $scope.flag = '新建'
                            } else if (flag == 1) {
                                $scope.flag = '编辑'
                                $scope.new = angular.copy(l)
                            }
                            $scope.enter = function(editObj) {
                                $scope.errMsg = ''
                                if (!editObj.content || editObj.content.length > 15) {
                                    $scope.errMsg = '关键词必须在1-15个字符之间'
                                    return
                                }
                                if (!editObj.keywordType || editObj.keywordType === '') {
                                    $scope.errMsg = '请选择关键词类型'
                                    return
                                }
                                if (editObj.remark && editObj.remark.length > 30) {
                                    $scope.errMsg = '关键词备注字数在1-30字之间'
                                    return
                                }
                                if (isNaN(editObj.ordinal)) {
                                    $scope.errMsg = '关键词备排序值必须是数字'
                                    return
                                }
                                if (editObj.createTime) {
                                    delete editObj.createTime
                                }
                                if (editObj.id) {
                                    var id = editObj.id
                                    contentService.editKeyWords(id, editObj).then(function(res) {
                                        $scope.closeThisDialog(0)
                                        $scope.getList()
                                        $scope.$toast($scope.flag + '关键词成功')
                                    }, function(err) {
                                        $scope.closeThisDialog(0)
                                        $scope.$toast('操作失败')
                                    })
                                } else {
                                    contentService.addKeyWords(editObj).then(function(res) {
                                        $scope.getList()
                                        $scope.$toast($scope.flag + '关键词成功')
                                        $scope.closeThisDialog(0)
                                    }, function(err) {
                                        $scope.$toast('操作失败')
                                        $scope.closeThisDialog(0)
                                    })
                                }
                            }
                        }]
                    })
                }
            }
        }])
})