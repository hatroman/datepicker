//require 'tmpl.js'
var Templates = function() {
	var _this = this;
	var templates = $('.template').each(function(i, elem){
		var $elem = $(elem), id = $elem.data('id');

		id && (_this[id] = tmpl($elem.html()));
	});
};