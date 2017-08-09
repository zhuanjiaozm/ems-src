define(function(require) {
    var app = require("app");
    require("jOrgChart");
    require("/app/services/member.service.js");
    require("/app/services/system.service.js");
    require("app/components/selectComponent.js");
    require("/app/components/jOrgChart.js");
    var itemPageLimit = 15;

    app.useModule(["jOrgChart", "system.service"]);
    app.controller("devicesCtrl", ["$scope", "$state", "systemService", "$rootScope", "apiUri", function($scope, $state, systemService, $rootScope, apiUri) {
        // $scope.conf = {
        //     total: 1,
        //     currentPage: 1,
        //     itemPageLimit: itemPageLimit,
        //     isLinkPage: true
        // };
        // $scope.add = {
        //     siteName: ""
        // };
        // systemService.getRegin(100000).then(
        //     function(res) {
        //         $scope.proviceArray = res.data;
        //     },
        //     function(err) {
        //         console.log(err);
        //     }
        // );
        // $scope.queryCites = function(proviceID) {
        //     systemService.getRegin(proviceID).then(
        //         function(res) {
        //             $scope.citiesArray = res.data;
        //         },
        //         function(err) {
        //             console.log(err);
        //         }
        //     );
        // };
        // $scope.saveCity = function(cityId) {
        //     for (var i = $scope.citiesArray.length - 1; i >= 0; i--) {
        //         if ($scope.citiesArray[i].id == cityId) {
        //             $scope.add.siteName = $scope.citiesArray[i].cname;
        //             return false;
        //         }
        //     }
        // };
        // $scope.getSitesArray = function(params) {
        //     params.size = 1000;
        //     params.index = 0;
        //     systemService.getSites(params).then(
        //         function(res) {
        //             $scope.sitesArray = res.data.content;
        //             //$scope.conf.total = res.data.total;
        //         },
        //         function(err) {
        //             console.log(err);
        //         }
        //     );
        // };
        // $scope.getParams = {
        //     index: 0,
        //     size: 1000
        // };
    }]);
    app.controller("spaceCtrl", ["$scope", "$state", "systemService", "$rootScope", "apiUri", function($scope, $state, systemService, $rootScope, apiUri) {
        systemService.getSpaceList().then(
            function(res) {
                $scope.list = res.tree;
            },
            function(err) {
                console.log(err);
            }
        );
    }]);
});