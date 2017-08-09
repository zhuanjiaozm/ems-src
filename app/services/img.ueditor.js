define(function (require) {
    var angular = require('angular');
    var app = require('app');
    require("ng-dialog");

    app.factory('uploadImg', ['ngDialog','$q','$template','$uploadParams', function (ngDialog,$q,$template,$uploadParams) {
        return {
            imgInit:function(){
                var deferred = $q.defer();
                ngDialog.open({
                    width:300,
                    template:$template('template/imgUeditor'),
                    controller:['$scope',function($scope){
                        $scope.pic = {
                            licenseImg:''
                        };
                        $scope.imgServerUrl = $uploadParams.baseUrl;
                        $scope.enter = function(){
                            if($scope.pic.licenseImg){
                                var imgStr = '<img src="'+$scope.imgServerUrl+$scope.pic.licenseImg+'"/>';
                                deferred.resolve(imgStr);
                                $scope.closeThisDialog(0);
                            }
                        }
                    }]
                });
                return deferred.promise;
            }
        }
    }]);
});