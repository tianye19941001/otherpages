
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
		$('.ty_people .pics:eq(1) .big').eq(0).addClass('db')
	})();

	$(window).resize(function(){
		sizeChange()
	})

	function sizeChange(){
		var WW = $(window).width();
		if($('.ty_projects') && $(window).width > 1260){
			$('.ty_projects').height( 610 / (1920 / WW))
		}
	}

	$('.ty_people .close').click(function(e){
		publicFuc.stopbubble(e);
		$(this).parents('li').removeClass('on');
		$('.ty_people .big').removeClass('db');
	})

	$('.ty_people .big').click(function(e){
		publicFuc.stopbubble(e);
	})

	$('.ty_people li').click(function(){
		// console.log($(this).parents('.on').length)
		// if ($(this).parents('.on')) {
		// 	return
		// }
		$('.ty_people .big').removeClass('db');
		$(this).find('.big').eq(0).addClass('db');
		$(this).addClass('on').siblings('').removeClass('on');
	})

	$('.ty_people .left').click(function(e){
		publicFuc.stopbubble(e);
		if ($(this).parent().next().find('.db').prev().hasClass('small')) {
			return
		}
		$(this).parent().next().find('.db').removeClass('db').prev().addClass('db');
	})

	$('.ty_people .right').click(function(e){
		publicFuc.stopbubble(e);
		if ($(this).parent().next().find('.db').next().length == 0) {
			return
		}
		$(this).parent().next().find('.db').removeClass('db').next().addClass('db');
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

	function setIframeHeight(id){
		try{
			var iframe = document.getElementById(id);
			if(iframe.attachEvent){
				iframe.attachEvent("onload", function(){
					iframe.height =  iframe.contentWindow.document.documentElement.scrollHeight;
				});
				return;
			}else{
				iframe.onload = function(){
					iframe.height = iframe.contentDocument.body.scrollHeight;
				};
				return;				 
			}	 
		}catch(e){
			throw new Error('setIframeHeight Error');
		}
	}

	$('#ty_iframe').load(
        function(){
        	if ($(this).contents().find("body").find('.newframe_about').length > 0) {
	            $(this).height($(this).contents().find("body").find(".news-article").height() + 15);  
        	}else{
	            $(this).height($(this).contents().find("body").find(".news-article").height() + 50);  
        	}
			var minH = $(window).height();
			$(".ty_wrapbac").css('min-height',minH+'px');
			$(".ty_wrapbac").height($('#ty_iframe').height() + 70);
        }
    );

    var iframeit  = setInterval(function(){
		if ($('#ty_iframe').length>0 && $('#ty_iframe').attr('src')!='#') {
			if ($('#ty_iframe').contents().find("body").find('.newframe_about').length > 0) {
				if ($('#ty_iframe').height()==($('#ty_iframe').contents().find("body").find(".news-article").height() + 15)) {
					return false;
				}else{
					$('#ty_iframe').height($('#ty_iframe').contents().find("body").find(".news-article").height() + 15); 
				}
	    	}else{
	            if ($('#ty_iframe').height()==($('#ty_iframe').contents().find("body").find(".news-article").height() + 55)) {
					return false;
				}else{
					$('#ty_iframe').height($('#ty_iframe').contents().find("body").find(".news-article").height() + 55); 
	    		}
	    	}
		}else if($('#ty_iframe').attr('src')=='#'){
			return false;
		}else if($('#ty_iframe').length=0){
			clearInterval(iframeit);
		}
		var minH = $(window).height();
		$(".ty_wrapbac").css('min-height',minH+'px');
		$(".ty_wrapbac").height($('#ty_iframe').height() + 0);

        var openH = $('.news-inner').height();
        var wwww = document.body.clientWidth;
        var swww = $(window).width();
        if (openH<minH) {
            var ttnn = $(".ty_wrapbac").height();
            if (ttnn>minH) {
                if(wwww ==swww) {
                    $('.inner-right').css('margin-left',"470px");
                }else {
                    $('.inner-right').css('margin-left', "462px");
                }
            }else{
                $('.inner-right').css('margin-left',"470px");
            }

        }else{
            if(wwww ==swww) {
                $('.inner-right').css('margin-left',"470px");
            }else {
                $('.inner-right').css('margin-left', "462px");
            }
        }

	},200);

	$(document).on("click",'.ty_projects a', function(e){
		publicFuc.stophref(e);
		$('#ty_iframe').attr('src',$(this).attr('href'));
		$('body').addClass('oh');
		$('.newframe').height("100%").addClass("show");
	});
	
	$('.newframe').on("click",'.close', function(e){
		publicFuc.stophref(e);
		if ($(this).hasClass('ty_wrapbac')) {
			$(this).parent().removeClass("show");
		}else{
			$(this).parents('.newframe').removeClass("show");
		}
		$('body').removeClass('oh');
	});

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