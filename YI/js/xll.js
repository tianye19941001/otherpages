
$(document).ready(function(){
	// 公共方法
	var publicFuc = {
		stophref: function(e){
			if ( e && e.preventDefault ){
				e.preventDefault(); 
			}else{
				window.event.returnValue = false; 
				return false;
			}
		},
		stopbubble: function(e){
			if ( e && e.stopPropagation ){
				e.stopPropagation(); 
			}else{
				window.event.cancelBubble = true;
				return false;
			}
		},
		movescroll: function(btn,to) {
			$('html,body').animate({scrollTop: $(to).offset().top-60},600);
		}
	};

	(function init(){
		sizeChange()
	})();

	$(window).resize(function(){
		sizeChange()
	})

	function sizeChange(){
		var WW = $(window).width();
		if($('.ty_projects')){
			$('.ty_projects').height( 610 / (1920 / WW))
		}
	}

	$('.ty_people .close').click(function(e){
		publicFuc.stopbubble(e);
		$(this).parents('li').removeClass('on');
	})

	$('.ty_people li').click(function(){
		// console.log($(this).parents('.on').length)
		// if ($(this).parents('.on')) {
		// 	return
		// }
		$(this).addClass('on').siblings('').removeClass('on');
	})

	$('.ty_people .left').click(function(e){
		publicFuc.stopbubble(e);
		var index = $(this).parents('li').index();
		var pre = index - 1;
		$(this).parents('li').removeClass('on');
		if (index == 0) {
			pre = 2;
		}
		$('.ty_people li').eq(pre).addClass('on')
	})

	$('.ty_people .right').click(function(e){
		publicFuc.stopbubble(e);
		var index = $(this).parents('li').index();
		var next = index + 1;
		$(this).parents('li').removeClass('on');
		if (index == 2) {
			next = 0;
		}
		$('.ty_people li').eq(next).addClass('on')
	})
	if ($('.ty_swiper2').length) {
		$('.ty_swiper2 .icon_left').click(function(){
			mySwiper.swipePrev();
		})
		$('.ty_swiper2 .icon_right').click(function(){
			mySwiper.swipeNext();
		})
		$('.state li').click(function(e){
			publicFuc.stophref(e);
			mySwiper.swipeTo($(this).index(), 1000, true);
		})
	}

	$('.lbtn').click(function(){
		$('.hd .prev').trigger('click')
	})
	$('.rbtn').click(function(){
		$('.hd .next').trigger('click')
	})

	if (document.body.clientWidth>=768) {
		// pc事件和方法
		
	}else{
		// rem自动计算
        fnResize();
        window.addEventListener("resize", function() {
            fnResize()
        }, false);

        function fnResize(){
            var docWidth = document.documentElement.clientWidth,
                body = document.getElementsByTagName('html')[0];
            body.style.fontSize = docWidth / 32 + 'px';
        }

        // 移动事件和方法
       
	}
});