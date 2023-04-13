/**
 * TT System message show util javascript
 * updatetime : 2016-03-29
 * 
 * depend Bootstrap Growl - v2.0.0
 */
function TTMessage(){
	var _this = this;
	var defaultMessageMap = {"0018":{"code":"0018","content":"列印失敗","type":1069},"0017":{"code":"0017","content":"列印成功","type":1066},"0016":{"code":"0016","content":"查無符合的資料","type":1066},"0015":{"code":"0015","content":"此公司資料已存在","type":1069},"0014":{"code":"0014","content":"此登入帳號無效","type":1066},"0013":{"code":"0013","content":"是否確認刪除","type":1066},"0012":{"code":"0012","content":"資料已被使用，不可刪除","type":1066},"0011":{"code":"0011","content":"{0}-資料已存在","type":1066},"0059":{"code":"0059","content":"您已完成回娘家 確認Email的動作， 請使用email、密碼登入。","type":1066},"0057":{"code":"0057","content":"您尚未完成email確認，請至email點選確認信完成或點選重新寄送","type":1066},"0058":{"code":"0058","content":"{0}輸入錯誤，請重新輸入","type":1066},"0055":{"code":"0055","content":"取消成功","type":1066},"0019":{"code":"0019","content":"匯出成功","type":1066},"0056":{"code":"0056","content":"取消失敗","type":1066},"0065":{"code":"0065","content":"目的端公司屬於eCatalog會員，型錄使用限制為{0}張，","type":1066},"0064":{"code":"0064","content":"是否確定搬移？","type":1066},"0063":{"code":"0063","content":"{0}輸入錯誤\\n原因:{1}","type":1066},"0062":{"code":"0062","content":"{0}和{1}，資料相同","type":1066},"0061":{"code":"0061","content":"是否確認返回?","type":1066},"0060":{"code":"0060","content":"匯入檔案格式不符，請檢查調整後重新匯入","type":1066},"0020":{"code":"0020","content":"匯出失敗","type":1066},"0021":{"code":"0021","content":"請至少勾選一筆資料","type":1066},"0005":{"code":"0005","content":"刪除成功","type":1066},"0004":{"code":"0004","content":"修改失敗","type":1069},"0007":{"code":"0007","content":"匯入成功","type":1066},"0006":{"code":"0006","content":"刪除失敗","type":1069},"0001":{"code":"0001","content":"新增成功","type":1066},"0003":{"code":"0003","content":"修改成功","type":1066},"0002":{"code":"0002","content":"新增失敗","type":1069},"0048":{"code":"0048","content":"是否確認修改，修改後， 原分類下的所有型錄， 全部歸類於Other","type":1066},"0049":{"code":"0049","content":"請先關閉 {0} 或 {0}，再新增{0}","type":1066},"0044":{"code":"0044","content":"申請送出失敗","type":1066},"0009":{"code":"0009","content":"{0}-必填欄位未填","type":1066},"0045":{"code":"0045","content":"匯入完畢","type":1066},"0008":{"code":"0008","content":"匯入失敗","type":1069},"0046":{"code":"0046","content":"是否確認刪除，刪除後，此分類下的所有型錄， 全部歸類於Other","type":1066},"0047":{"code":"0047","content":"是否確認匯入，匯入後， 原分類下的所有型錄， 全部歸類於Other","type":1066},"0052":{"code":"0052","content":"是否確認修改{0}","type":1066},"0051":{"code":"0051","content":"超過可設定的上限數量{0}，請重新設定","type":1066},"0054":{"code":"0054","content":"是否確認取消","type":1066},"0053":{"code":"0053","content":"{0}資料已變更，請於{0}內點選確認信完成修改","type":1066},"0050":{"code":"0050","content":"{0}只能申請{0}次","type":1066},"0010":{"code":"0010","content":"{0}-欄位格式不符","type":1066},"0036":{"code":"0036","content":"本型錄與其它型錄({0})的欄位資料重覆","type":1066},"0035":{"code":"0035","content":"輸入的產品分類:{0}，因營運政策，需待審核人員通過後才可上架","type":1066},"0034":{"code":"0034","content":"輸入的關鍵字:{0}，因營運政策，需待審核人員通過後才可上架","type":1066},"0033":{"code":"0033","content":"輸入的產業別:{0}，因營運政策，需待審核人員通過後才可上架","type":1066},"0039":{"code":"0039","content":"型錄名稱{0}具黑名單中的關鍵字","type":1066},"0038":{"code":"0038","content":"關鍵字{0}在黑名單中","type":1066},"0037":{"code":"0037","content":"該型錄為必審型錄","type":1066},"0079":{"code":"0079","content":"此為{0}帳號， 請使用{1}方式登入","type":1066},"0077":{"code":"0077","content":"無使用權限","type":1066},"0078":{"code":"0078","content":"預設語系：{0} 網的資料未填寫完整，請點此{0}調整內容","type":1066},"0081":{"code":"0081","content":"查無符合的資料，是否要前往註冊成為{0}?","type":1066},"0080":{"code":"0080","content":" 此為{0}帳號， 請使用{0}的忘記密碼功能","type":1066},"0042":{"code":"0042","content":"輸入的{0}-{1}不存在","type":1066},"0043":{"code":"0043","content":"申請送出成功","type":1066},"0040":{"code":"0040","content":"分數加總不可超過{0}分","type":1066},"0041":{"code":"0041","content":"欄位-{0}需為數字","type":1066},"0023":{"code":"0023","content":"審核成功","type":1066},"0022":{"code":"0022","content":"選擇的資料已送過{0}翻譯，是否仍要翻譯?","type":1066},"0025":{"code":"0025","content":"資料已送出，待人員審核","type":1066},"0024":{"code":"0024","content":"審核失敗","type":1066},"0027":{"code":"0027","content":"寄送成功","type":1066},"0026":{"code":"0026","content":"資料已送出，待排程作業執行","type":1066},"0029":{"code":"0029","content":"勾選資料包含黑名單資料","type":1066},"0028":{"code":"0028","content":"寄送失敗","type":1066},"0066":{"code":"0066","content":"統一編號不存在","type":1066},"0067":{"code":"0067","content":"執行成功","type":1066},"0068":{"code":"0068","content":"執行失敗","type":1066},"0069":{"code":"0069","content":"{0}已被翻譯過，是否要排除？ ","type":1066},"0070":{"code":"0070","content":"是否確定刪除目錄及所有子目錄？","type":1066},"0072":{"code":"0072","content":"翻譯字數大於可使用字數","type":1069},"0071":{"code":"0071","content":"付款失敗，請重新挑選付款方式","type":1066},"0074":{"code":"0074","content":"供應商將取得您的連絡資訊，包括：email…等","type":1066},"0073":{"code":"0073","content":"本日翻譯作業已滿，今日不再提供翻譯","type":1066},"0076":{"code":"0076","content":"是否要儲存為自訂範本","type":1066},"0075":{"code":"0075","content":"提醒您，您即將連結到非台灣經貿網的網站，請小心處理。","type":1066},"0030":{"code":"0030","content":"勾選資料包含非黑名單資料","type":1066},"0031":{"code":"0031","content":"關鍵字-{0}不可使用","type":1066},"0032":{"code":"0032","content":"輸入的型錄名稱:{0}，因營運政策，需待審核人員通過後才可上架","type":1066}};
	this.messageMap = function(){
		return $.extend({}, defaultMessageMap, TTMessage.options.messageMap);
	}();

	/**
	 * 根據message code 秀出訊息彈跳視窗
	 * 第三個參數則取代訊息定義的字
	 *  ex:TTMessage.showMessageCode("0051", "", "123123")
	 * @param code 訊息代碼
	 * @param extendContent append在 message後面的字
	 * 
	 * */
	this.showMessageCode = function(code, extendContent){
		var args = Array.prototype.slice.call(arguments, 2);
		extendContent = extendContent ?  extendContent : '';
		var msg = _this.getMessage(code);
		if(args.length > 0){
			msg.content = _this.replcaeContent(msg.content, args);
		}
		if(extendContent != ''){
			msg.content += '-' + extendContent;
		}
		_this.showMessage(msg);
	};
	
	this.showMessage = function(message){
		var codeType = TTMessage.options.codeType[message.type];
		var icon = TTMessage.options.growlIcon[codeType];
		fireGrowl(icon, message.content, codeType);
	}
	
	this.getMessage = function(code){
		code = _this.parseCodeString(code);
		var msg = {}
		if(_this.messageMap[code] === undefined){
			msg = {
					code : '0000',
					content : 'cannot find code=' + code,
					type : '1069'
			}; 
		}else{
			msg = $.extend({}, this.messageMap[code]);
			msg.type = msg.type + '';
		}
		return msg;
	}
	
	this.getContent = function(code){
		//arguments : array, 分別取代 content 中對應的{0}、{1}...等佔位字元。
		var args = Array.prototype.slice.call(arguments, 1); 
		var message = this.getMessage(code);
		return _this.replcaeContent(message.content, args);
	}
	
	this.replcaeContent = function(content, replaces){
		if(replaces.length > 0){
			return content.replace(/{(\d+)}/g, function(match, number) {
				return typeof replaces[number] != 'undefined' ? replaces[number] : match;
			});
		}else{
			return content;
		}
	}
	
	this.showSuccess = function(content){
		fireGrowl(
				TTMessage.options.growlIcon.success,
				content,
				'success'
		);
	};
	
	this.showWarning = function(content){
		fireGrowl(
				TTMessage.options.growlIcon.warning,
				content,
				'warning'
		);
	};
	
	this.showInfo = function(content){
		fireGrowl(
				TTMessage.options.growlIcon.info,
				content,
				'info'
		);
	};
	
	this.showDanger = function(content){
		fireGrowl(
				TTMessage.options.growlIcon.danger,
				content,
				'danger'
		);
	};
	
	this.parseCodeString = function(code){
		code = code ? code : 0;
		
		if(typeof(code) === 'number'){
			code = code + ''
		}
		
		if(code.length < 4){
			var appendCount = 4 - code.length;
			for(var i=0; i<appendCount; i++){
				code = '0' + code;
			}
		}
		
		return code;
	};
	
	var fireGrowl = function(icon, message, type){
		$.growl({
			icon : icon,
			message : message
		}, {
			type : type,
			placement : {
				from : "top",
				align : "center"
			},
			offset : {
				x : "20",
				y : "100"
			},
			delay : 4000,
			z_index : 5000,
			mouse_over : 'pause'
		});
	};
}

//static method to delegate to obj method
TTMessage.showMessageCode = function(code){
	new TTMessage().showMessageCode.apply(this, arguments);
}

TTMessage.showMessage = function(message){
	if('message' in message){ //MessageWrapper
		
		var additionalMsgs = message.additionalMsgs;
		var additionalMsgStr = '';
		if(additionalMsgs != null && additionalMsgs != ''){
			$.each(additionalMsgs, function( key, value ){
				additionalMsgStr += '<br>'+ value; /* line break */
			});
		}
		message.message.content += additionalMsgStr;
		new TTMessage().showMessage(message.message);
		
	}else{	//common message		
		new TTMessage().showMessage(message);
	}
}

TTMessage.options = {
		messageMap	: {},
		codeType : {
			'1066'	: 'success',
			'1067'	: 'warning',
			'1068'	: 'info',
			'1069'	: 'danger'
		},
		growlIcon : {
			success	: 'fa fa-check fa-2x',
			warning : 'fa fa-warning fa-2x',
			info	: 'fa fa-info fa-2x',
			danger	: 'fa fa-exclamation-circle fa-2x'
		}
};