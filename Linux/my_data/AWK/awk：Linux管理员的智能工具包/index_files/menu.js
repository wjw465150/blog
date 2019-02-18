/*
	[Discuz!] (C)2001-2007 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$RCSfile: menu.js,v $
	$Revision: 1.27.2.18 $
	$Date: 2007/03/23 23:31:12 $
*/
var userAgent = navigator.userAgent.toLowerCase();
var is_webtv = userAgent.indexOf('webtv') != -1;
var is_kon = userAgent.indexOf('konqueror') != -1;
var is_mac = userAgent.indexOf('mac') != -1;
var is_saf = userAgent.indexOf('applewebkit') != -1 || navigator.vendor == 'Apple Computer, Inc.';
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko' && !is_saf) && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ns = userAgent.indexOf('compatible') == -1 && userAgent.indexOf('mozilla') != -1 && !is_opera && !is_webtv && !is_saf;
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera && !is_saf && !is_webtv) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

var jsmenu = new Array();
jsmenu['active'] = null;
jsmenu['timer'] = null;
jsmenu['iframe'] = null;


function initMenu(ctrlid, menuid, timeout) {
	var ctrlobj = $e(ctrlid);
	var menuobj = $e(menuid);
	
	if(ctrlobj && !ctrlobj.initialized) {
		ctrlobj.initialized = true;
		ctrlobj.unselectable = true;

		ctrlobj.outfunc = typeof ctrlobj.onmouseout == 'function' ? ctrlobj.onmouseout : null;
		ctrlobj.onmouseout = function() {
			if(this.outfunc) this.outfunc();
			jsmenu['timer'] = setTimeout('hideMenu("' + menuid + '")', timeout);
		}

		ctrlobj.overfunc = typeof ctrlobj.onmouseover == 'function' ? ctrlobj.onmouseover : null;
		ctrlobj.onmouseover = function(e) {
			doane(e);
			if(this.overfunc) this.overfunc();
			if(jsmenu['timer']) clearTimeout(jsmenu['timer']);
		}
	}
	
	if(menuobj && !menuobj.initialized) {
		menuobj.initialized = true;
		menuobj.onclick = ebygum;
		menuobj.style.position = 'absolute';
		menuobj.onmouseover = function() {
			clearTimeout(jsmenu['timer']);
		}
		menuobj.onmouseout = function() {
			jsmenu['timer'] = setTimeout('hideMenu("' + menuid + '")', timeout);
		}
		menuobj.style.zIndex = 50;
		if(is_ie && !is_mac) {
			//menuobj.style.filter += "progid:DXImageTransform.Microsoft.shadow(direction=135,color=#CCCCCC,strength=2)";
		}
	}
}

function showMenu(ctrlid, menuid, offset, className){
    if(!!(window.attachEvent && !window.opera)){
        //修正IE里的bug，必须页面装载完成后才能创建iframe
        if(!document.getElementById('footer')) return;
    }
	var ctrlobj = $e(ctrlid);
	if(!ctrlobj) return;
	if(!offset) offset = 0;
	var timeout = 500;
	var showobj = $e(ctrlid);
	var menuobj = $e('menu_div');
	if(!showobj||(!menuobj&&!menuid)) return;
	
	//if(ORAY_ONLOAD) return;
	
	if(!menuobj){
		menuobj = document.createElement('div');
		document.body.appendChild(menuobj);
		menuobj.id = 'menu_div';
		
	}
	if($e(menuid)){
		menuobj.innerHTML = $e(menuid).innerHTML;
	}
	
	hideMenu(menuobj.id);

	initMenu(ctrlid, menuobj.id, timeout);
	
	menuobj.style.width = 'auto';
	menuobj.style.height = 'auto';
	menuobj.style.display = '';
	menuobj.className = className ? className :'pop-menu opacity';
	
	if(!is_opera) {
		menuobj.style.clip = 'rect(auto, auto, auto, auto)';
	}

	//var showobj_pos = fetchOffset(showobj);
	var showobj_pos = jQuery("#"+ctrlid).offset();
	var showobj_x = showobj_pos['left'];
	var showobj_y = showobj_pos['top'];
	
	var showobj_x = showobj_pos['left'];
	var showobj_y = showobj_pos['top'];
	var showobj_w = showobj.offsetWidth;
	var showobj_h = showobj.offsetHeight;
	var menuobj_w = menuobj.offsetWidth;
	var menuobj_h = menuobj.offsetHeight;

	menuobj.style.left = (showobj_x + menuobj_w > document.body.clientWidth) && (showobj_x + showobj_w - menuobj_w >= 0) ? showobj_x + showobj_w - menuobj_w + 'px' : showobj_x + 'px';
	menuobj.style.top = offset == 1 ? showobj_y + 'px' : (offset == 2 || ((showobj_y + showobj_h + menuobj_h > document.body.scrollTop + document.body.clientHeight) && (showobj_y - menuobj_h >= 0)) ? (showobj_y - menuobj_h) + 'px' : showobj_y + showobj_h + 'px');

	if(menuobj.style.clip && !is_opera) {
		menuobj.style.clip = 'rect(auto, auto, auto, auto)';
	}

	if(is_ie && is_ie < 7) {
		if(!jsmenu['iframe']) {
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.style.position = 'absolute';
			iframe.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
			$e('jsmenu_parent') ? $e('jsmenu_parent').appendChild(iframe) : menuobj.parentNode.appendChild(iframe);
			jsmenu['iframe'] = iframe;
		}
		jsmenu['iframe'].style.top = menuobj.style.top;
		jsmenu['iframe'].style.left = menuobj.style.left;
		jsmenu['iframe'].style.width = menuobj_w;
		jsmenu['iframe'].style.height = menuobj_h;
		jsmenu['iframe'].style.display = 'block';
	}
}

function hideMenu(menuid) {
	if(jsmenu['timer']){
		clearTimeout(jsmenu['timer']);
	}
	if($e(menuid)){
		$e(menuid).style.display = 'none';
		if(is_ie && is_ie < 7 && jsmenu['iframe']) {
			jsmenu['iframe'].style.display = 'none';
		}
	}
}

function fetchOffset(obj) {
	var left_offset = obj.offsetLeft;
	var top_offset = obj.offsetTop;
	while((obj = obj.offsetParent) != null) {
		left_offset += obj.offsetLeft;
		top_offset += obj.offsetTop;
	}
	return { 'left' : left_offset, 'top' : top_offset };
}

function ebygum(eventobj) {
	if(!eventobj || is_ie) {
		window.event.cancelBubble = true;
		return window.event;
	} else {
		if(eventobj.target.type == 'submit') {
			eventobj.target.form.submit();
		}
		eventobj.stopPropagation();
		return eventobj;
	}
}

function doane(event) {
	e = event ? event : window.event ;
	if(is_ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	} else {
		e.stopPropagation();
		e.preventDefault();
	}
}

function $e(e){
    if (typeof e == 'string')
      e = document.getElementById(e);
	return e;
}