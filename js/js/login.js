/*登录模块js*/
require(['../../config'],function(){

	require(['jquery','swiper','template','login','jquery.cookie'],function($,swiper,template){
		console.log($('.r'))
		$('.r').focus(function(){
			$(this).parent().css('borderColor','green');
		}).blur(function(){
			$(this).parent().css('borderColor',"#ccc");
		});

		$('.btn').click(function(){
			var account = $('.r.re').val();
			var psw = $('.r.re1').val();
			//判断是否输入为空
			if(account=='' || psw == ''){
				alert('用户名或者密码不能为空');
				return;
			}

			//使用ajax进行登录
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/login.php',
				data: {
					account: account,
					password: psw
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status) {
						alert('登录成功');

						//判断是否需要自动登录
						//if( $('#remember').prop('checked') ){
							var userinfo = {
								account: account,
								login_status: 1
							};
							$.cookie('userinfo',JSON.stringify(userinfo),{expires: 365,path: '/'});
						//}

						//大部分会跳转到首页
						location.href = '../../index.html';
					}else{
						alert('登录失败');
					}
				}
			});
		});
	})
})		