'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global page */


// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|github.io/.test(location.href);
var github = /nelson.works/.test(location.href);
var stage = /staging/.test(location.href);
var rootPath = github ? '/' : '/';
rootPath = stage ? '/staging/' : rootPath;

location.href = rootPath + '?path=' + page.path + '&title=' + page.title;
// console.log(rootPath + '?path=' + path + '&title=' + title)

