require(['../../config'],function(){

	require(['jquery','swiper','template','jquery.cookie','layer'],function($,swiper,template){
		layer.config({
			path:"js/plug/layer/"
		});
		/*
 	1、读取cookie   readCookie
 	2、设置cookie   setCookie
 	3、将cookie中的数据渲染到页面上   initData
 	4、数量增加
 	5、数量减少
 	6、直接输入
 	7、删除 (单个删除  批量删除)
 	8、选中
 	9、结算信息填充
*/

	var buycart={
		data:{},
		cart:{},
		Wrap:$('.market'),
		init:function(){
			this.readCookie();
			this.increase();
			this.decrease();
			this.input();
			this.delete();
			this.deleteSelect();
			this.select();
			this.selectAll();
			var _this=this;
			$.getJSON('json/cart.json',function(data){
				//console.log(data);
				//console.log(_this.cart);
				var result={
					cart:_this.cart,
					data:data
				};
				var s=template('cart',result);
				_this.Wrap.html(s);
			});
		},
		increase:function(){
			var _this=this;
			this.Wrap.on('click','.increase',function(){
				_this.handinfo();
				var num=$(this).prev().val();
				var stock=$(this).parent().data('stock');
				console.log(stock);
				if(num>=stock){
					num=1;
					layer.alert('您购买的数量已经超过库存，请重新输入');
				}else{
					num++;
				}
				$(this).prev().val(num);
				var z=$(this).prev().val();
				var p=parseFloat($(this).parents('.icon-item').find('.price .goods-price').html());
				var total=z*p;
				console.log(z,p,total);
				$(this).parents('.icon-item').find('.total .t').html(total);

			})
		},
		decrease:function(){
			var _this=this;
			this.Wrap.on('click','.decrease',function(){
				_this.handinfo();
				var num=$(this).next().val();
				if(num<=1){
					num=1;
					layer.alert('您购买的数量最小值是1件，如果不需要请删除');
				}else{
					num--;
				}
				$(this).next().val(num);
				var z=$(this).next().val();
				var p=parseFloat($(this).parents('.icon-item').find('.price .goods-price').html());
				var total=z*p;
				console.log(z,p,total);
				$(this).parents('.icon-item').find('.total .t').html(total);	
			})
		},
		input:function(){
			console.log(1);
			this.Wrap.on('input','.amount-input',function(){
				var num=$(this).val();
				var stock=$(this).parent().data('stock');
				if(isNaN(num)){
					num=1;
				}
				if(num>=stock){
					num=1;
					layer.alert('您购买的数量已经超过库存，请重新输入');
				}
				if(num=='') return;
				$(this).val(num);
				
			});
			this.Wrap.on('blur','.amount-input',function(){
				var num=$(this).val();
				var stock=$(this).parent().data('stock');
				if(num==''){
					layer.alert('您购买的数量已经超过库存，请重新输入');
					num=1;
				}
				$(this).val(num);
				var z=$(this).val();
				var p=parseFloat($(this).parents('.icon-item').find('.price .goods-price').html());
				var total=z*p;
				console.log(z,p,total);
				$(this).parents('.icon-item').find('.total .t').html(total);
			})
		},
		delete:function(){
			var _this=this;
			this.Wrap.on('click','.cz2 .delete',function(){
				var that = this;
				layer.confirm('确定删除宝贝吗？',function(){
					layer.closeAll();
					$(that).parents('.market-content').remove();
					var id = $(that).parents('.market-content').data('id');
					delete _this.cart[id];
					_this.setCookie();
					_this.handinfo();
				});
			})
		},
		deleteSelect:function(){
			var _this=this;
			$('.cal .delete').click(function(){
				var that=this;
				var allChecked=_this.Wrap.find('input[type=checkbox]:checked');
				if(allChecked.length==0){
					layer.alert('请选择商品');
					return;
				}
				layer.confirm('确定删除宝贝吗？',function(){
					allChecked.each(function(){
						layer.closeAll();
						$(this).parents('.market-content').remove();
						var id=$(this).parents('.market-content').data('id');
						delete _this.cart[id];
						_this.setCookie();
						_this.handinfo();
					})
				});
			})
		},
		select:function(){
			var _this=this;
			this.Wrap.on('change','input[type=checkbox]',function(){
				_this.handinfo();
				var allChecked = _this.Wrap.find('input[type=checkbox]:checked');
				var allCheckBox = _this.Wrap.find('input[type=checkbox]');
				if(allChecked.length === allCheckBox.length){
					$('.selectAll').prop('checked',true);
				}else{
					$('.selectAll').prop('checked',false);
				}
			})
		},
		selectAll:function(){
			var _this=this;
			$('.selectAll').click(function(){
				var status = $(this).prop('checked');
				var allCheckBox = _this.Wrap.find('input[type=checkbox]');
				allCheckBox.prop('checked',status);
				$('.selectAll').prop('checked',status);
				_this.handinfo();
			})
		},
//处理件数和总价
		handinfo:function(){
			var allChecked = this.Wrap.find('input[type=checkbox]:checked');
			var num=0,
				total=0;
			allChecked.each(function(){
				num++;
				var price= $(this).parents('.market-content').find('.total .t').html();
				total += parseFloat( price );
			});
			if(num>0){
				$('.finish').addClass('active');
			}else{
				$('.finish').removeClass('active');
			}
			$('.right .Num').html(num);
			$('.right .price').html(total);
		},

		readCookie: function(){
			this.cart = $.cookie('th-cart') || '{}';
			this.cart = JSON.parse( this.cart );
		},
		setCookie: function(){
			$.cookie('th-cart',JSON.stringify(this.cart),{expires: 365,path: '/'});
		}
	};







	buycart.init();
	});
})