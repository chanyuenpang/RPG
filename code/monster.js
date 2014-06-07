/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-5-31
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */

var game = game = game || {};

var Monster = vee.Class.extend({
	/** @type {VeeProgress} **/
	_ctlHP : null,

	/** @type {cc.Layer} **/
	lyScale : null,

	_scale : 1.0,

	onDidLoadFromCCB : function(){
		this._ctlHP = this.ccbHP.controller;
		this.reset(false);
	},

	reset : function(isBoss){
		var data = MapData.getDataByIndex(RoleData.selectedMap);
		var str, dex, vit;
		var luc = vee.Utils.randomInt(0,99);
		if (isBoss) {
			str = data.boss[0];
			dex = data.boss[1];
			vit = data.boss[2];
		} else {
			var boost = game.Element.getPowerBoost(data.element);
			var ap = data.ap;
			str = Math.round(ap*0.3 + vee.Utils.randomInt(-10,10*boost[0])/100*ap);
			vit = Math.round(ap*0.3 + vee.Utils.randomInt(-10,10*boost[1])/100*ap);
			dex = Math.round(ap*0.3 + vee.Utils.randomInt(-10,10*boost[2])/100*ap);
		}

		this._hp = 10*Role.fn(vit) + 2*vit;
		this._attack = 5*Role.fn(str)+30;
		this._attackSpeed = 6*Role.fn(dex) + 30 + Role.fn(vit) + 10;
		this._defense = 3*Role.fn(vit) + Role.fn(str);
		this._criticalRate = 100 * (Role.fn(dex)/10000 + luc/1000);
		this._criticalDamage = 8*Role.fn(str)+30 + 4*Role.fn(dex) + 20;

		this._ctlHP.reset(this._hp, this._hp, null, function(sender){
			if (this._ctlHP.getValue() <= 0) {
				this.die();
			}
		}.bind(this));
		this._scale = 0.3 + RoleData.selectedMap*0.07;
		this.lyScale.setScale(this._scale);
	},



	getRadius : function(){
		return 10000 * this._scale * this._scale;
	},

	isMonsterTouched : function(pos){
		return vee.Utils.distancePower2BetweenPoints(pos, this.rootNode.getPosition()) < this.getRadius();
	},

	_hp : 0,
	_attack : 0,
	_attackSpeed : 0,
	_defense : 0,
	_criticalRate : 0,
	_criticalDamage : 0,

	/** @type {game.Element} **/
	element : 0,

	attack : function(){

	},

	attacked : function(){

	},

	die : function(){
		this.playAnimate("Die", function(){

		})

	}
});