'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.preload = function(){

	app.dementions = {
		mobile: false,
		desktop: false
	};


	function imageReload(callback){

		var imagePreload = {}, elements = [];

		var main = $('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]');
		main.each(function(idx, ele){
			if($(ele).attr('data-src')){
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});
		
		$.each(imagePreload, function(src, stat){
			if(/\.svg$/.test(src)){

				$.get(src, function(svg){
					var ret = $(elements).filter(function(){
						return src == $(this).attr('data-src');
					}).each(function(i, ele){

						if(ele.tagName.toLowerCase() === 'img'){
							$('svg', svg).clone().insertAfter(ele);
							$(ele).remove();
						}else{
							$(ele).removeAttr('data-src').html($('svg', svg).clone());
						}
					});	
					checkAll(src);
				});
			}else{
				var img = new Image();
				img.onload = function(){
					var ret = $(elements).filter(function(){
						return src == $(this).attr('data-src');
					}).each(function(i, ele){
						if(ele.tagName.toLowerCase() === 'img'){
							$(ele).attr('src', $(ele).attr('data-src'));
						}else{
							$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
						}
					});			
					checkAll(src);	
				};
				img.src = src;
			}
		});

		function checkAll(src){

			imagePreload[src] = true;
			var alldone = true;
			$.each(imagePreload, function($s, $done){
				alldone = $done && alldone;
			});
			if(alldone){
				//全部圖片下載完成
				imageLoaded();
			}
		}

		function imageLoaded(){
			if(typeof app.imageReload.callback == 'function'){
				app.imageReload.callback();
			}
		}

	}


	app.imageReload = {
		init: function(){
			$(window).on('resize', function(){
				if($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() <=768){
					imageReload(function(){
						app.dementions.mobile = true;
					});
				} else if($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() > 768){
					imageReload(function(){
						app.dementions.desktop = true;
					});
				} else{
					app.imageReload.callback();
				}
				// if( $('html.ios').length && window.innerHeight ){
				// 	$('html, body').height(window.innerHeight);
				// }
			}).trigger('resize');
		},
		refresh: function(){
			$(window).trigger('resize');
		},
		callback: function(){}
	};

};	

