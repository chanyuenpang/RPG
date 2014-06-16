/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-6-8
 * Time: 下午6:04
 * To change this template use File | Settings | File Templates.
 */

var LyRoleInfo = vee.Class.extend({
	onDidLoadFromCCB : function(){
		var size = this.rootNode.getContentSize();
		size.height -= 80;
		var size2 = this.lyBody.getContentSize();
		this.lyBody.retain();
		this.lyBody.removeFromParent();
		/** @type {cc.ScrollView} */
		var scv = cc.ScrollView.create(size, this.lyBody);
		scv.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.rootNode.addChild(scv);
		this.lyBody.release();
		scv.setContentOffset(cc.p(0, -size2.height + size.height));

		var children = this.lyButtons.getChildren();
		for (var i in children){
			children[i].setTouchPriority(0);
		}
		this.updateData();
	},

	_data : null,
	updateData : function(){
		for (var i in RoleData){
			/** @type {cc.LabelTTF} */
			var lb = this['lb_'+i+'Value'];
			if (lb) {
				lb.setString(''+RoleData[i]);
			}
		}
	},

	addProperty : function(name){
		if (RoleData[name]) {
			RoleData[name]++;
			Role.updateProperties();
			this.updateData();
		}
	},

	onAddStrength : function(){ this.addProperty('strength');},
	onAddIntelligence : function(){ this.addProperty('intelligence');},
	onAddDexterity : function(){ this.addProperty('dexterity');},
	onAddVitality : function(){ this.addProperty('vitality');}

});