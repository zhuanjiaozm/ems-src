'use strict';
define(function(require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('jOrgChart', []);
    ngModule.directive('jOrgChart', ['$template', '$templateCache', '$compile', 'systemService', function($template, $templateCache, $compile, systemService) {
        return {
            restrict: 'EA',
            templateUrl: $template('template/jOrgChart'),
            replace: true,
            scope: {
                list: '='
            },
            link: function(scope, element, attrs) {
                scope.objList = {};
                var currntNode = {};
                var defaultRequestParams = {
                    limit: 1000,
                    page: 1,
                    order: '',
                    sidx: ''
                };
                var deviceTypeIconObj = {
                    1: 'fa-thermometer-full',
                    2: 'fa-binoculars',
                    3: 'fa-window-restore',
                    4: 'fa-bluetooth',
                    5: 'fa-briefcase',
                    6: 'fa-camera-retro',
                    7: 'fa-credit-card'
                };

                function reload() {
                    $('.jOrgChart').append(getUlString(scope.list));
                    $('.jOrgChart ul').jOrgChart({
                        chartElement: '#chart',
                        dragAndDrop: true
                    });
                }
                reload();

                function getUlString(objList) {
                    var resultStr = '<ul>';

                    function foo(node) {
                        scope.objList[node.spaceId] = node;
                        resultStr += '<li class="spaceNode selectedNode">' + $templateCache.get('spaceNodeOperate.html') + '<i class="dataNodeId fa fa-ravelry text-success" aria-hidden="true"  data-nodeId="' + node.spaceId + '"></i>' + node.spaceName;
                        if ((node.list && node.list.length > 0) || (node.devices && node.devices.length > 0)) {
                            resultStr += '<ul>';
                            if (node.list) {
                                for (var i in node.list) {
                                    foo(node.list[i]);
                                }
                            }
                            if (node.devices) {
                                for (var a in node.devices) {
                                    resultStr += '<li class="devicesNode selectedNode"><i class="dataNodeId fa ' + deviceTypeIconObj[node.devices[a].deviceType] + ' text-success" aria-hidden="true" data-nodeId="' + node.devices[a].equipmentCode + '"></i>' + node.devices[a].deviceTypeName + $templateCache.get('devicesNodeOperate.html') + '</li>';
                                }
                            }
                            resultStr += '</li></ul>';
                        }
                    }
                    foo(objList);

                    return resultStr += '</ul>';
                }

                //编辑空间节点
                $('.btn-edit-space-node').on('click', function() {
                    $(this).parents('.selectedNode').find('.popover-edit-space').toggle();
                    currntNode = scope.objList[$(this).parents('.selectedNode').find(".dataNodeId").attr('data-nodeId')];
                });
                //提交编辑空间
                $('.popover-edit-space-confirm').on('click', function() {
                    console.log('正在编辑ID是：', currntNode);
                    $('.popover').hide();
                });
                //删除提示
                $('.btn-delete').on('click', function() {
                    $(this).parents('.selectedNode').find('.popover-edit-space').toggle();
                    currntNode = scope.objList[$(this).parents('.selectedNode').find(".dataNodeId").attr('data-nodeId')];
                });
                //取消删除
                $('.btn-cancel').on('click', function() {
                    $('.popover').hide();
                });
                //确认删除
                $('.btn-delete-confirm').on('click', function() {
                    console.log('正在删除ID是：', currntNode);
                    $('.popover').hide();
                });

                //打开添加子空间的表单
                $('.btn-add-space').on('click', function() {
                    $(this).parents('.selectedNode').find('.popover-add-space').toggle();
                    currntNode = scope.objList[$(this).parents('.selectedNode').find(".dataNodeId").attr('data-nodeId')];
                });
                //提交添加子空间的表单
                $('.btn-add-space-confim').on('click', function() {
                    $('.popover').hide();
                    console.log("***************确认添加子空间的表单***************");
                    console.log('当前节点：', currntNode);
                    console.log('添加的子空间名称是：', $(this).parents('.selectedNode').find('.btn-add-space-name').val());
                    console.log("***************确认添加子空间的表单***************");
                });


                //展开已有设备列表
                function getDivicesTabelData(params, trDOM) {
                    trDOM.html('');
                    systemService.getDivicesList(params).then(
                        function(res) {
                            getDivicesTabel(res.page.list, trDOM);
                        },
                        function(err) {
                            console.error(err);
                        }
                    );
                };

                function getDivicesTabel(devicesList, trDOM) {

                    for (var a in devicesList) {
                        var trDOMStr = '<tr><td>' + '<input type="checkbox" name="selectedDevices" class="selectedDevices" value="' + devicesList[a].equipmentId + '"></td><td>' + devicesList[a].deviceTypeName + '</td>';
                        trDOMStr += '<td>' + devicesList[a].deviceCode + '</td>';
                        trDOMStr += '<td>' + devicesList[a].equipmentCode + '</td>';
                        trDOMStr += '<td>' + devicesList[a].protocol + '</td>';
                        trDOMStr += '<td>' + devicesList[a].spaceName + '</td>';
                        trDOMStr += '<td>' + devicesList[a].activateTime + '</td>';
                        trDOMStr += '<td>' + devicesList[a].createUserName + '</td>';
                        trDOMStr += '<td>' + devicesList[a].createTime + '</td>';
                        trDOMStr += '<td>' + devicesList[a].status + '</td>';
                        trDOMStr += '<td>' + devicesList[a].frequency + '</td></tr>';
                        trDOM.append(trDOMStr);
                    }
                };
                $('.btn-add-device').on('click', function() {
                    var _this = $(this);
                    $(this).parents('.selectedNode').find('.popover-add-device').toggle();

                    currntNode = scope.objList[$(this).parents('.selectedNode').find(".dataNodeId").attr('data-nodeId')];
                    getDivicesTabelData(defaultRequestParams, $(this).parents('.selectedNode').find('.devicesList'));

                    //获取已有的设备类型列表
                    systemService.getDivicesTypeList(defaultRequestParams).then(
                        function(res) {
                            var divicesTypeList = res.page.list;
                            // _this.parents('.selectedNode').find('.deviceId').html('');
                            for (var b in divicesTypeList) {
                                _this.parents('.selectedNode').find('select.deviceId').append('<option value="' + divicesTypeList[b].deviceId + '">' + divicesTypeList[b].deviceType + '</option>');
                            }
                        }
                    );


                });

                //确认添加设备
                $('.btn-add-device-confirm').on('click', function() {
                    var selectedDevicesCheckbox = $(this).parents('.popover-content').find('input:checkbox[name="selectedDevices"]:checked');

                    function getCheckAdIds() {
                        var adIds = [];
                        selectedDevicesCheckbox.each(function(i, ) {
                            adIds.push(selectedDevicesCheckbox[i].value);
                        });
                        return adIds;
                    }
                    console.log(getCheckAdIds());
                });


                //查找设备
                $('.btn-add-device-srearch').on('click', function() {
                    $(this).siblings('.form-group').removeClass('has-error');
                    if ($(this).siblings('.form-group').find('.searchParam').val()) {
                        getDivicesTabelData({
                            searchParam: $(this).siblings('.form-group').find('.searchParam').val(),
                            limit: 1000,
                            page: 1,
                            order: '',
                            sidx: ''
                        }, $(this).parents('.selectedNode').find('.devicesList'));
                    } else {
                        $(this).siblings('.form-group').addClass('has-error');
                        $(this).siblings('.form-group').find('.searchParam').attr('searchParam', '请输入设备名称/编号')
                        $(this).siblings('.form-group').find('.searchParam').focus();
                    }

                });

                //添加设备
                $('.btn-add-device-new').on('click', function() {

                });
            }
        }
    }]);
    module.exports = ngModule;
});