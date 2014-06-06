/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-5-31
 * Time: 下午9:44
 * To change this template use File | Settings | File Templates.
 */

var LyEffect = vee.Class.extend({
	showDamage : function(value, pos){
		var node = cc.BuilderReader.load("lyDamage.ccbi");
//		node.setPosition(pos);
		this.lyDamage.addChild(node);
		/** @type {LyDamage} **/
		var ctl = node.controller;
		ctl.setDamage(value, pos);
	}
});