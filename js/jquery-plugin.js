(function($) {
/**
 * serialize form as json
 * ref: http://onwebdev.blogspot.com/2012/02/jquery-serialize-form-as-json-object.html
 */
$.fn.serializeFormJSON = function(emptyAware) {
   emptyAware = emptyAware === undefined ? false : emptyAware; 
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
	   
	   if(emptyAware && this.value==''){
		   return;
	   }
	   
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

/**
 * 修正 $.param 的參數名稱成服務可接受的 pattern 
 */
$.fixedParam = function(json) {
	json = json === undefined ? false : json;
	var param  = ""
	if(json!=false){
		param = $.param(json);
		param = param.replace(/%5B\d+%5D%5B/g, function (match) {
			return "[" + match.replace(/%5B|%5D/g, '')+ "]."   ;
		});
		
		param = param.replace(/%5D/g, '');
	}
	
	return param;
}

})(jQuery);
