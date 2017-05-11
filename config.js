/*

配置文件
*/

require.config({
	baseUrl:'js',
	paths:{
		"jquery":"lib/jquery",
		"template":"lib/template",
		"swiper":"plug/swiper",
		"jquery.cookie":"plug/jquery.cookie",
		"layer":"plug/layer/layer"
	},
	shim:{
		"template":["jquery"],
		"swiper":["jquery"],
		"jquery.cookie":["jquery"]
	}
});