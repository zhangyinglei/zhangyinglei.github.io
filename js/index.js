/*
引入模块
*/
console.log(1);
require(['../config'],function(){

	require(['jquery','swiper','template','jquery.cookie'],function($,swiper,template){
			console.log(1);
			$(function(){
				$('.nav1 .erro').click(function(){
					$('.nav').fadeOut();
				})
			});
			//swiper插件
			$('.swiper-container').swiper({
			 	// direction: 'vertical',
				    loop: true,
				    
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				     autoplay: 1000,
				    autoplayDisableOnInteraction:false,
				    // 如果需要前进后退按钮
				    nextButton: '.swiper-button-next',
				    prevButton: '.swiper-button-prev'
				    

			 });
			$('.product-one .co .pr-top li').mouseenter(function(){
					$(this).addClass('active').siblings().removeClass('active');
					var a=$(this).index();
					$(this).parents('.co').find('.spbox .item').eq(a).addClass('active')
					.siblings().removeClass('active');
			});
			$.getJSON('json/data.json',function(data){
				var html=template('goods',{data:data});
				$('.product-one  .co .spbox2').html(html);
			});
			$.getJSON('json/sport.json',function(data){
				var html=template('sport',{sport:data});
				$('.product-one  .co .spb').html(html);
			});



			$('.floor .title .item').mouseenter(function(){
				$(this).addClass("active").siblings().removeClass('active');
				var a=$(this).index();
				$(this).parents('.floor').find('.zz').eq(a).addClass('active')
				.siblings().removeClass('active');
			})

//轮播
		
			function Banner(banner){
					this.main = $(banner);
					this.imgWrap = this.main.find('.img-wrap');
					this.imgs = this.imgWrap.find('img');
					this.cricle=this.imgWrap.find('.ci .item');
					this.btn=this.imgWrap.find('.it>.btn');
					this.now = 0;
					this.next = 0;
					this.timer = null;
				}
				Banner.prototype = {
					constructor: Banner,
					init: function(){
						this.imgs.eq(0).show();
						
						//自动轮播
						this.autoPlay();
						this.move();
						this.arrow();
						this.yq();
					},
					//自动轮播
					autoPlay: function(){
						var that = this;
						this.timer = setInterval(function(){
							that.next++;
							that.imgSwitch();
						},2000);
					},
					//变换图片
					imgSwitch: function(){
						//右边界处理
						if(this.next >= this.imgs.length){
							this.next = 0;
						}
						this.imgs.eq(this.now).fadeOut();
						this.imgs.eq(this.next).fadeIn();
						this.cricle.eq(this.next).addClass('circle').siblings()
						.removeClass('circle');
						this.now = this.next;
					},
					arrow:function(){
						var that=this;
						console.log(this.btn);
						this.btn.eq(0).click(function(){
							console.log(that.next);
							that.next--;
							if(that.next<0){
								that.next=1;
							}
							that.next%=that.imgs.length;
							that.imgSwitch();
						});
						this.btn.eq(1).click(function(){
							console.log(that.next);
							that.next++;
							that.next%=that.imgs.length;
							that.imgSwitch();
						})
					},
					move:function(){
						var that = this;
						//console.log(this.btn.eq(0));
						this.imgWrap.mouseenter(function(){
							clearInterval(that.timer);

						}).mouseleave(function(){
							that.autoPlay();
						})
					},
					yq:function(){
						var that=this;
						this.cricle.mouseenter(function(){
							that.next=$(this).index();
							that.imgSwitch();
						});
					}
				};
				new Banner('.center .cc').init();
				new Banner('.center .cc1').init();
				new Banner('.center .cc2').init();
				new Banner('.center .cc3').init();
				new Banner('.center .cc4').init();
				new Banner('.center .cc5').init();

//楼层效果
			var bl=$('.bl');
			var num=$('.num');
			var nl=$('.num .nl')
			var ch=document.documentElement.clientHeight;
			$(window).scroll(function(){
				var h=$(document).scrollTop();
				if(h>=1350-ch/2){
					num.fadeIn();
				}else{
					num.fadeOut();
				}
				bl.each(function(i){
					//console.log(i);
					var x=$(this).outerHeight();
					var y=$(this).offset().top;
					if(y<(h+ch/2)&&(y+x)>(ch/2+h)){
						nl.eq(i).addClass('active')
									   .siblings().removeClass('active');
								return;
					}
			})
			});
			nl.click(function(){
				var i=$(this).index();
				var t=bl.eq(i).offset().top-50;
				$('html,body').stop(true).animate({
					scrollTop:t
				})
			})

			//搜索百度接口
		var con;
		$('.center .txt').on('input',(function(){
			 con='';
			$.ajax({
						type:'get',
						url:'http://suggestion.baidu.com/su',
						data:{
							wd:$(this).val()
						},
						dataType:'jsonp',
						jsonp: 'cb',
						success:function(data){
							handle(data);
						}
								
					});
		}));
			
		//封装ajax获取到的数据 处理

		function handle(result){
			for(var i=0;i<result.s.length;i++){
					con+=`<p>${result.s[i]}</p>`;
				}
			$('.wb .le').html(con);
			$('.wb .le').on('mouseover','p',function(){
				$(this).css('background','red')
				.siblings().css('background','white');
				//console.log($(this).html());
				$('.center .txt').val($(this).html());
			});
		}

	//cookie 存储历史记录
		var str;
		var item;
		 attr=document.cookie;
		console.log(attr);
		item=attr.split('=');
		$('.wb .le').html('<p>历史记录</p>'+'<p>'+item[1]+'</p>');
		$('.center .btn').click(function(){
			 str=$('.center .txt').val();
			if(str=='') return;
			document.cookie="search="+str;
			 attr=document.cookie;
			console.log(attr);
			 item=attr.split('=');
			 $('.wb .le').html('<p>历史记录</p>'+'<p>'+item[1]+'</p>');
			console.log(item[1]);
		})
//文本框的出现与消失
		$('.center .txt').focus(function(){
			$('.center .wb').show();
		});
		$('.center .txt').blur(function(){
			$('.center .wb').hide();
		});
//热搜中的点击
		$('.wb .ri').on('mouseover','span',function(){
			$('.center .txt').val($(this).find('a').html());
		})
//右侧固定条的设置
		$('.fdt .fdt-top .tablist li').mouseenter(function(){
			$(this).css('backgroundColor','red').siblings().css('backgroundColor','#616060');
			$(this).find('.sw').stop(true).fadeIn()
			.parents('.zbl').siblings().find('.sw').stop(true).fadeOut();
			
		}).mouseleave(function(){
			$(this).css('backgroundColor','#616060');
			$(this).find('.sw').stop(true).fadeOut();
		});
//回到顶部

		$('.fdt .fdt-bottom .return').click(function(){
			$('html,body').animate({
				scrollTop: 0
			},500);
		})

//登录处理
		var userinfo = $.cookie('userinfo');
		
		//如果有用户信息
		if(userinfo){
			//将json字符串转化为json对象
			userinfo = JSON.parse(userinfo);
			//用户处于登录状态,更改信息
			if(userinfo.login_status){
				$('.headerright .user').html( userinfo.account + '，<a href="javascript:;" class="logout">退出</a>' );
			}
			
		}
		//退出
		$('.logout').click(function(){
			var info = {
				account: userinfo.account,
				login_status: 0
			};
			$.cookie('userinfo',JSON.stringify(info),{expires: 365,path: '/'});
			location.href = "login.html";
		});


	});
})