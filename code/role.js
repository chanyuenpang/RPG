/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-6-1
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */

var RoleData = {
	strength : 3,
	intelligence : 2,
	dexterity : 2,
	vitality : 2,
	luck : 50,
	lv : 1,
	exp : 0,
	element : [0,0,0,0,0,0,0],
	selectedMap : 1,
	maxMapLevel : 0,
	AP : 0
}

var Role = {

	/** @type {VeeProgress} */
	_ctlHP : null,
	/** @type {VeeProgress} */
	_ctlExp : null,

	_hp : 0,
	_currentHP : -1,
	_sp : 0,
	_rank : 0,
	_attack : 0,
	_attackSpeed : 0,
	_defense : 0,
	_criticalRate : 0,
	_extraGold : 0,
	_eliteMonsterRate : 0,
	_extraExp : 0,
	_treasureRate : 0,
	_criticalDamage : 0,
	_roundInterval : 0,

	_fn : [2,4,6,9,11,13,16,19,21,24,27,30,33,37,40,43,47,51,54,58,62,66,70,75,79,84,88,93,98,103,108,114,119,125,130,136,142,148,155,161,168,174,181,188,195,203,210,218,225,233,241,250,258,267,275,284,293,303,312,322,331,341,351,362,372,383,394,405,416,427,439,451,463,475,488,500,513,526,539,553,566,580,594,608,623,637,652,667,683,698,714,730,746,763,780,797,814,831,849,867,900,1000],
	_exp: [200000,100000,55555.6,41666.7,33333.3,23809.5,20408.2,17857.1,13888.9,12500,11363.6,9259.3,8547,7936.5,6666.7,6250,5882.4,5050.5,4784.7,4545.5,3968.3,3787.9,3623.2,3205.1,3076.9,2958.6,2645.5,2551,2463.1,2222.2,2150.5,2083.3,1893.9,1838.2,1785.7,1634,1589.8,1548,1424.5,1388.9,1355,1253.1,1224,1196.2,1111.1,1087,1063.8,992.1,971.8,952.4,891.3,874.1,857.6,805.2,790.5,776.4,731,718.4,706.2,666.7,655.7,645.2,610.5,601,591.7,561.2,552.8,544.7,517.6,510.2,503,478.9,472.4,466,444.4,438.6,432.9,413.6,408.3,403.2,385.8,381.1,376.5,360.8,356.5,352.4,338.1,334.2,330.5,317.5,314,310.6,298.7,295.5,292.4,281.5,278.6,275.8,265.8,263.2,260.6,251.4,248.9,246.5,238.1],
	_expAdjust : [0.1,0.2,0.3,0.4,0.5,0.64,0.8,1,1.2,1.5,1.75,2.0,2.5,3,3.5,4.25,5.2,6.2,7.5,9],

	setProgressCtl : function(hpCtl, expCtl){
		this._ctlHP = hpCtl;
		this._ctlExp = expCtl;
		this.updateProperties();
	},

	updateProperties : function(){
		var fn = this._fn;
		var oldHP = this._hp;
		this._hp = 5*fn[RoleData.vitality] + RoleData.vitality;
		if (this._currentHP < 0) this._currentHP = this._hp;
		else this._currentHP += this._hp-oldHP;
		this._attack = 4*fn[RoleData.strength]+20 + fn[RoleData.intelligence]+10;
		this._attackSpeed = 6*fn[RoleData.dexterity] + 30 + fn[RoleData.vitality] + 10;
		this._defense = 3*fn[RoleData.vitality] + fn[RoleData.strength];
		this._criticalRate = fn[RoleData.dexterity]/10000 + RoleData.luck/1000;
		this._extraGold = fn[RoleData.luck];
		this._eliteMonsterRate = (fn[RoleData.dexterity] + 250)/5000;
		this._extraExp = 1+fn[RoleData.intelligence]/750;
		this._treasureRate = (10 + RoleData.luck/10)/100;
		this._criticalDamage = 8*fn[RoleData.strength]+30 + 4*fn[RoleData.dexterity] + 20;
		this._roundInterval = (3*fn[100-RoleData.dexterity]+500)/1000;
		this._rank = Math.ceil((this._hp + this._attack + this._defense + this._criticalRate*this._criticalDamage) * (1 + this._attackSpeed/2500));

		if (this._ctlHP) this._ctlHP.reset(1, this._hp, null, function(progress){
			if (progress.getValue() <= 0) {
				Role.die();
			}
		});
		if (this._ctlExp) {
			this._ctlExp.reset(0, 1000000, null, function(progress){
				if (progress.getValue() >= 1000000) {
					Role.levelUp();
				}
			});
			this._ctlExp.setValue(RoleData.exp);
		}
	},

	fn : function(x){
		var len = this._fn.length;
		if (x < len) return this._fn[x];
		else return this._fn[len-1];
	},

	reload : function(){
		return;
		var data = vee.Utils.loadObj("AtadElor");
		if (!data){
			this.reborn();
		} else {
			RoleData = data;
		}
	},

	save : function(){
		vee.Utils.saveObj(RoleData,"AtadElor");
	},

	reborn : function(){
		var keys = ['strength',	'intelligence', 'dexterity', 'vitality', 'element'];
		for(var i in keys){
			var arr = RoleData[keys[i]];
			if (_.isArray(arr)) {
				for(var j in arr) {
					arr[j] = Math.ceil(arr[j]/2);
				}
				RoleData[i] = arr;
			} else {
				arr = Math.ceil(RoleData[i]/2);
			}
		}
		RoleData.lv = 1;
		RoleData.luck = vee.Utils.randomInt(0,99);
		RoleData.exp = 0;
		RoleData.selectedMap = 0;
		this.save();
		this.updateProperties();
	},

	countExp : function(monsterLevel){
		var lv = RoleData.lv;
		var diff = monsterLevel-lv+7;
		var exp = this._exp[monsterLevel];
		if (diff < 0) return 1;
		else if(diff >= this._expAdjust.length) return exp*10*this._extraExp;
		else return exp*this._expAdjust[diff]*this._extraExp;
	},

	monsterKilled : function(lv){
		var exp = this.countExp(lv);
		RoleData.exp += exp;
		if (this._ctlExp) this._ctlExp.setValue(RoleData.exp, true);
	},

	countDamage : function(attack, defense, ele1, ele2){
		return Math.ceil(vee.Utils.randomInt(90, 120)/2000*( 1+ Math.max(0, 1.5*(attack*1.2 - defense))));
	},

	attack : function(mon){
		var attack = vee.Utils.isLucky(this._criticalRate) ? this._criticalDamage : this._attack;
		return this.countDamage(attack, mon._defense, 0,0);
	},

	attacked : function(mon){
		var attack = vee.Utils.isLucky(mon._criticalRate) ? mon._criticalDamage : mon._attack;
		var dam = this.countDamage(attack, this._defense, 0,0);
		this._currentHP -= dam;
		this._currentHP = Math.max(0, this._currentHP);
		this._ctlHP.setValue(this._currentHP, true);
		return dam;
	},

	die : function(){

	},

	levelUp : function(){
		RoleData.exp = 0;
		RoleData.lv = Math.max(RoleData.lv+1,99);
		this._ctlExp.setValue(0);
	},

	recover : function(){
		this._currentHP += 1;
		if (this._currentHP > this._hp) this._currentHP = this._hp;
		if (this._ctlHP) this._ctlHP.setValue(this._currentHP, true);
	}
}
