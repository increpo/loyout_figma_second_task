import $ from 'jquery';


global.jQuery = $;
global.$ = $;

(function($){
	$.fn.lbSlider = function(options){
		options = $.extend({
			//leftBtn: '.sa-left',
			//rightBtn: '.sa-right',
			visible: 3,
			//autoPlay: true,
			//autoPlayDelay: 5
			leftBtn: 'leftBtn',
			rightBtn: 'rightBtn',
			quantity: 3,
			autoPlay: false,
			autoPlayDelay: 10
		}, options);

		var make = function(){
			$(this).css('overflow', 'hidden');
			var el = $(this).children('ul');
			el.css({
				position: 'relative',
				left: '0'
			});

			var sliderFirst = el.children('li');//.slice(0, options.quantity);
			var tmp = '';
			sliderFirst.each(function(){
				tmp = tmp + '<li>' + $(this).html() + '</li>';
			});
			sliderFirst = tmp;

			// var sliderLast = el.children('li').slice(-options.quantity);
			// tmp = '';
			// sliderLast.each(function(){
			// 	tmp = tmp + '<li>' + $(this).html() + '<li>';
			// });
			// sliderLast = tmp;

			var elRealQuant = el.children('li').length;
			//alert(el.children('li').length);
			el.append(sliderFirst);
			el.prepend(sliderFirst);
			var elWidth = el.width()/elRealQuant*1.2;//options.quantity;

			el.children('li').css({
				float: 'left',
				width: elWidth
			});

			el.parent().width(500);

			var elQuant = el.children('li').length;
			el.width(elWidth * elQuant);
			//el.width(elWidth*(elRealQuant+2));
			//alert(el.width());
			el.css('left', '-' + elWidth * options.quantity + 'px');

			function disableButtons(){
				$('.' + options.leftBtn + ', .' + options.rightBtn).addClass('inactive');
			};

			function enableButtons(){
				$('.' + options.leftBtn + ', .' + options.rightBtn).removeClass('inactive');
			};

			$('.' + options.leftBtn).click(function(event){
				event.preventDefault();
				if (!$(this).hasClass('inactive')) {
					disableButtons();
					el.animate({left: '+=' + elWidth + 'px'}, 300,
						function(){
							if ($(this).css('left') == '0px') {
								$(this).css('left', '-' + elWidth * elRealQuant + 'px');
							};
							enableButtons();
						}
					);
				};
				return false;
			});

			$('.' + options.rightBtn).click(function(event){
				event.preventDefault();
				if (!$(this).hasClass('inactive')) {
					disableButtons();
					el.animate({left: '-=' + elWidth + 'px'}, 300,
						function(){
							if ($(this).css('left') == '-' + (elWidth * (options.quantity + elRealQuant)) + 'px') {
								$(this).css('left', '-' + elWidth * options.quantity + 'px');
							};
							enableButtons();
						}
					);
				};
				return false;
			});


			if (options.autoPlay){
				function aPlay() {
					$('.' + options.rightBtn).click();
					de1Id = setTimeout(aPlay, options.autoPlayDelay * 1000);
				};
				var de1Id = setTimeout(aPlay, options.autoPlayDelay * 1000);
				el.hover(
					function() {
						clearTimeout(de1Id);
					},
					function() {
						de1Id = setTimeout(aPlay, options.autoPlayDelay * 1000);
					}
				);
			};
		};

		return this.each(make);
	};
})(jQuery);



(function($){
	jQuery.fn.responsiveBlock = function(options){

		options = $.extend({
			derColor: 'blue',
			hoverColor: 'red',
		}, options);

		var make = function(){
			$(this).css('color', options.derColor)
			.mouseenter( function() {
				$(this)
				.css('color', options.hoverColor)
				.trigger('responsiveBlock.stateChange');
			})
			.mouseleave( function() {
				$(this)
				.css('color', options.derColor)
				.trigger('responsiveBlock.stateChange');
			});
		};

		return this.each(make);
	};
})(jQuery);
