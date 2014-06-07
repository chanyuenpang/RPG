/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-6-1
 * Time: 下午4:26
 * To change this template use File | Settings | File Templates.
 */

var MapData = {

	getMapImage : function(idx) {
		return 'map_land_'+idx+'.png';
	},

	_data : [
		{
			idx : 0,
			element : game.Element.Normal,
			ap : 5,
			boss : [4,4,4],
			name : ['Sil Suburb','西路 郊区']
		},
		{
			idx : 1,
			element : game.Element.Fire,
			ap : 10,
			boss : [6,8,10],
			name : ['Sabel Town','萨贝尔 城镇 ']
		},
		{
			idx : 2,
			element : game.Element.Water,
			ap : 20,
			boss : [16,12,10],
			name : ['Oal Lake','奥尔 湖']
		},
		{
			idx : 3,
			element : game.Element.Plant,
			ap : 30,
			boss : [18,10,20],
			name : ['Kucci Brige','库吉 大桥']
		},
		{
			idx : 4,
			element : game.Element.Ice,
			ap : 40,
			boss : [18,20,25],
			name : ['Kupapa Moutain','库帕帕 峰']
		},
		{
			idx : 5,
			element : game.Element.Thunder,
			ap : 55,
			boss : [35,35,20],
			name : ['Vactool Fortress','凡特尔 要塞']
		},
		{
			idx : 6,
			element : game.Element.Stone,
			ap : 70,
			boss : [45,20,30],
			name : ['Hacri Stone','黑库里 岩山']
		},
		{
			idx : 7,
			element : game.Element.Fire,
			ap : 85,
			boss : [50,35,30],
			name : ['Hawl Port','霍尔 港']
		},
		{
			idx : 8,
			element : game.Element.Ice,
			ap : 100,
			boss : [40,50,50],
			name : ['Sinbelly Village','新贝利 渔港']
		},
		{
			idx : 9,
			element : game.Element.Stone,
			ap : 120,
			boss : [55,35,65],
			name : ['The Phinex Hill','菲尼斯 山']
		},
		{
			idx : 10,
			element : game.Element.Plant,
			ap : 140,
			boss : [50,80,50],
			name : ['Carida Forest','喀里达 密林']
		},
		{
			idx : 11,
			element : game.Element.Water,
			ap : 160,
			boss : [60,60,100],
			name : ['Carida Wetland','喀里达 湿地']
		},
		{
			idx : 12,
			element : game.Element.Thunder,
			ap : 190,
			boss : [90,100,75],
			name : ['Poadisien Beach','布地西安 海滩']
		},
		{
			idx : 13,
			element : game.Element.Fire,
			ap : 220,
			boss : [140,60,80],
			name : ['Kappusia Isle','卡布沙 群岛']
		},
		{
			idx : 14,
			element : game.Element.Plant,
			ap : 260,
			boss : [100,160,100],
			name : ['West Elf Forest','西妖精 森林']
		},
		{
			idx : 15,
			element : game.Element.Stone,
			ap : 300,
			boss : [160,100,180],
			name : ['Cambo Mountain','喀麦勃 山脉']
		},
		{
			idx : 16,
			element : game.Element.Water,
			ap : 350,
			boss : [200,160,250],
			name : ['Moonlight Island','月光 岛']
		},
		{
			idx : 17,
			element : game.Element.Ice,
			ap : 500,
			boss : [350,400,400],
			name : ['Harisis Snow Mountain','哈里西斯 雪山']
		},
		{
			idx : 18,
			element : game.Element.Fire,
			ap : 1000,
			boss : [800,500,500],
			name : ['Aublood Devil Barranco','奥布拉多 地狱深谷']
		}
	],

	/**
	 * @param idx
	 * @returns {MapData.DataFormat}
	 */
	getDataByIndex : function(idx){
		var data = this._data[idx];
		data.image = this.getMapImage(idx+1);
		return data;
	},

	getMapCount : function(){
		return this._data.length;
	}
}

MapData.DataFormat = {
	idx : 0,
	element : 0,
	ap : 0,
	boss : null,
	name : null,
	image : null
}

var MapCell = VeeTableCellController.extend({
	/** @type {cc.Sprite} */
	spLand : null,

	updateIndex : function(idx) {
		/** @type {MapData.DataFormat} */
		var data = MapData.getDataByIndex(idx);
		var sp = cc.Sprite.create(data.image);
		this.spLand.setTexture(sp.getTexture());
		this.lyBG.setColor(cc.c3b(255,255,255));
//		this.spLand.setColor(game.Element.getMajorColor(data.element));
		this.spLand.setColor(game.Element.getSubColor(data.element));
		this.lbName.setString(game.Strings.getString(data.name));
	},

	touched : function(){
		cc.log("touched " + this.getIdx());
	}
});