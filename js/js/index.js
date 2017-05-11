/*
引入模块
*/
require(['../config'],function(){
	require(['jquery','swiper','template'],function($,swiper,template){

			$(function(){
				$('.nav1 .erro').click(function(){
					$('.nav').fadeOut();
				});
				$('.swiper-container').swiper({
			 	// direction: 'vertical',
				    loop: true,
				    
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				     autoplay: 1000,
				    autoplayDisableOnInteraction:false,
				    // 如果需要前进后退按钮
				    nextButton: '.swiper-button-next',
				    prevButton: '.swiper-button-prev',
				    
				    // 如果需要滚动条
				    scrollbar: '.swiper-scrollbar',
				 });
				console.log($('.product-one .co .pr-top li'));
				$('.product-one .co .pr-top li').mouseenter(function(){
					console.log(2);
					$(this).addClass('active').siblings().removeClass('active');
				})
			});
			
	})
})

