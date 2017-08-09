define(function (require) {
    var app = require('app');
    require('/app/services/supplier.service.js');
    app.useModule(['supplier.service']);

    var itemPageLimit = 15;
    app.controller('supplierListCtrl', ['$scope','supplierService', function ($scope,supplierService) {
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };
        $scope.supplierParams = {
            index: 0,
            size: itemPageLimit
        };
        var searchParams = angular.copy($scope.supplierParams);
        $scope.$watch('conf.currentPage', function () {
            searchParams.index = ( $scope.conf.currentPage - 1 ) * $scope.conf.itemPageLimit;
            $scope.getSuppliers();
        });
        $scope.getSuppliers = function(){
            supplierService.getSupplier(searchParams).then(function(res){
                $scope.suppliers = res.data.content;
                $scope.conf.total = res.data.total;
            })
        };
        $scope.getSearch = function(){
            searchParams = angular.copy($scope.supplierParams);
            $scope.getSuppliers();
        };
        $scope.deleteSupplier = function (id) {
            $scope.$dialog.$confirm({message:'确认删除此供应商信息？'}).then(function () {
                supplierService.deleteSupplier(id).then(function () {
                    $scope.$toast('操作成功！');
                    $scope.getSuppliers();
                })
            })
        };
        $scope.statusName = function(value) {
            switch (value) {
                case "1":
                    return "可用";
                case "2":
                    return "不可用";
                default:
                    return "状态出错";
            }
        };
    }]).controller('addSupplierCtrl',['$scope','$state','supplierService','$timeout', function ($scope,$state,supplierService,$timeout){
        $scope.supplierStatus = true;
        var supplierId = $state.params.id||'';
        $scope.supplierInfo = {
            status:$scope.supplierStatus?1:2
        };
        $scope.isLoading = false;
        if(supplierId){
            $scope.isLoading = true;
            supplierService.detailSupplier(supplierId).then(function (res) {
                $scope.item = res.data;
                $scope.supplierInfo = {
                    account:$scope.item.account,
                    addressDetail:$scope.item.addressDetail,
                    city:$scope.item.city,
                    cityName:$scope.item.cityName,
                    district:$scope.item.district,
                    districtName:$scope.item.districtName,
                    orgName:$scope.item.orgName,
                    organizeId:$scope.item.organizeId,
                    organizeIds:$scope.item.organizeIds,
                    province:$scope.item.province,
                    provinceName:$scope.item.provinceName,
                    name:$scope.item.name,
                    code:$scope.item.code,
                    supplierId:$scope.item.supplierId,
                    contacts:$scope.item.contacts,
                    contactsMobile:$scope.item.contactsMobile
                };
                $scope.isLoading = false;
            });
        }
        $scope.submitSupplier = function(){
            console.log($scope.supplierInfo);
            supplierService.postSupplier($scope.supplierInfo,supplierId).then(function () {
                $scope.$toast('操作成功!');
                $state.go('main.supplierList');
            })
        }
    }]);
});