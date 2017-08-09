"use strict";
define(function(require,exports,module){
    var angular = require('angular'),
    examineService = require('app/services/examine.service.js'),
    examineComponent = angular.module('examineComponent' , []);

    var examineType = {
        'merchant' : 'auditMerchantWorkFlow',
        'shop' : 'auditShopWorkFlow',
        'goods' : 'auditProductWorkFlow',
        'advert' : 'auditAdvertWorkFlow',
        'information' : 'auditInformationWorkFlow',
        'announcement' : 'auditAnnouncementWorkFlow',
        'cardCoupon' : 'auditCardCouponWorkFlow'
    };
    var rtState = {
        'merchant' : 'main.merchantExamine',
        'shop' : 'main.shopExamine',
        'goods' : 'main.goodsExamine',
        'advert' : 'main.advertExamine',
        'information' : 'main.informationExamine',
        'announcement' : 'main.announcementExamine',
        'cardCoupon' : 'main.cardCouponExamine'
    };

    //审核表单
    examineComponent.directive('examineForm', ['$template','examineService','$state', function($template, examineService,$state) {
        return {
            restrict : 'EA',
            templateUrl : $template('template/examineForm'),
            replace : true,
            scope : {
                conf : '='
            },
            link : function(scope , ele , attrs){
                var thisRtState = rtState[scope.conf.flag];
                if(scope.conf.formParams){      //如果有额外参数，通过formParams传入
                    scope.examine = angular.copy(scope.conf.formParams);
                    scope.examine.taskid = scope.conf ? scope.conf.id : '';
                }else{
                    scope.examine = {
                        taskid : scope.conf ? scope.conf.id : ''
                    };
                }
                scope.cancel = function () {
                    $state.go(thisRtState);
                };
                var isLoading = false;
                scope.submitExamine = function(){
                    if(isLoading){
                        return false;
                    }
                    isLoading = true;
                    if(!scope.examine.taskid){
                        scope.$root.$toast('非法操作！');
                        $state.go(thisRtState);
                        isLoading = false;
                        return false;
                    }else if(!scope.examine.ideaType){
                        scope.$root.$toast('请选择审核结果');
                        isLoading = false;
                        return false;
                    }else if(!scope.examine.ideaContent){
                        scope.$root.$toast('请输入审核意见！');
                        isLoading = false;
                        return false;
                    }else{
                        var type = examineType[scope.conf.flag];
                        if(!type){
                            scope.$root.$toast('非法操作！');
                            $state.go(thisRtState);
                            isLoading = false;
                            return false;
                        }
                        examineService[type](scope.examine).then(function (res) {
                            scope.$root.$toast('操作成功！');
                            $state.go(thisRtState);
                            isLoading = false;
                        },function (err) {
                            scope.$root.$toast(err.message);
                            isLoading = false;
                        })
                    }
                }
            }
        }
    }]);

    //审核信息
    examineComponent.directive('examineInfo', ['$template', function($template) {
        return {
            restrict : 'EA',
            templateUrl : $template('template/examineInfo'),
            replace : true,
            scope : {
                info : '='
            },
            link : function(scope , ele , attrs){
            }
        }
    }]);

    module.exports = examineComponent;
});
