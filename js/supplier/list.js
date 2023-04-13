var gridtable;
var form;
var selectedRowID;

var simLoginQueryCount = 0;

$(function() {
	$("#language-tab").hide();
	gridtable = $("#gridtable");
	form = $("#form");
	dateRangePicker($("#createStartTime"), $("#createEndTime"));
	
	
	$("#deleteAlready").hide();
	$('#create').click(function() {
		$('#gridActionForm').attr('action', 'supplieraddShow');
		$('#gridActionForm').submit();
	});
});

function initGirdTable(uuid,selectDiv,formName) {
	/*Post search data*/
	$("#gridtable")
			.jqGrid({
				url : 'supplierquery',
				postData : {
					"companySupplierQuery.companyName":$("#companyName").val(),
					"companySupplierQuery.seq":$("#seq").val(),
					"companySupplierQuery.removed" : $("input[name='companySupplierQuery.removed']:checked").val(),
					"companySupplierQuery.closed" : $("input[name='companySupplierQuery.closed']:checked").val(),
					"companySupplierQuery.contactName":$("#contactName").val(),
					"companySupplierQuery.companyType":$("#companyType").val(),
					"companySupplierQuery.verifyStatus":$("#verifyStatus").val(),
					"companySupplierQuery.actived":$("#actived").val(),
					"companySupplierQuery.companyRight":$("#companyRight").val(),
					"companySupplierQuery.languageId" : $("#languageId").val(),
					"companySupplierQuery.createStartTime" : $("#createStartTime").val(),
					"companySupplierQuery.createEndTime" : $("#createEndTime").val(),
					"gridQuery" : true,
					"gridToken" : uuid,
					"selectDiv" : selectDiv,
					"formName" : formName
				},
				jsonReader : {
					repeatitems : false,
//					row : 'pageResult.rows',
					root : 'pageResult.rows',
					id : 'cid',
					page: "pageResult.currpage",
					records: "pageResult.totalrecords",
				    total: "pageResult.totalpages"
				},
				datatype : "json",
				colNames : [ 'Actions', '統一編號', '公司名稱', 'cid', 'actived', '聯絡人姓名', '公司型態',
						'會員權益', '審核狀態', '啟用狀態','是否停用','是否刪除','建立時間' ],
				colModel : [ {
					name : 'action',
					width: 240,
					sortable : false,
					align : 'center',
					width:300
				}, {
					name : 'wrapperSeq',
					index : 'wrapperSeq',
					align : 'center'
				}, {
					name : 'companyName',
					index : 'companyName',
					align : 'center'
				}, {
					name : 'cid',
					index : 'cid',
					hidden : true
				}, {
					name : 'actived',
					index : 'actived',
					hidden : true
				}, {
					name : 'contactName',
					index : 'contactName',
					align : 'center'
				}, {
					name : 'companyType',
					index : 'companyType',
					align : 'center'
				}, {
					name : 'companyRight',
					index : 'companyRight',
					align : 'center'
				}, {
					name : 'verifyStatusName',
					index : 'verifyStatusName',
					align : 'center'
				}, {
					name : 'activedStatus',
					index : 'activedStatus',
					align : 'center',
					sortable : false,
					jsonmap : function(obj) {
						if (obj.actived == true) {
							return '啟用';
						} else {
							return '未啟用';
						}
					}
				}, {
					name : 'closed',
					index : 'closed',
					align : 'center',
					jsonmap : function(obj) {
						if (obj.closed == true) {
							return '是';
						} else {
							return '否';
						}
					}
				}, {
					name : 'removed',
					index : 'removed',
					align : 'center',
					jsonmap : function(obj) {
						if (obj.removed == true) {
							return '是';
						} else {
							return '否';
						}
					}
				}, {
					name : 'createTime',
					index : 'createTime',
					align : 'center',
					formatter : 'date',
					formatoptions : {
						srcformat : 'ISO8601Long',
						newformat : 'Y-m-d'
					}
				}],
				autowidth : true,
				caption : "供應商列表",
				multiselect : true,
				height : '100%',
				pager : '#gridpager',
				emptyrecords : "查無資料",
				viewrecords : true,
				
				rowList : [ 10, 20, 30 ],
				onSelectRow : function(id) {
					var ch = jQuery(this).find(
							'#' + id + ' input[type=checkbox]').prop('checked');
					if (ch) {
						selectedRowID.push(id);
					} else {
						selectedRowID = $.grep(selectedRowID,
								function(a) {
									return a != id;
								});
					}
					$('#cid').val(id);
				},onSelectAll:function(id,status){
					selectedRowID = [];
			         for(i=0;i<id.length;i++){
							var ch = jQuery(this).find(
									'#' + id[i] + ' input[type=checkbox]').prop('checked');
							if (ch) {
								selectedRowID.push(id[i]);
							} else {
								selectedRowID = $.grep(selectedRowID,
										function(a) {
											return a != id[i];
										});
							}
			         }},
				gridComplete : function() {
					selectedRowID = []; //清空select rows after reload
					var ids = $("#gridtable").jqGrid('getDataIDs');
					for (var i = 0; i < ids.length; i++) {

						var rowId = ids[i];
						var row = $('#gridtable').jqGrid('getRowData', rowId);
						
						if(row.actived == 'false'){
							//alert(row.actived);
							// 不可勾選
							$("#jqg_gridtable_"+rowId).remove();
						}
						
						var imitateBtn = createCustomButton(row.cid, function(id, url){
							showSimLoginModal(id,true);
						},'supplierlist.I' ,'btn btn-success');
						var verifyBtn = createCustomButton(row.cid, function(id, url){
							$('#batachVerifyForm').append(
									'<input type="hidden" name="multiCompanySupplier.cid" value="' + id + '" />');
							showBatchVerifyModal(true);
						},'supplierlist.V' ,'btn btn-info');
						var editBtn = createUpdateButton(row.cid, function(id, url){
							$('#cid').val(id);
							$('#langId').val($('#languageId').val());
							$('#gridActionForm').attr('action', url);
							$('#gridActionForm').submit();
						},'supplierlist.U');
						// 購物車
						var addOrderBtn = createCustomButton(row.cid, function(id, url){
							$('#cid').val(id);
							$('#gridActionForm').attr('action', 'financePurchaseOrderaddShow');
							$('#gridActionForm').submit();
						},'supplierlist.AO' ,'btn btn-success');
						// 訂單紀錄
						var orderRecoredBtn = createCustomButton(row.cid, function(id, url){
							$.fancybox({
						        type: 'iframe',
						        href: 'financePurchaseOrderorderHistory?form.companyId='+row.cid,
						        maxWidth  : 1000,
						        maxHeight : 900,
						        fitToView : false,
						        width   : '80%',
						        height    : '100%',
						        autoSize  : false,
						        closeClick  : false,
						        openEffect  : 'none',
						        closeEffect : 'none'
						    });	
						},'supplierlist.OR' ,'btn btn-success');
						$("#gridtable").jqGrid(
								'setRowData',
								ids[i],
								{
									action : '<div class="btn-group">' + editBtn
									+ imitateBtn + '</div>' +
									'<div class="btn-group">'+addOrderBtn+'&nbsp;'+orderRecoredBtn+'</div>'
						});
					}
					$("#gridToken").val(uuid);
					$("#deleteAlready").show();
					$("#language-tab").show();
				}
			});
}

