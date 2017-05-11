require(['../../config'],function(){

	require(['jquery','swiper','template','jquery.cookie'],function($,swiper,template){
		$('.item input').focus(function(){
			$(this).parents('.item').find('.f2').show();
		}).blur(function(){
			$(this).parents('.item').find('.f2').hide();
		});
//验证码
		var  regStatus = {
			uname: false,
			psw: false,
			yz:false,
			repsw:false,
			phoneyz:false
		};
		var unameInput = $('.f1.f30 input'),
			pswInput = $('.f1.f10.f31 input'),
			repswInput = $('.f1.f10.f32 input'),
			yzInput=$('.f1.f12 input'),
			phoneInput=$('.f1.f13 input'),
			v=$('.item.item1 .f2'),
			v1=$('.item.item2 .f2'),
			v2=$('.item.item3 .f2'),
			v3=$('.item.item4 .f2'),
			v4=$('.item.item5 .f2'),
			v5=$('.f1.f13 span'),
			regBtn = $('.btn');
		var regUname = /^1[3578]\d{9}$/;
		unameInput.on('input',function(){
			var uname = unameInput.val();
			regStatus.uname = true;
			if(!regUname.test(uname)){
				v.html('用户名不合法');
				$('.f1.f30').css('borderColor','red');
				regStatus.uname = false;
				return;
			}
			v.html('用户名合法');
			regStatus.uname = true;
			//判断用户名是否已被注册
			$.ajax({
				url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data: {
					account: uname
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						v.html('用户名可用');
						$('.f1.f30').css('borderColor','#ccc');
						v.css({
   						'border': '1px solid  #ccc',
					    'color': 'black',
					    'backgroundColor': '#f5f5f7'
					})
					}else{
						v.html('用户名已存在');
						$('.f1.f30').css('borderColor','red');
						regStatus.uname = false;
					}
				}
			});

		});
		//密码验证
		var regPsw = /^[\w!/@/#/$/%/^/&/*_+]{6,16}$/;
		var psw; 
		pswInput.on('input',function(){
			psw = pswInput.val();
			regStatus.psw = true;
			if(!regPsw.test(psw)){
				v1.html('密码不合法');
				$('.f1.f30.f31').css('borderColor','red');
				regStatus.psw = false;
				return;
			}
			v1.html('密码合法');
			regStatus.psw = true;
		});
		repswInput.on('input',function(){
			var psw1=repswInput.val();
			regStatus.repsw=true;
			if(psw==psw1){
				v2.html('密码验证成功');
				$('.f1.f30.f31').css('borderColor','#ccc');
				regStatus.repsw=true;
			}else{
				v2.html('请重新输入');
				regStatus.repsw=false;
				$('.f1.f30.f31').css('borderColor','red');
			}
		});

		//验证码验证
		var n=r();
		$('.f1.f12 span').html(n);
		yzInput.on('input',function(){
			var x=yzInput.val();
			regStatus.yz=true;
			var x1=$('.f1.f12 span').html();
			//console.log(x,x1);
			retify(x,x1);
		});

		$('.f1.f12 span').click(function(){
			var c=r();
			$(this).html(c);
		})
		
//短信验证
		var va;
		v5.click(function(){
			 va=phone();
			console.log(va+"您好，请不要随意透露验证码给他人，60秒的有效时间");
		})

		phoneInput.on('input',function(){
			regStatus.phoneyz=true;
			var ca=phoneInput.val();
			if(ca==va){
				v4.html('验证成功');
				regStatus.phoneyz=true;
			}else{
				regStatus.phoneyz=false;
			}
		});

//登录
		regBtn.click(function(){
			//console.log(regStatus)
			for(var i in regStatus){
				console.log(i);
				if(!regStatus[i]){
					$('.f1.f30').css('borderColor','red');
					v.show();
					v.css({
   						'border': '1px solid #FFBDBE',
					    'color': '#E23A3A',
					    'backgroundColor': '#ffebeb'
					})
					v.html('请重新输入');
					return;
					}
				}
			//通过ajax提交表单数据
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data: {
					account: unameInput.val(),
					password: pswInput.val()
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						alert('注册成功');
						location.href="../../login.html";
					}else{
						alert('注册失败');
					}
				}
			});
		});

//封装生成验证码的方法
		function r(){
			var str='0123456789abcdefghiklmnoprstuvwxyzABCDEFGHIKLMNOPQRSTUVWXYZ';
			var n='';
			for(var i=0;i<4;i++){
				var k=parseInt(Math.random()*(str.length-1));
				n+=str[k];
			}
			return n;
		}


//控制台手机验证
		function phone(){
			var con='';
			for(var i=0;i<6;i++){
				con+=parseInt(Math.random()*10);
			}
			return con;
		}		

//判断验证码是否验证成功
		function retify(val,c){
					var reg=new RegExp(('^'+c+'$'),('i'));
					//console.log(reg);
					if(reg.test(val)){
						regStatus.yz=true;
						v3.html('验证成功');
					}else{
						regStatus.yz=false;
					}
				}
	});
})