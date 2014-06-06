/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-6-1
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */

var game = game = game || {};

game.Element = {
	Normal : 0,
	Plant : 1,
	Fire : 2,
	Water : 3,
	Ice : 4,
	Thunder : 5,
	Stone : 6,

	_adjustMap : [
		//nor, pla, fir, Wat, Ice, Thu,  Sto
		[   1,   1,   1,    1,   1,   1,   1], //normal
		[   1,   1, 1.8, 0.75, 1.5, 0.5, 0.9], //Plant
		[   1, 0.75,  1,  1.8, 0.9, 1.5, 0.5], //Fire
		[   1, 1.8, 0.75,   1, 0.5, 0.9, 1.5], //Water
		[   1, 0.9, 1.2,  1.7,   1, 0.8,   1], //Ice
		[   1, 2.0, 0.9,  1.2, 1.2,   1, 0.5], //Thunder
		[   1, 1.2, 1.5,  1.2,   1,   1,   1] //Stone
	],

	_powerBoost : [
		//ATK DEF SPD
		[1,1,1],  //Normal
		[1,1,2],  //Plant
		[2,1,1],  //Fire
		[1,2,1],  //Water
		[1,2,2],  //Ice
		[2,1,2],  //Thunder
		[2,2,1]   //Stone
	],

	_majorColor : [
		{r:153, g:153, b:153 },
		{r:130, g:222, b:132 },
		{r:255, g: 68, b: 50 },
		{r: 66, g:193, b:255 },
		{r:121, g:251, b:255 },
		{r:253, g:225, b: 92 },
		{r:197, g:133, b: 84 }
	],

	_subColor : [
		{r:203, g:203, b:203 },
		{r:195, g:237, b:171 },
		{r:252, g:173, b:173 },
		{r:199, g:235, b:248 },
		{r:218, g:254, b:253 },
		{r:253, g:249, b:181 },
		{r:243, g:181, b:164 }
	],

	getAdjust : function(ele1, ele2) {
		return this._adjustMap[ele1][ele2];
	},

	getPowerBoost : function(ele){
		return this._powerBoost[ele];
	},

	getMajorColor : function(ele){
		return this._majorColor[ele];
	},

	getSubColor : function(ele){
		return this._subColor[ele];
	}
}