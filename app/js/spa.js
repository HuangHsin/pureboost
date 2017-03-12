'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.spa = function(){

	// 網址為 gulp 或者 github 時 設定成debug 模式
	var debug = /localhost[:]9000|github.io/.test(location.href);
	var github = /nelson.works/.test(location.href);
	var stage = /staging/.test(location.href);
	var rootPath = github ? '/' : '/';
	rootPath = stage ? '/staging/' : rootPath;


	var container = $('#container'),
		title = document.title;


	app.spa = {
		container: container,
		title: title
	};


	function updateContent(uri, name, menu, callback, isPopstate){
		// console.log(uri, cat, cata, callback || null);
		isPopstate = isPopstate || false;
		container.trigger('page:preupdate');
		if(!isPopstate && location.pathname !== uri){
			$('html').removeClass('loading-done');
		}

		$.get(uri, function(response){
			var title = title;
			var htmlContent = '';
			$(response).each(function(i, element){
				if($(element).attr('property') === 'og:title'){
					title = $(element).attr('content');
				}
				if($(element).attr('role') === 'main'){
					htmlContent = element;
				}
			});
			if(!isPopstate){
				pushState({uri: uri, name: name, menu: menu, title: title}, 'update content' + uri);
			}

			container.html(htmlContent);



			container.trigger('page:update:' + name, menu);
			container.trigger('page:update', menu);

			app.imageReload.init();
		});
	}

	function pushState(info, ref){
		// console.log('history.pushState('+JSON.stringify(info)+', '+(title || document.title)+', '+info.uri+')');
		// console.log('push ref:',ref,':',info);
		info.title = info.title || title;
		document.title = info.title;
		history.pushState(info, info.title, info.uri);
	}

	$(window).on('popstate', function(event){
		var info = event.originalEvent.state;
		// console.log('pop',info);
		if(info === null){
			location.href = rootPath;
		}
		document.title = info.title;
		updateContent(info.content, info.category, info.catalog, function(){
		}, true);
		return true;

	});

	$('a[data-href]').on('click', function(e){
		$(this).addClass('active').siblings().removeClass('active');
		var uri = $(this).attr('data-href');
		var name = $(this).text();
		var menu = null;
		updateContent(uri, name, menu, function(){
			console.log(name);
		});
	});


	if(app.getParam('path')){
		var uri = decodeURIComponent(app.getParam('path'));
		$('a[data-href='+ uri +']').trigger('click');
	}

	container.on('page:update', function(e, name){
		// console.log(e);
		// console.log(name);
	});

	container.trigger('page:update', 'home');
};	
