define(function (require) {
    var app = require('app');
    require('ztree');
    require('app/components/attendActShop.js');
    require('underscore');
    require('app/services/marketing.service.js');
    require('app/components/form.check.js');
    require('app/components/selectComponent.js');
    require('app/services/content.service.js');
    require('app/components/category.js');
    require('app/components/settlement.js');
    require('app/services/shop.service.js');
    require('app/services/goods.service.js');
    var itemPageLimit = 15;

    app.useModule(['attendActShop', 'marketing.service', 'content.service','shop.service', 'goods.service']);

    app.controller('shopMkActCtrl', ['$scope', '$state', 'marketingService', function ($scope, $state, marketingService) {//商户营销活动
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };
        $scope.vm = [];
        var params;
        $scope.params = { index: 0, size: itemPageLimit, status: 'all' };
        $scope.now = new Date().getTime();
        $scope.getActLevelCN = marketingService.getActLevelCN;
        $scope.getActType = marketingService.getActType;

        $scope.$watch('conf.currentPage + conf.itemPageLimit', function (news) {
            console.log($scope.conf.currentPage, $scope.conf.itemPageLimit);
            $scope.params = params;
            $scope.loadData($scope.conf.currentPage - 1);
        });

        $scope.loadData = function (index) {
            $scope.params.index = index || 0;
            params = angular.copy($scope.params);
            marketingService.LimitTimeAct.getLimitTimeActs($scope.params).then(
                function (resp) {
                    $scope.vm = resp.data.content;
                    $scope.conf.total = resp.data.total;
                },
                function () {
                    //TODO:错误处理
                }
            )
        };
        $scope.loadData();

        $scope.terminate = function (item) {
            $scope.$dialog.$confirm({ message: '确定终止？' }).then(function () {
                marketingService.LimitTimeAct.terminateAct(item.id).then(function () {
                    $scope.loadData();
                })
            }, function () { })
        }

    }]).controller('shopMkActDetailCtrl', ['$scope', '$state', '$uploadParams', 'marketingService', function ($scope, $state, $uploadParams, marketingService) {//商户营销活动
        console.log($state.$current.self.name);

        $scope.imgBaseUrl = $uploadParams.baseUrl;
        var id = $state.params.id;
        $scope.vm = {};
        $scope.getActLevelCN = marketingService.getActLevelCN;
        $scope.getActType = marketingService.getActType;

        marketingService.LimitTimeAct.getLimitTimeAct(id).then(function (resp) {
            $scope.vm = resp.data;
            $scope.vm.id = id;
        })
    }]).controller('platformMkActCtrl', ['$scope', '$state', function ($scope, $state) {//平台营销活动
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
        $scope.shopList = function (id) {//参加商户列表
            shopList(id, $scope.$dialog);
        };
        $scope.goodsList = function (id) {//参加商品列表
            console.log(id);
            $scope.$dialog.open({
                template: 'actGoods',
                width: 800,
                controller: ['$scope', function ($scope) {
                    console.log('查看参加商品列表');
                    $scope.confGoods = {
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
                    $scope.$watch('confGoods.currentPage + confGoods.itemPageLimit', function (news) {
                        // 把你的http请求放到这里
                        console.log($scope.confGoods.currentPage, $scope.confGoods.itemPageLimit)
                    });
                }]
            });
        };

    }]).controller('createMkActCtrl', ['$scope', '$state', function ($scope, $state) {//商户营销活动
        console.log($state.$current.self.name);
        $scope.confShop = {
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
        $scope.$watch('confShop.currentPage + confShop.itemPageLimit', function (news) {
            // 把你的http请求放到这里
            console.log($scope.confShop.currentPage, $scope.confShop.itemPageLimit)
        });
        $scope.confSelect = {
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
        $scope.$watch('confSelect.currentPage + confSelect.itemPageLimit', function (news) {
            // 把你的http请求放到这里
            console.log($scope.confSelect.currentPage, $scope.confSelect.itemPageLimit)
        });
    }]).controller('platformMkActDetailCtrl', ['$scope', '$state', function ($scope, $state) {//商户营销活动
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
        $scope.shopList = function (id) {//参加商户列表
            shopList(id, $scope.$dialog);
        };

    }]).controller('seckillMkActCtrl', ['$scope', '$state', 'marketingService', function ($scope, $state, marketingService) {//平台秒杀活动列表
        //console.log($state.$current.self.name);

        $scope.seckillActStatus = marketingService.seckillAct.seckillActStatus();

        //查询参数处理
        $scope.params = {
            index:0,
            size: itemPageLimit,
            status : 'all'
        };
        //分页参数
        $scope.conf = {
            total : 1,
            currentPage : 1,
            itemPageLimit : $scope.params.size,
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
            marketingService.seckillAct.getSeckillActs($scope.params).then(function (res) {
                $scope.actList = res.data.content;
                $scope.conf.total = res.data.total;
            }, function (err) {
            });
        };

        //终止活动
        $scope.actStop = function (id) {
            $scope.$dialog.$confirm({ message: '确认终止该活动？' }).then(
                function () {   //点击确认
                    marketingService.seckillAct.terminateAct(id).then(
                        function (res) {
                            $scope.$root.$toast('活动已终止');
                            $scope.getList();
                        },
                        function (err) {
                        }
                    );
                },
                function () {   //点击取消
                }
            );
        };

        $scope.goodsList = function (id) {//参加商品列表
            $scope.$dialog.open({
                template: 'actGoods',
                width: 1000,
                controller: ['$scope', function ($scope) {
                    $scope.goodsParams = {
                        index:0,
                        size: itemPageLimit
                    };
                    $scope.confGoods = {
                        // 总条数
                        total: 1,
                        // 当前页
                        currentPage: 1,
                        // 一页展示多少条
                        itemPageLimit: $scope.goodsParams.size,
                        // 是否显示一页选择多少条
                        isSelectPage: false,
                        // 是否显示快速跳转
                        isLinkPage: true
                    };
                    // 监控你的页码 ， 发生改变既请求
                    $scope.$watch('confGoods.currentPage', function (news) {
                        // 把你的http请求放到这里
                        $scope.goodsParams.index = $scope.confGoods.currentPage -1;
                        $scope.getGoodsList();
                    });
                    $scope.getGoodsList = function () {
                        marketingService.seckillAct.getSelectProducts(id, $scope.goodsParams).then(
                            function (res) {
                                if(res.data) {
                                    $scope.selectedProductList = res.data.content;
                                    $scope.confGoods.total = res.data.total;
                                }
                            },
                            function (err) {
                            }
                        );
                    }
                }]
            });
        };

    }]).controller('seckillMkActCreateCtrl', ['$scope', '$state', 'marketingService','$uploadParams', '$timeout', function ($scope, $state, marketingService,$uploadParams, $timeout) {//平台秒杀活动创建，修改
        //console.log($state.$current.self.name);

        //第一步 活动信息
        //活动信息提交
        $scope.actSubmit = function () {
            var params = {
                act:{}
            };
            angular.copy($scope.act,params.act);
            params.act.beginTime = new Date(params.act.beginTime).getTime();
            params.act.endTime = new Date(params.act.endTime).getTime();
            params.act.preheatTime = new Date(params.act.preheatTime).getTime();
            params.act.enableShopEntry = false; //是否店铺报名 暂时没有，所以传false
            params.act.categoryType = 'REAL';   //秒杀只有实物类
            //提交前验证
            if(params.act.preheatTime < new Date().getTime() + marketingService.seckillAct.seckillCanPreheatTime){
                $scope.$root.$toast('预热时间请设置大于当前30分钟！');
                return false;
            }
            marketingService.seckillAct.createSeckillAct(params).then(
                function (res) {
                    if(res.data) {
                        $scope.$root.$toast('活动创建成功');
                        $scope.actId = res.data;
                        $scope.getProductList();
                        $scope.showStep1 = false;
                        $scope.showStep2 = true;
                    }else{
                        //$scope.$root.$toast('活动创建失败');
                    }
                },
                function (err) {
                }
            );
        };

        //活动信息表单验证
        $scope.actFormWarn = function () {
            formVerify($scope.actForm);
        };

        //第二步  选择商品
        //选择商品提交
        $scope.confirmProduct = function () {
            var ids = [];
            for(item in $scope.selectedProduct){
                if($scope.selectedProduct[item].selected){
                    //ids += ids ? ',' + $scope.selectedProduct[item].id : $scope.selectedProduct[item].id;
                    ids.push($scope.selectedProduct[item].id);
                }
            }
            if(ids.length==0){
                $scope.$root.$toast('请选择商品');
                return false;
            }
            marketingService.seckillAct.selectProducts($scope.actId, ids.toString()).then(
                function (res) {
                    //清空已选择记录
                    $scope.selectedProduct = {};

                    //获取已选商品列表
                    $scope.getSelectedProduct();

                    //刷新可选择商品列表
                    $scope.refreshProductList();
                    //$scope.getProductList();
                },
                function (err) {
                }
            );
        };

        //搜索商品列表参数
        $scope.productListParams = {
            index: 0,
            size: 20
        };
        //分页参数
        $scope.conf = {
            total : 10,
            currentPage : 1,
            itemPageLimit : $scope.productListParams.size,
            isSelectPage: false,
            isLinkPage : true
        };
        $scope.$watch('conf.currentPage' , function(news){
            $scope.productListParams.index = $scope.conf.currentPage -1;
            $scope.getProductList();
        });
        $scope.searchProduct = function () {
            if($scope.selectCategory.length>0){
                $scope.productListParams.categoryPath = $scope.selectCategory.join(':');
            }
            if($scope.conf.currentPage == 1){
                $scope.getProductList();
            }else{
                $scope.conf.currentPage = 1;
            }

        };
        //获取可以参加活动商品列表
        $scope.getProductList = function () {
            if(!$scope.actId){
                return false;
            }
            $scope.checkAlls = false;
            marketingService.seckillAct.selectableProducts($scope.actId, $scope.productListParams).then(
                function (res) {
                    $scope.productList = res.data.content;
                    $scope.conf.total = res.data.total;
                    var id = '', count = 0;
                    for(item in $scope.productList){
                        id = $scope.productList[item].id;
                        if($scope.selectedProduct[id] && $scope.selectedProduct[id].selected){
                            $scope.productList[item].selected = true;
                            count ++;
                        }
                    }
                    if(count && count==$scope.productList.length){
                        $scope.checkAlls = true;
                    }
                },
                function (err) {
                }
            );
        };
        //重新刷新可选商品列表
        $scope.refreshProductList = function () {
            // $scope.productListParams = {
            //     index: 0,
            //     size: 20
            // };
            if($scope.conf.currentPage!=1) {
                $scope.productListParams.index = 0;
                $scope.conf.currentPage = 1;
            }
            $scope.getProductList();
        };

        //选择分类搜索商品
        $scope.selectCategory = [];
        $scope.selectedProduct = {};   //已选择商品集合

        //当前分页商品全选
        $scope.checkAll = function () {
            //console.log($scope.checkAlls);
            var id = '';
            for(item in $scope.productList){
                $scope.productList[item].selected = $scope.checkAlls;
                id = $scope.productList[item].id;
                $scope.selectedProduct[id] = $scope.productList[item];
            }
        };
        //选择一个商品
        $scope.checkProduct = function (product) {
            product.selected = !product.selected;
            $scope.selectedProduct[product.id] = product;
            if(!product.selected){
                $scope.checkAlls = false;
            }
        };

        //第三步  设置sku库存价格，限购数
        //设置商品价格折扣提交
        $scope.productSetSubmit = function () {
            //console.log($scope.selectedProductList);
            var params = {
                product:[]
            };
            for(item in $scope.selectedProductList){
                var thisProduct = $scope.selectedProductList[item];
                if(!thisProduct.limitBuyAmount){
                    $scope.$root.$toast('商品的每人限购数不能为空');
                    return false;
                }
                var productSet = {
                    prodId : thisProduct.productId,
                    limitBuyAmount : thisProduct.limitBuyAmount,
                    skuMap : {},
                    stockMap : {}
                };
                for(i in thisProduct.skuList){
                    var thisSku = thisProduct.skuList[i];
                    if(!thisSku.actStock){
                        $scope.$root.$toast('请设置商品的活动库存');
                        $scope.openSkuSetBox(thisProduct);
                        return false;
                    }
                    if(!thisSku.actPrice){
                        $scope.$root.$toast('请设置商品的活动价格');
                        $scope.openSkuSetBox(thisProduct);
                        return false;
                    }
                    if(thisSku.actPrice * 1 > thisSku.skuPrice * 1){
                        $scope.$root.$toast('活动价不能大于商品单价!');
                        $scope.openSkuSetBox(thisProduct);
                        return false;
                    }
                    productSet.skuMap[thisSku.skuId] = thisSku.actPrice;
                    productSet.stockMap[thisSku.skuId] = thisSku.actStock;
                }
                params.product.push(productSet);
            }
            marketingService.seckillAct.setSelectedProducts($scope.actId, params).then(
                function (res) {
                    $scope.$root.$toast('活动'+$scope.pageType+'成功，将在3秒后跳转到列表页面');
                    $timeout(function () {
                        $state.go("main.seckillMkAct");
                    }, 3000)
                },
                function (err) {
                }
            );
        };
        //获取已选择商品列表
        $scope.getSelectedProduct = function () {
            var params = {
                index:0,
                size:100
            };
            marketingService.seckillAct.getSelectProducts($scope.actId,params).then(
                function (res) {
                    if(res.data) {
                        //保存已经选好的，再处理新的
                        var old = {};
                        for(item in $scope.selectedProductList){
                            old[$scope.selectedProductList[item].productId] = $scope.selectedProductList[item];
                        }

                        //新选择的活动商品
                        $scope.selectedProductList = res.data.content;
                        //处理新的（把已经设置好的作出处理）
                        for(item in $scope.selectedProductList){
                            if(old[$scope.selectedProductList[item].productId]){
                                $scope.selectedProductList[item] = old[$scope.selectedProductList[item].productId];
                            }
                        }
                        $scope.showStep3 = res.data.total>0 ? true :false;
                    }
                },function (err) {

                }
            );
        };
        //移除商品
        $scope.delProduct = function (product) {
            //product.selected = false;
            $scope.$dialog.$confirm({ message: '确认移除该商品？' }).then(
                function () {   //点击确认
                    marketingService.seckillAct.deleteProduct($scope.actId, product.productId).then(
                        function (res) {
                            $scope.$root.$toast('成功移除商品');
                            delete $scope.selectedProduct[product.id];
                            $scope.getProductList();    //刷新可选商品列表
                            //处理已选择列表
                            var index = $scope.selectedProductList.indexOf(product);
                            if (index > -1) {
                                $scope.selectedProductList.splice(index, 1);
                            }

                        },
                        function (err) {
                        }
                    );
                },
                function () {   //点击取消
                }
            );
        };
        //批量设置每人限购数
        $scope.setLimitBuyAmount = function () {
            for(item in $scope.selectedProductList){
                $scope.selectedProductList[item].limitBuyAmount = $scope.allLimitBuyAmount;
            }
        };
        //打开SKU设置窗口
        $scope.openSkuSetBox = function (product) {
            $scope.$dialog.open({
                template: 'skuSettingTemplate',
                scope: $scope,
                width: 800,
                controller: ['$scope', function ($scope) {
                    $scope.skuList = product.skuList;
                    $scope.skuBatch = function () {
                        for(item in $scope.skuList){
                            $scope.skuList[item].actPrice = $scope.skuBatSet.actPrice;
                            $scope.skuList[item].actStock = $scope.skuBatSet.actStock;
                        }
                    };
                    $scope.confirm = function () {
                        for(item in $scope.skuList){
                            if(!$scope.skuList[item].actPrice){
                                $scope.$root.$toast('活动价不能为空');
                                return false;
                            }
                            if($scope.skuList[item].actPrice * 1 > $scope.skuList[item].skuPrice * 1){
                                $scope.$root.$toast('活动价不能大于商品单价!');
                                  $scope.skuList[item].actPrice = '';
                                return false;
                            }
                            if(!$scope.skuList[item].actStock){
                                $scope.$root.$toast('活动库存不能为空');
                                return false;
                            }
                        }
                        $scope.closeThisDialog();
                    }
                }]
            });
        };

        //页面初始化
        if($state.$current.self.name=='main.seckillMkActModify' && $state.params.id){
            //编辑修改
            $scope.pageType = '编辑';
            $scope.actId = $state.params.id;
            marketingService.seckillAct.getSeckillAct($state.params.id).then(
                function (res) {
                    if(res.data){
                        $scope.act = res.data;
                        $scope.showStep1 = false;
                        $scope.showStep2 = true;
                    }
                },
                function (err) {
                }
            );
            //$scope.getProductList();//watch里面已经会请求
            $scope.getSelectedProduct();
        }else if($state.$current.self.name=='main.seckillMkActModify'){
            //没有活动ID则非法请求
            $scope.$root.$toast('没有活动信息');
            $state.go('main.seckillMkAct');
        }else{
            //新建活动
            $scope.pageType = '新建';
        }

        //当前时间最近的整点或半点 时间戳
        var nearHalf = Math.ceil( new Date().getTime() /(30*60*1000) ) * 30*60*1000;
        $scope.canPreheatTime = nearHalf + marketingService.seckillAct.seckillCanPreheatTime;  //可以预约时间 在最近的整点或半点再延后seckillCanPreheatTime时间
        $scope.showStep1 = true;
        $scope.act = {
            categoryType:'REAL'  //暂时秒杀只支持实物类商品
        };
        $scope.imgBaseUrl = $uploadParams.baseUrl;

    }]).controller('seckillMkActDetailCtrl', ['$scope', '$state', 'marketingService', function ($scope, $state, marketingService) {//平台秒杀活动详情
        console.log($state.$current.self.name);

        var id = $state.params.id;
        marketingService.seckillAct.getSeckillAct(id).then(
            function (res) {
                $scope.actInfo = res.data;
            },
            function (err) {
            }
        );

        //获取活动商品列表
        //列表参数
        $scope.goodsParams = {
            index:0,
            size: itemPageLimit
        };
        //分页参数
        $scope.conf = {
            // 总条数
            total: 1,
            // 当前页
            currentPage: 1,
            // 一页展示多少条
            itemPageLimit: $scope.goodsParams.size,
            // 是否显示一页选择多少条
            isSelectPage: false,
            // 是否显示快速跳转
            isLinkPage: true
        };
        // 监控你的页码 ， 发生改变既请求
        $scope.$watch('conf.currentPage', function (news) {
            // 把你的http请求放到这里
            $scope.goodsParams.index = $scope.conf.currentPage -1;
            $scope.getGoodsList();
        });
        $scope.getGoodsList = function () {
            marketingService.seckillAct.getSelectProducts(id, $scope.goodsParams).then(
                function (res) {
                    if(res.data) {
                        $scope.selectedProductList = res.data.content;
                        $scope.conf.total = res.data.total;
                    }
                },
                function (err) {
                }
            );
        };

        //打开SKU信息窗口
        $scope.openSkuSetBox = function (product) {
            $scope.$dialog.open({
                template: 'skuSettingTemplate',
                scope: $scope,
                width: 800,
                controller: ['$scope', function ($scope) {
                    $scope.skuList = product.skuList;
                }]
            });
        };

    }]).controller('enoughDiscountCtrl', ['$scope', '$state','marketingService', function ($scope, $state,marketingService) {//满立减活动列表

        $scope.edParams = {
            index:0,
            size:15
        };
        $scope.confPage = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.queryStatus = [
            {value:'all',name:'全部'},
            {value:'notBegin',name:'未开始'},
            {value:'begin',name:'进行中'},
            {value:'end',name:'已结束'},
            {value:'terminate',name:'已终止'}
        ];
        $scope.$watch('confPage.currentPage + confPage.itemPageLimit', function (news) {
            console.log($scope.confPage.currentPage, $scope.confPage.itemPageLimit);
            searchParams.index = $scope.confPage.currentPage - 1;
            $scope.getList();
        });
        var searchParams = angular.copy($scope.edParams);
        $scope.getList = function(){
            marketingService.enoughDiscount.getAct(searchParams).then(function (res) {
                $scope.actList = res.data.content;
                $scope.confPage.total = res.data.total;
            },function (err) {})
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.edParams);
            $scope.getList();
        };
        $scope.repeatableName = function(value){
            switch (value){
                case 'everyDiscount':
                    return '每满减';
                    break;
                case 'overDiscount':
                    return '满减';
                    break;
                default:
                    return '状态出错';
            }
        };
        $scope.rangeTypeName = function(value){
            switch (value){
                case 'ALL':
                    return '全场';
                    break;
                case 'SHOP':
                    return '商铺';
                    break;
                case 'CATEGORY':
                    return '品类';
                    break;
                case 'PRODUCT':
                    return '商品';
                    break;
            }
        };
        $scope.delAct = function(actId){//删除活动
            $scope.$dialog.$confirm({message:'确认删除此活动！'}).then(function(){},function(){});
        };
        $scope.terminateAct = function(actId){//终止活动
            $scope.$dialog.open({
                template: 'terminateAct',
                width:500,
                scope:$scope,
                controller:['$scope',function($scope){
                    $scope.terminate = {
                        reason:''
                    };
                    $scope.enter = function(){
                        if($scope.terminate.reason!=''){
                            marketingService.enoughDiscount.terminate(actId,$scope.terminate).then(function(res){
                                $scope.$root.$toast('操作成功!');
                                $scope.closeThisDialog(0);
                                $scope.getList();
                            },function(){
                                $scope.getList();
                            })
                        }else{
                            $scope.$root.$toast('请输入终止原因！');
                        }
                    }
                }]
            });
        };
        $scope.dateNow = new Date();
        $scope.editAct = function(startTime,actId){
            var nowTime = new Date();
            if((startTime-nowTime.getTime())>1800000){
                $state.go('main.addEnoughDiscount',{id:actId});
            }else{
                $scope.$toast('活动开始时间小于30分钟不能编辑');
            }
        }
    }]).controller('addEnoughDiscountCtrl', ['$scope', '$state','marketingService','$filter', function ($scope, $state,marketingService,$filter) {//新建满立减活动
        var editActId = $state.params.id;
        var nowTime = Math.ceil( new Date().getTime() /(30*60*1000) ) * 30*60*1000;
        $scope.canPreheatTime = nowTime + marketingService.seckillAct.seckillCanPreheatTime;
        $scope.addParams = {
            act:{
                rangeType:'ALL',
                categoryType:'REAL',
                shareType:'RATIO',
                repeatable:'overDiscount',
                branchDiscountPercent:0
            },
            productList:[],
            shopList:[]
        };
        $scope.sparams = {
            sid: '',
            sids: [],
            oids: [],
            type: 'shop', //shop--选择店铺，product--选择商品
            category:$scope.addParams.act.categoryType //REAL--实物类，SERVICE--服务类
        };
        $scope.repeatable = [
            {value:'overDiscount',name:'满减'},
            {value:'everyDiscount',name:'每满减'}
        ];

        $scope.isAmount = function () {
            if(parseInt($scope.addParams.act.orderAmount)<parseInt($scope.addParams.act.discountAmount)){
                $scope.$toast('减金额不能大于满金额！');
                $scope.addParams.act.discountAmount = '';
            }
        };

        if(editActId){//编辑满立减活动
            marketingService.enoughDiscount.actDetail(editActId).then(function(res){
                var data = res.data;
                $scope.addParams = {
                    act:{
                        id:data.act.id,
                        rangeType:data.act.rangeType,
                        categoryType:data.act.categoryType,
                        shareType:data.act.shareType,
                        repeatable:data.act.repeatable,
                        actStartTime:$filter('date')(data.act.actStartTime, 'yyyy-MM-dd HH:mm:ss'),
                        actEndTime:$filter('date')(res.data.act.actEndTime, 'yyyy-MM-dd HH:mm:ss'),
                        actTitle:data.act.actTitle,
                        description:data.act.description,
                        discountAmount:data.act.discountAmount,
                        headDiscountAmount:data.act.headDiscountAmount,
                        headDiscountPercent:data.act.headDiscountPercent,
                        merchantDiscountAmount:data.act.merchantDiscountAmount,
                        merchantDiscountPercent:data.act.merchantDiscountPercent,
                        orderAmount:data.act.orderAmount,
                        branchDiscountPercent:data.act.branchDiscountPercent
                    },
                    productList:data.productList,
                    shopList:data.shopList
                };
                if(data.act.rangeType==='SHOP'){
                    data.shopList.forEach(function(item){
                        $scope.sparams.sids.push(item.shopId);
                    });
                }else if(data.act.rangeType==='PRODUCT'){
                    data.productList.forEach(function(item){
                        $scope.sparams.sids.push(item.productId);
                    });
                    console.log($scope.sparams.sids);
                }
            });
        }

        $scope.$watch('addParams.act.rangeType',function(){
            switch ($scope.addParams.act.rangeType){
                case 'SHOP':
                    $scope.sparams.type = 'shop';
                    break;
                case 'PRODUCT':
                    $scope.sparams.type = 'product';
                    break;
            }
        });
        $scope.$watch('addParams.act.categoryType',function () {
            switch ($scope.addParams.act.categoryType){
                case 'REAL':
                    $scope.sparams.category = 'REAL';
                    break;
                case 'SERVICE':
                    $scope.sparams.category = 'SERVICE';
                    break;
            }
        });
        $scope.$watch('sparams.sids.length', function () {
            $scope.sparams.ids = $scope.sparams.sids.join(',');
        });
        var rangeType = function(type){
            if(type==='SHOP'){
                $scope.addParams.shopList = [];
                $scope.sparams.sids.forEach(function (item) {
                    var shopId = {shopId:item};
                    $scope.addParams.shopList.push(shopId);
                })
            }else if(type==='PRODUCT'){
                $scope.addParams.productList = [];
                $scope.sparams.sids.forEach(function (item,index) {
                    var product = {productId:item,limitBuyAmount:'',shopId:$scope.sparams.oids[index]};
                    $scope.addParams.productList.push(product);
                })
            }
        };

        $scope.createAct = function () {//创建活动
            rangeType($scope.addParams.act.rangeType);
            var submitParams = angular.copy($scope.addParams);
            submitParams.act.actStartTime = new Date($scope.addParams.act.actStartTime).getTime();
            submitParams.act.actEndTime = new Date($scope.addParams.act.actEndTime).getTime();
            if($scope.addParams.act.shareType==='RATIO'){
                if(parseInt($scope.addParams.act.branchDiscountPercent||0)+parseInt($scope.addParams.act.merchantDiscountPercent||0)+ parseInt($scope.addParams.act.headDiscountPercent||0)!=100){
                    $scope.$toast('用户减免金额必须为100%！');
                    return false;
                }
            }
            if(editActId){
                marketingService.enoughDiscount.putAct(editActId,submitParams).then(function(res){
                    $state.go('main.enoughDiscount');
                    $scope.$toast('修改成功！');
                },function(err){})
            }else{
                marketingService.enoughDiscount.createAct(submitParams).then(function (res) {
                    $state.go('main.enoughDiscount');
                    $scope.$toast('创建成功！');
                },function (err) {});
            }
        }

    }]).controller('settleDiscountCtrl', ['$scope', '$state','marketingService', function ($scope, $state,marketingService) {//买单减免（线下派券）
        $scope.edParams = {
            index:0,
            size:15
        };
        $scope.confPage = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.queryStatus = [
            {value:'all',name:'全部'},
            {value:'notBegin',name:'未开始'},
            {value:'begin',name:'进行中'},
            {value:'end',name:'已结束'},
            {value:'terminate',name:'已终止'}
        ];
        $scope.$watch('confPage.currentPage + confPage.itemPageLimit', function () {
            searchParams.index = $scope.confPage.currentPage - 1;
            $scope.getList();
        });
        var searchParams = angular.copy($scope.edParams);
        $scope.getList = function(){
            marketingService.settleDiscount.getAct(searchParams).then(function (res) {
                $scope.actList = res.data.content;
                $scope.confPage.total = res.data.total;
            },function (err) {})
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.edParams);
            $scope.getList();
        };
        $scope.discountTypeName = function(value){
            switch (value){
                case 'REDUCE':
                    return '优惠减免';
                    break;
                case 'PERCENT':
                    return '折扣';
                    break;
                default:
                    return '状态出错';
            }
        };
        $scope.rangeTypeName = function(value){
            switch (value){
                case 'ALL':
                    return '全场';
                    break;
                case 'SHOP':
                    return '商铺';
                    break;
                case 'CATEGORY':
                    return '品类';
                    break;
                case 'PRODUCT':
                    return '商品';
                    break;
            }
        };
        $scope.delAct = function(actId){//删除活动
            $scope.$dialog.$confirm({message:'确认删除此活动！'}).then(function(){

            },function(){});
        };
        $scope.terminateAct = function(actId){//终止活动
            $scope.$dialog.open({
                template: 'terminateAct',
                width:500,
                scope:$scope,
                controller:['$scope',function($scope){
                    $scope.terminate = {
                        reason:''
                    };
                    $scope.enter = function(){
                        if($scope.terminate.reason!==''){
                            marketingService.settleDiscount.terminate(actId,$scope.terminate).then(function(res){
                                $scope.$root.$toast('操作成功!');
                                $scope.closeThisDialog(0);
                                $scope.getList();
                            },function(){
                                $scope.getList();
                            })
                        }else{
                            $scope.$toast('终止原因不能为空！');
                        }
                    }
                }]
            });
        };
        $scope.dateNow = new Date();
        $scope.editAct = function(startTime,actId){
            var nowTime = new Date();
            if((startTime-nowTime.getTime())>1800000){
                $state.go('main.addSettleDiscount',{id:actId});
            }else{
                $scope.$toast('活动开始时间小于30分钟不能编辑');
            }
        }
    }]).controller('addSettleDiscountCtrl', ['$scope', '$state','marketingService','$filter', function ($scope, $state,marketingService,$filter) {//新建买单减免（线下派券）
        var editActId = $state.params.id;
        var nowTime = Math.ceil( new Date().getTime() /(30*60*1000) ) * 30*60*1000;
        $scope.canPreheatTime = nowTime + marketingService.seckillAct.seckillCanPreheatTime;
        $scope.addParams = {
            act:{
                rangeType:'ALL',
                categoryType:'REAL',
                shareType:'RATIO',
                discountType:'REDUCE',
                branchDiscountPercent:0
            },
            productList:[],
            shopList:[]
        };
        $scope.sparams = {
            sid: '',
            sids: [],
            oids: [],
            type: 'shop', //shop--选择店铺，product--选择商品
            category:$scope.addParams.act.categoryType //REAL--实物类，SERVICE--服务类
        };
        $scope.discountType = [
            {value:'REDUCE',name:'优惠减免'},
            // {value:'PERCENT',name:'折扣'}
        ];

        $scope.isAmount = function () {
            if(parseInt($scope.addParams.act.orderAmount)<parseInt($scope.addParams.act.discountAmount)){
                $scope.$toast('减金额不能大于满金额！');
                $scope.addParams.act.orderAmount = '';
            }
        };

        if(editActId){//编辑买单减免活动
            marketingService.settleDiscount.actDetail(editActId).then(function(res){
                var data = res.data;
                $scope.addParams = {
                    act:{
                        id:data.act.id,
                        rangeType:data.act.rangeType,
                        categoryType:data.act.categoryType,
                        shareType:data.act.shareType,
                        discountType:data.act.discountType,
                        actStartTime:$filter('date')(data.act.actStartTime, 'yyyy-MM-dd HH:mm:ss'),
                        actEndTime:$filter('date')(res.data.act.actEndTime, 'yyyy-MM-dd HH:mm:ss'),
                        validEndTime:$filter('date')(data.act.validEndTime, 'yyyy-MM-dd HH:mm:ss'),
                        validStartTime:$filter('date')(res.data.act.validStartTime, 'yyyy-MM-dd HH:mm:ss'),
                        actTitle:data.act.actTitle,
                        description:data.act.description,
                        discountAmount:data.act.discountAmount,
                        headDiscountAmount:data.act.headDiscountAmount,
                        headDiscountPercent:data.act.headDiscountPercent,
                        merchantDiscountAmount:data.act.merchantDiscountAmount,
                        merchantDiscountPercent:data.act.merchantDiscountPercent,
                        orderAmount:data.act.orderAmount,
                        branchDiscountPercent:data.act.branchDiscountPercent,
                        totalNum:data.act.totalNum
                    },
                    productList:data.productList,
                    shopList:data.shopList
                };
                console.log(new Date($scope.addParams.act.actStartTime).getTime());
                if(data.act.rangeType==='SHOP'){
                    $scope.addParams.shopList.forEach(function(item){
                        $scope.sparams.sids.push(item.shopId);
                    });
                }else if(data.act.rangeType==='PRODUCT'){
                    $scope.addParams.productList.forEach(function(item){
                        $scope.sparams.sids.push(item.productId);
                    });
                }
            });
        }

        $scope.$watch('addParams.act.rangeType',function(){
            switch ($scope.addParams.act.rangeType){
                case 'SHOP':
                    $scope.sparams.type = 'shop';
                    break;
                case 'PRODUCT':
                    $scope.sparams.type = 'product';
                    break;
            }
        });
        $scope.$watch('addParams.act.categoryType',function () {
            switch ($scope.addParams.act.categoryType){
                case 'REAL':
                    $scope.sparams.category = 'REAL';
                    break;
                case 'SERVICE':
                    $scope.sparams.category = 'SERVICE';
                    break;
            }
        });
        $scope.$watch('sparams.sids.length', function () {
            $scope.sparams.ids = $scope.sparams.sids.join(',');
        });
        var rangeType = function(type){
            if(type==='SHOP'){
                $scope.addParams.shopList = [];
                $scope.sparams.sids.forEach(function (item) {
                    var shopId = {shopId:item};
                    $scope.addParams.shopList.push(shopId);
                })
            }else if(type==='PRODUCT'){
                $scope.addParams.productList = [];
                $scope.sparams.sids.forEach(function (item,index) {
                    var product = {productId:item,limitBuyAmount:'',shopId:$scope.sparams.oids[index]};
                    $scope.addParams.productList.push(product);
                })
            }
        };
        $scope.createAct = function () {//创建活动
            rangeType($scope.addParams.act.rangeType);
            var submitParams = angular.copy($scope.addParams);
            submitParams.act.actStartTime = new Date($scope.addParams.act.actStartTime).getTime();
            submitParams.act.actEndTime = new Date($scope.addParams.act.actEndTime).getTime();
            submitParams.act.validStartTime = new Date($scope.addParams.act.validStartTime).getTime();
            submitParams.act.validEndTime = new Date($scope.addParams.act.validEndTime).getTime();
            if($scope.addParams.act.shareType==='RATIO'){
                if(parseInt($scope.addParams.act.branchDiscountPercent||0)+parseInt($scope.addParams.act.merchantDiscountPercent||0)+ parseInt($scope.addParams.act.headDiscountPercent||0)!=100){
                    $scope.$toast('用户减免金额必须为100%！');
                    return false;
                }
            }
            if(editActId){
                marketingService.settleDiscount.putAct(editActId,submitParams).then(function(res){
                    $state.go('main.settleDiscount');
                    $scope.$toast('修改成功！');
                },function(err){})
            }else{
                marketingService.settleDiscount.createAct(submitParams).then(function (res) {
                    console.log($scope.addParams);
                    $state.go('main.settleDiscount');
                    $scope.$toast('创建成功！');
                },function (err) {});
            }
        }
    }]).controller('discountDetailCtrl',['$scope','$state','marketingService','shopService','goodsService','$cookie',function ($scope, $state,marketingService,shopService,goodsService,$cookie) {
        var actId = $state.params.id;
        $scope.mkType = $state.params.type;
        $scope.discountTypeName = function(value){
            switch (value){
                case 'REDUCE':
                    return '优惠减免';
                    break;
                case 'PERCENT':
                    return '折扣';
                    break;
                case 'discount':
                    return '减免';
                    break;
                case 'allFree':
                    return '全免';
                    break;
                case 'everyDiscount':
                    return '每满减';
                    break;
                case 'overDiscount':
                    return '满减';
                    break;
                case 'ALL':
                    return '全场';
                    break;
                case 'SHOP':
                    return '指定店铺';
                    break;
                case 'CATEGORY':
                    return '指定品类';
                    break;
                case 'PRODUCT':
                    return '指定商品';
                    break;
                default:
                    return '状态出错';
            }
        };
        $scope.shareType = function(obj){
            switch (obj.shareType){
                case 'FIXED':
                    $scope.shareTypeStr = '固定金额:银行固定承担部分：'+obj.headDiscountAmount;
                    break;
                case 'RATIO':
                    $scope.shareTypeStr = '按比例：银行承担'+obj.headDiscountPercent+'%，店铺承担部分'+obj.merchantDiscountPercent+'%，其它'+obj.branchDiscountPercent+'%';
                    break;
            }
        };
        $scope.rangeTypeName = function(value){
            switch (value){
                case 'ALL':
                    return '全场';
                    break;
                case 'SHOP':
                    return '指定商铺';
                    break;
                case 'CATEGORY':
                    return '指定品类';
                    break;
                case 'PRODUCT':
                    return '指定商品';
                    break;
            }
        };
        if($scope.mkType==='mkmlj'){
            $scope.mkTitle = '满立减活动详情';
            marketingService.enoughDiscount.actDetail(actId).then(function(res){
                $scope.actInfo = res.data.act;
                $scope.actShopList = res.data.shopList;
                $scope.actProductList = res.data.productList;
                $scope.shareType($scope.actInfo);
            });
        }else if($scope.mkType==='mkcard'){
            $scope.mkTitle = '买单优惠(线下派券)详情';
            marketingService.settleDiscount.actDetail(actId).then(function(res){
                $scope.actInfo = res.data.act;
                $scope.actShopList = res.data.shopList;
                $scope.actProductList = res.data.productList;
                $scope.shareType($scope.actInfo);
            })
        }else if($scope.mkType==='mkfreight'){
            $scope.mkTitle = '满减运费详情';
            marketingService.freightDiscount.actDetail(actId).then(function(res){
                $scope.actInfo = res.data.act;
                $scope.actShopList = res.data.shopList;
                $scope.actProductList = res.data.productList;
                $scope.shareType($scope.actInfo);
            })
        }else{
            $scope.$toast('活动类型错误！');
        };
        $scope.showList = function(type,category){
            $scope.$dialog.open({
                template: 'showList',
                width: 750,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    var userInfo = $cookie('userInfo');
                    $scope.productParams = {//获取商品所需参数
                        index: 0,
                        size: 10,
                        auditStatus:3,
                        ids:''
                    };
                    $scope.shopParams = {//获取店铺所需参数
                        index: 0,
                        size: 10,
                        ids:''
                    };
                    $scope.conf = {
                        total: 1,
                        currentPage: 1,
                        itemPageLimit: 10,
                        isLinkPage: true,
                        type:type
                    };
                    if(category==='REAL'){
                        $scope.shopParams.categoryType = 0;
                    }else if(category==='SERVICE'){
                        $scope.shopParams.categoryType = 1;
                    }
                    var ids = [];
                    if(type==='SHOP'){
                        $scope.dialogTitle = '活动商户名单';
                        $scope.actShopList.forEach(function(item){
                            ids.push(item.shopId);
                            $scope.shopParams.ids = ids.join(',');
                        });
                        shopService.shopList($scope.shopParams).then(function (res) {
                            $scope.mkList = res.data.content;
                            $scope.conf.total = res.data.total;
                        });
                    }else if(type==='PRODUCT'){
                        $scope.dialogTitle = '活动商品名单';
                        $scope.actProductList.forEach(function(item){
                            ids.push(item.productId);
                            $scope.productParams.ids = ids.join(',');
                        });
                        goodsService.getProducts($scope.productParams,$scope.shopParams.categoryType).then(function (res) {
                            $scope.mkList = res.data.content;
                            $scope.conf.total = res.data.total;
                        });
                    }
                }]
            })
        }
    }]).controller('couponDiscountCtrl', ['$scope', '$state', 'marketingService', function ($scope, $state, marketingService) {//平台优惠券
        $scope.couponActStatus = marketingService.couponDiscount.couponActStatus();
        $scope.dateNow = new Date().getTime();

        //查询参数处理
        $scope.params = {
            index:0,
            size: itemPageLimit,
            status : 'all'
        };
        //分页参数
        $scope.conf = {
            total : 1,
            currentPage : 1,
            itemPageLimit : $scope.params.size,
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
            marketingService.couponDiscount.getActs($scope.params).then(function (res) {
                $scope.actList = res.data.content;
                $scope.conf.total = res.data.total;
            }, function (err) {
            });
        };

        $scope.terminateAct = function(actId){//终止活动
            $scope.$dialog.open({
                template: 'terminateAct',
                width:500,
                scope:$scope,
                controller:['$scope',function($scope){
                    $scope.terminate = {
                        reason:''
                    };
                    $scope.enter = function(){
                        if($scope.terminate.reason!=''){
                            marketingService.couponDiscount.terminate(actId,$scope.terminate).then(function(res){
                                $scope.$root.$toast('操作成功!');
                                $scope.closeThisDialog(0);
                                $scope.getList();
                            },function(){
                                $scope.getList();
                            })
                        }else{
                            $scope.$root.$toast('请输入终止原因！');
                        }
                    }
                }]
            });
        };
        $scope.editAct = function(act){  //编辑活动
            if((act.actStartTime - new Date().getTime())>1800000){
                $state.go('main.modifyCouponDiscount',{id:act.id});
            }else{
                $scope.$toast('活动开始时间小于30分钟不能编辑');
            }
        }
    }]).controller('addCouponDiscountCtrl', ['$scope', '$state', 'marketingService', '$filter', function ($scope, $state, marketingService, $filter) {//新建平台优惠券
        $scope.nowDate = new Date();
        var editActId = $state.params.id;
        $scope.isEdit = false;
        $scope.addParams = {
            act:{
                rangeType:'SHOP',
                categoryType:'REAL',
                shareType:'RATIO',
                quantityType:'UNLIMIT',
                branchDiscountPercent:0
            },
            productList:[],
            shopList:[]
        };
        $scope.sparams = {
            sid: '',
            sids: [],
            type: 'shop', //shop--选择店铺，product--选择商品
            category:$scope.addParams.act.categoryType //REAL--实物类，SERVICE--服务类
        };

        var isInit = false;
        if(editActId){//编辑满立减活动
            isInit = true;
            $scope.isEdit = true;
            marketingService.couponDiscount.actDetail(editActId).then(function(res){
                var data = res.data;

                data.act.actStartTime = $filter('date')(data.act.actStartTime, 'yyyy-MM-dd HH:mm:ss');
                data.act.actEndTime = $filter('date')(data.act.actEndTime, 'yyyy-MM-dd HH:mm:ss');
                //优惠券有效期处理
                switch(data.act.validTimeType){
                    case 'BETWEEN':     //指定时间
                        data.act.validStartTime = $filter('date')(data.act.validStartTime, 'yyyy-MM-dd HH:mm:ss');
                        data.act.vEndTime = $filter('date')(data.act.validStartTime, 'yyyy-MM-dd HH:mm:ss');
                        break;
                    case 'DATE':        //领取成功日至
                        data.act.vTime = $filter('date')(data.act.validStartTime, 'yyyy-MM-dd HH:mm:ss');
                        break;
                    case 'DAYS':        //领取成功后多少天
                        break;
                }
                $scope.addParams = data;
                if(data.act.rangeType==='SHOP'){
                    $scope.addParams.shopList.forEach(function(item){
                        $scope.sparams.sids.push(item.shopId);
                    });
                }else if(data.act.rangeType==='PRODUCT'){
                    $scope.addParams.productList.forEach(function(item){
                        $scope.sparams.sids.push(item.productId);
                    });
                }
                window.onreadystatechange = function () {
                    isInit = false;
                }
            });
        }
        $scope.$watch('addParams.act.rangeType',function(){     //活动适用范围更改
            switch ($scope.addParams.act.rangeType){
                case 'SHOP':
                    $scope.sparams.type = 'shop';
                    break;
                case 'PRODUCT':
                    $scope.sparams.type = 'product';
                    break;
            }
            if(!isInit) {
                $scope.sparams.sids = [];
            }
        });
        $scope.$watch('addParams.act.categoryType',function () {    //店铺或商品类型更改
            switch ($scope.addParams.act.categoryType){
                case 'REAL':
                    $scope.sparams.category = 'REAL';
                    break;
                case 'SERVICE':
                    $scope.sparams.category = 'SERVICE';
                    break;
            }
            if(!isInit) {
                $scope.sparams.sids = [];
            }
        });
        $scope.$watch('sparams.sids.length', function () {
            $scope.sparams.ids = $scope.sparams.sids.join(',');
        });
        var rangeType = function(type){     //处理活动适用范围
            if(type==='SHOP'){
                $scope.addParams.shopList = [];
                $scope.sparams.sids.forEach(function (item) {
                    var shopId = {shopId:item};
                    $scope.addParams.shopList.push(shopId);
                })
            }else if(type==='PRODUCT'){
                $scope.addParams.productList = [];
                $scope.sparams.sids.forEach(function (item) {
                    var product = {productId:item,limitBuyAmount:'',shopId:$scope.sparams.oids[index]};
                    $scope.addParams.productList.push(product);
                })
            }
        };
        $scope.createAct = function () {//创建活动
            rangeType($scope.addParams.act.rangeType);
            var params = {};
            angular.copy($scope.addParams,params);
            params.act.actStartTime = new Date($scope.addParams.act.actStartTime).getTime();
            params.act.actEndTime = new Date($scope.addParams.act.actEndTime).getTime();

            //优惠券有效期处理
            switch($scope.addParams.act.validTimeType){
                case 'BETWEEN':     //指定时间
                    params.act.validStartTime = new Date($scope.addParams.act.validStartTime).getTime();
                    params.act.validEndTime = new Date($scope.addParams.act.vEndTime).getTime();
                    delete(params.act.vEndTime);
                    delete(params.act.vTime);
                    delete(params.act.validDays);
                    break;
                case 'DATE':        //领取成功日至
                    params.act.validEndTime = new Date($scope.addParams.act.vTime).getTime();
                    delete(params.act.validStartTime);
                    delete(params.act.vEndTime);
                    delete(params.act.vTime);
                    delete(params.act.validDays);
                    break;
                case 'DAYS':        //领取成功后多少天
                    delete(params.act.validStartTime);
                    delete(params.act.vEndTime);
                    delete(params.act.vTime);
                    break;
            }

            if($scope.addParams.act.shareType==='RATIO'){
                if(parseInt($scope.addParams.act.branchDiscountPercent||0)+parseInt($scope.addParams.act.merchantDiscountPercent||0)+ parseInt($scope.addParams.act.headDiscountPercent||0)!=100){
                    $scope.$toast('用户减免金额必须为100%！');
                    return false;
                }
            }
            if(editActId){
                marketingService.couponDiscount.putAct(editActId,params).then(function(res){
                    $state.go('main.couponDiscount');
                    $scope.$toast('修改成功！');
                },function(err){})
            }else{
                marketingService.couponDiscount.createAct(params).then(function (res) {
                    $state.go('main.couponDiscount');
                    $scope.$toast('创建成功！');
                },function (err) {});
            }
        }

    }]).controller('couponReceiveRecordCtrl', ['$scope', '$state', function ($scope, $state) {//平台优惠券领取记录

    }]).controller('couponDiscountDetailCtrl', ['$scope', '$state', 'marketingService', '$filter', 'shopService', function ($scope, $state, marketingService, $filter, shopService) {//平台优惠券详情
        var actId = $state.params.id;
        if(!actId){
            $scope.$toast('非法请求');
            $state.go('main.couponDiscount');
            return false;
        }
        marketingService.couponDiscount.actDetail(actId).then(
            function (res) {
                $scope.actInfo = res.data.act;
                $scope.actShopList = res.data.shopList;
                $scope.actProductList = res.data.productList;
                $scope.shareType($scope.actInfo);
                $scope.validTxt = '';
                //优惠券有效期处理
                switch(res.data.act.validTimeType){
                    case 'BETWEEN':     //指定时间
                        $scope.validTxt = $filter('date')(res.data.act.validStartTime, 'yyyy-MM-dd HH:mm:ss') + ' 至 '
                                        + $filter('date')(res.data.act.validEndTime, 'yyyy-MM-dd HH:mm:ss');
                        break;
                    case 'DATE':        //领取成功日至
                        $scope.validTxt = '领取成功日至' + $filter('date')(res.data.act.validEndTime, 'yyyy-MM-dd HH:mm:ss');
                        break;
                    case 'DAYS':        //领取成功后多少天
                        $scope.validTxt = '领取成功后' + res.data.act.validDays + '天内有效';
                        break;
                }

            },
            function (err) {
            }
        );
        $scope.shareType = function(obj){
            switch (obj.shareType){
                case 'FIXED':
                    $scope.shareTypeStr = '固定金额:银行固定承担部分：'+obj.headDiscountAmount;
                    break;
                case 'RATIO':
                    $scope.shareTypeStr = '按比例：银行承担'+obj.headDiscountPercent+'%，店铺承担部分'+obj.merchantDiscountPercent+'%，其他' + obj.branchDiscountPercent + '%';
                    break;
            }
        };

        $scope.showList = function(type,category){
            $scope.$dialog.open({
                template: 'showList',
                width: 750,
                scope: $scope,
                controller: ['$scope', function ($scope) {
                    $scope.shopParams = {//获取店铺所需参数
                        index: 0,
                        size: 10,
                        ids:''
                    };
                    $scope.conf = {
                        total: 1,
                        currentPage: 1,
                        itemPageLimit: 10,
                        isLinkPage: true,
                        type:type
                    };
                    if(category==='REAL'){
                        $scope.shopParams.categoryType = 0;
                    }else if(category==='SERVICE'){
                        $scope.shopParams.categoryType = 1;
                    }
                    var ids = [];
                    if(type==='SHOP'){
                        $scope.dialogTitle = '活动商户名单';
                        $scope.actShopList.forEach(function(item){
                            ids.push(item.shopId);
                            $scope.shopParams.ids = ids.join(',');
                        });
                        shopService.shopList($scope.shopParams).then(function (res) {
                            $scope.mkList = res.data.content;
                            $scope.conf.total = res.data.total;
                        });
                    }
                }]
            })
        }

    }]).controller('enoughFreeFreightCtrl', ['$scope', '$state','marketingService', function ($scope, $state,marketingService) {//满减运费
        $scope.edParams = {
            index:0,
            size:15
        };
        $scope.confPage = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isSelectPage: false,
            isLinkPage: true
        };
        $scope.queryStatus = [
            {value:'all',name:'全部'},
            {value:'notBegin',name:'未开始'},
            {value:'begin',name:'进行中'},
            {value:'end',name:'已结束'},
            {value:'terminate',name:'已终止'}
        ];
        $scope.$watch('confPage.currentPage + confPage.itemPageLimit', function () {
            searchParams.index = $scope.confPage.currentPage - 1;
            $scope.getList();
        });
        var searchParams = angular.copy($scope.edParams);
        $scope.getList = function(){
            marketingService.freightDiscount.getAct(searchParams).then(function (res) {
                $scope.actList = res.data.content;
                $scope.confPage.total = res.data.total;
            },function (err) {})
        };
        $scope.getSearch = function () {
            searchParams = angular.copy($scope.edParams);
            $scope.getList();
        };
        $scope.discountTypeName = function(value){
            switch (value){
                case 'discount':
                    return '减免';
                    break;
                case 'allFree':
                    return '全免';
                    break;
                default:
                    return '状态出错';
            }
        };
        $scope.rangeTypeName = function(value){
            switch (value){
                case 'ALL':
                    return '全场';
                    break;
                case 'SHOP':
                    return '商铺';
                    break;
                case 'CATEGORY':
                    return '品类';
                    break;
                case 'PRODUCT':
                    return '商品';
                    break;
            }
        };
        $scope.delAct = function(actId){//删除活动
            $scope.$dialog.$confirm({message:'确认删除此活动！'}).then(function(){},function(){});
        };
        $scope.terminateAct = function(actId){//终止活动
            $scope.$dialog.open({
                template: 'terminateAct',
                width:500,
                scope:$scope,
                controller:['$scope',function($scope){
                    $scope.terminate = {
                        reason:''
                    };
                    $scope.enter = function(){
                        if($scope.terminate.reason!==''){
                            marketingService.freightDiscount.terminate(actId,$scope.terminate).then(function(res){
                                $scope.$root.$toast('操作成功!');
                                $scope.closeThisDialog(0);
                                $scope.getList();
                            },function(){
                                $scope.getList();
                            })
                        }else{
                            $scope.$toast('终止原因不能为空！');
                        }
                    }
                }]
            });
        };
        $scope.dateNow = new Date();
        $scope.editAct = function(startTime,actId){
            var nowTime = new Date();
            if((startTime-nowTime.getTime())>1800000){
                $state.go('main.addEnoughFreeFreight',{id:actId});
            }else{
                $scope.$toast('活动开始时间小于30分钟不能编辑');
            }
        }
    }]).controller('addEnoughFreeFreightCtrl', ['$scope', '$state','marketingService','$filter','$timeout', function ($scope, $state,marketingService,$filter,$timeout) {//新建满减运费
        var editActId = $state.params.id;
        var nowTime = Math.ceil( new Date().getTime() /(30*60*1000) ) * 30*60*1000;
        $scope.canPreheatTime = nowTime + marketingService.seckillAct.seckillCanPreheatTime;
        $scope.addParams = {
            act:{
                rangeType:'ALL',
                categoryType:'REAL',
                shareType:'RATIO',
                discountType:'discount',
                branchDiscountPercent:0
            },
            productList:[],
            shopList:[]
        };
        $scope.sparams = {
            sid: '',
            sids: [],
            oids:[],
            type: 'shop', //shop--选择店铺，product--选择商品
            category:$scope.addParams.act.categoryType //REAL--实物类，SERVICE--服务类
        };

        $scope.isAmount = function () {
            if($scope.addParams.act.discountType==='discount'){
                if(parseInt($scope.addParams.act.orderAmount)<parseInt($scope.addParams.act.discountAmount)){
                    $scope.$toast('减金额不能大于满金额！');
                    $scope.addParams.act.discountAmount = '';
                }
            }
        };
        if(editActId){//编辑满减运费
            marketingService.freightDiscount.actDetail(editActId).then(function(res){
                var data = res.data;
                $scope.addParams = {
                    act:{
                        id:data.act.id,
                        rangeType:data.act.rangeType,
                        categoryType:data.act.categoryType,
                        shareType:data.act.shareType,
                        discountType:data.act.discountType,
                        actStartTime:$filter('date')(data.act.actStartTime, 'yyyy-MM-dd HH:mm:ss'),
                        actEndTime:$filter('date')(res.data.act.actEndTime, 'yyyy-MM-dd HH:mm:ss'),
                        actTitle:data.act.actTitle,
                        description:data.act.description,
                        discountAmount:data.act.discountAmount,
                        headDiscountAmount:data.act.headDiscountAmount,
                        headDiscountPercent:data.act.headDiscountPercent,
                        merchantDiscountAmount:data.act.merchantDiscountAmount,
                        merchantDiscountPercent:data.act.merchantDiscountPercent,
                        orderAmount:data.act.orderAmount,
                        branchDiscountPercent:data.act.branchDiscountPercent
                    },
                    productList:data.productList,
                    shopList:data.shopList
                };
                if(data.act.rangeType==='SHOP'){
                    data.shopList.forEach(function(item){
                        $scope.sparams.sids.push(item.shopId);
                    });
                }else if(data.act.rangeType==='PRODUCT'){
                    data.productList.forEach(function(item){
                        $scope.sparams.sids.push(item.productId);
                    });
                }
                if(data.act.discountType==='allFree'){
                    $scope.orderAmount = data.act.orderAmount;
                }
            });
        }

        $scope.$watch('addParams.act.rangeType',function(){
            switch ($scope.addParams.act.rangeType){
                case 'SHOP':
                    $scope.sparams.type = 'shop';
                    break;
                case 'PRODUCT':
                    $scope.sparams.type = 'product';
                    break;
            }
        });
        $scope.$watch('addParams.act.categoryType',function () {
            switch ($scope.addParams.act.categoryType){
                case 'REAL':
                    $scope.sparams.category = 'REAL';
                    break;
                case 'SERVICE':
                    $scope.sparams.category = 'SERVICE';
                    break;
            }
        });
        $scope.$watch('sparams.sids.length', function () {
            $scope.sparams.ids = $scope.sparams.sids.join(',');
        });
        var rangeType = function(type){
            if(type==='SHOP'){
                $scope.addParams.shopList = [];
                $scope.sparams.sids.forEach(function (item) {
                    var shopId = {shopId:item};
                    $scope.addParams.shopList.push(shopId);
                })
            }else if(type==='PRODUCT'){
                $scope.addParams.productList = [];
                $scope.sparams.sids.forEach(function (item,index) {
                    var product = {productId:item,limitBuyAmount:'',shopId:$scope.sparams.oids[index]};
                    $scope.addParams.productList.push(product);
                })
            }
        };

        $scope.createAct = function () {//创建活动
            rangeType($scope.addParams.act.rangeType);
            var submitParams = angular.copy($scope.addParams);
            if($scope.addParams.act.discountType==='allFree'){
                $scope.addParams.act.orderAmount = $scope.orderAmount;
                submitParams = angular.copy($scope.addParams);
            }else if($scope.addParams.act.discountType==='discount'&&$scope.addParams.act.discountAmount===''){
                $scope.$toast('活动规则不能为空');
            }
            if($scope.addParams.act.shareType==='RATIO'){
                if(parseInt($scope.addParams.act.branchDiscountPercent||0)+parseInt($scope.addParams.act.merchantDiscountPercent||0)+ parseInt($scope.addParams.act.headDiscountPercent||0)!=100){
                    $scope.$toast('用户减免金额必须为100%！');
                    return false;
                }
            }
            submitParams.act.actStartTime = new Date($scope.addParams.act.actStartTime).getTime();
            submitParams.act.actEndTime = new Date($scope.addParams.act.actEndTime).getTime();
            if($scope.addParams.act.orderAmount&&$scope.addParams.act.orderAmount!==''){
                if(editActId){
                    marketingService.freightDiscount.putAct(editActId,submitParams).then(function(res){
                        $state.go('main.enoughFreeFreight');
                        $scope.$toast('修改成功！');
                    },function(err){})
                }else{
                    marketingService.freightDiscount.createAct(submitParams).then(function (res) {
                        $state.go('main.enoughFreeFreight');
                        $scope.$toast('创建成功！');
                    },function (err) {});
                }
            }else{
                $scope.$toast('满金额不能为空!');
            }
        }
    }]);

    var shopList = function (id, dialog) {//参加商户列表
        dialog.open({
            template: 'actShop',
            width: 800,
            controller: ['$scope', function ($scope) {
                console.log('查看参加商户列表');
                $scope.confShop = {
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
                $scope.$watch('confShop.currentPage + confShop.itemPageLimit', function (news) {
                    // 把你的http请求放到这里
                    console.log($scope.confShop.currentPage, $scope.confShop.itemPageLimit)
                });
            }]
        });
    };
    //检查表单
    var formVerify = function (form) {
        var err = form.$error;
        for (type in err) {
            var len = err[type].length;
            for (var i = 0; i < len; i++) {
                var item = err[type][i];
                if (!item.$valid) {
                    form[item.$name].$touched = true;
                }
            }
        }
    };
});