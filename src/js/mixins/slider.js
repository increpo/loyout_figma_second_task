import $ from 'jquery';
import '../jQueryPlugins/jquery.responsiveBlock.js';
import '../jQueryPlugins/jquery.photoSlider.js';
import '../jQueryPlugins/jquery.rangeSlider.js';

global.jQuery = $;
global.$ = $;

$(document).ready(function(){

	// $(".header__logo").click(function(event){
	// 	alert("Поздравляем! Вы починили код!");
	// });

	// $('.nav__item').click(function(event){
	// 	$(this).css('color', 'red');
	// });

	// $("#some").toggle(function(){
	// 	$(this).css('color', 'red');
	// 	$(this).css('display', 'block');},function(){
	// 	$(this).css('color', 'blue');
	// 	$(this).css('display', 'block');
	// });

	$('#par1').click(function(){
		if($('#par1').html() == 'нажми еще разок') {
			//alert('да, это так');
			alert($(this).css('color'));
			$(this).css('color', 'green');
			alert($(this).css('color'));
		};
	});

	$('.slider').lbSlider({
		leftBtn: 'sa-left',
		rightBtn: 'sa-right',
		visible: 3,
		autoPlay: false,
		autoPlayDelay: 5
	});

	$('.room__slider').photoSlider({photoURLS:[
		'/assets/img/840.png',
		'/assets/img/888.png',
		'/assets/img/980.png',
		'/assets/img/856.png']});

	$('.slider').rangeSlider({
		range: 15000
	});

	// (function($){
	// 	jQuery.fn.responsiveBlock = function(options){
	// 		options = $.extend({
	// 			derColor: 'blue',
	// 			hoverColor: 'red',
	// 		}, options);

	// 		var make = function(){
	// 			$(this).css('color', options.derColor);
	// 		};

	// 		return this.each(make);
	// 	};
	// })(jQuery);

	//$('.responsiveBlock').on('responsiveBlock.stateChange', handler);
	$('.responsiveBlock').responsiveBlock();

	$('#some').click(function(){
		$(this).toggleClass('open');
	});

	// $("#some").toggle(
	// 	function(){
	// 		$("#par1").attr("color","green");
	// 	},
	// 	function(){
	// 		$("#par1").attr("color","blue");
	// 	},
	// 	function(){
	// 		$("#par1").attr("color","red");
	// 	},
	// 	function(){
	// 		$("#par1").attr("color","black");
	// 	}
	// );

	// $( "#par1" ).toggle(
	// 	function() {
	// 		$( this ).addClass( "selected" );
	// 	}, function() {
	// 		$( this ).removeClass( "selected" );
	// 	}
	// );

	$('.nav__bar__item').mouseover(function(){
		$(this).css('background-color', 'pink');
	});

	$('.nav__bar__item').mouseout(function(){
		$(this).css('background-color', 'white');
	});

});

//document.querySelector('.slider__btn').addEventListener('click', function(){alert('dfe')});