define(function (require) {
    var app = require('app');
    require('/app/services/agent.service.js');
    app.useModule(['agent.service']);

    var itemPageLimit = 15;
    app.controller('agentListCtrl', ['$scope','agentService', function ($scope,agentService) {
        $scope.conf = {
            total: 1,
            currentPage: 1,
            itemPageLimit: itemPageLimit,
            isLinkPage: true
        };
        $scope.agentParams = {
            index: 0,
            size: itemPageLimit
        };
        var searchParams = angular.copy($scope.agentParams);
        $scope.$watch('conf.currentPage', function () {
            searchParams.index = ( $scope.conf.currentPage - 1 ) * $scope.conf.itemPageLimit;
            $scope.getAgents();
        });
        $scope.getAgents = function(){
            agentService.getAgent(searchParams).then(function(res){
                $scope.agents = res.data.content;
                $scope.conf.total = res.data.total;
            })
        };
        $scope.getSearch = function(){
            searchParams = angular.copy($scope.agentParams);
            $scope.getAgents();
        };
        $scope.deleteAgent = function (id) {
            $scope.$dialog.$confirm({message:'确认删除此供应商信息？'}).then(function () {
                agentService.deleteAgent(id).then(function () {
                    $scope.$toast('操作成功！');
                    $scope.getAgents();
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
        $scope.setAmount = function (id) {
            $scope.$dialog.open({
                template: "amount",
                width: 500,
                scope: $scope,
                controller:['$scope',function ($scope) {
                    $scope.enter = function () {
                        agentService.couponAgentsAmount(id,$scope.amount).then(function (res) {
                            $scope.closeThisDialog(0);
                            $scope.$toast('操作成功！');
                        })
                    };
                }]
            });
        }
    }]).controller('addAgentCtrl',['$scope','$state','agentService','$timeout', function ($scope,$state,agentService,$timeout){
        $scope.agentStatus = true;
        $scope.agentId = $state.params.id||'';
        $scope.agentInfo = {
            status:$scope.agentStatus?1:2
        };
        $scope.isLoading = false;
        if($scope.agentId){
            $scope.isLoading = true;
            agentService.detailAgent($scope.agentId).then(function (res) {
                $scope.isLoading = false;
                $scope.item = res.data;
                $scope.agentInfo = {
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
                    agentId:$scope.item.agentId,
                    contacts:$scope.item.contacts,
                    contactsMobile:$scope.item.contactsMobile
                };
            });
        }
        $scope.submitAgent = function(){
            console.log($scope.agentInfo);
            agentService.postAgent($scope.agentInfo,$scope.agentId).then(function () {
                $scope.$toast('操作成功!');
                $state.go('main.agentList');
            })
        }
    }]);
});