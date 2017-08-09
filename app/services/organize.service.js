"use strict";
/**
 * 所属机构指令
 * 暂时最多支持5个，有时间调整到自动生成select
 * ！！！ 与merchant的 organize.service.js不同，这个有权限
 * leijunjie
 */
define(function (require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('organize.service',[]);

    ngModule.factory('organizeService', ['$request', function($request){
        return {
            getOrganize: function (id) {
                var params = {
                    orgId: id ? id : 0,
                    tree: 0
                };
                return $request.get('org/list', params);
            }
        };
    }]);

    ngModule.directive('organizeSelect', ['$template', 'organizeService','$cookie', function($template, organizeService, $cookie){
        return {
            restrict : 'EA',
            templateUrl : $template('template/organize'),
            replace : true,
            scope : {
                //example <span organize-select conf="{nameFlag:'->'}" organize-id="params.organizeId" organize-ids="params.organizeIds" organize-names="params.orgName"></span>
                /**
                 * conf 设置参数
                 *      nameFlag        //连接已选机构的名称，如果有nameFlag参数，则用nameFlag连接，否则返回名称数组
                 *      firstRequired   //第1个select是否必填
                 *      secondRequired  //第2个select是否必填
                 *      thirdRequired   //第3个select是否必填
                 *      fourthRequired  //第4个select是否必填
                 *      fifthRequired   //第5个select是否必填
                 */
                conf : '=',
                organizeId : '=',       //当前机构id
                organizeIds : '=',      //当前机构id串，用','分开
                organizeNames : '='     //当前机构名称串
            },
            link: function(scope, ele , attrs){
                //当前select级数，默认是3级，最多5级，根据返回的"总行"的orgLevel决定
                scope.selectLevel = '3';

                //是否必选
                if(scope.conf) {
                    scope.firstRequired = scope.conf.firstRequired ? scope.conf.firstRequired : false;
                    scope.secondRequired = scope.conf.secondRequired ? scope.conf.secondRequired : false;
                    scope.thirdRequired = scope.conf.thirdRequired ? scope.conf.thirdRequired : false;
                    scope.fourthRequired = scope.conf.fourthRequired ? scope.conf.fourthRequired : false;
                    scope.fifthRequired = scope.conf.fifthRequired ? scope.conf.fifthRequired : false;
                }

                scope.operater = $cookie('userInfo'); //操作员权限
                scope.operaterLevel = scope.operater.organizeIds.split(',').length;

                /**
                 * 查找当前级别的下一级数据
                 * @param id    当前级别的id
                 * @param obj   下一级的select
                 */
                scope.getItem = function(id, obj){
                    organizeService.getOrganize(id).then(function(res){
                        scope[obj] = res.data;
                        if(!id){    //总行，获取最高层次orgLevel
                            if(scope.conf && scope.conf.level){ //如果指令conf设置了level，则以此为准，否则以请求的结果为准
                                scope.selectLevel = scope.conf.level;
                            }else{
                                scope.selectLevel = scope[obj][0] && scope[obj][0].level ? scope[obj][0].level : '3';
                            }
                            if(scope.operaterLevel>1){
                                scope.firstModel = scope[obj][0].id;
                                scope.selectItem(1, true);
                            }
                        }
                    }, function(err){
                    });
                };

                scope.getItem(0,'firstGroup');

                //选择当前机构
                scope.selectItem = function(type, isInit) {
                    if(type==1) {
                        if(!isInit) {
                            scope.secondModel = '';
                            scope.thirdModel = '';
                            scope.fourthModel = '';
                            scope.fifthModel = '';
                        }
                        scope.secondGroup = [];
                        scope.thirdGroup = [];
                        scope.fourthGroup = [];
                        scope.fifthGroup = [];
                        if(scope.firstModel) {
                            scope.getItem(scope.firstModel, 'secondGroup');
                        }
                    }else if(type==2){
                        if(!isInit){
                            scope.thirdModel = '';
                            scope.fourthModel = '';
                            scope.fifthModel = '';
                        }
                        scope.thirdGroup = [];
                        scope.fourthGroup = [];
                        scope.fifthGroup = [];
                        if(scope.secondModel) {
                            scope.getItem(scope.secondModel, 'thirdGroup');
                        }

                    }else if(type==3){
                        if(!isInit) {
                            scope.fourthModel = '';
                            scope.fifthModel = '';
                        }
                        scope.fourthGroup = [];
                        scope.fifthGroup = [];
                        if(scope.thirdModel) {
                            scope.getItem(scope.thirdModel, 'fourthGroup');
                        }
                    }else if(type==4){
                        if(!isInit) {
                            scope.fifthModel = '';
                        }
                        scope.fifthGroup = [];
                        if(scope.fourthModel) {
                            scope.getItem(scope.fourthModel, 'fifthGroup');
                        }
                    }else if(type==5){

                    }

                    var orgArr = [],orgNameArr=[];
                    //已选机构的名称，如果有nameFlag参数，则用nameFlag连接，否则返回名称数组
                    var orgSelectName = function(orgModel, orgGroup){
                        if(orgModel){
                            var org;
                            org = orgGroup.filter(function (item) {
                                return orgModel == item.id;
                            });
                            orgArr.push(orgModel);
                            scope.organizeId = orgModel;
                            scope.organizeIds = orgArr.join(',');
                            if(scope.conf && scope.conf.nameFlag) {
                                scope.organizeNames += !scope.organizeNames ? org[0].orgName : scope.conf.nameFlag + org[0].orgName;
                            }else{
                                scope.organizeNames.push(org[0].orgName);
                            }
                        }
                    };
                    if(!isInit) {
                        scope.organizeIds = '';
                        scope.organizeNames = scope.conf && scope.conf.nameFlag ? '' : [];
                        orgSelectName(scope.firstModel, scope.firstGroup);
                        orgSelectName(scope.secondModel, scope.secondGroup);
                        orgSelectName(scope.thirdModel, scope.thirdGroup);
                        orgSelectName(scope.fourthModel, scope.fourthGroup);
                        orgSelectName(scope.fifthModel, scope.fifthGroup);
                    }

                };

                //机构初始化
                if(scope.organizeIds){
                    var arr = scope.organizeIds.split(',');
                    if(arr[0]){
                        scope.firstModel = arr[0];
                        scope.selectItem(1, true);
                    }
                    if(arr[1]){
                        scope.secondModel = arr[1];
                        scope.selectItem(2, true);
                    }
                    if(arr[2]){
                        scope.thirdModel = arr[2];
                        scope.selectItem(3, true);
                    }
                    if(arr[3]){
                        scope.fourthModel = arr[3];
                        scope.selectItem(4, true);
                    }
                    if(arr[4]){
                        scope.fifthModel = arr[4];
                    }
                }
            }
        };
    }]);


    module.exports = ngModule;

});