define(function (require) {
    var app = require('app'),
        tree = require('ztree'),
        shop = require('app/services/shop.service.js'),
        examine = require('app/services/examine.service.js');
    app.useModule(['shop.service', 'examine.service']);

    var itemPageLimit = 15;

    //商户管理列表
    app.controller('shopListCtrl', ['$scope', '$state', 'shopService','$cookie', function ($scope, $state, shopService, $cookie) {
        //console.log($state.$current.self.name);
        var operater = $cookie('userInfo');
        $scope.typeDescArray = {'1':'企业独营', '2':'企业连锁', '3':'个体户'};

        //查询参数处理
        $scope.params = {
            index:0,
            size:itemPageLimit,
            organizeIds:operater.organizeIds
        };
        //分页参数
        $scope.conf = {
            total : 1,
            currentPage : 1,
            itemPageLimit : itemPageLimit,
            isSelectPage: false,
            isLinkPage : true
        };
        $scope.$watch('conf.currentPage' , function(news){
            $scope.params.index = $scope.conf.currentPage -1;
            $scope.getList();
        });
        $scope.goSearch = function () {
            if($scope.conf.currentPage == 1){
                $scope.getList();
            }else{
                $scope.conf.currentPage = 1;
            }

        };
        //获取列表数据
        $scope.getList = function(){
            shopService.merchantList($scope.params).then(function (res) {
                $scope.shopList = res.data.content;
                $scope.conf.total = res.data.total;
            }, function (err) {
            });
        };

        //锁定，解锁
        $scope.lock = function(merchant){
            if(!merchant.id){
                return;
            }
            $scope.$dialog.open({
                template: 'lockMerchant',
                width: 400,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.merchant = merchant;
                    $scope.enter = function () {
                        shopService.lockedMerchant(merchant.id).then(function (res) {
                            merchant.merchantStat = merchant.merchantStat ? false : true;
                            $scope.closeThisDialog(0);
                        },function(err){
                            $scope.$root.$toast('操作失败');
                            $scope.closeThisDialog(0);
                        });
                    };
                }]
            });

        };

        //批量导出
        $scope.exportsList = function () {
            shopService.exportsMerchant($scope.params);
        };

    //商户详情
    }]).controller('detailCtrl', ['$scope', '$state','$stateParams', 'shopService','$uploadParams','examineService', function ($scope, $state, $stateParams, shopService,$uploadParams,examineService) {
        //console.log($state.$current.self.name);
        var taskId = $stateParams.tid;
        $scope.isExamine = taskId ? true : false;
        $scope.imgBaseUrl = $uploadParams.baseUrl;
        var id = $stateParams.id;
        if(!id){
            $scope.$toast('非法请求');
            $state.go($scope.isExamine ? 'main.merchantExamine' : 'main.shopList');
            return false;
        }

        //获取详情数据
        shopService.merchantDetail(id).then(function(res){
            $scope.detail = res.data;
        }, function(err){
            //获取商户管理列表失败
        });
        $scope.getExamine = function(){
            $scope.showMain='examine';
            if(!$scope.auditInfo) {
                examineService.getMerchantAuditRoute(id).then(function (res) {
                    $scope.auditInfo = res.data;
                }, function (err) {
                    //获取审核流程信息失败
                });
            }
        };
        if($scope.isExamine){
            //获取当前流程节点
            var taskParam = {
                "index":0,
                "size":itemPageLimit,
                "merchantId":id
            };
            examineService.auditMerchantList(taskParam).then(function (res) {
                if(res.data.content[0] && res.data.content[0].taskId == taskId) {
                    $scope.taskData = res.data.content[0];
                }else{
                    $scope.taskData = {};
                    $scope.taskData.taskId = taskId;
                }
            },function (err) {
            });
        }

    //黑名单，暂时先不要
    /*}]).controller('shopBlackListCtrl', ['$scope', '$state', '$stateParams', 'shopService', function ($scope, $state, $stateParams, shopService) {
        console.log($state.$current.self.name);
        $scope.params = $stateParams.q ? JSON.parse($stateParams.q) : {size:itemPageLimit, index:0};
        var currentPage = $scope.params.index>0 ? $scope.params.index+1 : 1 ;
        $scope.params.merchantStat = 4;
        //获取黑名单列表数据
        shopService.merchantList($scope.params).then(function(res){

        }, function(err){
            //获取黑名单管理列表失败
            console.log(err);
        });

        $scope.conf = {
            total : 10,
            currentPage : currentPage,
            itemPageLimit : itemPageLimit,
            isLinkPage : true
        };
        $scope.$watch('conf.currentPage + conf.itemPageLimit' , function(news){
            console.log($scope.conf.currentPage , $scope.conf.itemPageLimit);
            $scope.goSearch($scope.conf.currentPage);
        });
        $scope.goSearch = function(page){
            if(page){   //翻页
                $scope.params.index = page-1;
            }else{      //搜索按钮
                $scope.params.index = 0;
            }
            if($stateParams.q || $scope.params.index>0) {
                console.log(565);
                $scope.params.merchantStat = null;
                var q = JSON.stringify($scope.params);
                $state.go('main.shopBlackList', {q: q});
            }
        }*/

    //店铺管理列表
    }]).controller('shopManagerCtrl', ['$scope', '$state', 'shopService', function ($scope, $state, shopService) {
        //console.log($state.$current.self.name);

        //店铺状态 0 初始 1: 正常 2：屏蔽
        $scope.SHOPSTATUS = {
            '0':'--',   //初始，未入驻的，不应该在店铺管理列表出现
            '1':'正常',
            '2':'屏蔽'
        };
        //店铺类型 1：总店 2：分店
        $scope.SHOPTYPE = {
            '1':'总店',
            '2':'分店'
        };

        //查询参数处理
        $scope.params = {
            index:0,
            size:itemPageLimit
        };
        //分页参数
        $scope.conf = {
            total : 1,
            currentPage : 1,
            itemPageLimit : itemPageLimit,
            isSelectPage: false,
            isLinkPage : true
        };
        $scope.$watch('conf.currentPage' , function(news){
            $scope.params.index = $scope.conf.currentPage -1;
            $scope.getList();
        });
        $scope.goSearch = function () {
            if($scope.conf.currentPage == 1){
                $scope.getList();
            }else{
                $scope.conf.currentPage = 1;
            }

        };
        //获取列表数据
        $scope.getList = function(){
            shopService.shopList($scope.params).then(function (res) {
                $scope.shopManager = res.data.content;
                $scope.conf.total = res.data.total;
            }, function (err) {
            });
        };

        //屏蔽
        $scope.shield = function(shop){
            if(!shop.id){
                return;
            }
            $scope.$dialog.open({
                template: 'shieldShop',
                width: 400,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.shop = shop;
                    $scope.enter = function () {
                        shopService.shieldShop(shop.id).then(function(res){
                            if(res.data){
                                shop.shopStat=2;
                            }else{
                                $scope.$root.$toast('操作失败');
                            }
                            $scope.closeThisDialog(0);
                        },function(err){
                            $scope.$root.$toast('操作失败');
                            $scope.closeThisDialog(0);
                        });
                    };
                }]
            });
        };

        //取消屏蔽
        $scope.cancelShield = function(shop){
            if(!shop.id){
                return;
            }
            $scope.$dialog.open({
                template: 'shieldShop',
                width: 400,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.shop = shop;
                    $scope.enter = function () {
                        shopService.normalShop(shop.id).then(function(res){
                            if(res.data){
                                shop.shopStat=1;
                            }else{
                                $scope.$root.$toast('操作失败');
                            }
                            $scope.closeThisDialog(0);
                        },function(err){
                            $scope.$root.$toast('操作失败');
                            $scope.closeThisDialog(0);
                        });
                    };
                }]
            });
        };

    //店铺详情
    }]).controller('shopDetailCtrl', ['$scope', '$state','shopService', '$uploadParams','examineService',
        function ($scope, $state,shopService,$uploadParams,examineService) {
        //console.log($state.$current.self.name);
        var id = $state.params.id,
            taskId = $state.params.tid;

        $scope.isExamine = taskId ? true : false;
        $scope.imgBaseUrl = $uploadParams.baseUrl;
        if(!id){
            $scope.$toast('非法请求');
            $state.go($scope.isExamine ? 'main.shopExamine' : 'main.shopManager');
            return false;
        }

        shopService.shopDetail(id).then(function(res){
            $scope.shopDetail = res.data;
            $scope.shop = res.data.shopDto;
            $scope.merchant = res.data.merchantDto;
            $scope.shopBranch = res.data.shopBranchDtos;
        }, function(err){
        });

        if ($scope.isExamine) {
            // 获取当前流程节点
            var taskParam = {
                "index":0,
                "size":itemPageLimit,
                "shopId":id
            };
            examineService.auditShopList(taskParam).then(function (res) {
                if(res.data.content[0] && res.data.content[0].taskId == taskId) {
                    $scope.taskData = res.data.content[0];
                }else{
                    $scope.taskData = {};
                    $scope.taskData.taskId = taskId;
                }
            },function (err) {
            });
        }

        // 获取审核流程信息
        $scope.getExamine = function () {
            $scope.showMain = "examine";
            if (!$scope.auditInfo) {
                examineService.getShopAuditRoute(id).then(
                    function (res) {
                        $scope.auditInfo = res.data;
                    },
                    function (err) {
                        // 获取审核流程信息失败
                    }
                );
            }
        };


    //门店管理
    }]).controller('storeListCtrl', ['$scope', '$state', 'shopService', function ($scope, $state, shopService) {
        //console.log($state.$current.self.name);
        //查询参数处理
        $scope.params = {
            index:0,
            size:itemPageLimit
        };
        //分页参数
        $scope.conf = {
            total : 1,
            currentPage : 1,
            itemPageLimit : itemPageLimit,
            isSelectPage: false,
            isLinkPage : true
        };
        $scope.$watch('conf.currentPage' , function(news){
            $scope.params.index = $scope.conf.currentPage -1;
            $scope.getList();
        });
        $scope.goSearch = function () {
            if($scope.conf.currentPage == 1){
                $scope.getList();
            }else{
                $scope.conf.currentPage = 1;
            }

        };
        //获取列表数据
        $scope.getList = function(){
            shopService.storeList($scope.params).then(function (res) {
                $scope.conf.total = res.data.total;
                $scope.storeList = res.data.content;
            }, function (err) {
            });
        };

        //关闭、取消关闭门店
        $scope.close = function (store) {
            if(!store.id){
                return;
            }
            $scope.$dialog.open({
                template: 'closeStore',
                width: 400,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.store = store;
                    var params = {};
                    $scope.enter = function () {
                        if(store.shopBranchStat == 1) { //关闭店铺
                            params.sbId = store.id;
                            params.shopBranchStat = store.shopBranchStat;
                            shopService.closeStore(params).then(function (res) {
                                $scope.$root.$toast('操作成功');
                                store.shopBranchStat = 2;
                                $scope.closeThisDialog(0);
                            }, function (err) {
                                $scope.$root.$toast('操作失败');
                                $scope.closeThisDialog(0);
                            });
                        }else{  //恢复正常
                            params.sbId = store.id;
                            params.shopBranchStat = store.shopBranchStat;
                            shopService.normalStore(params).then(function (res) {
                                $scope.$root.$toast('操作成功');
                                store.shopBranchStat = 1;
                                $scope.closeThisDialog(0);
                            }, function (err) {
                                $scope.$root.$toast('操作失败');
                                $scope.closeThisDialog(0);
                            });
                        }
                    };
                }]
            });
        }

    }]).controller('storeDetailCtrl', ['$scope', '$state','shopService','$stateParams', function ($scope, $state, shopService,$stateParams) {
        //console.log($state.$current.self.name);
        shopService.storeDetail($stateParams.id).then(function (res) {
            $scope.store = res.data;
        }, function (err) {
        });

    }]).controller('shopTagCtrl', ['$scope', '$state', function ($scope, $state) {
        console.log($state.$current.self.name);
        $scope.conf = {
            total : 1,
            currentPage : 1,
            itemPageLimit : itemPageLimit,
            isLinkPage : true
        };
        $scope.$watch('conf.currentPage + conf.itemPageLimit' , function(news){
            console.log($scope.conf.currentPage , $scope.conf.itemPageLimit)
        })

    //经营类目管理
    }]).controller('businessCategoryCtrl', ['$scope', '$state', 'shopService', 'apiUri', '$timeout', function ($scope, $state, shopService, apiUri, $timeout) {
        //console.log($state.$current.self.name);
        //$scope.parentId = '';
        $scope.parentCat = {id:'', categoryType:''};
        //获取列表信息
        $scope.findBusinessChildCategorys = function (parentId) {
            shopService.findBusinessChildCategorys(parentId).then(function (res) {
                //console.log(res);
                $scope.businessChildCategorys = res.data;
                if(!parentId){      //获取最上级经营类目
                    $scope.businessParentCategorys = res.data;
                }
            }, function (err) {
                $scope.$toast(err.message);
            })
        };
        $scope.findBusinessChildCategorys($scope.parentCat.id);

        //经营分类tree
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
                url: apiUri + 'businessCategory/findBusinessChildCategorys',
                contentType: "application/json",
                autoParam: ['id'],
                otherParam: {r:new Date().getTime()},
                type: 'get',
                dataFilter: filter
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    $scope.parentCat = {
                        id: treeNode.parentId ? treeNode.parentId : treeNode.id,
                        categoryType : treeNode.categoryType
                    };
                    $scope.findBusinessChildCategorys(treeNode.id);
                }
            }
        };
        function filter(treeId, parentNode, childNodes) {   //处理tree的显示数据
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

        //新增分类，编辑分类的表单验证
        var checkBusinessCategoryForm = function (scope) {
            if(!scope.category.name){
                scope.$root.$toast('请填写分类名称');
                return false;
            }
            if(!scope.category.code){
                scope.$root.$toast('请填写分类编号');
                return false;
            }
            if(!scope.category.ordinal){
                scope.$root.$toast('请填写排序编号');
                return false;
            }

            scope.category.parentId = scope.category.parentId ? scope.category.parentId : '';

            if(scope.category.parentId) {
                //处理商品分类
                var zTree = $.fn.zTree.getZTreeObj('treeProductCat');
                var checkedNode = zTree.getCheckedNodes();
                if (checkedNode.length == 0) {
                    scope.$root.$toast('请选择关联商品分类');
                    return false;
                }
                var selectCat = [];
                newSelectIds.clear();
                for(i in checkedNode){
                    var path = checkedNode[i].path;
                    if(path.split(':').length==3){
                        var thisData = {
                            categoryId : checkedNode[i].id,
                            categoryPath : path
                        };
                        selectCat.push(thisData);
                        newSelectIds.third[checkedNode[i].id] = 1;
                    }else{
                        continue;
                    }
                }
                scope.category.producatCategorys = selectCat;
            }
            return true;
        };

        //对比编辑前后所选的商品分类ID，为了区分“更新经营类目状态（不更新关联的商品分类）” 和 “更新经营类目（并更新关联商品分类）”两个接口
        var checkCategoryChange = function () {
            for(oldCatId in oldSelectIds.third){
                if(!newSelectIds.third[oldCatId]){
                    return true;
                }
            }
            for(newCatId in newSelectIds.third){
                if(!oldSelectIds.third[newCatId]){
                    return true;
                }
            }
            return false;
        };

        //选择上级分类select
        $scope.selectParentCat = function (item) {
            //获取当前选择上级分类属于实物或服务
            for(var i in $scope.businessParentCategorys){
                if($scope.businessParentCategorys[i].id == item.category.parentId){
                    item.category.categoryType = $scope.businessParentCategorys[i].categoryType;
                    $scope.parentCat = {
                        id : item.category.parentId,
                        categoryType : item.category.categoryType
                    };
                    $.fn.zTree.init($("#treeProductCat"), settingProductCatTree);
                    break;
                }
            }
        };

        var oldSelectIds = {  //经营分类已经设置的商品分类（编辑时异步获取的商品分类数据）
            first:{},   //顶级分类，只有 0-实物，1-服务
            second:{},  //一级商品分类
            third:{},   //二级商品分类
            clear:function () {
                this.first = {};
                this.second = {};
                this.third = {};
            }
        };
        var newSelectIds = {
            third:{},   //二级商品分类
            clear:function () {
                this.third = {};
            }
        };

        //添加分类
        $scope.addBusinessCategory = function () {
            $scope.dailogTitle = '添加分类';
            $scope.$dialog.open({
                template: 'addCategory',
                width: 500,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.category = {visible: 1};
                    oldSelectIds.clear();

                    if($scope.parentCat.id){
                        $scope.category.parentId = $scope.parentCat.id;
                        $scope.category.categoryType = $scope.parentCat.categoryType;
                    }
                    $timeout(function(){
                        $.fn.zTree.init($("#treeProductCat"), settingProductCatTree);
                    },200);
                    $scope.enter = function () {    //保存分类
                        if(checkBusinessCategoryForm($scope)){
                            shopService.saveBusinessCategory($scope.category).then(function (res) {
                                $scope.closeThisDialog(0);
                                $scope.findBusinessChildCategorys($scope.category.parentId);
                                $.fn.zTree.init($("#treeDemo"), setting);
                            },function (err) {
                                console.log(err);
                            });
                        }
                    };
                }]
            });
        };


        //编辑分类，需要获取当前分类的信息
        $scope.editBusinessCategory = function (item) {
            $scope.dailogTitle = '编辑分类';
            shopService.getBusinessCategorys(item.id).then(function (res) {
                var oldProductCatIds = res.data.producatCategorys,
                    len = oldProductCatIds.length;
                    oldSelectIds.clear();
                for(var i=0; i<len; i++){   //处理已经选择的商品分类
                    var path = oldProductCatIds[i].categoryPath.split(':');
                    oldSelectIds.first[path[0]] = 1;
                    oldSelectIds.second[path[1]] = 1;
                    oldSelectIds.third[path[2]] = 1;
                }
                $scope.$dialog.open({
                    template: 'addCategory',
                    width: 500,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.category = res.data;
                        $timeout(function(){
                            $.fn.zTree.init($("#treeProductCat"), settingProductCatTree);
                        },200);
                        $scope.enter = function () {    //更新分类
                            if(checkBusinessCategoryForm($scope)){
                                var requestType = checkCategoryChange() ? 'updateBusinessCategorys':'updateBusinessCategorysStat';
                                shopService[requestType]($scope.category).then(function (res) {
                                    $scope.closeThisDialog(0);
                                    $scope.findBusinessChildCategorys($scope.category.parentId);
                                },function (err) {
                                    console.log(err);
                                });
                            }
                        };
                    }]
                });
            },function (err) {
                $scope.$toast(err.message);
            });

        };

        //删除分类
        $scope.delCats = function (item) {
            if(item.isParent){
                $scope.$root.$toast('该分类含有子分类，不能删除');
                return false;
            }
            $scope.$dialog.open({
                template:'app/view/template/tips.html',
                width:300,
                scope:$scope,
                controller:['$scope', function($scope){
                    $scope.enter = function() {
                        shopService.deleteBusinessCategorys(item.id).then(function (res) {
                            $scope.findBusinessChildCategorys($scope.parentCat.id);
                            $.fn.zTree.init($("#treeDemo"), setting);
                            $scope.$root.$toast('删除成功！');
                            $scope.closeThisDialog(0);
                        }, function (err) {
                            //$scope.$root.$toast('删除失败！');
                            $scope.$root.$toast(err.message);
                            $scope.closeThisDialog(0);
                        });
                    }
                }]
            })
        };

        //商品分类tree
        var settingProductCatTree = {
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parentId",
                    rootPId: null
                }
            },
            check: {
                enable: true,
                chkDisabledInherit: true,
                autoCheckTrigger: false,
                chkboxType: {
                    "Y": "ps",
                    "N": "ps"
                }
            },
            async: {
                enable: true,
                url: apiUri + 'cats/children',
                contentType: "application/json",
                autoParam: ["id=parentId"],
                type: 'get',
                otherParam:{r:new Date().getTime()},
                dataFilter: filterProductCat
            },
            callback: {
                onCheck: function(event, treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj(treeId);
                    if(treeNode.checked) {
                        zTree.expandNode(treeNode, true, true, true);
                    }
                },
                onAsyncSuccess: function (event, treeId, treeNode) {
                    //这里处理的是编辑分类时，打开该分类下所关联的商品分类对应的tree
                    var zTree = $.fn.zTree.getZTreeObj(treeId),
                        treeLevel = !treeNode ? oldSelectIds.first : oldSelectIds.second;   //如果没有treeNode则处理的是顶级，有则处理第二级
                    if(!$.isEmptyObject(oldSelectIds.first)) {
                        for (catId in treeLevel) {
                            var thisNode = zTree.getNodesByParam('id', catId);
                            zTree.expandNode(thisNode[0], true, true, true);
                        }
                    }
                }
            }
        };

        function filterProductCat(treeId, parentNode, childNodes) {
            var data = childNodes.data;
            if (!data) return null;
            if(!parentNode && data[0].id==='0'){
                if($scope.parentCat.categoryType === '1'){
                    data = [data[1]];
                }else{
                    data = [data[0]];
                }
            }
            for (var i = 0, l = data.length; i < l; i++) {
                data[i].name = data[i].name.replace(/\.n/g, '.');
                if(data[i].id==='1' || data[i].id==='0'){ //最上层的“实物、服务”不可选，（不计入商品分类层级）
                    data[i].nocheck = true;
                }else if(data[i].parentId !=='1' && data[i].parentId!=='0'){  //只关联到2级商品分类（经营分类二级对商品分类二级），所以不展示3级或以下的
                    data[i].isParent = false;
                }
                if((data[i].parentId === '1' || data[i].parentId==='0') && data[i].isParent==false){  //没有第二级的商品分类，不可选
                    data[i].nocheck = true;
                }

                //如果父级已选，则子级也选上
                if(!data[i].nocheck && parentNode && parentNode.checked){
                    data[i].checked = true;
                }

                //处理旧数据选上的
                if(oldSelectIds.third[data[i].id]){
                    data[i].checked = true;
                }
            }
            return data;
        }


    }]);

});