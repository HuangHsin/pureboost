'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.i18n = function(){

	$('.i18n .to').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
		if($('html').attr('lang') === $(this).attr('data-lang')){
			return false;
		}

		$('html').removeClass('loading-done');
		$('html').attr('lang', $(this).attr('data-lang'));
		
		app.imageReload.refresh();
	});

	var lang = $('html').attr('lang');

	if(lang){
		$('.i18n .to[data-lang='+lang+']').trigger('click');
	}
};	

