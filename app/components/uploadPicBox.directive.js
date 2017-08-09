"use strict";
/**
 * 上传图片指令，也可用于图片显示
 * leijunjie
 */
define(function (require, exports, module) {
    var angular = require('angular'),
        imageUpload = require('app/services/image.upload.service.js'),
        ngModule = angular.module('uploadPicBox.directive',['image.upload.service']);

    ngModule.directive('uploadPicBox', ['$template', 'imageUploadService','$uploadParams', function($template, imageUploadService, $uploadParams){
        return {
            restrict : 'EA',
            templateUrl : $template('template/uploadPic'),
            replace : true,
            scope : {
                //example <span upload-pic-box conf="{picName:'orgImg',isRequired:true, maxSize:800*1024}" pic-model="enterprise.orgImg"></span>
                /**
                 * conf 设置参数
                 *      picName     必须要有，图片隐藏域的name，同时作为上传时的id，注意不能重复
                 *      title       图片下方的标题
                 *      isRequired  是否必填 true, false(默认是false)
                 *      canDelete   可否删除 true, false(默认是false)
                 *      maxSize     图片大小限制，默认是3MB（3 * 1024 * 1024）
                 */
                conf : '=',
                /**
                 * picModel 直接获取父级的model
                 */
                picModel : '='
            },
            link: function(scope, ele , attrs){
                scope.imgBaseUrl = $uploadParams.baseUrl;
                scope.imageUpload = imageUploadService;
                scope.title = scope.conf.title;
                scope.picName = scope.conf.picName;
                scope.isRequired = scope.conf.isRequired;
                scope.canDelete = scope.conf.canDelete;
                scope.maxSize = scope.conf.maxSize ? scope.conf.maxSize : 3 * 1024 * 1024;

                //scope.picModel = 'images/user_img.jpg';

                //上传图片
                scope.uploadPic = function(){
                    scope.imageUpload.clickFn(scope.picName);
                };
                //打开大图
                scope.showBigPic = function(){
                    scope.$parent.$dialog.open({
                        template:'app/view/template/picView.html',
                        width:1000,
                        scope:scope,
                        controller:['$scope', function($scope){
                            //console.log($scope);
                        }]
                    })
                };

                //上传图片回调显示
                scope.ret = function (obj) {
                    if(obj.code === -1){
                        var maxSize = Math.floor(scope.maxSize/1024), sizeUnit = 'KB';
                        if(maxSize > 1024){
                            sizeUnit = 'MB';
                            maxSize = Math.floor(maxSize/1024);
                        }
                        scope.$root.$toast('图片不能大于' + maxSize + sizeUnit);
                    }else {
                        scope.picModel = obj.imgUrl;
                    }
                };

                //删除图片
                scope.delete = function () {
                    scope.picModel = '';
                    $('#'+scope.picName).val('');
                }

            }
        };
    }]);


    module.exports = ngModule;

});