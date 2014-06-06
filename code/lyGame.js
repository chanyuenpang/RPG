/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-5-31
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */

var LyGame = vee.Class.extend({
	/** @type {Monster} **/
	_ctlMonster : null,
	/** @type {LyEffect} **/
	_ctlEffect : null,
	/** @type {LyPopUp} **/
	_ctlPopUp : null,
	/** @type {VeeProgress} */
	_ctlHP : null,
	/** @type {VeeProgress} */
	_ctlExp : null,

	/** @type {cc.LabelTTF} */
	lbRank : null,
	/** @type {cc.LabelTTF} */
	lbLevel :null,

	onDidLoadFromCCB : function(hello){
		var adjust = vee.data.adEnabled ? 100 : 0;
		cc.log("adjust"+adjust);
		vee.PopMgr.resetLayer(this.lyHeader, vee.PopMgr.PositionType.Top, cc.p(0,0), true);
		vee.PopMgr.resetLayer(this.lyButtons, vee.PopMgr.PositionType.Bottom, cc.p(0,adjust), true);

		this._ctlMonster = this.ccbMonster.controller;
		this._ctlEffect = this.ccbEffect.controller;
		this._ctlHP = this.ccbHP.controller;
		this._ctlExp = this.ccbExp.controller;
		this._ctlPopUp = this.ccbPopUp.controller;
		this._ctlPopUp.onClose();

		vee.GestureController.registerControllelr(this.lyTouch, this);
		this._lastTapTime = new Date();
	},

	_lastTapTime : 0,
	onGestureSwipe : function(angle, distance, context){

	},

	/**
	 * @param distance
	 * @param {vee.GestureController} context
	 */
	onGestureTap : function(distance, context){
		var time = new Date();
		var duration = time - this._lastTapTime;
		if (duration > 300) {
			var dam = vee.Utils.randomInt(10000, 29000000);
			this._ctlEffect.showDamage(dam, context.getLastPointInWorld());
			this._lastTapTime = time;
		}
	},

	onInfo : function(){
		this._ctlPopUp.open(LyPopUp.Type.Status);
	},

	onEquip : function(){
		this._ctlPopUp.open(LyPopUp.Type.Equipment);
	},

	onMap : function(){
		this._ctlPopUp.open(LyPopUp.Type.Map);
	},

	onMagic : function(){
		this._ctlPopUp.open(LyPopUp.Type.Skill);
	},

	onGem : function(){
		this._ctlPopUp.open(LyPopUp.Type.Gems);
	}
});