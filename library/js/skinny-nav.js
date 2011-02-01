if(typeof skinny == "undefined"){
	skinny = {};
}
(function($){
	$(window).ready(function(){
		skinny.loadLinks();
		skinny.utilitybar.init();
		skinny.flexbar.init();
	});
})(jQuery);
skinny.loadLinks = function(){
	$()
}
skinny.utilitybar = {
	init:function(){
		$('#sub').css('height', 0);
		$('.panel').css('opacity', 0);
		$('.utilityLink').each(function(index) {
			var btn = $(this);
			btn.click(function() {
				$('.utilityLink').removeClass('active');
				$(this).addClass('active');
				$('.panel').animate({'opacity':0},{'duration':100, complete:function(){
					$(this).hide();
				}});
				skinny.utilitybar.open($(this).attr('id'));
				return false;
			});
		});
		$('.closeBtn').each(function(i, obj) {
			$(obj).click(function() {
				skinny.utilitybar.close();
			});
		});
		// restyling for tags panel form
		var ul = $('<ul>');
		$('#tags-panel .submitBtn').prepend(ul);
		$('#tags-panel input').each(function(i, obj) {
			if($(obj).attr('type') == 'checkbox'){
				var li = $('<li>');
				$(li).html($(obj).attr('name'));
				$(ul).append(li);
				$(obj).remove();
				$(li).click(function() {
					$(this).toggleClass('active');
				});	
			}
		});
		if(document.location.href.indexOf('search')>-1){
			skinny.utilitybar.open('search');
			$('a#search').addClass('active');
		}
	},
	open:function(id){
		var panel = '#' + id + "-panel";
		$('#sub').animate({'height':'118px'},{'duration':500, complete:function(){
			$(panel).show();
			$(panel).animate({'opacity':1},{'duration':250});
		}});
	},
	close:function(){
		$('.utilityLink').removeClass('active');
		$('.panel').each(function(i, obj) {
			$(obj).animate({'opacity':0},{'duration':350, complete:function(){
				$('#sub').animate({'height':0},{'duration':450});
			}});
		});
	}
}
skinny.flexbar = {
	limit:435,
	curState:"",
	listenDown:function(){
		$(window).scroll(function(){
			if($(window).scrollTop() > skinny.flexbar.limit){
				skinny.flexbar.minimize();
			}
		});
	},
	listenUp:function(){
		$(window).scroll(function(){
			if($(window).scrollTop() < (skinny.flexbar.limit - 88)){
				skinny.flexbar.maximize();
			}
		});
	},
	init: function(){
		skinny.flexbar.curState = "init";
		skinny.flexbar.listenDown();
	},
	minimize:function(){
		$(window).unbind();
		$('#buffer').show();
		$('#logoMini').show();
		$('#primary').addClass('mini');
		$('.header h1').hide();
		$('#nav').css({
			'position':'fixed',
			'top':'-91px'
		});
		$('#nav').animate({'top':'0px'},{'duration':400});
		skinny.flexbar.curState = "min";
		skinny.flexbar.listenUp();
	},
	maximize:function(){
		$(window).unbind();
			$('.header h1').show();

		$('#nav').animate({'top':'-91px'},{'duration':250, complete:function(){
			$('#buffer').hide();
			$('#primary').removeClass('mini');

			$('#logoMini').hide();
			$('#nav').css({
				'position':'relative',
				'top':''
			});
		}});
		skinny.flexbar.curState = "exp";
		skinny.flexbar.listenDown();
	}
};