"use strict";
/**
 * 表单验证指令
 * 建议验证指令为“....Check”，提示指令为"....Error"
 * leijunjie
 */
define(function (require) {
    var app = require('app');

    //必填
    app.directive('requiredError', [function () {
        return {
            restrict: 'A',
            template: '<span ng-message="required">必填项</span>',
            replace: true
        }
    }]);

    //最大长度
    app.directive('maxlengthError', [function () {
        return {
            restrict: 'A',
            template: '<span ng-message="maxlength">长度不能超过{{maxLength}}个字符</span>',
            replace: true,
            scope:{
                conf : '='
            },
            link: function(scope, ele , attrs){
                if(scope.conf && scope.conf.maxLength){
                    scope.$parent.maxLength = scope.conf.maxLength;
                }else {
                    scope.$parent.maxLength = 20;
                }
            }
        }
    }]);

    //最小长度
    app.directive('minlengthError', [function () {
        return {
            restrict: 'A',
            template: '<span ng-message="minLength">长度不能超过{{maxLength}}个字符</span>',
            replace: true,
            scope:{
                conf : '='
            },
            link: function(scope, ele , attrs){
                if(scope.conf && scope.conf.maxLength){
                    scope.$parent.minLength = scope.conf.minLength;
                }else {
                    scope.$parent.minLength = 5;
                }
            }
        }
    }]);

    //身份证验证
    app.directive('identityCheck', [function(){

        //身份证号合法性验证
        //支持15位和18位身份证号
        //支持地址编码、出生日期、校验位验证
        function IdentityCodeValid(code) {
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;

            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            } else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            } else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17].toUpperCase()){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
            //if(!pass) alert(tip);
            return pass;
        }
        
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.identityError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return IdentityCodeValid(value);
                };
            }
        };
    }]);
    app.directive('identityError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="identityError">请填写正确的身份证号码</span>',
            replace: true
        }
    }]);

    //手机号码验证
    app.directive('mobileCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.mobileError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var reg = /^1(3|4|5|7|8)\d{9}$/;
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('mobileError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="mobileError">请输入正确的手机号码</span>',
            replace: true
        }
    }]);

    //电话或手机号码验证
    app.directive('phoneCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.phoneError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('phoneError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="phoneError">请输入正确的电话号码</span>',
            replace: true
        }
    }]);

    //只能输入字母或数字
    app.directive('codeCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.codeError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var reg = /^[A-Za-z\d]+$/;
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('codeError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="codeError">只能包括英文字母、数字</span>',
            replace: true
        }
    }]);

    //只能输入英文字母、数字和下划线
    app.directive('nameCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.nameError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var reg = /^\w+$/;
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('nameError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="nameError">只能包括英文字母、数字和下划线</span>',
            replace: true
        }
    }]);

    //只能输入大于0的数值
    app.directive('numCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.numError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var reg = /^\d+(.\d*)?$/;
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('numError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="numError">请输入大于0的数字</span>',
            replace: true
        }
    }]);

    //整数验证
    app.directive('intCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.intError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    if(!$.trim(value)){
                        return true;
                    }
                    var reg = /^\d*$/;
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('intError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="intError">请输入整数</span>',
            replace: true
        }
    }]);

    //url验证
    app.directive('urlCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.urlError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var strRegex = "^((https|http)?://)"
                            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                            + "|" // 允许IP和DOMAIN（域名）
                            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                            + "[a-z]{2,6})" // first level domain- .com or .museum
                            + "(:[0-9]{1,4})?" // 端口- :80
                            + "((/?)|" // a slash isn't required if there is no file name
                            + "(/[0-9a-zA-Z#_!~*'().;?:@\&=+\$%\-\,]*)+/?)$";
                    var reg = new RegExp(strRegex);
                    return reg.test(value);
                };
            }
        }
    }]);
    app.directive('urlError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="urlError">请输入正确的链接地址</span>',
            replace: true
        }
    }]);

    //营业执照长度验证
    app.directive('licenseCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.licenseError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    if(!value || value.length==15 || value.length==18){
                        return true;
                    }else{
                        return false;
                    }
                };
            }
        }
    }]);
    app.directive('licenseError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="licenseError">请输入15位或18位代码</span>',
            replace: true
        }
    }]);

    //组织机构验证
    app.directive('orgCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.orgError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    //由8位数字(或大写字母)本体代码和1位数字(或大写拉丁字母)校验码组成，允许第8位和第9位之间用分隔符-隔开，数字和符号共计10位内
                    function orgcodevalidate(value){
                        if(value && value!=""){
                            var values=value.split("-");
                            var ws = [3, 7, 9, 10, 5, 8, 4, 2];
                            var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                            var reg = /^([0-9A-Z]){8}$/;
                            if (!reg.test(values[0])) {
                                return true
                            }
                            var sum = 0;
                            for (var i = 0; i < 8; i++) {
                                sum += str.indexOf(values[0].charAt(i)) * ws[i];
                            }
                            var C9 = 11 - (sum % 11);
                            var YC9=values[1]+'';
                            if (C9 == 11) {
                                C9 = '0';
                            } else if (C9 == 10) {
                                C9 = 'X'  ;
                            } else {
                                C9 = C9+'';
                            }
                            return YC9!=C9;
                        }
                    }
                    return !orgcodevalidate(value);
                };
            }
        }
    }]);
    app.directive('orgError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="orgError">请输入正确的组织机构代码</span>',
            replace: true
        }
    }]);

    //纳税人识别号长度验证
    app.directive('taxpayerCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.taxpayerError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    if(!value || value.length==15 || value.length==18 || value.length==20){
                        return true;
                    }else{
                        return false;
                    }
                };
            }
        }
    }]);
    app.directive('taxpayerError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="taxpayerError">请输入15位.18位或20位代码</span>',
            replace: true
        }
    }]);

    //推荐人验证
    app.directive('recommendCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.recommendError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    var reg = /^\d*$/;
                    if(!value){
                        return true;
                    }else if(value.length == 5 || value.length==7){
                        return reg.test(value);
                    }else{
                        return false;
                    }
                };
            }
        }
    }]);
    app.directive('recommendError', [function () {
        return {
            restrist: 'A',
            template: '<span ng-message="recommendError">请输入5位或7位数字</span>',
            replace: true
        }
    }]);

    //最小数值
    app.directive('minNumCheck', [function () {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: function(scope, ele , attrs, ctrl) {
                ctrl.$validators.minNumError = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return value*1 > attrs.minNumCheck*1;
                };
            }
        }
    }]);
    app.directive('minNumError', [function () {
        return {
            restrict: 'A',
            template: '<span ng-message="minNumError">必须大于{{minNum}}</span>',
            replace: true,
            scope:{
                conf : '='
            },
            link: function(scope, ele , attrs){
                scope.$watch('conf.minNumSet', function () {
                    scope.$parent.minNum = scope.conf.minNumSet;
                })
            }
        }
    }]);

});