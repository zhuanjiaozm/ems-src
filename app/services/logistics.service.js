define(function (require, exports, module) {
    var angular = require('angular');
    var $ = require('jquery');
    var ngModule = angular.module('logistics.service', []);


    ngModule.factory('logisticsService', ['$request', '$state', '$q', '$http', '$rootScope', function ($request, $state, $q, $http, $rootScope) {
        return {
            getLogisticsTrack: function (params) {
                $('body').addClass('loading');
                var deferred = $q.defer();
                $http.get('external/logistics/getLogisticsTrack?logisticCode=' + params.logisticCode + '&shipperCode=' + params.shipperCode + '&r=' + new Date().getTime()).then(
                    function (resp) {
                        deferred.resolve(resp.data);
                        $('body').removeClass('loading');
                    }, function (resp) {
                        $rootScope.$toast('网络出现问题！');
                        $('body').removeClass('loading');
                    }
                )
                return deferred.promise;
            }
        };
    }]);

    module.exports = ngModule;

});