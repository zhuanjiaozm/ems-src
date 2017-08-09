define(function(require, exports, module) {
    var angular = require('angular'),
        asyncLoader = require('angular-async-loader'),
        router = require('angular-ui-router'),
        $ = require('jquery'),
        cookie = require('cookie'),
        dialog = require('ng-dialog'),
        toast = require('toast');
    require('echarts');
    require('angular-echarts');
    require('angular-messages');
    require('page');
    require('app/components/examineComponent.js');
    require('app/components/uploadPicBox.directive.js');
    require('app/services/organize.service.js');
    require('app/services/city.service.js');
    require('app/components/berResetDirective.js');
    require('app/components/selectCategory.js');
    require('app/components/numInput.js');
    require('app/components/ngLayDate.js');

    var app = angular.module('app', ['ui.router', 'ngDialog', 'angular-echarts', 'ngMessages', 'pagination', 'examineComponent', 'uploadPicBox.directive', 'organize.service', 'berResert', 'selectCategory', 'numInput', 'ngLayDate', 'city.service']);

    app.config(['$httpProvider', '$compileProvider', function($httpProvider, $compileProvider) {
        // Use raw Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms|ber):/);
    }]);
    app.run(['$rootScope', '$state', '$stateParams', '$dialog', '$imgSize',
        function($rootScope, $state, $stateParams, $dialog, $imgSize) {
            $rootScope.$state = $state;
            $rootScope.baseUrl = 'http://www.ems.com';
            $rootScope.$stateParams = $stateParams;
            $rootScope.$dialog = $dialog;
            $rootScope.$toast = function(text) {
                $.toast({
                    text: text,
                    position: 'mid-center',
                    stack: false,
                    hideAfter: 2000,
                    showHideTransition: 'fade'
                });
            };
            $rootScope.$imgSize = $imgSize;
            $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                if (!$.cookie('userInfo')) {
                    $state.go('login');
                }
            });
        }
    ]);
    asyncLoader.configure(app);

    module.exports = app;
});