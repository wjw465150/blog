function setCookie (name, value) {
  	var date = new Date();
  	date.setTime(date.getTime() + 24*60*60*1024);
  	var cookie = name + "=" + escape(value) + "; expires=" + date.toGMTString();
  	document.cookie = cookie;
}

function getCookie(sName){
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++){
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
		return unescape(aCrumb[1]);
	}
	return "";
}
