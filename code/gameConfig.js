/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-3-19
 * Time: 下午4:11
 * To change this template use File | Settings | File Templates.
 */

var game = game = game || {};

game.Config = {};

game.Config.iOS = {

	// 如果有去广告功能，广告 IAP 必须放在第一个
	IAPs : [
		"com.veewo.1024ad",  //去广告
		"com.veewo.1024undo2"
	],
	LeaderboardIDs : [
		"com.veewo.2048", //2048 模式
		"com.veewo.1024", //1024 模式
		"com.veewo.1024star" //star 模式
	],
	UmengKey : "531422a356240be1542137d5"
}

game.Config.android = {
	IAPs : [
	],
	LeaderboardIDs : [
		"CgkIsdDk6ZgdEAIQCw", //2048 模式
		"CgkIsdDk6ZgdEAIQBw", //1024 模式
		"CgkIsdDk6ZgdEAIQCg" //star 模式
	],
	UmengKey : "5307500a56240bbbb001a21a"
}

/**
 *
 * @returns {game.Config.iOS}
 */
game.getConfig = function(){
	var config = null;
	switch(vee.platform){
		case cc.TARGET_PLATFORM.ANDROID:
			return game.Config.android;
		case cc.TARGET_PLATFORM.IPAD:
		case cc.TARGET_PLATFORM.IPHONE:
			return game.Config.iOS;
		default:
			return {};
	}
}

game.init = function(isFirstPlay){
	if (isFirstPlay) {
	}
}

game.Strings = {
	s_Pop_Info : ['Status', '状态'],
	s_Pop_Equip : ['Equipment', '装备'],
	s_Pop_Map : ['Dungeon', '地图'],
	s_Pop_Power : ['Power', '魔法道具'],
	s_Pop_Gem : ['Magic Gems', '魔法石'],

	getString : function(arr){
		return vee.Utils.getStringByLanguage(arr[0], arr[1], arr[2], arr[3]);
	}
}