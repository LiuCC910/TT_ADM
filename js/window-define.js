function windowDefine(){
	
}

windowDefine.openImg = function(url){
	var myWindow = window.open('', '_blank');
	myWindow.document.write('<head><title>' + url + '</title></head><body><div style="text-align:center;"><img src="' + url + '"></div></body>');
}
