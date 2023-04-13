/**
 * Depend on Jquery DateTimePicker
 * 
 * @param inputObj:
 *            Just pass a input text object.
 * @param callBackFunc:
 *            set the call back function while input date value change.
 */
function initDateTimePicker(inputObj, callBackFunc, onShowFunc) {
	/* Set properties: css class and style */
	inputObj.prop('readonly', 'readonly');
	inputObj.css('cursor', 'pointer');
	inputObj.css('background-color', '#FFFFFF');
	inputObj.addClass('form-control');

	/* Set onChange function */
	var callBack = callBackFunc;
	var onChangeVal = function onChangeVal(date) {
		if (callBack != null) {
			callBack(date);
		}
	}

	/* Init DateTimePicker based on Jquery DateTimePicker */
	inputObj.datetimepicker({
		timepicker : false,
		scrollInput : false,
		formatDate : 'Y-m-d',
		format : 'Y-m-d',
		onChangeDateTime : onChangeVal,
		onShow : onShowFunc
	});

	/* Set default value */
	// If required and value == null || '', set default date to today.
	if (inputObj.attr('required')
			&& (inputObj.val() == '' || inputObj.val() == null)) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; // January is 0!
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		today = yyyy + '-' + mm + '-' + dd;
		inputObj.val(today);
	}

	/* Set empty button */
	// If not required, set empty button
	if (!inputObj.attr('required')) {
		var removeMsg = inputObj.attr('remove-message') != null ? inputObj
				.attr('remove-message') : '';
		var removeBtn = $('<a href="javascript:void(0)"><i class="fa fa-times fa-2x"></i>'
				+ removeMsg + '</a>');
		inputObj.after(removeBtn);
		removeBtn.click(function() {
			inputObj.val('');
			onChangeVal();
		});
	}
}

/**
 * Depend on Jquery DateTimePicker
 * 
 * @param inputObj:
 *            Just pass multiple input text object.
 * @param callBackFunc:
 *            set the call back function while input date value change.
 */
function initDateTimePickerArr(inputObj, callBackFunc, onShowFunc){
	inputObj.each(function(){
		initDateTimePicker($(this));
	});
}

function dateRangePicker(startDateObj, endDateObj, callBackFunc) {
	initDateTimePicker(startDateObj, callBackFunc, function(ct) {
		this.setOptions({
			maxDate : endDateObj.val() ? endDateObj.val() : false
		})
	});
	initDateTimePicker(endDateObj, callBackFunc, function(ct) {
		this.setOptions({
			minDate : startDateObj.val() ? startDateObj.val() : false
		})
	});
}

function dateRangePickerWithMaxAndMin(startDateObj, endDateObj, startMinDate, endMaxDate, callBackFunc) {
	initDateTimePicker(startDateObj, callBackFunc, function(ct) {
		this.setOptions({
			maxDate : endDateObj.val() ? endDateObj.val() : endMaxDate? endMaxDate : false,
			minDate : startMinDate ? startMinDate : false
		})
	});
	initDateTimePicker(endDateObj, callBackFunc, function(ct) {
		this.setOptions({
			maxDate : endMaxDate ? endMaxDate : false,
			minDate : startDateObj.val() ? startDateObj.val() : startMinDate? startMinDate : false
		})
	});
}

/**
 * 以現在日期並輸入扣減月份，並回傳日期
 * 範例2016-10-12 
 * month=3
 * 回傳2016-07-12 
 */
function getPreviousMonth(month){
	var today = new Date();
	var sDate =  new Date(new Date(today).setMonth(today.getMonth()-month));
	var month = sDate.getMonth()+1;
	var day = sDate.getDate();

	var output = sDate.getFullYear() + "-" + (month<10 ? '0' : '') + month + "-" + (day<10 ? '0' : '') + day;
	  
	return output;
}

/**
 * 以現在日期並輸入扣減天數，並回傳日期
 * 範例2016-10-12 
 * sday=3
 * 回傳2016-10-09
 */
function getPreviousDay(sday){
	var d = new Date();
	d.setDate(d.getDate() - sday);
	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + "-" + (month<10 ? '0' : '') + month + "-" + (day<10 ? '0' : '') + day;
	  
	return output;
}