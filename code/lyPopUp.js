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
		var y = this.btnClose.getPositionY();
		vee.PopMgr.resetLayer(this.btnClose, vee.PopMgr.PositionType.Right, cc.p(0,0), true);
		this.btnClose.setPositionY(y);
		this.btnClose.setTouchPriority(0);
		this.btnCloseEmpty.setTouchPriority(0);
		this.btnCloseEmpty.setVisible(false);
		this.lyBG.setVisible(false);
	},

	/** @param {LyPopUp.Type} */
	open : function(type) {
		this.btnCloseEmpty.setVisible(true);
		this.rootNode.setVisible(true);
		this.lyBG.setVisible(true);
		var fadeIn = cc.FadeTo.create(0.35, 128);
		this.lyBG.runAction(fadeIn);
		this.getContentByType(type);
		this.lyTouch.setTouchEnabled(true);
		var adjust = vee.PopMgr.originOffset.y;
		var move = cc.MoveTo.create(0.3, cc.p(0, adjust));
		this.rootNode.runAction(cc.EaseExponentialIn.create(move));
	},

	onClose : function(){
		this.btnCloseEmpty.setVisible(false);
		var fadeOut = cc.FadeTo.create(0.35, 0);
		this.lyBG.runAction(fadeOut);
		var move = cc.MoveTo.create(0.2, cc.p(0, -880));
		var back = cc.CallFunc.create(function(){
			this.lyBody.removeAllChildren();
			this.lyTouch.setTouchEnabled(false);
			this.lyBG.setVisible(false);
		}.bind(this));
		this.rootNode.runAction(cc.Sequence.create(move, back));
	},

	onCloseEmpty : function(){
		this.onClose();
	},

	getContentByType : function(type) {
		switch (type){
			case LyPopUp.Type.Status:
			{
				var node = cc.BuilderReader.load("lyRoleInfo.ccbi");
				this.lyBody.addChild(node);
			}
				break;
			case LyPopUp.Type.Equipment:
				break;
			case LyPopUp.Type.Map:
			{
				var list = VeeTableViewController.createTableView(this.lyBody.getContentSize(), "mapCell.ccbi", MapData.getMapCount(), MapData);
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