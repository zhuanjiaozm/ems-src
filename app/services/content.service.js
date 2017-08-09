/**
 * Created by 疯子乔 on 2017/4/18.
 */
define(function(require, exports, module) {
    var angular = require('angular');
    var ngModule = angular.module('content.service', []);
    ngModule.factory('contentService', ['$request', function($request) {
        return {
            getNoticesList: function(params) {
                return $request.get('announcements', params);
            },
            getAdvertsChannels: function() {
                return $request.get('adverts/channels');
            },
            //根据channel获取终端页面(区分总分行)
            getAdvertsSpaces: function(channelID,flag) {
                var url=flag==='0'?'adverts/mainPage':'adverts/secondPage';
                return $request.get(url, {
                    channel: channelID
                });
            },
            //根据channel获取终端页面全部(不区分总分行)
            getAdvertsAllPage: function(channel){
                return $request.get('adverts/allPage', {
                    channel:channel
                });
            },
            toggleAdverts: function(item) {
                return $request.put('adverts/advertStatus', {
                    id: item.id,
                    status: item.status
                });
            },
            startWorkFlow: function(id) {
                return $request.post('adverts/startWorkFlow', {
                    id: id
                });
            },
            //获取广告主页的广告列表
            getAdverts: function(params) {
                return $request.get('adverts/adverts', params);
            },
            //获取广告的所有聚合状态
            getAdvertsFinalStatus:function(){
                return $request.get('adverts/finalStatus');
            },
            //广告主页删除广告
            deleteAdvert: function(id) {
                return $request.delete('adverts/delAdverts/' + id);
            },
            //获取广告详情
            getAdvertInfo: function (id) {
                return $request.get('adverts/advertsInfo/'+id);
            },
            //查找公告
            searchNotice: function(params) {
                return $request.get('announcements', params);
            },
            //删除公告
            deleteNotice: function(id) {
                return $request.delete('announcements/' + id);
            },
            noticeStatusEnable:function(params){
                return $request.put('announcements/statusEnable', params);
            },
            noticeStatusUnEnable:function(params){
                return $request.put('announcements/statusUnEnable', params);
            },
            //获取公告详情
            getNoticeDetail: function(id) {
                return $request.get('announcements/' + id);
            },
            //提交公告
            subNotice: function(notice) {
                return $request.put('announcements/' + notice.id, notice);
            },
            //新增公告
            addNotice: function(notice) {
                return $request.post('announcements', notice);
            },
            //公告提交审核
            noticeStartWorkFlow : function (id) {
                return $request.put('announcements/startWorkFlow', {id:id});
            },
            //广告排序
            sortAdvert:function(params){
                return $request.put('adverts/ordinalAdverts', params);
            },
            //获取楼层列表
            getFloorList: function(params) {
                return $request.get('floors', params);
            },
            //获取指定位置的已有广告列表
            getAdvertListInPages:function(columnCode){
                return $request.get('adverts/advertList',columnCode);
            },
            //获取广告位的信息
            getFindAdvertColumnInfo: function(columnCode) {
                return $request.get('advertColumn/findAdvertColumnInfo', columnCode);
            },
            //改变广告状态
            changeAdvertStatus:function(params){
                return $request.put('adverts/advertStatus',params);
            },
            //保存广告
            saveAdvert:function(params){
                return $request.post('adverts/saveAdvert',params);
            },
            //获取资讯列表
            getNewsList:function(params){
                return $request.get('hotInfos', params);
            },
            //获取资讯页面
            getNewsAllPages:function(){
                return $request.get('allPage');
            },
            //资讯状态
            getNewsFinalStatus:function(){
                return $request.get('finalStatus');
            },
            //资讯删除
            deleteNews:function(id){
                return $request.delete('delHotInfo/'+id);
            },
            //资讯详情
            getNewsDetail: function(id) {
                return $request.get('getHotInfo/' + id);
            },
            //保存资讯
            subNews:function(params){
                return $request.post('saveHotInfo',params);
            },
            //资讯列表页面提交审核
            newsStartWorkFlow:function(id){
                return $request.put('startWorkFlow/',{id:id});
            },
            //改变资讯状态
            toggleStatus:function(id,url){
                return $request.put(url,{id:id});
            },
            //获取关键词列表
            getKeyWordsList:function(params){
                return $request.get('keyword/paged',params);
            },
            //改变关键词状态
            changeKeyWordsStatus:function(params){
                params.paramsType = 'JSON';
                return $request.get();
            },
            //删除关键词
            deleteKeyWords:function(id){
                return $request.delete('keyword/'+id,{
                    id:id
                });
            },
            //新建关键词
            addKeyWords:function(params){
                params.paramsType = 'JSON';
                return $request.post('keyword/add',params);
            },
            //编辑关键词
            editKeyWords:function(id,params){
                params.paramsType = 'JSON';
                return $request.put('keyword/'+id,params);
            }
        };
    }]);
    module.exports = ngModule;
});
