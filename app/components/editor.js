"use strict";

define(function (require) {
    var app = require('app');
    require('ueditor');
    require('ueditorConfig');
    require('zeroClipboard');
    require('../services/img.ueditor.js');

    app.directive("ueditor", ['$timeout','$uploadParams','uploadImg',
        function ($timeout,$uploadParams,uploadImg) {
            return {
                restrict: "EA",
                require: "ngModel",
                scope: {
                    config: "=",
                    ready: "="
                },
                link: function ($S, element, attr, ctrl) {
                    $S.config = {
                        toolbars: [[
                            'fullscreen', 'source', '|', 'undo', 'redo', '|',
                            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', '|',
                            'forecolor', 'backcolor', 'selectall', 'cleardoc', '|',
                            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                            'link', 'unlink', '|',
                            'horizontal', 'date', 'time',  '|',
                            'customstyle', 'paragraph', 'fontfamily', 'fontsize',  '|'
                        ]],
                        enableAutoSave: false, //禁止自动保存
                        autoSyncData: false,//自动同步编辑器要提交的数据
                    };
                    var _NGUeditor, _updateByRender;
                    _updateByRender = true;
                    _NGUeditor = (function () {
                        function _NGUeditor() {
                            this.bindRender();
                            this.initEditor();
                            return;
                        }

                        /**
                         * 初始化编辑器
                         * @return {[type]} [description]
                         */

                        _NGUeditor.prototype.initEditor = function () {
                            var _UEConfig, _editorId, _self;
                            _self = this;
                            if (typeof UE === 'undefined') {
                                console.error("Please import the local resources of ueditor!");
                                return;
                            }
                            _UEConfig = $S.config ? $S.config : {};
                            _editorId = attr.id ? attr.id : "_editor" + (Date.now());
                            element[0].id = _editorId;
                            this.editor = new UE.ui.Editor(_UEConfig);
                            this.editor.render(_editorId);

                            //添加图片上传
                            UE.registerUI('uploadImg', function(editor, uiName) {
                                editor.registerCommand(uiName, {
                                    execCommand: function() {}
                                });
                                var btn = new UE.ui.Button({
                                    name: uiName,
                                    title: '插入图片',
                                    cssRules: 'background-position: -726px -77px;',
                                    //点击时执行的命令
                                    onclick: function() {
                                        uploadImg.imgInit().then(function (res) {
                                            $timeout(function(){
                                                editor.setContent(res, true);
                                            });
                                        });
                                    }
                                });
                                return btn;
                            });

                            return this.editor.ready(function () {
                                _self.editorReady = true;
                                _self.editor.addListener("contentChange", function () {
                                    ctrl.$setViewValue(_self.editor.getContent());
                                    if (!_updateByRender) {
                                        if (!$S.$$phase) {
                                            $S.$apply();
                                        }
                                    }
                                    _updateByRender = false;
                                });
                                if (_self.modelContent && _self.modelContent.length > 0) {
                                    _self.setEditorContent();
                                }
                                if (typeof $S.ready === "function") {
                                    $S.ready(_self.editor);
                                }
                                $S.$on("$destroy", function () {
                                    if (!attr.id && UE.delEditor) {
                                        UE.delEditor(_editorId);
                                    }
                                });
                            });
                        };

                        _NGUeditor.prototype.setEditorContent = function (content) {
                            if (content == null) {
                                content = this.modelContent;
                            }
                            if (this.editor && this.editorReady) {
                                this.editor.setContent(content);
                            }
                        };

                        _NGUeditor.prototype.bindRender = function () {
                            var _self;
                            _self = this;
                            ctrl.$render = function () {
                                _self.modelContent = (ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
                                _updateByRender = true;
                                _self.setEditorContent();
                            };
                            ctrl.$render();
                        };

                        return _NGUeditor;

                    })();

                    $timeout(function(){
                        new _NGUeditor();
                    });
                }
            };
        }
    ]);

});