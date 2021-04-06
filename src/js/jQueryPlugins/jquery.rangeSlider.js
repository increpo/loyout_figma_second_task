(function($){
	jQuery.fn.rangeSlider = function(options){
		options = $.extend({
			rangeStart: 0,
			rangeEnd: 1000
		}, options);

		var make = function(){
			//var i=0;
			var mouseX = 0;
			//var sliderOffset;
			//var boxWidth;
			var roundWidth = $(this).find('.slider').find('.round').css('width');
			var roundBorder = $(this).find('.slider').find('.round').css('border-width');
			var sliderWidth = $(this).find('.slider').find('.line').css('width');
			var sliderLeft = $(this).find('.slider').find('.line').offset().left - $(this).find('.slider').find('.line').parent().offset().left;
			var sliderBorders = {
				left: $(this).find('.slider').find('.line').offset().left,
				right: $(this).find('.slider').find('.line').offset().left + parseFloat(sliderWidth)
			};
			var rangeStart = $(this).find('.slider').find('.rangeLine').offset().left + 'px';
			var rangeWidth = $(this).find('.slider').find('.rangeLine').css('width');
			var rangeStartValue = (options.rangeEnd - options.rangeStart)/parseFloat(sliderWidth) * (parseFloat(rangeStart) - parseFloat(roundWidth)/2);
			var rangeEndValue = (options.rangeEnd - options.rangeStart)/parseFloat(sliderWidth)*(parseFloat(rangeStart) + parseFloat(rangeWidth));
			var range = options.rangeEnd - options.rangeStart;
			var sliderRangeWidth = parseFloat(sliderWidth) - parseFloat(roundWidth);
			var sliderRange = {
				left: sliderBorders.left + parseFloat(roundWidth)/2,
				right: sliderBorders.left + parseFloat(roundWidth)/2 + sliderRangeWidth
			};
			//console.log(sliderBorders.left + '    ' + $(this).find('.slider').find('.line').parent().offset().left);


			$(this).find('.round').mousedown(function(event){
				$(this).css({
						'position': 'relative',
						'top': '0px'
					});

				if(event.currentTarget.classList.contains('start')){
					$('body').bind('mousemove',{class: '.start', that: $(this)} , mouseLurking);
					if(!$(this).parent().find('.context-start').length){
						$(this).parent().append('<div class="context-start"></div>');
						$('.context-start').css('position', 'absolute');
					};
					//console.log($(this).parent().children('.context-start').length);
				} else if (event.currentTarget.classList.contains('end')){
					$('body').bind('mousemove',{class: '.end', that: $(this)} , mouseLurking);
					if(!$(this).parent().find('.context-end').length){
						$(this).parent().append('<div class="context-end"></div>');
						$('.context-end').css('position', 'absolute');
					};
				};
			});

			$(this).mouseup(function(event){
				$(this).parent().find('.context-start').remove();
				$(this).parent().find('.context-end').remove();
			});

			$('body').mouseup(function(event){
				$('body').unbind('mousemove',mouseLurking);

			});

			function mouseLurking(event){
				mouseX = event.pageX;
				if(mouseX>=sliderBorders.left && mouseX<=sliderBorders.right){
					if(event.data.that.hasClass('start')){
						if(event.data.that.parent().find('.start').offset().left >= event.data.that.parent().find('.end').offset().left){
							event.data.that.offset({
								left: mouseX - parseFloat(roundWidth) + parseFloat(roundBorder)/2
							});
						} else {
							event.data.that.offset({
								left: mouseX - parseFloat(roundBorder)/2
							});
							//console.log(event.clientX);
							//console.log(event.data.that.css('left') + '    ' + (parseFloat(sliderLeft) - parseFloat(roundBorder)/2));
						};
					} else {
						//console.log(event.data.event.css('border-width'));
						if(event.data.that.parent().find('.start').offset().left <= event.data.that.parent().find('.end').offset().left){
							event.data.that.offset({
								left: mouseX - parseFloat(roundWidth) + parseFloat(roundBorder)/2
							});
						} else {
							event.data.that.offset({
								left: mouseX - parseFloat(roundBorder)/2
							});
						};
					};
					sliderRangeMotion(event.data.that);
					//console.log(parseFloat(roundWidth)/2);
				};
			};

			function sliderRangeMotion(that){
				if(parseFloat(that.parent().find('.start').offset().left) < parseFloat(that.parent().find('.end').offset().left)){
					//rangeStart = parseFloat(that.parent().find('.start').offset().left) + parseFloat(roundBorder)/2;
					//rangeWidth = parseFloat(that.parent().find('.end').offset().left) - parseFloat(that.parent().find('.start').offset().left) + parseFloat(roundWidth) + 'px';
					
					rangeStart = parseFloat(that.parent().find('.start').offset().left) + parseFloat(roundWidth)/2 + parseFloat(roundBorder)/2;
					rangeWidth = parseFloat(that.parent().find('.end').offset().left) - parseFloat(that.parent().find('.start').offset().left) + 'px';
					//console.log(event);
					//console.log('левая' + rangeWidth);
					that.parent().find('.rangeLine').offset({left: rangeStart});
					that.parent().find('.rangeLine').css('width', rangeWidth);
				} else {
					rangeStart = parseFloat(that.parent().find('.end').offset().left) + parseFloat(roundWidth)/2 + parseFloat(roundBorder)/2;
					rangeWidth = parseFloat(that.parent().find('.start').offset().left) - parseFloat(that.parent().find('.end').offset().left) + 'px';
					that.parent().find('.rangeLine').offset({left: rangeStart});
					that.parent().find('.rangeLine').css('width', rangeWidth);
					//console.log('правая' + $('.end' + '.round').css('left'));
				};
				rangeValues(that);
			};

			function rangeValues(that){
				//console.log(parseFloat(sliderWidth) + '    ' + parseFloat(rangeWidth));
				//console.log('rangeStart = ' + parseFloat(rangeStart) + ' - (roundBorder)/2 = ' + parseFloat(roundBorder)/2 + ' - sliderBorders.left = ' + parseFloat(sliderBorders.left));	
				//rangeStartValue = range/parseFloat(sliderWidth) * (parseFloat(rangeStart) - parseFloat(sliderBorders.left) - parseFloat(roundBorder)/2);
				//rangeEndValue = range/parseFloat(sliderWidth)*(parseFloat(rangeStart) - parseFloat(sliderBorders.left) + parseFloat(rangeWidth) - parseFloat(roundBorder));
				//console.log(parseFloat(rangeStart) + '     ' + sliderRange.left + ' , ' + that.parent().find('.rangeLine').offset().left);
				rangeStartValue = range/parseFloat(sliderRangeWidth) * (parseFloat(rangeStart) - parseFloat(sliderRange.left));
				rangeEndValue = range/parseFloat(sliderRangeWidth) * (parseFloat(rangeStart) + parseFloat(rangeWidth) - parseFloat(sliderRange.left));

				//console.log(parseFloat(sliderWidth) + ' , ' + that.parent().find('.rangeLine').css('width') + '     ' + sliderRangeWidth);
				//console.log(parseFloat(sliderRange.left) + ' , ' + sliderBorders.left + '     ' + sliderRange.right + '     ' + sliderBorders.right);
				//console.log(that.parent().parent().find('.drop__desc').attr('value'));
				that.parent().parent().find('.drop__desc')
					.val(rangeStartValue.toFixed(0) + '₽ - ' + rangeEndValue.toFixed(0) + '₽');

				contextElement(that);
			};

			$(this).find('.drop__desc').keyup(rangeValuesInput);


			function rangeValuesInput(event){
				var contin = 0;
				var value = {
					start: '',
					end: ''
				};

				for(let i in event.target.value){
					//console.log(event.target.value[i]);
					if(isFinite(event.target.value[i])){
						if(event.target.value[i] != ' '){
							value.start += event.target.value[i];
						};
						contin = i;
					} else break;
				};

				for(let i in event.target.value){
					//console.log(event.target.value[i]);
					//console.log(i);
					if (parseFloat(i) > contin){
						//console.log(i);
						if(isFinite(event.target.value[i])){
							if(event.target.value[i] != ' '){
								value.end += event.target.value[i];
							};
						};
					};
				};
				//console.log(parseFloat(value.start) + '    ' + parseFloat(value.end));
				sliderConstruct($(this), value);
			};

			function sliderConstruct(that, value){
				//console.log(that.parent().parent().find('.round' + '.start').css('width') + '   ' + value.start);
				console.log(value.start);
				if (value.start <= options.rangeEnd){
					that.parent().parent().find('.round' + '.start')
						.offset({left: parseFloat(sliderRangeWidth)/range*value.start + parseFloat(sliderRange.left) - parseFloat(roundWidth)/2 - parseFloat(roundBorder)/2});
				} else {
					that.parent().parent().find('.round' + '.start')
						.offset({left: parseFloat(sliderRange.right) - parseFloat(roundWidth)/2 - parseFloat(roundBorder)/2});
				};

				if (value.end <= options.rangeEnd){
					that.parent().parent().find('.round' + '.end')
						.offset({left: (parseFloat(sliderRangeWidth))/range*value.end  + parseFloat(sliderRange.left) - parseFloat(roundWidth)/2 - parseFloat(roundBorder)/2});

					//that.parent().parent().find('.round' + '.end')
						//.css({'left': (parseFloat(sliderWidth) - parseFloat(roundWidth) - parseFloat(roundBorder)*1.5)/range*value.end +'px'});
				} else {
					that.parent().parent().find('.round' + '.end')
						.offset({left: parseFloat(sliderRange.right) - parseFloat(roundWidth)/2 - parseFloat(roundBorder)/2});
				};
					
					sliderRangeMotion(that.parent().parent().find('.round'))
				//sliderRangeMotion(that.parent().parent().find('.round'));
			};

			function contextElement(that){
				let contextTop = that.parent().parent().find('.round').offset().top - 20;
				let contextColor = that.parent().parent().find('.drop__desc').css('color');
				let contextFont = that.parent().parent().find('.drop__desc').css('font-family');
				let contextFontSize = that.parent().parent().find('.drop__desc').css('font-size');
				//console.log(contextColor);
				that.parent().parent().find('.context-start')
					.offset({left: rangeStart - 10, top: contextTop})
					.html(parseInt(rangeStartValue))
					.css({color: contextColor,
								'font-family': contextFont,
								'font-size': contextFontSize});
				//console.log(rangeStart + '     ' + rangeWidth);
				that.parent().parent().find('.context-end')
					.offset({left: parseFloat(rangeStart) + parseFloat(rangeWidth) - 10, top: contextTop})
					.html(parseInt(rangeEndValue))
					.css({color: contextColor,
								'font-family': contextFont,
								'font-size': contextFontSize});
			}

		};

		return this.each(make);
	}
})(jQuery);