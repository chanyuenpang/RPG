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
	/** @type {cc.Layer} **/
	lyMonster : null,

	_scale : 1.0,

	onDidLoadFromCCB : function(){
		this._ctlHP = this.ccbHP.controller;
		this.reset(false);
	},

	reset : function(isBoss){
		var data = MapData.getDataByIndex(RoleData.selectedMap);
		this._level = Math.floor(RoleData.selectedMap*6.2+2) + (isBoss?5:0);
		var str, dex, vit;
		var luc = vee.Utils.randomInt(0,99);
		if (isBoss) {
			this.element = data.element;
			str = data.boss[0];
			dex = data.boss[1];
			vit = data.boss[2];
		} else {
			this.element = vee.Utils.isLucky(0.3) ? data.element : game.Element.getRandomElement();
			var boost = game.Element.getPowerBoost(this.element);
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

		this._ctlHP.reset(1, this._hp);
		this._scale = 0.35 + RoleData.selectedMap*0.07;
		this.lyScale.setScale(this._scale);
		this._isDead = false;
		this._isAnimating = false;
		this._isAttacking = false;

		this._attackChance = Math.max(0.025, Math.min(0.5, (1.3*this._attackSpeed-Role._attackSpeed)/this._attackSpeed/1.8));

		var children = this.lyMonster.getChildren();
		var color = game.Element.getMajorColor(this.element);
		for (var i in children){
			/** @type {cc.Sprite} **/
			var sp = children[i];
			sp.setColor(color);
		}

		vee.Utils.logValue(Role, "reset Monster", true);
		vee.Utils.logValue(this, "reset monster", true);
	},

	_pos : null,
	getPosition : function(){
		if (!this._pos) this._pos = vee.Utils.pAdd(this.rootNode.getPosition(), cc.p(0, -50));
		return this._pos;
	},
	getRadius : function(){
		return 40000 * this._scale * this._scale;
	},

	isMonsterTouched : function(pos){
		return vee.Utils.distancePower2BetweenPoints(pos, this.getPosition()) < this.getRadius();
	},

	_hp : 0,
	_attack : 0,
	_attackSpeed : 0,
	_defense : 0,
	_criticalRate : 0,
	_criticalDamage : 0,

	_attackChance : 0,
	_level : 0,

	/** @type {game.Element} **/
	element : 0,

	_isAttacking : false,
	attack : function(){
		if (this._isDead || this._isAttacking) return false;
		this._isAnimating = true;
		this._isAttacking = true;
		this.playAnimate("Attack", function(){
			this._isAttacking = false;
			this.doneAnimation();
		}.bind(this));
		return true;
	},

	_isAnimating : false,
	attacked : function(dam){
		if (this._isDead || this._isAttacking) return false;
		this._hp -= dam;
		this._ctlHP.setValue(this._hp);
		if (this._hp <= 0) {
			this.die();
		}
		if (this._isAnimating) return true;
		this._isAnimating = true;
		this.playAnimate("Hit", function(){
			if (this._hp > 0 && vee.Utils.isLucky(this._attackChance)) {
				game.lyGame.monsterAttack();
				vee.Utils.scheduleOnce(this.attack.bind(this), 0.1);
			}
			else this.doneAnimation();
		}.bind(this));
		return true;
	},

	_isDead : false,
	die : function(){
		this._isDead = true;
		this._isAnimating = true;
		Role.monsterKilled(this._level);
		this.playAnimate("Die");
		vee.Utils.scheduleOnce(this.show.bind(this), 2.0);
	},

	show : function(isBoss){
		this.reset(isBoss);
		this._isDead = true;
		this._isAnimating = true;
		this.playAnimate('Show', function(){
			this._isDead = false;
			this.doneAnimation();
		}.bind(this));
	},

	doneAnimation : function(){
		this._isAnimating = false;
	}
});
