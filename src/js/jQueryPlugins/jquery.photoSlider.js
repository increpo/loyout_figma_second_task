import $ from 'jquery';


global.jQuery = $;
global.$ = $;

(function($){
	jQuery.fn.photoSlider = function(options) {
		options = $.extend({
			photoURLS: []
		}, options);
		var make = function(){
			var i=0;
			$(this).contents('.right', 'slider__btn').click(function(event){
				$(this).parent().contents('.img__conteiner').css('justify-self', 'end');
				$(this).parent().prepend(`<div class='img__conteiner'><img></div>`);
				if(i==options.photoURLS.length-1){i=-1;};
				if (i<options.photoURLS.length-1){
					i+=1;
					$(this).parent().contents('.img__conteiner:eq(0)')
						.css({'width':'0px',
								'justify-self':'start',
								'justify-items': 'end',
								'display': 'grid'})
						.contents('img')
						.attr('src', options.photoURLS[i]);
					//i+=1;
				};
				$(this).parent().contents('.img__conteiner:eq(1)').animate({width: "0px"}, 1000);
				$(this).parent().contents('.img__conteiner:eq(0)').animate({width: "100%"}, 1000);
				$(this).parent().contents('.img__conteiner:eq(1)').css({'width':'100%', 'justify-items':'start'});
				$(this).parent().contents('.img__conteiner:eq(2)').remove();
				sliderStatus($(this), i);
			});

			$(this).contents('.left', 'slider__btn').click(function(event){
				$(this).parent().contents('.img__conteiner').css('justify-self', 'end');
				$(this).parent().contents('.img__conteiner').after(`<div class='img__conteiner'><img></div>`);
				if(i==0){i=options.photoURLS.length;};
				if (i>0){
					i-=1;
					$(this).parent().contents('.img__conteiner:eq(1)')
						.css({'width':'0px',
								'justify-self':'end',
								'justify-items': 'start',
								'display': 'grid'})
						.contents('img')
						.attr('src', options.photoURLS[i]);
					//i-=1;
				};
				$(this).parent().contents('.img__conteiner:eq(0)').css({'display': 'grid', 'width':'100%', 'justify-items':'end', 'justify-self':'start'});
				$(this).parent().contents('.img__conteiner:eq(0)').animate({width: "0px"}, 1000, function(){trashRemove($(this))});
				$(this).parent().contents('.img__conteiner:eq(1)').animate({width: "100%"}, 1000);
				$(this).parent().contents('.img__conteiner:eq(2)').remove();
				sliderStatus($(this), i);
			});

			function trashRemove(event){
				event.parent().contents('.img__conteiner:eq(0)').remove();
			};

			function sliderStatus(event, i){
				event.parent().find('.round', '.filled').removeClass('filled');
				event.parent().find('.round').eq(i).addClass('filled');
			};
		};

		return this.each(make);
	}
})(jQuery);