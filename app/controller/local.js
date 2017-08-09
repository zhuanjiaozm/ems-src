define(function(require) {
    var app = require('app');
    require('ztree');
    require('/app/services/local.service.js');
    require('/app/services/system.service.js');

    app.useModule(['local.service','system.service']);
    app.controller('localCommunityCtrl', ['systemService','localService','$scope', function(systemService,localService,$scope) {
        systemService.getRegin(100000)
            .then(function(res) {
                $scope.proviceArray = res.data;
            }, function(err) {
                console.log(err);
            });
        $scope.queryCites = function(proviceID) {
            systemService.getRegin(proviceID)
                .then(function(res) {
                    $scope.citiesArray = res.data;
                }, function(err) {
                    console.log(err);
                });
        };
        



        //新增地方馆
        $scope.add = function() {
            $scope.$dialog.open({
                template: 'add',
                width: 600,
                scope: $scope,
                controller: ['$scope', function($scope) {
                    $scope.m = '';
                }]
            });
        };
    }]);
});
