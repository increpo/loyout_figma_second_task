(function($){
	jQuery.fn.rangeSlider = function(options){
		options = $.extend({
			range: 1000,
		}, options);

		var make = function(){
			var i=0;
			var mouseX = 0;
			var sliderOffset;
			var boxWidth;
			var roundWidth;
			var sliderBorders;
			var rangeStart;
			var rangeWidth;
			var rangeStartValue;
			var rangeEndValue;

			$(this).find('.round').mousedown(function(event){
				$(this).css({
						'position': 'relative',
						'top': '0px'
					});

				sliderOffset = $(this).parent().offset();
				sliderWidth = $(this).parent().css('width');
				roundWidth = $(this).css('width');
				sliderBorders = {
					left: (sliderOffset.left + parseInt(roundWidth)*0.4),
					right: (sliderOffset.left + parseInt(sliderWidth) - parseInt(roundWidth)*0.7)
				};

				if(event.currentTarget.classList.contains('start')){
					$('body').bind('mousemove',{class: '.start', event: $(this)} , mouseLurking);
				} else if (event.currentTarget.classList.contains('end')){
						$('body').bind('mousemove',{class: '.end', event: $(this)} , mouseLurking);
				};
			});

			// $(this).find('.round' + '.start').mousedown(function(event){
			// 	$('body').bind('mousemove',{class: '.start'} , mouseLurking);
			// });

			// $(this).find('.round')..mousedown(function(event){
			// 	if(event.currentTarget.classList.contains('start')){
			// 		$('body').bind('mousemove',{class: '.start'} , mouseLurking);
			// 	} else if (event.currentTarget.classList.contains('end')){
			// 			$('body').bind('mousemove',{class: '.end'} , mouseLurking);
			// 	};
			// });

			$('body').mouseup(function(event){
				$('body').unbind('mousemove',mouseLurking);
			});

			function mouseLurking(event){
				mouseX = event.pageX;
				//console.log(event.data.event.target.className);
				if(mouseX>sliderBorders.left && mouseX<sliderBorders.right){
					event.data.event.css({
						'left': mouseX - sliderOffset.left - parseInt(roundWidth)/2 + 'px'
					});
					sliderRangeMotion(event.data.event);
					//console.log(parseInt(roundWidth)/2);
				};
			};

			function sliderRangeMotion(event){
				if(parseInt(event.parent().find('.start').css('left')) < parseInt(event.parent().find('.end').css('left'))){
					rangeStart = parseInt(event.parent().find('.start').css('left')) + parseInt(roundWidth)/2 + 'px';
					rangeWidth = parseInt(event.parent().find('.end').css('left')) - parseInt(event.parent().find('.start').css('left')) + 'px';
					//console.log(event);
					//console.log('левая' + rangeWidth);
					event.parent().find('.rangeLine').css('left', rangeStart);
					event.parent().find('.rangeLine').css('width', rangeWidth);
				} else {
					rangeStart = parseInt(event.parent().find('.end').css('left')) + parseInt(roundWidth)/2 + 'px';
					rangeWidth = parseInt(event.parent().find('.start').css('left')) - parseInt(event.parent().find('.end').css('left')) + 'px';
					event.parent().find('.rangeLine').css('left', rangeStart);
					event.parent().find('.rangeLine').css('width', rangeWidth);
					//console.log('правая' + $('.end' + '.round').css('left'));
				};
				rangeValues(event);
			};

			function rangeValues(event){
				rangeStartValue = options.range/parseInt(sliderWidth) * parseInt(rangeStart);
				rangeEndValue = options.range/parseInt(sliderWidth)*(parseInt(rangeStart) + parseInt(rangeWidth));
				//console.log(rangeStartValue.toFixed(0) + ' , ' + rangeEndValue.toFixed(0));
				//console.log(event.parent().parent().find('.drop__desc').html());
				event.parent().parent().find('.drop__desc').html(rangeStartValue.toFixed(0) + '₽ - ' + rangeEndValue.toFixed(0) + '₽');
			};
		

		};

		return this.each(make);
	}
})(jQuery);