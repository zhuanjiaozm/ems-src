define(function(require){
    var app = require('app');
    require('app/components/form.check.js');
    app.directive('ngSettle',['$template','$timeout',function ($template,$timeout) {
        return {
            restrict:'AE',
            replace:true,
            scope:{
                addParams:'='
            },
            templateUrl:$template('template/settlement'),
            link:function($scope,element,attr){
                $scope.addParams.act.branchDiscountAmount = 0;
                $scope.discountPercent = function () {
                    if(
                        parseInt($scope.addParams.act.branchDiscountPercent||0)+
                        parseInt($scope.addParams.act.merchantDiscountPercent||0)+
                        parseInt($scope.addParams.act.headDiscountPercent||0)>100
                    ){
                        $scope.$root.$toast('比例总和不能超过100%');
                        $scope.addParams.act.headDiscountPercent = '';
                        $scope.addParams.act.merchantDiscountPercent='';
                        return false;
                    }
                };
                $scope.discountAmount = function () {
                    if(
                        parseInt($scope.addParams.act.headDiscountAmount||0)+
                        parseInt($scope.addParams.act.merchantDiscountAmount||0)+
                        parseInt($scope.addParams.act.branchDiscountAmount||0)>parseInt($scope.addParams.act.discountAmount||0)
                    ){
                        $scope.$root.$toast('比例总和不能超过减免金额');
                        $scope.addParams.act.merchantDiscountAmount = '';
                        $scope.addParams.act.branchDiscountAmount='';
                        return false;
                    }
                }
            }
        }
    }]);
});