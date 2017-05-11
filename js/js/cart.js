require(['../../config'],function(){

	require(['jquery','swiper','template','jquery.cookie','layer'],function($,swiper,template){
		layer.config({
			path:"js/plug/layer/"
		})
		$('.nav1 .erro').click(function(){
			$('.nav').fadeOut();
		});
//放大镜功能
		var filter={
			middle:$('.content .middle'),
			middleImg:$('.middle img'),
			imgWrap:$('.imgWrap'),
			imgs:$('.imgWrap img'),
			filter:$('.content .left .filter'),
			left:$('.content .left'),
			left1:$('.content .left1'),
			img:$('.left1 img'),
			arrowl:$('.arrow.arrowl'),
			arrowr:$('.arrow.arrowr'),
			index:0,
			init:function(){
				this.move();
				this.imgWrapmove();
				this.arrowmove();
				this.dispaly();
			},
			move:function(){
				var _this=this;
				var x=this.middle.offset().left;
				var y=this.middle.offset().top;
				//console.log(x,y);
				this.middle.mousemove(function(e){
					e=e||window.event;
					var z=e.pageX-x-102;
					var h=e.pageY-y-97;
					z=z<0?0:(z>185?185:z);
					h=h<0?0:(h>196?196:h);
					var n1=(-z*(400/205))+'px';
					var n2=(-h*(400/194))+'px';
					z=z+'px';
					h=h+'px';
					_this.filter.css({
						"left":z,
						"top":h
					});
					//console.log(n1,n2);
					_this.img.css({
						"left":n1,
						"top":n2
					});
				});
			},
			imgWrapmove:function(){
				var _this=this;
				this.imgs.mouseenter(function(){
					var a=$(this).data('id');
					//console.log(a);
					var b=$(this).attr('src');
					_this.middleImg.attr('src',a);
					_this.img.attr('src',a);
					$(this).addClass('active').siblings().removeClass('active');
				})
			},
			arrowmove:function(){
				var _this=this;
				this.arrowl.click(function(){
					_this.index--;
					if(_this.index<0){
						_this.index=0;
						return;
					}
					//console.log(_this.index);
					_this.imgWrap.animate({
						left:-(_this.index*(70))
					})
				});
				this.arrowr.click(function(){
					console.log(_this.index,_this.imgs.length);
					_this.index++;
					if(_this.index>(_this.imgs.length-5)){
						_this.index = _this.imgs.length - 5;
						return;
					}
					_this.imgWrap.animate({
						left:-(_this.index*(70))
					})
				})
			},
			dispaly:function(){
				var _this=this;
				this.middle.mouseenter(function(){
					_this.filter.show();
					_this.left1.show();
				}).mouseleave(function(){
					_this.filter.hide();
					_this.left1.hide();
				})
			}
		}

		filter.init();

//处理购物车
/*
 	详情页面js
	
	0、渲染颜色分类(读取数据)
 	1、颜色的切换
 	2、增加数量
 	3、减少数量
 	4、直接修改input
 	5、加入购物车
*/
		var detail={
			data:{},
			init:function(){
				var _this=this;
				this.colormove();
				this.increase();
				this.decrease();
				this.input();
				this.addCart();
				$.getJSON('json/cart.json',function(result){
					_this.data=result;
					var s=template('goods',result);
					$('.color .tb-con').html(s);
					$('.color .tb-con span:first').addClass('active');
					var id =$('.color .tb-con span:first').data('id');
					$('.top .price').html( result.color[id].sale_price );
					$('.bottom .stock-num').html( result.color[id].stock );
				})
			},
			colormove:function(){
				var _this=this;
				$('.color .tb-con').on('mouseenter','span',function(){
					$('.con input').val(1);
					$(this).addClass('active').siblings().removeClass('active');
					var id=$(this).data('id');
					$('.top .price').html( _this.data.color[id].sale_price );
					$('.bottom .stock-num').html( _this.data.color[id].stock );
				})
			},
			increase:function(){
				var _this=this;
				$('.increase').click(function(){
					var stock = $('.stock-num').html();
					var num=parseInt($(this).prev().val());
					console.log(num);
					if(num>=stock){
						num=stock;
					}else{
						num++;
					}
					$(this).prev().val(num);
				})
			},
			decrease:function(){
				$('.decrease').click(function(){
					var stock=$('.stock-num').html();
					var num=parseInt($(this).next().val());
					if(num<=1){
						num=1;
					}else{
						num--;
					}
					$(this).next().val(num);
				})
			},
			input:function(){
				$('.con input').on('input',function(){
					var stock=$('.stock-num').html();
					var num=parseInt($(this).val());
					num=parseInt(num);
					if(isNaN(num)){
						num=1;
					}
					if(num>=stock){
						num=stock;
					}
					if(num=='') return;
					$(this).val(num);
				});
				$('.con input').blur(function(){
					var num=parseInt($(this).val());
					if(num==''){
						num=1;
					}
					$(this).val(num);
				})
			},
			addCart:function(){
				$('.cart').click(function(){
					var goods = $('.color .active');
					var id = goods.data('id');
					console.log(id);
					var amount = parseInt($('.con input').val());
					var cart = $.cookie('th-cart') || '{}';
					cart = JSON.parse(cart);
					if(!cart[id]){
						cart[id] = {
							id: id,
							amount:amount
						};
					}else{
						cart[id].amount += amount;
					}
					layer.confirm("添加成功",{
						btn:['继续逛','去购物车结算'],

					},function(){
						layer.closeAll();
					},function(){
						window.location.href='buycart.html';
					})
					$.cookie('th-cart',JSON.stringify(cart),{expires: 365,path: '/'});

					console.log( JSON.parse($.cookie('th-cart')) );

				})
			}	
		}

		detail.init();
	});
});