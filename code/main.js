// Autogenerated main.js file

require("jsb.js");
require("vee.js");
require("gameModule.js");

require("element.js");
require("lyGame.js");
require("lyEffect.js");
require("lyDamage.js");
require("monster.js");
require("lyPopUp.js");
require("mapData.js");

var game = game = game || {};

//vee.data.adEnabled = false;

vee.GameModule.OverLayer.extend({
	getShareContent : function() {
		return "这才是真正的 分享字符串";
	}
});

//vee.ParentalController.activate();
function main()
{
	cc.Director.getInstance().setDisplayStats(false);
	vee.PopMgr.resetScene();
	vee.GameModule.SceneMgr.openGame();
	vee.Ad.activate(function(){
		vee.Ad.showBannerAd(vee.Ad.Position.Top);
	}, 1);
}

main();