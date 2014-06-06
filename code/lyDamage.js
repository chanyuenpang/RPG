/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-6-3
 * Time: 下午10:13
 * To change this template use File | Settings | File Templates.
 */

var LyDamage = vee.Class.extend({
	setDamage : function(value, pos){
		/** @type {cc.LabelBMFont} **/
		pos.y += 100+vee.Utils.randomInt(-20,20);
		pos.x += 50+vee.Utils.randomInt(-20,20);
		var lb = this.lbDamage;
		var str = ''+value;
		lb.setString(str);
		var adjust = str.length-3;
		this.rootNode.setScale(Math.max(0.5, 0.5+adjust*0.1));
		if (adjust > 0){
			adjust = Math.min(Math.ceil(adjust/3)*50, 180);
			this.spPreBubble.setPositionX(-adjust);
			this.spAfterBubble.setPositionX(adjust);
		}
		this.rootNode.setPosition(pos);
		this.playAnimate("Show", function(){
			this.rootNode.removeFromParent();
		}.bind(this));
	}
});