if((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4 ) && (navigator.platform == "Win32") && (navigator.userAgent.indexOf(" Opera ") == -1) && (navigator.userAgent.indexOf("Opera/") == -1)){
	if ((navigator.appVersion.indexOf('MSIE 6')) != -1 || (navigator.appVersion.indexOf('MSIE 7')) != -1){
	document.write('<link rel="stylesheet" media="screen" href="ie2_screen.css" type="text/css"/>');
	}
	else{
	document.write('<link rel="stylesheet" media="screen" href="ie1_screen.css" type="text/css"/>');
	}
}

// Surfaid dummy function for preloading
if(typeof(sa_onclick) == 'undefined')
{
	sa_onclick = function(p1, p2)
	{
		ibmCommon.queue.push(
			function() { return typeof(sa_ver) != 'undefined'; },
			function() { sa_onclick(p1, p2); }
		);
	};
}

