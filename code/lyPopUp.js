/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-6-4
 * Time: 下午9:14
 * To change this template use File | Settings | File Templates.
 */

var LyPopUp = vee.Class.extend({
	/** @type {cc.LayerColor} */
	lyTouch : null,
	lyBody : null,

	onDidLoadFromCCB : function(){
		this.lyTouch.setTouchEnabled(false);
		vee.PopMgr.resetLayer(this.btnClose, vee.PopMgr.PositionType.BottomRight, cc.p(0,-52-100), true);
		this.btnClose.setTouchPriority(0);
		this.lyBG.setVisible(false);
	},

	/** @param {LyPopUp.Type} */
	open : function(type) {
		this.lyBG.setVisible(true);
		var fadeIn = cc.FadeTo.create(0.35, 128);
		this.lyBG.runAction(fadeIn);
		this.getContentByType(type);
		this.lyTouch.setTouchEnabled(true);
		var adjust = vee.PopMgr.originOffset.y;
		var move = cc.MoveTo.create(0.35, cc.p(0, adjust));
		this.rootNode.runAction(move);
	},

	onClose : function(){
		var fadeOut = cc.FadeTo.create(0.35, 0);
		this.lyBG.runAction(fadeOut);
		var move = cc.MoveTo.create(0.35, cc.p(0, -880));
		var back = cc.CallFunc.create(function(){
			this.lyBody.removeAllChildren();
			this.lyTouch.setTouchEnabled(false);
			this.lyBG.setVisible(false);
		}.bind(this));
		this.rootNode.runAction(cc.Sequence.create(move, back));
	},

	getContentByType : function(type) {
		switch (type){
			case LyPopUp.Type.Status:
				break;
			case LyPopUp.Type.Equipment:
				break;
			case LyPopUp.Type.Map:
			{
				var list = VeeTableViewController.createTableView(this.lyBody.getContentSize(), "mapCell.ccbi", MapData.getMapCount());
				this.lyBody.addChild(list);
			}
				break;
			case LyPopUp.Type.Skill:
				break;
			case LyPopUp.Type.Gems:
				break;
		}
	}
});

LyPopUp.Type = {
	Status : 0,
	Equipment : 1,
	Map : 2,
	Skill : 3,
	Gems : 4
}