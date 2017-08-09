(function() {
    "use strict";
    define(function (require,exports,module) {
        var angular = require('angular');
        require('ztree');
        //goodsService = require('/app/services/goods.service.js'),
        var selectCategory = angular.module('selectCategory' , []);
        selectCategory.directive('selectCategory', function (ngDialog,goodsService,apiUri) {
            return {
                restrict: 'AE',
                replace:true,
                template:'<a ng-bind="ngModel||\'请选择\'" placeholder="{{placeholder}}" class="selectCategory"></a>',
                scope: {
                    ngModel: '=',
                    placeholder:"@",
                    eventSelected:'&'
                },
                link: function (scope, element, attr) {
                    if(!scope.placeholder){
                        scope.placeholder="请选择分类";
                    }
                    element.bind('keyup',function () {
                        return false;
                    });
                    element.bind('click',operate);
                    function operate(){
                        ngDialog.open({
                            template: 'app/view/template/selectCategory.html',
                            width: 500,
                            scope: scope,
                            cache: false,
                            controller: ['$scope', function ($scope) {
                                var setting = {
                                    data: {
                                        simpleData: {
                                            enable: true,
                                            idKey: "id",
                                            pIdKey: "parentId",
                                            rootPId: null
                                        }
                                    },
                                    check:{
                                        enable: true,
		                                chkStyle: "radio",
                                        autoCheckTrigger: true,
                                        chkboxType: {
                                            "Y": "",
                                            "N": ""
                                        },
                                        radioType:'all'
                                    },
                                    async: {
                                        enable: true,
                                        url: apiUri + 'cats/children?r=' + (new Date().getTime()),
                                        contentType: "application/json",
                                        autoParam: ["id=parentId"],
                                        type: 'get',
                                        // otherParam:{"otherParam":"zTreeAsyncTest"},
                                        dataFilter: filter
                                    },
                                    callback: {
                                        onCheck: function (event, treeId, treeNode) {
                                            if(treeNode.id&&treeNode.name){
                                                scope.ngModel = treeNode.id;
                                            }
                                        }
                                    }
                                };
                                function filter(treeId, parentNode, childNodes) {
                                    var data = childNodes.data;
                                    if (!data) return null;
                                    for (var i = 0, l = data.length; i < l; i++) {
                                        if(scope.ngModel&&scope.ngModel==data[i].id){
                                            data[i].checked=true;
                                        }
                                        if(data[i].id==='0'||data[i].id=='1'){
                                            data[i].nocheck = true;
                                        }
                                        if(data[i].path.split(':').length==3){
                                            data[i].isParent=false;
                                        }
                                        data[i].name = data[i].name.replace(/\.n/g, '.');
                                    }
                                    return data;
                                }
                                setTimeout(function(){
                                    $.fn.zTree.init($("#treeDemo"), setting);
                                },10);

                                $scope.enter = function () {
                                    if ($scope.eventSelected) {
                                        $scope.eventSelected();
                                    }
                                    $scope.closeThisDialog(0);
                                };
                            }]
                        });
                    }
                }
            };
        });
        module.exports = selectCategory;
    });
})();
