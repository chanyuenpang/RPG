/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-5-31
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */

var game = game = game || {};

game.oMonster = null;

var Monster = vee.Class.extend({
	/** @type {VeeProgress} **/
	_ctlHP : null,

	/** @type {cc.Layer} **/
	lyScale : null,

	_scale : 1.0,

	onDidLoadFromCCB : function(){
		this._ctlHP = this.ccbHP.controller;
		game.oMonster = this;
	},

	getPosition : function(){
		return this.rootNode.getPosition();
	},

	getRadius : function(){
		return 100 * this._scale;
	},

	_attack :0,
	_attackSpeed : 0,
	_defense : 0,
	_criticalRate : 0,
	_criticalDamage : 0,

	/** @type {game.Element} **/
	element : 0,

	attack : function(ene){

	},

	attacked : function(ene){

	},

	die : function(){

	}
});