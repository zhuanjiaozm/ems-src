"use strict";

define(function (require) {
    var app = require('app');
    require('app/services/cats.service.js');
    app.useModule(['cats.service']);
    app.directive('ngCategory', ['catsService','$template',function (catsService,$template) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel:'=',
                categoryType:'='
            },
            templateUrl: $template('template/category'),
            link: function ($scope, element, attr) {
                $scope.catsList = {};
                $scope.parentId ='';
                $scope.getCats = function(element,item){
                    if(!item||item.isParent){
                        catsService.catsList(item?item.id:'').then(function(res){
                            $scope.catsList[element] = res.data;
                        });
                    }
                };
                $scope.selectItem = function(lv){
                    switch (lv){
                        case 1:
                            if($scope.levelFirst) {
                                $scope.getCats('secondCate', $scope.levelFirst);
                                $scope.ngModel[0] = $scope.levelFirst.id;
                                $scope.ngModel.length = 1;
                            }else{
                                $scope.ngModel[0] = '';
                                $scope.ngModel.length = 1;
                            }
                            break;
                        case 2:
                            $scope.getCats('thirdCate',$scope.levelSecond);
                            if($scope.levelSecond){
                                $scope.ngModel[1] = $scope.levelSecond.id;
                                $scope.ngModel.length = 2;
                            }
                            break;
                        case 3:
                            if($scope.levelThird) {
                                $scope.ngModel[2] = $scope.levelThird.id;
                            }
                            break;
                    }
                };
                $scope.getCats('firstCate',$scope.categoryType);
            }
        }
    }]);
});