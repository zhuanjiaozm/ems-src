define(function(require) {
    var app = require('app');
    require('app/services/login.service.js');
    require('app/services/system.service.js');

    /** ng异步载入 */
    app.useModule(['login.service', 'system.service']);
    app.controller('loginCtrl', ['$scope', '$rootScope', 'loginService', '$cookie', '$removeCookie', '$state', 'apiUri', function($scope, $rootScope, loginService, $cookie, $removeCookie, $state, apiUri) {
            if ($cookie('userInfo')) {
                $removeCookie('userInfo');
                loginService.logout();
            }
            $scope.refreshCode = function() {
                $scope.verifyImageStr = '/ems' + '/captcha.jpg?r=' + Math.random();
            }
            $scope.refreshCode();
            $scope.login = function() {
                if (!$scope.user || !$scope.user.username) {
                    $scope.$root.$toast('请输入用户名');
                    return;
                }
                if (!$scope.user.password) {
                    $scope.$root.$toast('请输入密码');
                    return;
                }
                if (!$scope.user.captcha) {
                    $scope.$root.$toast('请输入验证码');
                    return;
                }
                loginService.login($scope.user).then(function(res) {
                    loginService.info().then(function(res) {
                        console.dir(res);
                        $cookie('userInfo', res.user);
                        $state.go('main.index');
                    }, function(err) {
                        $scope.$root.$toast(err.msg);
                        $scope.refreshCode();
                    });
                }, function(err) {
                    $scope.$root.$toast(err.msg);
                    $scope.refreshCode();
                });
            };

        }])
        .controller('personalCtrl', ['$scope', '$state', '$cookie', 'loginService', 'systemService', function($scope, $state, $cookie, loginService, systemService) {
            var memberId = $cookie('userInfo').id;
            systemService.roleList().then(function(res) {
                $scope.roleList = res.data.content;
                $scope.personalParams = {};
                loginService.user(memberId).then(function(res) {
                    $scope.personal = res.data;
                    $scope.personalParams = {
                        realName: res.data.realName,
                        mobile: res.data.mobile,
                        email: res.data.email
                    };
                    $scope.selectedRole = res.data.roleList[0];
                }, function(err) {
                    $scope.$root.$toast(err.message);
                });
            });
            $scope.changePersonal = function(personalParams) {
                $scope.msg = "";
                var mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!personalParams.realName) {
                    $scope.msg = "请填写1-7个字符长度的用户名";
                    return;
                } else {
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    if (!reg.test(personalParams.realName)) {
                        $scope.msg = "请填写中文的用户名";
                        return;
                    }
                }
                if (!personalParams.mobile) {
                    $scope.msg = "请填写11位的手机号码";
                    return;
                } else {
                    if (!mobileReg.test(personalParams.mobile)) {
                        $scope.msg = "请填写有效的手机号码";
                        return;
                    }
                }
                if (!personalParams.email) {
                    $scope.msg = "请填写邮箱地址";
                    return;
                } else {
                    if (!emailReg.test(personalParams.email)) {
                        $scope.msg = "请填写有效的邮箱地址";
                        return;
                    }
                }
                loginService.putUser($scope.personalParams).then(function(res) {
                    $scope.$root.$toast('更新资料成功！');
                }, function(err) {
                    $scope.$root.$toast(err.message);
                });
            };
        }])
        .controller('changePwdCtrl', ['$scope', '$state', '$cookie', 'loginService', function($scope, $state, $cookie, loginService) {
            $scope.account = $cookie('userInfo').account;
            $scope.user = {};
            $scope.profile = $cookie('userInfo');
            $scope.changePwd = function() {
                loginService.password($scope.user).then(function(res) {
                    $state.go('main.index');
                }, function(err) {
                    $scope.$root.$toast(err.message);
                });
            };
        }]);
});