function AjaxObject(){
  var request = null;
  try{
    request = new ActiveXObject("Msxml2.XMLHTTP");
  }catch (e){
    try{
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }catch (oc){
      request = null;
    }
  }
  if (!request && typeof XMLHttpRequest != "undefined"){
    try{
      request =  new XMLHttpRequest();
    }catch (fa){
      alert("抱歉，您的浏览器不支持这个功能，请选择IE 6.0或FireFox浏览器。");
      request = null;
    }
  }
  return request;
}

function showUserIcon(){
	
	

	var http_request = new AjaxObject();
	
	var url = 'http://techbbs.zol.com.cn/tips/ajax_get_user_icon.php?u='+UTCTimeDemo();
    var obj = document.getElementById("item_str");
    if(!obj.style.display){
        obj.style.display='none';
    }else{
        http_request.onreadystatechange = function (){
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    obj.style.display='';
                    document.getElementById("user_item_str").innerHTML=http_request.responseText;
                } else {
                    alert("您所请求的页面有异常。");
                }
            }
        }
        
		http_request.open("GET",url,true);
		http_request.send(null);
    }
}

function UTCTimeDemo(){
	var now = new Date().getTime();
	var datestr=escape(now*1000+Math.round(Math.random()*1000));
	return datestr;
}

function addDefaultIcon(itemid){
    var text = "[IMG]http://icon.zol.com.cn/bbs/detail/face/ws"+itemid+".gif[/IMG]";
    AddText(text);
    document.getElementById("item_str").style.display='none';
}

function close_item_str(){
	
	 var obj = document.getElementById("item_str");
	 
    if(!obj.style.display){
	    obj.style.display='none';
	}
}

function clear_user_sign(userid){
	if( !confirm('确定删除？') ){
		return;
	}
	var xmlHttp = AjaxObject();
	
	var contentObj = document.getElementById("show_user_sign");
	var url = 'http://techbbs.zol.com.cn/tips/ajax_get_info.php?userid='+userid+'&action=clear_user_sign&u='+UTCTimeDemo();

	xmlHttp.onreadystatechange=function(){
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
					alert('签名删除成功。');
					contentObj.innerHTML = xmlHttp.responseText;
					location.reload();
			}
		}
		xmlHttp.open("GET",url,true);
		xmlHttp.send(null);	
}

function createDiv(dvid,bgcolor,lft,tp,pos,wdth,hgt,zindex){
	var newdv = document.createElement("div");
	if(dvid!=""){
		newdv.id = dvid;
	}
	if(bgcolor!=""){
		newdv.style.backgroundColor=bgcolor;
	}
	if(lft!=""){
		newdv.style.left = lft;
	}
	if(tp!=""){
		newdv.style.top = tp;
	}
	if(pos!=""){
		newdv.style.position = pos;
	}
	if(wdth!=""){
		newdv.style.width = wdth;
	}
	if(hgt!=""){
		newdv.style.height = hgt;
	}
	if(zindex!=""){
		newdv.style.zIndex = zindex;
	}
	return newdv;
}


//创建弹出层
function create_page_div(width,height,border,bgcolor){
	var body_width = document.documentElement.scrollWidth+'px';
	var body_height = document.documentElement.scrollHeight+40+'px';
	var bg_obj = createDiv("play_bg","#D5D5D5","0px","0px","absolute",body_width, body_height,"999");
	bg_obj.style.opacity = 0.5;
	bg_obj.style.filter='alpha(opacity=50)';
	document.body.appendChild(bg_obj);
	
	dvs = createDiv("av_play",bgcolor,"0px","0px","absolute",width,height,"10000");
	dvs.style.top=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop+100+'px';
	if(border){
		dvs.style.border="1px solid #92B0DD";
	}else{
		dvs.style.border="0px";
	}
	dvs.style.left = document.body.clientWidth/4+80+'px';
	document.body.appendChild(dvs);
	dvs.style.textAlign="center";
	dvs.style.padding="1px";
	return dvs;
}

function user_edit_sign_form(userid) {
	var url = 'http://techbbs.zol.com.cn/tips/iframe_user_edit_sign.php?userid='+userid;

	str = [
		'<div id="user_upload_div">',
		'	<div style="width:400px;">',
		'	  <iframe src="' + url +'" width="400" height="210" scrolling="no" frameborder="0" style="float:left"></iframe>',
		'</div>'
	].join("\n");
	return str;
}

function user_inner_div(userid){
	
	var user_edit_div = create_page_div(400,0,1,'#ffffff');
	user_edit_div.innerHTML = user_edit_sign_form(userid);
}