function showSimLoginModal(cid,show){
	if(show) {		
		simLoginQueryCount++;
		if(simLoginQueryCount == 1){
			initSimLogin(cid);
		}
		else{
			var gridtable = $("#simLogin");
			gridtable.setGridParam({ postData: {		
				"multiCompanySupplier.cid" : cid,				
			} });
			gridtable.trigger('reloadGrid');
		}
		
		$('#simLoginDiv').modal('show');					
	} else {
		$('#simLoginDiv').modal('hide');
		$("#gridtable").jqGrid('resetSelection');
	}
}

function initSimLogin(cid){
	var gridtable = $("#simLogin");	
	gridtable
			.jqGrid({
				url : 'suppliersimLoginList',	
				postData : {
					"multiCompanySupplier.cid" : cid,					
				},
				
				page: $('#simLoginCurrPage').val(),
				rowNum: $('#simLoginPageSize').val(),

				prmNames : {  
				    page: 'simLoginCurrPage',
				    rows: 'simLoginPageSize'
				},
				
				jsonReader : {
					repeatitems : false,
					row : 'rows',
					id : 'usid',
					page: "currpage",
					records: "totalrecords",
				    total: "totalpages"
				},
				datatype : "json",
				colNames : [ 'Actions', 'usid', 'statudCode', '會員帳號', '會員姓名', '會員狀態' ],
				colModel : [
						{
							name : 'action',
							sortable : false,
							align : 'center'
						},
						{
							name : 'usid',
							index : 'usid',
							hidden : true
						},
						{
							name : 'statusCode',
							index : 'statusCode',
							hidden : true
						},
						{
							name : 'email',
							index : 'email',
							sortable : false,
							align : 'center'
						},
						{
							name : 'userName',
							index : 'userName',
							sortable : false,
							align : 'center'
						},
						{
							name : 'statusName',
							index : 'statusName',
							sortable : false,
							align : 'center'
						}
						 ],
				autowidth : true,
				caption : "模擬前台",
				multiselect : false,
				height : '100%',
				pager : '#simLoginpager',
				emptyrecords : "查無資料",
				loadonce : false,
				
				rownumbers: true,
				rowList : [ 10, 20, 30 ],
				viewrecords : true,				
				onSelectAll : function(id, status) {
					
				},				
				gridComplete : function() {
					var ids = $("#simLogin").jqGrid('getDataIDs');
					for (var i = 0; i < ids.length; i++) {
						var rowId = ids[i];
						var row = $('#simLogin').jqGrid('getRowData', rowId);
						var suBtn = createCustomButton(rowId, function(id, url){
							$.ajax({
								type: "POST",
								url: url,
								data: { "companyUser.usid" : id },
								async: true,
								dataType: "text",
								success: function( data ) {
									data=data.replace(/"/g,'');
								    data=data.replace(/\\/g,'');
								    window.open(data);
								}
							}); 
						}, 'companyuserlist.frontSU', 'btn btn-primary');	
						
						//使用中的才顯示模擬前台按鈕
						//var displayStyle = row.status == "使用中" ? "" : "style='display:none;'"
						
						if( row.statusCode == '1051' ){
							$("#simLogin").jqGrid(
									'setRowData',
									ids[i],
									{
										action : '<div class="btn-group">'
												+ suBtn + '</div>'
							});
						}

					}
					
				}
			});
}

function restart(type) {
	$("#queryDiv :input").attr("disabled", false);
	$("#gridtable").jqGrid('GridUnload');
	if (type == 'clean') {
		$('#formForFind').trigger("reset");
		$("#deleteAlready").hide();
		$("#language-tab").hide()
		$("#languageId").val(41);
		if (typeof(restartLangcode) == "function"){
			restartLangcode();
		}
	}
}

function showBatchVerifyModal(show) {
	if(show) {
		$('#batchVerifyDiv').modal('show');
	} else {
		$('#batchVerifyDiv').modal('hide');
	}
	
}
function batchVerify() {
	if (selectedRowID.length != 0) {
		$.each(selectedRowID, function(index, value) {
			$('#batachVerifyForm').append(
					'<input type="hidden" name="multiCompanySuppliers[' + index
							+ '].cid" value="' + value + '" />');
		});
		$('input[name="verifyDataVo\\.languageId"]').val($("#languageId").val());
		$("#batachVerifyForm").submit();
	} else {
		showMessage("fa fa-exclamation-circle fa-2x", "未選取認證!!", "danger");
	}
}