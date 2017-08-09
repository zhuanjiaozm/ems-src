define(function (require) {
    var app = require('app');
    require('ztree');
    require('/app/services/goods.service.js');
    require('/app/services/examine.service.js');
    require('/app/components/ngLayDate.js');

    var productStatus = [
        {value: 0, name: '全部'},
        {value: 1, name: '上架'},
        {value: 2, name: '下架'}
    ];
    var illegalType = [
        {value: 1, name: '广告信息'},
        {value: 2, name: '违法信息'},
        {value: 3, name: '描述不符'}
    ];

    app.useModule(['goods.service', 'examine.service']);

    app.controller('goodsListCtrl', ['$scope', '$state', 'goodsService', '$uploadParams', function ($scope, $state, goodsService, $uploadParams) {
        $scope.imgUrl = $uploadParams.baseUrl;
        $scope.productType = $state.params.type;
        $scope.conf = {
            total: 10,
            currentPage: 1,
            itemPageLimit: 10,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.$watch('conf.currentPage + conf.itemPageLimit', function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getProducts();
        });
        $scope.productParams = {
            index: 0,
            size: 10,
            title: '',
            id: '',
            shopName: '',
            createTime: '',
            endTime: '',
            auditStatus:3
        };
        var searchParams = angular.copy($scope.productParams);
        $scope.illegalType = illegalType;
        $scope.getProducts = function () {
            goodsService.getProducts(searchParams,$state.params.type).then(function (res) {
                $scope.conf.total = res.data.total;
                $scope.products = res.data.content;
            })
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.productParams);
            $scope.getProducts();
        };
        $scope.addLllegal = function (productId, shopId) {
            $scope.$dialog.open({
                template: 'addLllegal',
                width: 500,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.lllegalParams = {
                        illegalType: '',
                        illegalReason: '',
                        productId: productId,
                        shopId: shopId
                    };
                    $scope.enter = function () {
                        if ($scope.checkedLllegal && $scope.lllegalParams.illegalReason != '') {
                            $scope.lllegalParams.illegalType = $scope.checkedLllegal.value;
                            goodsService.addLllega($scope.lllegalParams).then(function () {
                                $scope.$root.$toast('操作成功!');
                                $scope.closeThisDialog(0);
                                $scope.getProducts();
                            }, function () {
                                $scope.$root.$toast('操作失败!');
                            });
                        } else {
                            $scope.$root.$toast('*为必填字段，请检查！');
                        }
                    };
                }]
            });
        };

        $scope.idsArr = [];
        $scope.ids = [];
        $scope.operate = function (id, type, operate) {
            $scope.batchParams = operate == 'batch' ? {
                isSearch: type
            } : {
                productStatus: type
            };
            if (id || $scope.idsArr.length > 0) {
                $scope.ids.push(id);
                if (!id && $scope.idsArr.length > 0) {
                    $scope.ids = $scope.idsArr;
                }
                goodsService.operateLllega($scope.ids, $scope.batchParams,$scope.productType).then(function () {
                    $scope.$toast('操作成功!');
                    $scope.getProducts();
                }, function () {
                    $scope.$toast('操作失败!');
                })
            } else {
                $scope.$toast('请先选择一个商品!');
            }
        };
        $scope.check = function (item) {//选择商品
            item.checked = !item.checked;
            if ($scope.idsArr.indexOf(item.id) === -1) {
                $scope.idsArr.push(item.id);
            } else {
                $scope.idsArr.splice($scope.idsArr.indexOf(item.id), 1);
            }
            $scope.checkAlls = ($scope.products.length === $scope.idsArr.length);
        };

        $scope.checkAll = function () {//商品全选
            $scope.checkAlls = !$scope.checkAlls;
            if ($scope.checkAlls) {
                $scope.products.forEach(function (item) {
                    item.selected = true;
                    if ($scope.idsArr.indexOf(item.id) === -1) {
                        $scope.idsArr.push(item.id);
                    }
                });
            } else {
                $scope.products.forEach(function (item) {
                    item.selected = false;
                });
                $scope.idsArr = [];
            }
        };

        $scope.proStatus = function (num) {
            switch (num) {
                case '1':
                    return '未提交审核';
                    break;
                case '2':
                    return '审核中';
                    break;
                case '3':
                    return '审核成功';
                    break;
                case '4':
                    return '审核失败';
                    break;
                default:
                    return '状态出错';
            }
        }
    }]).controller('lllegalCtrl', ['$scope', '$state', 'goodsService', function ($scope, $state, goodsService) {
        $scope.allList = {};
        $scope.categoryId = {
            l1: '',
            l2: '',
            l3: '',
            l4: ''
        };

        $scope.params = {
            index: 0,
            size: 10
        };
        $scope.conf = {
            total: 10,
            currentPage: 1,
            itemPageLimit: 10,
            isLinkPage: true
        };
        $scope.productType = $state.params.type;
        var searchParams = angular.copy($scope.params);
        $scope.$watch('conf.currentPage + conf.itemPageLimit', function () {
            searchParams.index = $scope.conf.currentPage - 1;
            $scope.getList(searchParams);
        });
        $scope.saerch = function () {
            if ($scope.params.productId && (!/^[0-9]*$/.test($scope.params.productId))) {
                $scope.$toast("商品编号必须为数字!");
                return;
            }
            searchParams = angular.copy($scope.params);
            $scope.getList(searchParams);
        };


        $scope.getSons = function (level, parentId) {
            levelStr = "catsList" + level;
            $scope.params.categoryIds = [];
            goodsService.catsList(parentId).then(
                function (res) {
                    $scope[levelStr] = res.data;
                },
                function (err) {
                    $scope.$toast("获取分类失败!");
                }
            );
            for (var i = level; i < 5; i++) {
                var temp = "l" + i;
                $scope.categoryId[temp] = '';
            }

            for (var l in $scope.categoryId) {
                if ($scope.categoryId[l] !== '' && $scope.categoryId[l] !== null) {
                    $scope.params.categoryIds.push($scope.categoryId[l]);
                }
            }
        };
        $scope.getSons(1, '');
        //获取违规商品列表

        $scope.getList = function (params) {
            params = Object.assign($scope.params, params);
            if(params.categoryIds&&params.categoryIds.length===0){
                delete params.categoryIds;
            }
            for (var i in params) {
                if (params[i] === '') {
                    delete params[i];
                }
            }
            goodsService.getIllegalProduct(params).then(
                function (res) {
                    $scope.list = res.data.content;
                    $scope.conf.total = res.data.total;
                    for (var a in $scope.list) {
                        var id = $scope.list[a].id;
                        var productId = $scope.list[a].productId;
                        $scope.allList[id] = productId;
                    }
                },
                function (err) {
                    console.error('获取违规商品列表异常');
                    $scope.list = [];
                    return;
                }
            );
        };
        //恢复商品
        $scope.illegalproduct = function (flag, params) {
            var submitArray = [];
            if (!flag) {
                $scope.$toast("恢复获取方法失败!");
                return;
            }
            if (flag == 1) {
                if (params) {
                    submitArray.push({
                        id: params.id,
                        productId: params.productId
                    });
                } else {
                    $scope.$toast("需要恢复的商品的ID查询失败!");
                    return;
                }
            }
            if (flag == 2) {
                if (params.length > 0) {
                    for (var i in params) {
                        submitArray.push({
                            id: params[i],
                            productId: $scope.allList[params[i]]
                        });
                    }
                }
                else {
                    $scope.$toast("请至少选择一条需要恢复的数据！");
                    return;
                }
            }

            $scope.$dialog.open({
                template: 'app/view/template/dialogMsg.html',
                width: 500,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.dialogMsg = '确定要恢复已选的商品吗?';
                    $scope.enter = function () {
                        goodsService.batchProduct({
                            illegalList: submitArray
                        }).then(
                            function (res) {
                                $scope.closeThisDialog(0);
                                $scope.getList($scope.params);
                                $scope.$toast(res.message);
                                delete submitArray;
                            },
                            function (err) {
                                $scope.closeThisDialog(0);
                                $scope.$toast("恢复该商品失败！");
                                delete submitArray;
                            }
                        );
                    };
                }]
            });

        };
        //checkbox start
        setTimeout(function () {
            //创建变量用来保存选中结果
            $scope.selected = [];
            var updateSelected = function (action, id) {
                if (action == 'add' && $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
                if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
            };
            //更新某一列数据的选择
            $scope.updateSelection = function ($event, id) {
                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                updateSelected(action, id);
            };
            //全选操作
            $scope.selectAll = function ($event) {
                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                for (var i = 0; i < $scope.list.length; i++) {
                    var contact = $scope.list[i];
                    updateSelected(action, contact.id);
                }
            };
            $scope.isSelected = function (id) {
                return $scope.selected.indexOf(id) >= 0;
            };
            $scope.isSelectedAll = function () {
                return $scope.selected.length === $scope.list.length;
            };
        }, 1000);
        //checkbox end

    }]).controller('classifyCtrl', ['$scope', '$state', 'goodsService', 'apiUri', function ($scope, $state, goodsService, apiUri) {
        $scope.parentId = '';
        $scope.parentName = '根目录';
        var level;
        //获取列表信息
        $scope.getCats = function (parentId) {
            goodsService.catsList(parentId).then(function (res) {
                $scope.classifyList = res.data;
            }, function (err) {

            });
        };
        $scope.getCats();

        var setting = {
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parentId",
                    rootPId: null
                }
            },
            async: {
                enable: true,
                url: apiUri + 'cats/children?r=' + (new Date().getTime()),
                contentType: "application/json",
                autoParam: ["id=parentId"],
                type: 'get',
                // otherParam:{"otherParam":"zTreeAsyncTest"},
                dataFilter: filter
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    $scope.parentName = treeNode.name;
                    $scope.parentId = treeNode.id;
                    level = treeNode.path.split(':').length;
                    $scope.getCats(treeNode.id);
                }
            }
        };

        function filter(treeId, parentNode, childNodes) {
            var data = childNodes.data;
            if (!data) return null;
            for (var i = 0, l = data.length; i < l; i++) {
                data[i].name = data[i].name.replace(/\.n/g, '.');
            }
            return data;
        }

        $(document).ready(function () {
            $.fn.zTree.init($("#treeDemo"), setting);
        });

        //编辑分类
        $scope.editCats = function (item, type) {
            type == 'edit' ? $scope.dailogTitle = '编辑分类' : $scope.dailogTitle = '添加分类';
            goodsService.detailCats(item.id).then(function (res) {
                $scope.$dialog.open({
                    template: 'addClassify',
                    width: 500,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.classifyParams = {
                            name: res.data.name,
                            parentId: res.data.parentId,
                            ordinal: res.data.ordinal,
                            description: res.data.description
                        };
                        $scope.enter = function () {
                            if ($scope.classifyParams.name !== '' && $scope.classifyParams.ordinal !== '' && $scope.classifyParams.description !== '') {
                                goodsService.editCats(item.id, $scope.classifyParams).then(function (res) {
                                    $scope.closeThisDialog(0);
                                    $scope.getCats($scope.parentId);
                                    $.fn.zTree.init($("#treeDemo"), setting);
                                }, function (err) {});
                            } else {
                                $scope.$root.$toast('*为必填字段，不能为空');
                            }
                        };
                    }]
                });
            });
        };
        //删除分类
        $scope.delCats = function (item) {
            $scope.$dialog.$confirm({message: '确定要删除此条分类吗？'}).then(function () {
                goodsService.delCats(item.id).then(function (res) {
                    $scope.getCats($scope.parentId);
                    $scope.$root.$toast('删除成功！');
                    $.fn.zTree.init($("#treeDemo"), setting);
                },function(err){
                    if(err.code==='DELETE_CATEGORY_ERROR'){
                        $scope.$root.$toast('请先删除分类下相关商品或子分类!');
                    }
                });
            }, function () {
                return false;
            });
        };
        //添加分类
        $scope.addClassify = function (type) {
            if ($scope.parentId&&level<4) {
                type == 'add' ? $scope.dailogTitle = '添加分类' : $scope.dailogTitle = '编辑分类';
                $scope.$dialog.open({
                    template: 'addClassify',
                    width: 500,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.classifyParams = {
                            name: '',
                            parentId: $scope.$parent.parentId,
                            ordinal: '',
                            description: ''
                        };
                        $scope.enter = function () {
                            if ($scope.classifyParams.name !== '' &&
                                $scope.classifyParams.ordinal !== '' &&
                                $scope.classifyParams.description !== '' &&
                                $scope.classifyParams.name.length <= 10) {
                                goodsService.addCats($scope.classifyParams).then(function (res) {
                                    $scope.closeThisDialog(0);
                                    $scope.getCats($scope.parentId);
                                    $.fn.zTree.init($("#treeDemo"), setting);
                                });
                            } else {
                                $scope.$root.$toast('*为必填字段，不能为空');
                            }
                        };
                    }]
                });
            } else {
                $scope.$root.$toast('请先选择父级并且最多只能添加4级');
            }
        };
    }]).controller('attributeCtrl', ['$scope', '$state', 'apiUri', 'goodsService', function ($scope, $state, apiUri, goodsService) {
        $scope.parentName = '根目录';
        var setting = {
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parentId",
                    rootPId: null
                }
            },
            async: {
                enable: true,
                url: apiUri + 'cats/children?r=' + (new Date().getTime()),
                contentType: "application/json",
                autoParam: ["id=parentId"],
                type: 'get',
                // otherParam:{"otherParam":"zTreeAsyncTest"},
                dataFilter: filter
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    $scope.parentName = treeNode.name;
                    $scope.parentId = treeNode.id;
                    $scope.getAttribute(treeNode.id, '');
                }
            }
        };

        function filter(treeId, parentNode, childNodes) {
            var data = childNodes.data;
            if (!data) return null;
            for (var i = 0, l = data.length; i < l; i++) {
                data[i].name = data[i].name.replace(/\.n/g, '.');
            }
            return data;
        }

        $(document).ready(function () {
            $.fn.zTree.init($("#treeDemo"), setting);
        });

        $scope.getAttribute = function (catsId, attrId) {
            goodsService.attrList(catsId, attrId).then(function (res) {
                $scope.attrList = res.data;
            });
        };
        $scope.getAttribute(0);
        //添加属性
        $scope.addAttribute = function () {
            $scope.dialogTitle = '新增属性';
            if ($scope.parentId) {
                $scope.$dialog.open({
                    template: 'addAttribute',
                    width: 500,
                    scope: $scope,
                    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                        $scope.addParams = {
                            attributeType: 0,
                            fieldType: '0',
                            name: '',
                            ordinal: '',
                            required: true
                        };
                        $scope.enter = function () {
                            if ($scope.addParams.name !== '' && $scope.addParams.name.length < 11) {
                                goodsService.addAttr($scope.parentId, $scope.addParams).then(function () {
                                    $rootScope.$toast('添加成功！');
                                    $scope.closeThisDialog(0);
                                    $scope.getAttribute($scope.parentId);
                                }, function () {
                                    $rootScope.$toast('添加失败！');
                                });
                            } else {
                                $rootScope.$toast('请检查输入内容是否正确!');
                            }
                        };
                    }]
                });
            } else {
                $scope.$toast('请先选择一个分类！');
            }
        };
        //编辑属性
        $scope.editAttribute = function (item) {
            $scope.dialogTitle = '编辑属性';
            $scope.$dialog.open({
                template: 'addAttribute',
                width: 500,
                scope: $scope,
                controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $scope.addParams = {
                        attributeType: item.attributeType,
                        fieldType: item.fieldType,
                        name: item.name,
                        ordinal: 0,
                        required: item.required
                    };
                    $scope.enter = function () {
                        goodsService.editAttr(item.categoryId, item.id, $scope.addParams).then(function () {
                            $rootScope.$toast('修改成功！');
                            $scope.closeThisDialog(0);
                            $scope.getAttribute($scope.parentId);
                        }, function () {
                            $rootScope.$toast('修改失败！');
                        });
                    };
                }]
            });
        };
        //删除属性
        $scope.deleteAttribute = function (item) {
            $scope.$dialog.$confirm({message: '确定要删除此分类属性吗？'}).then(function () {
                goodsService.delAttr(item.categoryId, item.id).then(function () {
                    $scope.$root.$toast('删除成功！');
                    $scope.getAttribute($scope.parentId);
                }, function () {
                    $scope.$root.$toast('删除失败！');
                });
            }, function () {

            });
        };
        //属性值
        $scope.attrValue = function (categoryId, attrId) {
            $scope.$dialog.open({
                template: 'operateAttribute',
                width: 500,
                scope: $scope,
                controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $scope.attrValue = {
                        name: ''
                    };
                    $scope.getAttrValue = function () {
                        goodsService.getAttrValue(categoryId, attrId).then(function (res) {
                            $scope.attrValueList = res.data;
                        }, function () {
                            $rootScope.$toast('加载出错...');
                        });
                    };
                    $scope.getAttrValue();
                    $scope.addValue = function () {
                        goodsService.addAttrValue(categoryId, attrId, $scope.attrValue).then(function (res) {
                            $rootScope.$toast('添加成功！');
                            $scope.attrValue.name = '';
                            $scope.getAttrValue();
                        }, function () {
                            $rootScope.$toast('加载出错...');
                        });
                    };
                    $scope.delAttrValue = function (valId) {
                        $scope.$dialog.$confirm({message: '确认要删除此条属性值？'}).then(function () {
                            goodsService.delAttrValue(categoryId, attrId, valId).then(function () {
                                $rootScope.$toast('删除成功！');
                                $scope.getAttrValue();
                            }, function () {
                                $rootScope.$toast('加载出错...');
                            });
                        }, function () {

                        });
                    };
                }]
            });
        };
    }]).filter('fieldType', function () {
        return function (type) {
            switch (type) {
                case '0':
                    return '文本';
                    break;
                case '1':
                    return '单选';
                    break;
                case '2':
                    return '多选';
                    break;
            }
        };
    }).controller('tagCtrl', ['$scope', '$state', function ($scope, $state) {
        console.log($state.$current.self.name);
    }]).controller('addTagCtrl', ['$scope', '$state', function ($scope, $state) {
        console.log($state.$current.self.name);
    }]).controller('goodsDetailCtrl', ['$scope', '$state', '$stateParams', 'goodsService', '$uploadParams', '$sce', 'examineService', function ($scope, $state, $stateParams, goodsService, $uploadParams, $sce, examineService) {
        //商品详情
        var id = $stateParams.id,
            taskId = $stateParams.tid;
        $scope.imgUrl = $uploadParams.baseUrl;
        $scope.productType = $state.params.type;
        $scope.isExamine = taskId ? true : false;
        goodsService.productDetail(id).then(function (res) {
            $scope.product = res.data;
        });
        $scope.getProductPic = function () {
            $scope.showMain = 'pic';
            $scope.getPicParams = {
                ctype: 1,
                id: id,
                ptype: 0
            };
            goodsService.productServicePic($scope.getPicParams).then(function (res) {
                $scope.pics = res.data;
            });
        };
        $scope.getProductDesc = function () {
            $scope.showMain = 'detail';
            $scope.getPicParams = {
                ctype: 1,
                id: id,
                terminl: 0
            };
            goodsService.productServiceDesc($scope.getPicParams).then(function (res) {
                $scope.desc = $sce.trustAsHtml(res.data.description);
            });
        };
        $scope.getProductSku = function () {
            $scope.showMain = 'attribute';
            $scope.getPicParams = {
                ctype: 0,
                id: id
            };
            goodsService.productServiceSku($scope.getPicParams).then(function (res) {
                $scope.skus = res.data;
            });
            goodsService.productServiceAttrs($scope.getPicParams).then(function (res) {
                $scope.attrs = res.data;
            });
        };
        $scope.getExamine = function () {//获取商品审核流程信息
            $scope.showMain = 'examine';
            if (!$scope.auditInfo) {
                examineService.getProductAuditRoute(id, $scope.productType).then(function (res) {
                    $scope.auditInfo = res.data;
                }, function (err) {
                    //获取审核流程信息失败
                });
            }
        };
        if ($scope.isExamine) {
            //获取当前流程节点
            var taskParam = {"index": 0, "size": 10, "productId": id};
            examineService.auditProductList(taskParam).then(function (res) {
                if(res.data.content[0] && res.data.content[0].taskId == taskId) {
                    $scope.taskData = res.data.content[0];
                }else{
                    $scope.taskData = {};
                    $scope.taskData.taskId = taskId;
                }
            }, function (err) {
            });
        }
        $scope.validity = function(num){
            switch (num){
                case '0':

            }
        }
    }]).filter('pickupType', function () {
        return function (num) {
            switch (num) {
                case '1':
                    return '物流配送';
                    break;
                case '2':
                    return '电子凭证';
                    break;
                case '3':
                    return '描述不符';
                    break;
            }
        }
    })
});
