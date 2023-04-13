/**
*Base on JGuery validation.
*
*/
$.validator.validOnElementBlur = function(element, elementToBeValid){
	if(element.length > 0){
		element.blur(function() {
			if(elementToBeValid.length > 0){
				elementToBeValid.valid();
			}
		});
		element.change(function() {
			if(elementToBeValid.length > 0){
				elementToBeValid.valid();
			}
		});
	}
}

$.validator.validOnJqteChange = function(textAreaElement){
	if(textAreaElement.length > 0){
		var jqteEditorDiv = textAreaElement.parent().siblings('div.jqte_editor');
		jqteEditorDiv.bind("DOMSubtreeModified change", function() {
			// sync content in the jqte_editor, otherwise the value in the actual text area is not the newest.
			textAreaElement.val(jqteEditorDiv.html());
			textAreaElement.valid();
		});
	}
}

$.validator.validateWithJqteAndHiddenField = function(formElement, isScrollToError){
	var setting = {};
	setting.formElement = formElement;
	setting.isScrollToError = isScrollToError;
	$.validator.enhancedValidate(setting);
}

$.validator.enhancedValidate = function(setting){
	
	var formElement = setting.formElement;
	var isScrollToError = setting.isScrollToError ? setting.isScrollToError : false;
	var ignore = '';
	if(setting.ignore != null){
		ignore = setting.ignore;
	}
	
	var options = { 
		    ignore: ignore,
			errorPlacement : function(error, element) {
				var jqteElement = $(element).closest(".jqte");
				var kartikElement = $(element).closest("span.file-input");
				var ttFileuploadElement = $(element).parent('div').parent('div');
				/* Below setting are for validating jqte textarea. */
				if (jqteElement.length == 1) {
					error.insertAfter(jqteElement);
				} 
				/* Below setting are for validating Kartik fileinput. */
				else if (kartikElement.length == 1){
					error.insertAfter(kartikElement);
				}
				/* Below setting are for validating TT fileupload. */
				else if (ttFileuploadElement.length == 1){
					error.insertAfter(ttFileuploadElement);
				}
				
				else {
					error.insertAfter(element);
				}
			},
			highlight : function(element, errorClass, validClass) {
				$(element).addClass(errorClass).removeClass(validClass);
			},
			unhighlight : function(element, errorClass, validClass) {
				$(element).removeClass(errorClass).addClass(validClass);
				var el = $(element).closest(".jqte");
			}
		};
	
	if(isScrollToError == true){
		options.focusInvalid = false;
		options.invalidHandler = function(event, validator) {
	        if (!validator.numberOfInvalids()){
	            return;
	        }
	        
	        var $element = $(validator.errorList[0].element);
	        if($element.attr('type') === 'hidden'){
	        	//try to get the closest element
	        	$element = $element.prev('input:not(hidden)');
	        	if($element.length == 0){
	        		$element = $element.next('input:not(hidden)');
	        	}
	        }
	        
	        if($element.length > 0){	        	
	        	$('html, body').animate({
	        		scrollTop: $element.offset().top
	        	}, 1000);
	        }
		};
	}
	
	return formElement.validate(options);
}


/** 
 * 驗證jqte的HTML tag是否為empty
 * (用在必輸欄位)
 * */
$.validator.addMethod("validateEmptyHtmlTag", function(value, element) {
	
	var wrapperValue = '<div>'+value+'</div>';	
	var validatorValue = $(wrapperValue).text();
	if (validatorValue.length == 0) {
		return false;
	}
	return true;
}, "請勿輸入空白字串!");

/**
 * email驗證規則
 */
$.validator.methods.email = function( value, element ) {
	  return this.optional( element ) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value );
}

/** 
 * 檢查影音Url來源是否為youtube or Youku
 *  
 * */
$.validator.addMethod("checkVideoUrl", function(value, element) {
	  var url = $(element).val();
	  var isYoutube = false;
	  var isYouku = false;
	  isYoutube = youtube_parser(url);
	  isYouku = youku_parser(url);
	  if($.trim(url)=='' || isYoutube || isYouku){
		  return true;
	  } else {
		  return false;
	  }
}, "請輸入正確的 Youtube 或 Youku URL.");

function youtube_parser(url){
	//20161124 modify 可接受v參數後再帶其他參數值 ex.https://www.youtube.com/watch?v=aTsL-9ilZ0w&list=RDaTsL-9ilZ0w
    var regExp = /^((https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/)((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?)\??v?=?([^#\&\?]*)).*$/;
    var match = url.match(regExp);
    
    if (match && match[9].length==11){
        return match[9];
    }else{
        return null;
    }
}

function youku_parser(url){
	var regExp = /http:\/\/v\.youku\.com\/v_show\/id_([\w=]+)\.html/;
	var match = regExp.exec(url);
	if(match && match[1]){
		return match[1];
	} else {
		return null;
	}
}