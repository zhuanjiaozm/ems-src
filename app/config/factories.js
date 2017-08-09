define(function (require, exports, module) {
    var $ = require('jquery');
    var factories = {
        /**
         * 请求(继承于$http)
         *
         * PARAMETER_LOST("10000", "参数丢失"), // 10000:参数丢失
         REPEAT_SUBMIT("10001", "重复的请求"), // 10001:重复的post请求
         TOKEN_EXPIRED("10002", "token已过期"), // 10002:token已过期
         TOKEN_ERROR("10003", "token错误"), // 10003:token错误
         NO_LOGIN("10004", "用户未登录或登录过期"), // 10004:token没有找到
         PERMISSION_DENIED("10005", "没有访问权限");// 10005:没有访问权限
         */
        $request: ['$http', '$rootScope', '$q', 'apiUri', '$cookie', '$removeCookie', '$state', function ($http, $rootScope, $q, apiUri, $cookie, $removeCookie, $state) {
            var request = function (path, params, method, errorHanndle) {
                $('body').addClass('loading');
                var deferred = $q.defer(),
                    userInfo = $cookie('userInfo'),
                    data = { paramsType: 'Form' };
                data = $.extend(data, params);
                if (path.indexOf('?') !== -1) {
                    path = path + '&r=' + (new Date().getTime());
                } else {
                    path = path + '?r=' + (new Date().getTime());
                }
                var options = {
                    url: apiUri + path,
                    method: method,
                    timeout: 60000,
                    cache: false
                };
                if (method == 'POST' || method == 'PUT') {
                    if (data.paramsType == 'Form') {
                        $.extend(options, {
                            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj) {
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                }
                                return str.join("&");
                            }
                        });
                    }
                }
                delete data.paramsType;
                options[method == 'GET' || method == 'DELETE' ? 'params' : 'data'] = data;
                console.log('[ 请求 ][ ' + options.url + ' ][ ' + options.method + ' ]数据接口,参数:', JSON.stringify(data));
                try {
                    $http(options).then(function (res) {
                        var data = res.data;
                        console.log('[ 响应 ][ ' + options.url + ' ][ ' + options.method + ' ]数据接口,返回:', data);
                        $('body').removeClass('loading');
                        switch (data.code) {
                            case "000000":
                                deferred.resolve(data);
                                break;
                            case "10002":
                                $rootScope.$toast(data.message);
                                $state.go('login');
                                break;
                            case "10003":
                                // $rootScope.$toast(data.message);
                                $state.go('login');
                                break;
                            case "10004":
                                $rootScope.$toast(data.message);
                                $state.go('login');
                                break;
                            default:
                                deferred.reject(data);
                                //如果errorHandle为true，则不弹出错误信息
                                if (!errorHanndle) {
                                    $rootScope.$toast(data.message);
                                }
                                break;
                        }
                    }, function (err, status) {
                        // deferred.reject({data:{message: '网络出现问题'}});
                        $rootScope.$toast('网络出现问题！');
                        $('body').removeClass('loading');
                    });
                } catch (e) {
                    // deferred.reject({desc: '程序出现问题'});
                    $rootScope.$toast('程序出现问题！');
                    $('body').removeClass('loading');
                }
                return deferred.promise;
            };
            return {
                'get': function (path, params, errorHanndle) {
                    return request(path, params, 'GET', errorHanndle);
                },
                'post': function (path, params, errorHanndle) {
                    return request(path, params, 'POST', errorHanndle);
                },
                'put': function (path, params, errorHanndle) {
                    return request(path, params, 'PUT', errorHanndle);
                },
                'delete': function (path, params, errorHanndle) {
                    return request(path, params, 'DELETE', errorHanndle);
                }
            };
        }],
        $dialog: ['ngDialog', function (ngDialog) {
            return $.extend(ngDialog, {
                $alert: function (message) {
                    ngDialog.open({
                        template: '<p class="alert-content">' + message + '</p>\
                        <div class="ngdialog-buttons">\
                            <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">确定</button>\
                        </div>',
                        plain: true
                    });
                },
                $open: function (id) {
                    ngDialog.open({
                        template: id
                    });
                },
                $confirm: function (options) {
                    options = $.extend({
                        template: '<p class="alert-content">' + options.message + '</p>' +
                        '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">' + (options.cancelText || "取消") + '</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">' + (options.okText || "确认") + '</button>' +
                        '</div>',
                        plain: true,
                        width: 300
                    }, options);
                    return ngDialog.openConfirm(options)
                }
            });
        }]
    };
    module.exports = {
        regFactories: function (ngModule) {
            for (var key in factories) {
                ngModule.factory(key, factories[key]);
            }
        }
    };
});
