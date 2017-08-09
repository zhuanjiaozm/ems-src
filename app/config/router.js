define(function(require, exports, module) {
    module.exports = {
        regRoutes: function(ngModule) {
            ngModule.config(["$stateProvider", "$urlRouterProvider", "$template", "$action",
                function($stateProvider, $urlRouterProvider, $template, $action) {
                    $stateProvider
                        .state("main", {
                            //框架
                            url: "/main",
                            templateUrl: $template("main"),
                            controllerUrl: $action("home"),
                            controller: "mainCtrl"
                        })
                        .state("login", {
                            //登录
                            url: "/login",
                            templateUrl: $template("login"),
                            controllerUrl: $action("login"),
                            controller: "loginCtrl"
                        })
                        .state("main.index", {
                            //首页
                            url: "/index",
                            templateUrl: $template("index"),
                            controllerUrl: $action("home"),
                            controller: "homeCtrl"
                        })
                        .state("main.personal", {
                            //个人资料
                            url: "/personal",
                            templateUrl: $template("personal"),
                            controllerUrl: $action("login"),
                            controller: "personalCtrl"
                        })
                        .state("main.changePwd", {
                            //修改密码
                            url: "/changePwd",
                            templateUrl: $template("changePwd"),
                            controllerUrl: $action("login"),
                            controller: "changePwdCtrl"
                        })
                        .state("main.space", {
                            //空间管理
                            url: "/system/space",
                            templateUrl: $template("system/space"),
                            controllerUrl: $action("system"),
                            controller: "spaceCtrl"
                        })
                        .state("main.devices", {
                            //设备库
                            url: "/system/devices",
                            templateUrl: $template("system/devices"),
                            controllerUrl: $action("system"),
                            controller: "devicesCtrl"
                        })
                        .state("main.devicesType", {
                            //设备类型库
                            url: "/developer/devicesType",
                            templateUrl: $template("developer/devicesType"),
                            controllerUrl: $action("developer"),
                            controller: "devicesTypeCtrl"
                        })
                        .state("main.staff", {
                            //人员管理
                            url: "/account/staff",
                            templateUrl: $template("account/staff"),
                            controllerUrl: $action("account"),
                            controller: "staffCtrl"
                        })
                        .state("main.station", {
                            //岗位管理
                            url: "/account/station",
                            templateUrl: $template("account/station"),
                            controllerUrl: $action("account"),
                            controller: "stationCtrl"
                        })
                        .state("main.user", {
                            //用户管理
                            url: "/account/user",
                            templateUrl: $template("account/user"),
                            controllerUrl: $action("account"),
                            controller: "userCtrl"
                        })
                        .state("main.role", {
                            //角色管理
                            url: "/account/role",
                            templateUrl: $template("account/role"),
                            controllerUrl: $action("account"),
                            controller: "roleCtrl"
                        })
                        .state("main.orgaization", {
                            //组织架构
                            url: "/account/orgaization",
                            templateUrl: $template("account/orgaization"),
                            controllerUrl: $action("account"),
                            controller: "orgaizationCtrl"
                        });
                    $urlRouterProvider.otherwise("/main");
                }
            ]);
        }
    };
});