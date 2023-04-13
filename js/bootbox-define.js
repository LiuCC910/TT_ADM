/**
 * Depend on bootbox.js v4.3.0
 */


function showWaitProgressing(timeout){
	var progressing = bootbox.dialog({
		  size : 'large',
		  message: '<div class="progress">' +
			  			'<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
			  				'<span class="sr-only"></span>' +
			  			'</div>' +
			  		'</div>',
		  title: 'Processing...',
		  closeButton : false
	});
	
	if(!(timeout===undefined) && typeof(timeout)==='number'){
		setTimeout(function(){
			progressing.modal('hide');
		}, timeout);
	}
	
	return progressing;
}

function showWaitProgressing(timeout,title){
	var progressing = bootbox.dialog({
		  size : 'large',
		  message: '<div class="progress">' +
			  			'<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
			  				'<span class="sr-only"></span>' +
			  			'</div>' +
			  		'</div>',
		  title: title,
		  closeButton : false
	});
	
	if(!(timeout===undefined) && typeof(timeout)==='number'){
		setTimeout(function(){
			progressing.modal('hide');
		}, timeout);
	}
	
	return progressing;
}

function confirmDeleteDialog(submitForm, message){
	message = message == null ? '確定要刪除?' : message;
	var dialog = bootbox.confirm({
			size : 'small',
			message : '<h4>'+message+'</h4>',
			callback : function(result){
				if(result){
					showWaitProgressing();
					submitForm.submit();
				}
			}
	});
	
	dialog.find('.modal-body').addClass('bg-danger');
	dialog.find('button[data-bb-handler=confirm]').attr('class', 'btn btn-danger').html('確定');
	dialog.find('button[data-bb-handler=cancel]').html('取消');
	return dialog;
}

function confirmDeleteDialogCallBack(callback, message){
	message = message == null ? '確定要刪除?' : message;
	var dialog = bootbox.confirm({
			size: 'small', 
			message: '<h4>'+message+'</h4>',
			callback: callback
		});
	dialog.find('.modal-body').addClass('bg-danger');
	dialog.find('button[data-bb-handler=confirm]').attr('class', 'btn btn-danger').html('確定');
	dialog.find('button[data-bb-handler=cancel]').html('取消');
	return dialog;
}

function alertDialogCallBack(message, callback){
	var dialog = bootbox.alert({
			size: 'small',
			message: '<h4>'+message+'</h4>', 
			callback : callback
		});
	dialog.find('.modal-body').addClass('bg-danger');
	dialog.find('button[data-bb-handler=ok]').attr('class', 'btn btn-danger').html('確定');
	dialog.find('button[data-bb-handler=cancel]').html('取消');
	return dialog;
}

function alertInfoDialogCallBack(callback, message){
	message = message ? message : "";
	var dialog = bootbox.confirm({
			size:'small',
			message : "<h4>" + message + "</h4>", 
			callback : callback
		});
	dialog.find(".modal-body").addClass("bg-info");
	dialog.find("button[data-bb-handler=confirm]").attr("class", "btn btn-info").html("確定");
	dialog.find("button[data-bb-handler=cancel]").html("取消");
	return dialog;
}

"use strict";
(function($) {
    $.fn.extend({
    	/*
    	 * 外掛img,  show Bigger the Image after onclick img object, 
    	 */
        alertImgBootbox: function() {
    		$(this).on( "click", function () {
        		var imgurl = $(this).attr("src");
        		var dialog = bootbox.alert({
        			size : 'large',
        		    message:  '<img src="' + imgurl+'" class="img-responsive center-block" />',
        		    backdrop: true
        		});
        		
        		$(dialog).on('click','.modal-dialog', function (event) {
        			dialog.modal('hide');
        		});
    		});
    		return this;
        }
     });
})(jQuery);