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
		var lb = this.lbDamage;
		var str = ''+value;
		lb.setString(str);
		var adjust = str.length-3;
		var scale = Math.max(0.5, 0.5+adjust*0.2);
		this.rootNode.setScale(scale);
		pos.y += 100*scale+vee.Utils.randomInt(-40*scale,40*scale);
		pos.x += vee.Utils.randomInt(-40*scale,40*scale);

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