"use strict";
/**
 * 省市区select指令
 * leijunjie
 */
define(function (require, exports, module) {
    var angular = require('angular');
    require("ng-dialog");
    var ngModule = angular.module('city.service', []);

    ngModule.factory('cityService', ['$request', '$http', '$q', function ($request, $http, $q) {
        return {
            getCity: function (id) {
                if (!id) {
                    id = '';
                }
                return $request.get('user/region/list/' + id);
            },
            /**
             * 读取省市的全部数据
             */
            getRegion: function () {
                return require('/app/components/region.js');
                // return $http({
                //     method: 'GET',
                //     url: '/app/components/region.json'
                // })
            },
            getById: function (id) {
                return $request.get('user/regioninfo/' + id);
            }
        };
    }]);

    ngModule.directive('citySelect', ['$template', 'cityService', '$rootScope', function ($template, cityService, $rootScope) {
        if (!$rootScope.cityList) {
            $rootScope.cityList = {};
        }
        return {
            restrict: 'EA',
            templateUrl: $template('template/city'),
            replace: true,
            scope: {
                //example <div city-select
                //             province-model="shop.province" province-name-model="shop.provinceName"
                //             city-model="shop.city" city-name-model="shop.cityName"
                //             district-model="shop.district" district-name-model="shop.districtName">
                //        </div>
                /**
                 * conf 设置参数
                 *      provinceName   设置select里的name
                 *      cityName       设置select里的name
                 *      districtName   设置select里的name
                 *      noRequired     默认是必填，noRequired=true 则不用必填
                 *
                 */
                conf: '=',
                provinceModel: '=',
                cityModel: '=',
                districtModel: '=',
                provinceNameModel: '=',
                cityNameModel: '=',
                districtNameModel: '='
            },
            link: function (scope, ele, attrs) {
                //初始化当前citySelect
                if (!scope.conf) {
                    scope.provinceName = 'province';
                    scope.cityName = 'city';
                    scope.districtName = 'district';
                    scope.isRequired = true;
                    scope.setLevel = 3;
                } else {
                    scope.provinceName = scope.conf.provinceName ? scope.conf.provinceName : 'province';
                    scope.cityName = scope.conf.cityName ? scope.conf.cityName : 'city';
                    scope.districtName = scope.conf.districtName ? scope.conf.districtName : 'district';
                    scope.isRequired = scope.conf.noRequired ? false : true;
                    scope.setLevel = {'1':1, '2':2}[scope.conf.level] || 3;
                }

                //省市区选项发生变化时
                scope.selectItem = function (type, isInit) {
                    if (type == 1) {
                        scope.cityGroup = [];
                        scope.districtGroup = [];
                        if (!isInit) {
                            scope.cityModel = '';
                            scope.districtModel = '';
                        }
                        if ($rootScope.cityList[scope.provinceModel]) {
                            scope.cityGroup = $rootScope.cityList[scope.provinceModel];
                            if (scope.cityModel) {
                                scope.selectItem(2, true);
                            }
                        } else {
                            cityService.getCity(scope.provinceModel).then(function (res) {
                                scope.cityGroup = res.data;
                                $rootScope.cityList[scope.provinceModel] = res.data;
                                if (scope.cityModel) {
                                    scope.selectItem(2, true);
                                }
                            }, function (err) {
                            });
                        }
                    } else if (type == 2) {
                        scope.districtGroup = [];
                        if (!isInit) {
                            scope.districtModel = '';
                        }
                        if ($rootScope.cityList[scope.cityModel]) {
                            scope.districtGroup = $rootScope.cityList[scope.cityModel]
                        } else {
                            cityService.getCity(scope.cityModel).then(function (res) {
                                scope.districtGroup = res.data;
                                $rootScope.cityList[scope.cityModel] = res.data;
                            }, function (err) {
                            });
                        }
                        if(scope.setLevel==2){
                            scope.provinceNameModel = (function () {
                                var province = scope.provinceGroup.filter(function (p) {
                                    return scope.provinceModel == p.id;
                                });
                                return province[0].cname;
                            })();
                            scope.cityNameModel = (function () {
                                var city = scope.cityGroup.filter(function (c) {
                                    return scope.cityModel == c.id;
                                });
                                return city[0].cname;
                            })();
                        }

                    } else if (type == 3) {
                        scope.provinceNameModel = (function () {
                            var province = scope.provinceGroup.filter(function (p) {
                                return scope.provinceModel == p.id;
                            });
                            return province[0].cname;
                        })();
                        scope.cityNameModel = (function () {
                            var city = scope.cityGroup.filter(function (c) {
                                return scope.cityModel == c.id;
                            });
                            return city[0].cname;
                        })();
                        scope.districtNameModel = (function () {
                            var district = scope.districtGroup.filter(function (d) {
                                return scope.districtModel == d.id;
                            });
                            return district[0].cname;
                        })();
                    }
                };

                //初始化当前省市区
                if ($rootScope.cityList[0]) {
                    scope.provinceGroup = $rootScope.cityList[0];
                    if (scope.provinceModel) {
                        scope.selectItem(1, true);
                    }
                } else {
                    cityService.getCity().then(function (res) {
                        scope.provinceGroup = res.data;
                        $rootScope.cityList[0] = res.data;
                        if (scope.provinceModel) {
                            scope.selectItem(1, true);
                        }
                    }, function (err) {
                    });
                }
            }
        };
    }]);


    ngModule.directive('regionSelect', ['$template', 'cityService', '$rootScope', '$compile', '$q', '$timeout',
        function ($template, cityService, $rootScope, $compile, $q, $timeout) {
            $rootScope.cacheRegion = $rootScope.cacheRegion || [];
            function getChildren(id) {
                return cityService.getCity(id);
            }
            function getById(id) {
                var deferred = $q.defer();
                var region = _.find($rootScope.cacheRegion, function (item) {
                    return item.id == id;
                })
                if (region) {
                    $timeout(function () {
                        deferred.resolve(region)
                    })
                } else {
                    cityService.getById(id).then(function (resp) {
                        $rootScope.cacheRegion.push(resp.data);
                        deferred.resolve(resp.data);
                    });
                }

                return deferred.promise;
            }
            return {
                restrict: 'EA',
                templateUrl: $template('template/region'),
                replace: true,
                scope: {
                    ngModel: '='
                },
                link: function (scope, ele, attrs) {
                    scope.provinceGroup = [];
                    scope.cityGroup = [];
                    scope.districtGroup = [];
                    var _init = false;

                    scope.selectItem = function (id, childrenDataSourceName) {
                        if (!id) {
                            return;
                        }

                        if (childrenDataSourceName) {
                            getChildren(id).then(function (resp) {
                                scope[childrenDataSourceName] = resp.data;
                            });
                        }
                        getById(id).then(function (resp) {
                            scope.ngModel = resp;
                            if (scope.ngModel && scope.ngModel.regionlevel != 3) {
                                scope.districtGroup = [];
                            }
                        });
                    };


                    getChildren().then(function (resp) {
                        scope.provinceGroup = resp.data;
                    });

                    scope.$watch("ngModel", function (newVal, oldVal) {
                        if (!oldVal && newVal) {
                            if (scope.ngModel) {
                                var dataName = ['province', 'city', 'district'];
                                getById(scope.ngModel.id).then(function (resp) {
                                    scope.ngModel = resp;
                                    bindData(resp);
                                });
                                var bindData = function(data) {
                                    getChildren(data.parentid).then(function (resp) {
                                        scope[dataName[data.regionlevel - 1] + 'Group'] = resp.data;
                                    });
                                    scope[dataName[data.regionlevel - 1] + 'Model'] = data.id;
                                    if (data.regionlevel <= 1) {
                                        return;
                                    }
                                    getById(data.parentid).then(function (resp) {
                                        bindData(resp);
                                    });
                                }
                            }
                        }
                    })
                }
            };
        }]);


    ngModule.factory('multRegionSelect', ['$rootScope', 'ngDialog', '$template', '$q', 'cityService',
        function ($rootScope, ngDialog, $template, $q, cityService) {
            console.log('multRegionSelect');
            require('underscore');

            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    delete $rootScope.multRegionGroup;
                })
            return {
                /**
                 * @param {Object} options:
                 * @return {Object}
                 */
                open: function (opts) {
                    var _options, _dialog;
                    _options = angular.extend({ selectedData: [], key: 'id' }, opts);
                    var deferred = $q.defer();
                    var scope = $rootScope.$new();
                    var lockItem;//保存移除自己选择的项的锁定想

                    var groupName = opts.group;
                    if (groupName) {
                        $rootScope.multRegionGroup = $rootScope.multRegionGroup || {};
                        $rootScope.multRegionGroup[groupName] = $rootScope.multRegionGroup[groupName] || [];
                        lockItem = angular.copy($rootScope.multRegionGroup[groupName]);
                    }


                    //初始化数据
                    scope.regionData = angular.copy(cityService.getRegion());
                    initData(scope.regionData, _options.selectedData);

                    scope.confirm = function () {
                        var confirmData = getSelectedData(scope.regionData)
                        if (groupName) {
                            $rootScope.multRegionGroup[groupName] = _.union(lockItem, _.map(confirmData, function (item) { return item.id }));
                        }
                        deferred.resolve(confirmData);
                        _dialog.close();
                    }

                    scope.selectedArea = function (item, $event) {
                        item.selected = !item.selected && !item.isHalf;
                        item.isHalf = false;
                        updateChildren(item)
                        updateParant(item);
                    }

                    scope.selectedProvince = function (item, $event) {
                        item.selected = !item.selected && !item.isHalf;
                        updateChildren(item)
                        updateParant(item);
                    }

                    scope.selectedCity = function (item) {
                        item.selected = !item.selected;
                        updateParant(item.parent);
                    }

                    function updateParant(parent) {
                        if (!parent || !parent.children) {
                            return;
                        }
                        parent.selectedCount = 0;
                        parent.children.forEach(function (element) {
                            if (element.selected) {
                                parent.selectedCount++;
                            }
                        }, this);

                        if (parent.selectedCount == parent.children.length) {
                            parent.selected = true;
                            parent.isHalf = false;
                        } else if (parent.selectedCount != 0) {
                            parent.selected = false;
                            parent.isHalf = true;
                        } else {
                            parent.selected = false;
                            parent.isHalf = false;
                        }
                        updateParant(parent.parent);
                    }

                    function updateChildren(parent) {
                        if (parent.children) {
                            var selected = parent.selected;
                            parent.children.forEach(function (element) {
                                element.isLock = element.isLock || parent.isLock;
                                element.selected = !element.isLock && selected;
                                updateChildren(element);
                            }, this);
                            updateParant(parent);
                        }
                    }

                    function getSelectedData(root) {
                        var data = [];
                        root.forEach(function (element) {
                            if (element.selected) {
                                if (element.id) {
                                    data.push(element)
                                } else {
                                    data = data.concat(getSelectedData(element.children));
                                }
                            } else if (element.children) {
                                data = data.concat(getSelectedData(element.children));
                            }
                        }, this);

                        return data;
                    }

                    function initData(root, selectedData, parent) {
                        root.forEach(function (element) {
                            element.selected = false;
                            element.isHalf = false;
                            element.isLock = false;
                            element.parent = parent;
                            if (element.id) {
                                if (_.findIndex(selectedData, JSON.parse('{"' + _options['key'] + '":"' + element.id + '"}')) >= 0) {
                                    element.selected = true;
                                    updateChildren(element);
                                }
                                if (lockItem) {
                                    var index = _.indexOf(lockItem, element.id)
                                    if (index >= 0) {
                                        if (element.selected) {
                                            lockItem.splice(index, 1);
                                        } else {
                                            element.isLock = true;
                                        }
                                    }
                                }
                            }
                            if (!element.selected && element.children) {
                                initData(element.children, selectedData, element);
                                updateParant(element);
                            }
                        }, this);
                    }

                    _dialog = ngDialog.open({
                        template: $template('template/multRegionSelect'),
                        scope: scope,
                        width: 800
                    })

                    scope.define_Selected = function (item) {
                        if (item._selected) {
                            return;
                        }
                        Object.defineProperty(item, '_selected', {
                            configurable: false,
                            get: function () {
                                return item.selected || item.isLock;
                            },
                            set: function (newVal) {
                                console.log('监控到变化:' + newVal);
                            }
                        })
                    }

                    return deferred.promise;
                },
                lock: function (groupName, lockData) {
                    $rootScope.multRegionGroup = $rootScope.multRegionGroup || {};
                    $rootScope.multRegionGroup[groupName] = $rootScope.multRegionGroup[groupName] || [];
                    $rootScope.multRegionGroup[groupName] = $rootScope.multRegionGroup[groupName].concat(lockData);
                },
                unlock: function(groupName, unlockData){
                    if ($rootScope.multRegionGroup && $rootScope.multRegionGroup[groupName] ) {
                        $rootScope.multRegionGroup[groupName] = _.difference($rootScope.multRegionGroup[groupName], unlockData)
                    }
                }
            }
        }])
    module.exports = ngModule;

});