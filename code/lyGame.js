/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-5-31
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */

var game = game = game || {};

/** @type {LyGame} */
game.lyGame = null;

var LyGame = vee.Class.extend({
	/** @type {Monster} **/
	_ctlMonster : null,
	/** @type {LyEffect} **/
	_ctlEffect : null,
	/** @type {LyPopUp} **/
	_ctlPopUp : null,

	/** @type {cc.LabelTTF} */
	lbRank : null,
	/** @type {cc.LabelTTF} */
	lbLevel :null,

	onDidLoadFromCCB : function(hello){
		var adjust = vee.data.adEnabled ? 100 : 0;
		vee.PopMgr.resetLayer(this.lyHeader, vee.PopMgr.PositionType.Top, cc.p(0,0), true);
		vee.PopMgr.resetLayer(this.lyButtons, vee.PopMgr.PositionType.Bottom, cc.p(0,adjust), true);

		this._ctlMonster = this.ccbMonster.controller;
		this._ctlEffect = this.ccbEffect.controller;
		this._ctlPopUp = this.ccbPopUp.controller;
		this._ctlPopUp.onClose();

		Role.setProgressCtl(this.ccbHP.controller, this.ccbExp.controller);

		vee.GestureController.registerControllelr(this.lyTouch, this);
		this._lastTapTime = new Date();

		game.lyGame = this;
		this._ctlMonster.show();
		vee.Utils.scheduleCallbackForTarget(this, this.updateTick, 1.0, cc.REPEAT_FOREVER, 0, false);
	},

	updateTick : function(){
		Role.recover();
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
			var pos = context.getLastPoint();
			if (this._ctlMonster.isMonsterTouched(pos)) {
				var dam = Role.attack(this._ctlMonster);
				if (this._ctlMonster.attacked(dam)) {
					this._ctlEffect.showDamage(dam, pos);
				}
				this._lastTapTime = time;
			}
		}
	},

	monsterAttack : function(){
		var dam = Role.attacked(this._ctlMonster);
		this._ctlEffect.monsterAttack(dam, this._ctlMonster.element);
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