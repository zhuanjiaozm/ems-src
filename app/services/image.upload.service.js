define(function (require, exports, module) {
    var angular = require('angular');
    require('/app/services/public.service.js');
    require('ng-dialog');

    var ngModule = angular.module('image.upload.service', ['ngDialog', 'public.service']);

    ngModule.factory('imageUploadService', ['$http', '$rootScope', '$window', 'publicService', '$uploadParams',
        function ($http, $rootScope, $window, publicService, $uploadParams) {

            $window.SetInfoPicUrl = function (paramsObj) {
                if(paramsObj['code'] == '0') {
                    $window.myImgUpdate.s.ret({imgBaseUrl: $window.myImgUpdate.s.imgBaseUrl, imgUrl: paramsObj.picurl});
                } else if (paramsObj['code'] == '2') {
                    alert('您上传的图片大于3M，请重新上传');
                } else {
                    alert('图片上传失败');
                }
                $rootScope.$apply();
            };
            $window.myImgUpdate = {
                iframeId: "",
                iframeDom: "",
                formId: "",
                formDom: "",
                fileId: "",
                requestDone: false,
                xml: {},
                s: null
            };

            var uploadCallback = function (isTimeout) {//回调函数

                var io = $window.myImgUpdate.iframeDom.get(0); //得到iframe对象
                try {
                    if (io.contentWindow) {//动态iframe所在窗口对象是否存在
                        $window.myImgUpdate.xml.responseText = io.contentWindow.document.body&&io.contentWindow.document.body.innerHTML || null;
                        $window.myImgUpdate.xml.responseXML = io.contentWindow.document.XMLDocument || io.contentWindow.document;
                    } else if (io.contentDocument) {//动态iframe的文档对象是否存在
                        $window.myImgUpdate.xml.responseText = io.contentDocument.document.body&&io.contentDocument.document.body.innerHTML || null;
                        $window.myImgUpdate.xml.responseXML = io.contentDocument.document.XMLDocument || io.contentDocument.document;
                    }
                } catch (e) {
                    $.handleError($window.myImgUpdate.xml, null, e);
                }
                if ($window.myImgUpdate.xml || isTimeout == "timeout") {//xml变量被赋值或者isTimeout == "timeout"都表示请求发出，并且有响应
                    $window.myImgUpdate.requestDone = true; //请求完成
                    var status;
                    try {
                        status = isTimeout != "timeout" ? "success" : "error"; //如果不是“超时”，表示请求成功
                        // Make sure that the request was successful or notmodified
                        if (status != "error") {
                            // process the data (runs the xml through httpData regardless of callback)
                            var data = $.uploadHttpData($window.myImgUpdate.xml, $window.myImgUpdate.s.dataType); //根据传送的type类型，返回json对象，此时返回的data就是后台操作后的返回结果
                            // If a local callback was specified, fire it and pass it the data
                            if ($window.myImgUpdate.s.success) {
                                $window.myImgUpdate.s.success(data, status); //执行上传成功的操作
                            }
                            // Fire the global callback
                            if ($window.myImgUpdate.s.global) {
                                $.event.trigger("ajaxSuccess", [$window.myImgUpdate.xml, $window.myImgUpdate.s]);
                            }
                        } else {
                            $.handleError($window.myImgUpdate.xml, status);
                        }
                    } catch (e) {
                        status = "error";
                        $.handleError($window.myImgUpdate.xml, status, e);
                    }
                    // The request was completed
                    if ($window.myImgUpdate.s.global) {
                        $.event.trigger("ajaxComplete", [$window.myImgUpdate.xml, $window.myImgUpdate.s]);
                    }
                    // Handle the global AJAX counter
                    if ($window.myImgUpdate.s.global && ! --$.active) {
                        $.event.trigger("ajaxStop");
                    }
                    // Process result
                    if ($window.myImgUpdate.s.complete) {
                        $window.myImgUpdate.s.complete($window.myImgUpdate.xml, status);
                    }

                    $(io).unbind();//移除iframe的事件处理程序

                    setTimeout(function () {//设置超时时间
                        try {
                            $(io).remove();//移除动态iframe
                            $($window.myImgUpdate.formDom).remove();//移除动态form
                        } catch (e) {
                            $.handleError($window.myImgUpdate.xml, null, e);
                        }
                    }, 100);
                    $window.myImgUpdate.xml = null;
                }
            };

            $.extend({
                createUploadIframe: function () {//id为当前系统时间字符串，uri是外部传入的json对象的一个参数
                    //create frame
                    $window.myImgUpdate.iframeDom = $("<iframe></iframe>", {id: $window.myImgUpdate.iframeId, name: $window.myImgUpdate.iframeId}).css({"position":"absolute", "top":"-9999px", "left":"-9999px"});
                    if (window.ActiveXObject) {//判断浏览器是否支持ActiveX控件
                        if (typeof $window.myImgUpdate.s.uri == 'boolean') {
                            $window.myImgUpdate.iframeDom.attr({"src": "javascript:false"});
                        } else if (typeof $window.myImgUpdate.s.uri == 'string') {
                            $window.myImgUpdate.iframeDom.attr({"src": $window.myImgUpdate.s.uri});
                        }
                    }
                    $window.myImgUpdate.iframeDom.appendTo(document.body); //将动态iframe追加到body中
                },
                createUploadForm: function () {//id为当前系统时间字符串，fileElementId为页面<input type='file' />的id，data的值需要根据传入json的键来决定
                    //create form
                    $window.myImgUpdate.formDom = $('<form></form>', { //创建form元素
                        'id': $window.myImgUpdate.formId,
                        'name': $window.myImgUpdate.formId,
                        'method': "POST",
                        'enctype': "multipart/form-data",
                        'action': $window.myImgUpdate.s.imgServerUrl,
                        'target': $window.myImgUpdate.iframeId
                    });
                    if (typeof ($window.myImgUpdate.s.data) != 'undefined') {//通常为false
                        for (var i in $window.myImgUpdate.s.data) {
                            $('<input type="hidden" name="' + i + '" value="' + $window.myImgUpdate.s.data[i] + '" />').appendTo($window.myImgUpdate.formDom); //根据data的内容，创建隐藏域，这部分我还不知道是什么时候用到。估计是传入json的时候，如果默认传一些参数的话要用到。
                        }
                    }
                    var oldElement = $('#' + $window.myImgUpdate.s.fileElementId); //得到页面中的<input type='file' />对象
                    var newElement = oldElement.clone(); //克隆页面中的<input type='file' />对象
                    oldElement.attr('id', $window.myImgUpdate.fileId); //修改新对象的id
                    newElement.insertBefore(oldElement);
                    oldElement.appendTo($window.myImgUpdate.formDom);

                    //set attributes
                    $window.myImgUpdate.formDom.css({'position': 'absolute', 'top': '-1200px', 'left': '-1200px'}); //给动态form添加样式，使其浮动起来，
                    $window.myImgUpdate.formDom.appendTo('body'); //把动态form插入到body中
                },
                ajaxFileUpload: function (s) {//这里s是个json对象，传入一些ajax的参数
                    // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
                    $window.myImgUpdate.s = $.extend({}, $.ajaxSettings,s); //此时的s对象是由$.ajaxSettings和原s对象扩展后的对象
                    var id = new Date().getTime(); //取当前系统时间，目的是得到一个独一无二的数字
                    $window.myImgUpdate.iframeId = 'jUploadFrame' + id; //动态 iframe 的id
                    $window.myImgUpdate.formId = 'jUploadForm' + id; //动态 form 的id
                    $window.myImgUpdate.fileId = 'jUploadFile' + id; //动态 file 的id
                    $.createUploadIframe(); //创建动态 iframe
                    $.createUploadForm(); //创建动态form
                    // Watch for a new set of requests
                    if ($window.myImgUpdate.s.global && !$.active++) {//当jquery开始一个ajax请求时发生
                        $.event.trigger("ajaxStart"); //触发ajaxStart方法
                    }
                    $window.myImgUpdate.requestDone = false; //请求完成标志
                    // Create the request object
                    $window.myImgUpdate.xml = {};
                    if ($window.myImgUpdate.s.global) {
                        $.event.trigger("ajaxSend", [$window.myImgUpdate.xml, $window.myImgUpdate.s]); //触发ajaxSend方法
                    }
                    // Wait for a response to come back

                    // Timeout checker
                    if ($window.myImgUpdate.s.timeout > 0) {//超时检测
                        setTimeout(function () {
                            // Check to see if the request is still happening
                            if (!$window.myImgUpdate.requestDone) {
                                uploadCallback("timeout");//如果请求仍未完成，就发送超时信号
                            }
                        }, $window.myImgUpdate.s.timeout);
                    }
                    try {
                        if ($window.myImgUpdate.formDom.get(0).enctype) {//选择编码方式
                            $window.myImgUpdate.formDom.attr('enctype', 'multipart/form-data');
                        } else {
                            $window.myImgUpdate.formDom.attr('encoding', 'multipart/form-data');
                        }
                        $window.myImgUpdate.formDom.submit();//提交form表单
                    } catch (e) {
                        $.handleError($window.myImgUpdate.xml, null, e);
                    }

                    $window.myImgUpdate.formDom.load(uploadCallback); //ajax 请求从服务器加载数据，同时传入回调函数
                    return { abort: function () { } };

                },
                handleError: function(xhr, status, e ) {
                    // If a local callback was specified, fire it
                    if ( $window.myImgUpdate.s.error ) {
                        $window.myImgUpdate.s.error.call( $window.myImgUpdate.s.context || $window.myImgUpdate.s, xhr, status, e );
                    }
                    // Fire the global callback
                    if ( $window.myImgUpdate.s.global ) {
                        ($window.myImgUpdate.s.context ? $($window.myImgUpdate.s.context) : $.event).trigger( "ajaxError", [xhr, $window.myImgUpdate.s, e] );
                    }
                },
                uploadHttpData: function (r, type) {
                    var data = !type;
                    data = type == "xml" || data ? r.responseXML : r.responseText;
                    // If the type is "script", eval it in global context
                    if (type == "script") {
                        $.globalEval(data);
                    }
                    // Get the JavaScript object, if JSON is used.
                    if (type == "json") {
                        eval("data = " + data);
                    }
                    // evaluate scripts within html
                    if (type == "html") {
                        $("<div>").html(data).evalScripts();
                    }
                    return data;
                }
            });

            function fileType(obj){
                var uploadFileType = obj.substring(obj.lastIndexOf(".")+1).toLowerCase();
                return ('-1' != $.inArray(uploadFileType, ['jpg', 'jpeg', 'png', 'gif']));
            }

            var uploadParams = $uploadParams;

            return {
                clickFn: function (id) {
                    $("#"+ id).trigger("click");
                },
                changeFn: function(dom, param){
                    this.files = dom.files;
                    var value = $(dom).val();
                    for(var i=0; i<this.files.length; i++){
                        if(param.maxSize < this.files[i].size){
                            param.ret({code:-1});
                            return false;
                        }
                    }
                    if(value&&fileType(value)){
                        $.ajaxFileUpload({
                            imgServerUrl: uploadParams.imageUploadUrl,
                            imgBaseUrl: uploadParams.baseUrl,
                            data : {
                                "returnUrl": uploadParams.returnUrl+'/app/view/common/fileUploadCallback.html?1=1',
                                'userid' : uploadParams.userid ,
                                'module' : uploadParams.module,
                                'sign': uploadParams.sign,
                                'type' : uploadParams.type,
                                'syschannel' : uploadParams.syschannel,
                                'channelFlag' : uploadParams.channelFlag,
                                'noCallBack' : uploadParams.noCallBack,
                                'notemp' : uploadParams.notemp
                            },
                            ret: param.ret,
                            secureuri: false, //一般设置为false
                            fileElementId: param.fileElementId, // 上传文件的id、name属性名
                            dataType: 'json'//返回值类型，一般设置为json、application/json  这里要用大写  不然会取不到返回的数据
                        });
                    }else{
                        alert('请选择后缀为jpg、jpeg、png、gif的文件');
                    }
                }
            };
        }]);

    module.exports = ngModule;
});
