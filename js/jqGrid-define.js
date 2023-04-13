/**
 * object utils of jquery.jqgrid
 * depend on jquery 
 * depend on jquery.jqgird
 * update 2015-8-17
 */
function jqGridDefine (myGrid) {
		this.myGrid = myGrid;
		
		this.getSelectedRowData = function (){
			var selRowId = this.getSelectedRowId();
			return this.getRowData(selRowId);	
		};
		
		this.getSelectedRowDatas = function (){
			var selRowIds = this.getSelectedRowIds();
			var that = this;
			return $(selRowIds).map(function(index, value){
				return that.getRowData(value);
			});	
		};
		
		this.getSelectedRowId = function(){
			return this.getGridParam('selrow');
		};
		
		this.getSelectedRowIds = function(){
			return this.getGridParam('selarrrow');
		};
		
		this.getRowData = function(rowId){
			return myGrid.jqGrid('getRowData', rowId);
		};
		
		this.getOriginalRowData = function(rowId){
			return this.myGrid.find('tr#'+rowId+'[role=row]').data('jqgrid.original.rowdata');
		};
		
		this.query = function(postData){
			this.myGrid.setGridParam('postData', postData);
			this.reload();
		};
		
		this.setGridParam = function(name, value){
			var params = {};
			params[name] = value;
			this.setGridParams(params);
		};
		
		this.setGridParams = function(params){
			this.myGrid.jqGrid('setGridParam', params);
		};
		
		this.setPostParam = function(name, value){
			var params = {};
			params[name] = value;
			this.setPostParams(params);
		};
		
		this.setPostParams = function(params, isClear){
			isClear = isClear ? isClear : false;
			if(isClear){
				this.myGrid.jqGrid('setGridParam', {
					postData : null
				});
			}
			
			var postData = this.getPostData();
			postData = $.extend({}, postData, params);
			this.myGrid.jqGrid('setGridParam', {
				postData : postData
			});
		};
		
		this.getPostData = function(){
			return this.getGridParam("postData");
		};
		
		this.getGridParam = function(name){
			return this.myGrid.jqGrid("getGridParam", name);
		};
		
		/**
		 * @param pabeable {page:'1', rows:'10', sidx : '', sord : ''} 
		 */
		this.reload = function(pageable){
			if(pageable){
				this.myGrid.trigger("reloadGrid", [pageable]);
			}else{
				this.myGrid.trigger("reloadGrid");				
			}
		};
		
		this.hide = function(){
			this.setGridParams({datatype:'local'}); //set local to disable fetch query when initialing
			this.myGrid.setGridState('hidden');
			this.myGrid.parents('.ui-jqgrid:first').hide();
			this.clear();
		};
		
		this.show = function(reload){
			this.setGridParams({datatype:'json'});
			this.myGrid.setGridState('visible');
			this.myGrid.parents('.ui-jqgrid:first').show();
			if(reload){
				this.reload();
			}
		};
		
		this.clear = function(clearfooter){
			this.myGrid.jqGrid('clearGridData');
		};
		
};

jqGridDefine.options = {
	afterInsertRow : function(rowId, rowData, currentObj){
		$('tr#'+rowId).data('jqgrid.original.rowdata',currentObj);
		rowData.original = currentObj;
	},
	onPagingUserMaxPage: function (pgButton) {
		if (pgButton === "user"){	//user input
            var lastPage = $(this).getGridParam("lastpage"); //get last page
            var newPage = $(this.p.pager).find('.ui-pg-input').val(); // get new page
			
            if (newPage > lastPage)
				newPage = lastPage;
			
            $(this).setGridParam({ page: newPage }).trigger("reloadGrid");
		}
	}
}
