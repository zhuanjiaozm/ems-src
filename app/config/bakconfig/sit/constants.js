define(function (require, exports, module) {
    var $ = require('jquery');
    var cookie = require('cookie');
    var constants = {
        apiUri: 'https://web.manager.sit.com/manager/',
        // apiUri: 'http://121.43.178.103:8888/o2o-api/',
        imgService: 'https://web.manager.sit.com/ssl/121.43.178.103:8888/o2o-fs/uploadfile.xhtml',
        httpAPIUrl: URISET.httpAPIUrl,
        $action: function (url) {
            return '/app/controller/' + url + '.js';
        },
        $template: function (url) {
            return '/app/view/' + url + '.html';
        },
        $cookie: function (key, value) {
            if (value) {
                $.cookie(key, JSON.stringify(value));
            } else {
                return $.cookie(key) ? $.parseJSON($.cookie(key)) : false;
            }
        },
        $removeCookie: function (key) {
            $.removeCookie(key);
        },
        $uploadParams: {
            baseUrl: "https://web.manager.sit.com/ssl/121.43.178.103:8888/o2o-fs/view/",
            channelFlag: "pc",
            imageUploadUrl: "https://web.manager.sit.com/ssl/121.43.178.103:8888/o2o-fs/uploadfile.xhtml",
            module: "goods",
            noCallBack: "0",
            notemp: "1",
            returnUrl: "https://web.manager.sit.com",
            sign: "8a6bed75e49cc8cf1c82efe4a0aa8260",
            syschannel: "6",
            userid: null,
            mobileImgBaseUrl: URISET.mobileImgBaseUrl
        },
        $imgSize:{  //图片服务器支持的缩放大小 800x800, 400x400, 200x200, 80x80, 50x50
            XL : '_800x800.jpg',
            L : '_400x400.jpg',
            M : '_200x200.jpg',
            S: '_80x80.jpg',
            XS: '_50x50.jpg'
        }
    };

    module.exports = {
        regConstants: function (ngModule) {
            for (var key in constants) {
                ngModule.constant(key, constants[key]);
            }
        }
    };
});