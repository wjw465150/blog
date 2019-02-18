//js change frame
if(top.location == self.location ){
	var current_url = document.URL;
    var referrer_url = document.referrer;
	frame_url += '&ref0=' + document.referrer;
	if(-1 == referrer_url.indexOf('zol') && referrer_url){
		eval('document.loca' + 'tion.href =' +'frame_url ;');
	}
}
top.document.title = document.title;

//cookie functions
function readCookie(name){
  var cookieValue = '';
  var search = name + '=';
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(';', offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}

function writeCookie(name, value, hours){
	
  var expire = '';
  if(hours != null){
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = '; expires=' + expire.toGMTString();
  }
  document.cookie = name + '=' + escape(value) + expire;
}

function show_more_manu(){
    var obj=document.getElementById('more_manu');
    obj.style.display=(obj.style.display == 'none')?'':'none';
}

function cksform(){
    if(0==document.search_form.kword.value.length){
        alert('请填写搜索关键字');
        document.search_form.kword.focus();
		return false;
    }else if(document.search_form.ws[1].selected){
        document.search_form.action="/search_pro.php";
    }else{
		return true;
	}
}
function ctlent(eventobject){
    if(event.ctrlKey && window.event.keyCode==13){
	if(onok()){
            document.form1.submit();   
        }
    }
}

function onok(){
    if(0 == document.form1.title.value.length){
        alert('标题不能为空');
        document.form1.title.focus();
	return false;
    }else if(document.form1.title.value.length <= 4){
        alert('标题不可少于5个字');
        document.form1.title.focus();
	return false;
    }else if(0 == document.form1.content.value.length){
        alert('内容不能为空');
        document.form1.content.focus();
	return false;
    }
    document.form1.up_date.value="正在提交..";
    document.form1.up_date.disabled=true;
    return true;
}

function showtab(m,n,count){
	var strPic1 = "url(http://icon.zol.com.cn/group/images0522/frm/22.jpg)";
	var strPic2 = "url()";
	var class1  = "lan12";
	var class2  = "a_bai12";
	for(var i=1;i<=count;i++){
		if(i==n){
			getObject('div_'+m+'_'+i).style.background = strPic1;
			getObject('tab_'+m+'_'+i).style.display = ''; 
			getObject('div_'+m+'_'+i).className = class1;
		}else{
			getObject('div_'+m+'_'+i).style.background = strPic2;
			getObject('tab_'+m+'_'+i).style.display = 'none'; 
			getObject('div_'+m+'_'+i).className = class2;
		}
	}
}
function getObject(objectId) {
	if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
		return document.getElementById(objectId);
	} else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
		return document.all(objectId);
	} else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
		return document.layers[objectId];
	} else {
		return false;
	}
} // getObject

function show_double_div(m,n,count){
    for(var i=1;i<=count;i++){
		if(i==n){
			getObject('tab_'+m+'_'+i).style.display = ''; 
		}else{
			getObject('tab_'+m+'_'+i).style.display = 'none'; 
		}
	}
}

function showindextab(m,n,count){
	var class1  = "menu_normal";
	var class2  = "menu_active";
	for(var i=1;i<=count;i++){
		if(i==n){
			getObject('tab_'+m+'_'+i).style.display = ''; 
			getObject('div_'+m+'_'+i).className = class1;
		}else{
			getObject('tab_'+m+'_'+i).style.display = 'none'; 
			getObject('div_'+m+'_'+i).className = class2;
		}
	}
}

function ctlent_onlogin2(eventobject){
    if(event.ctrlKey && window.event.keyCode==13){
	    onlogin();
    }
}
function ctlent_onlogin(){
	if(window.event.keyCode==13){
		onlogin();
	}
}

function onlogin(){
	if(0==document.getElementById("userid").value.length){
		alert("请填写登录用户名");
		document.getElementById("userid").focus();
		return;
	}else if(0==document.getElementById("pwd").value.length){
		alert("请填写登录密码");
		document.getElementById("pwd").focus();
		return;
	}else{
		document.loginform.submit();
	}
}

function ckform(obj){
    if(0==obj.kword.value.length){
        alert('请填写搜索关键词，多个关键词用空格分开');
        obj.kword.focus();
        return false;
    }

    return true;
}

function setPointer(theRow, thePointerColor){
    if (thePointerColor == '' || typeof(theRow.style) == 'undefined') {
        return false;
    }
    if (typeof(document.getElementsByTagName) != 'undefined') {
        var theCells = theRow.getElementsByTagName('td');
    }
    else if (typeof(theRow.cells) != 'undefined') {
        var theCells = theRow.cells;
    }
    else {
        return false;
    }

    var rowCellsCnt  = theCells.length;
    for (var c = 0; c < rowCellsCnt; c++) {
        theCells[c].style.backgroundColor = thePointerColor;
    }

    return true;
} // end of the 'setPointer()' function

function getOs() 
{ 
   if(navigator.userAgent.indexOf("MSIE")>0)return 1; 
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0)return 2; 
   if(isSafari=navigator.userAgent.indexOf("Safari")>0)return 3;    
   if(isCamino=navigator.userAgent.indexOf("Camino")>0)return 4; 
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0)return 5; 
   return 0; 
}//getOs

function show_hidden(name,tag){
    tag=(tag)?'':'none';
    try{
       document.getElementById(name).style.display=tag;
    }catch(e){
    
    }
}
function show_hidden_div(name){
    var tag = document.getElementById(name).style.display;
    tag=('none'==tag)?'':'none';
    try{
       document.getElementById(name).style.display=tag;
    }catch(e){
    
    }
}
function addrow(tableToSort,maxpolloptions){
    num++;
    if (num <= maxpolloptions || 0==maxpolloptions)
    {
        var tr_bg='#FFFFFF';
        
        newRow    = document.getElementById(tableToSort).insertRow(-1);
        var currow= document.getElementById(tableToSort).rows.length-1;
        firstcell = newRow.insertCell(-1);
        firstcell.bgColor=tr_bg;
        firstcell.style.width='15%';
        firstcell.style.textAlign='left';
        firstcell.style.border='0px';
        firstcell.innerHTML='选项'+num+'&nbsp;&nbsp;<INPUT TYPE="text" id="vote_option_'+num+'" NAME="option[]" size=40 onfocus=" addrow(\'ProjectTab\',maxpolloptions);">';
    }
}

function copyToClipboard(txt) 
{ 
    if(window.clipboardData)  
    { 
        window.clipboardData.clearData(); 
        window.clipboardData.setData("Text", txt); 
    } 
    else if(navigator.userAgent.indexOf("Opera") != -1)  
    { 
        window.location = txt; 
    }  
    else if (window.netscape)  
    { 
        try  
        { 
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
        }  
        catch (e)  
        { 
            alert("您的firefox安全限制限制您进行剪贴板操作，请在地址栏中输入“about:config”将“signed.applets.codebase_principal_support”设置为“true”之后重试"); 
            return false; 
        } 
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard); 
        if (!clip) 
          return; 
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); 
        if (!trans) 
          return; 
        trans.addDataFlavor('text/unicode'); 
        var str = new Object(); 
        var len = new Object(); 
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString); 
        var copytext = txt; 
        str.data = copytext; 
        trans.setTransferData("text/unicode",str,copytext.length*2); 
        var clipid = Components.interfaces.nsIClipboard; 
        if (!clip) 
          return false; 
        clip.setData(trans,null,clipid.kGlobalClipboard); 
    } 
}  
var zol_content_grouptext = '';
//改变帖子标题颜色
var color_num = 0;

function change_color(){

	var is_not = window.confirm('使用标题颜色，将扣除1个z币');
	if(is_not == true){

			//获取颜色值
			var c_color  = document.getElementById('color').value;
			var add_text = document.getElementById('title');

			switch (c_color){
				
				case '0':
					add_text.style.color = '#000000';
					color_num = 0;
					break;
				case '1':
					add_text.style.color = '#FF0000';
					color_num = 1;
					break;
				case '2':
					add_text.style.color = '#FF9900';
					color_num = 2;
					break;
				case '3':
					add_text.style.color = '#FFFF00';
					color_num = 3;
					break;	
				case '4':
					add_text.style.color = '#009900';
					color_num = 4;
					break;
				case '5':
					add_text.style.color = '#0000FF';
					color_num = 5;
					break;
				case '6':
					add_text.style.color = '#990066';
					color_num = 6;
					break;
				default:
					return;																			
			}
		}else{
		document.getElementById('op'+color_num).selected = true;
		return false;
	}
	
}

function insertSmiley(smilieid) {
	var src  = $('smilie_' + smilieid).src;
    var text = '<img src=' + src +' border=0 />';
    KindInsertImg(text);
}

function delete_content(param,level){
    var http_request = create_obj();
    http_request.onreadystatechange = function (){
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                alert(http_request.responseText);
                document.getElementById("postmessage_"+level).innerHTML=http_request.responseText;
            } else {
                alert("您所请求的页面有异常。");
            }
        }
    }
    send_request(http_request,"/tips/del_content.ajax.php",param);
}

//改变帖子标题颜色
var color_num = 0;

function change_color(){

	var is_not = window.confirm('使用标题颜色，将扣除1个z币');
	if(is_not == true){

			//获取颜色值
			var c_color  = document.getElementById('color').value;
			var add_text = document.getElementById('title');

			switch (c_color){
				
				case '0':
					add_text.style.color = '#000000';
					color_num = 0;
					break;
				case '1':
					add_text.style.color = '#FF0000';
					color_num = 1;
					break;
				case '2':
					add_text.style.color = '#FF9900';
					color_num = 2;
					break;
				case '3':
					add_text.style.color = '#FFFF00';
					color_num = 3;
					break;	
				case '4':
					add_text.style.color = '#009900';
					color_num = 4;
					break;
				case '5':
					add_text.style.color = '#0000FF';
					color_num = 5;
					break;
				case '6':
					add_text.style.color = '#990066';
					color_num = 6;
					break;
				default:
					return;																			
			}
		}else{
		document.getElementById('op'+color_num).selected = true;
		return false;
	}
	
}

//活动帖弹出窗口


function confirm_active_in(){
	if( confirm("确认要参加此活动吗？") ){
		//cookie判断，看是否已登录
		if( readCookie('zol_userid') ){
			check_active_info();
		}else{
			//提示登录
			show_login();
		}
	}
}
function check_active_info(){
	var url="http://techbbs.zol.com.cn/tips/active_check_info.ajax.php?xx="+Math.random();
	vote_http_request.open("GET", url, true);//这里的true代表是异步请求
	vote_http_request.onreadystatechange = active_callback;
	vote_http_request.send(null);
}

function active_callback(){
	
   if (vote_http_request.readyState == 4) {
     if (vote_http_request.status == 200) { 	
		var response 	= vote_http_request.responseText;
		if( response!=0 ){
			actived();
		}else{
			show_info();
		}
     }
   }
}
//显示登录窗口
function show_login(){
	var login_box	= new sBox(1,"http://techbbs.zol.com.cn/tips/active_login.php");
	login_box.set_title	= 0;
	login_box.s_width	= 250;
	login_box.s_height	= 300;
	login_box.init();
}
//显示修改用户信息窗口
function show_info(){
	var login_box	= new sBox(1,"http://techbbs.zol.com.cn/tips/active_info.php");
	login_box.set_title	= 0;
	login_box.s_width	= 430;
	login_box.s_height	= 370;
	login_box.init();
}

function actived(){

	var activeid	= document.getElementById('activeid').value;
	var login_box	= new sBox(1,"http://techbbs.zol.com.cn/tips/active_act.php?activeid="+activeid+"&r="+Math.random());
	login_box.set_title	= 0;
	login_box.s_top		= 250;
	login_box.s_width	= 300;
	login_box.s_height	= 130;
//	login_box.s_content	= msg_str;
	login_box.init();
	
}
//窗口从登录框切换到修改用户信息框
function change_box(){
	cancel_box();
	check_active_info();
}
function change_box2(){
	cancel_box();
	actived();
}
function cancel_box(){
	_get('body_span').parentNode.removeChild(_get('body_span'));
}

function del_act_book(refid){
	if( confirm('你确定要删除这个链接吗？') ){
		window.location.href="add_active_url.php_act=del&refid="+refid+"&r="+Math.random();
	}else{
		return false;
	}
}

function create_excel(activeid){
	window.location.href="create_active_excel.php_activeid="+activeid+"&r="+Math.random();
}
/**
 * 收藏帖子
 * @param 子类ID subcatid
 * @param 帖子ID bookid
 * @return
 */
function collect_book(subcatid,bookid){
	var url="http://techbbs.zol.com.cn/tips/ajax_collect_book.php?subcatid="+subcatid+"&bookid="+bookid+"&xx="+Math.random();
	vote_http_request.open("GET", url, true);//这里的true代表是异步请求
	vote_http_request.onreadystatechange = collect_book_callback;
	vote_http_request.send(null);
}

function collect_book_callback(){
	
   if (vote_http_request.readyState == 4) {
     if (vote_http_request.status == 200) { 	
		var response 	= vote_http_request.responseText;
		var re_arr		= response.split('|');
		if( re_arr[0]!=0 ){
			alert(re_arr[1]);
		}else{
			alert('帖子收藏成功！');
		}
     }
   }
}

/**
 * 收藏版块
 * @param 子类ID subcatid
 * @param 品牌 manuid
 * @param 系列 lineid
 * @param 产品 productid
 * @param 子子版 subsubid
 * @return
 */
var collect_http_request	= create_obj();
function collect_board(subcatid,manuid,lineid,productid,subsubid){

	var url="http://techbbs.zol.com.cn/tips/ajax_collect_bbs.php?subcatid="+subcatid+"&manuid="+manuid+"&lineid="+lineid+""+"&productid="+productid+"&subsubid="+subsubid+"&xx="+Math.random();
	collect_http_request.open("GET", url, true);//这里的true代表是异步请求
	collect_http_request.onreadystatechange = collect_bbs_callback;
	collect_http_request.send(null);
}

function collect_bbs_callback(){
	
   if (collect_http_request.readyState == 4) {
     if (collect_http_request.status == 200) { 	
		var response 	= collect_http_request.responseText;
		var re_arr		= response.split('|');
		if( re_arr[0]!=0 ){
			alert(re_arr[1]);
		}else{
			alert('恭喜您，收藏成功！');
		}
     }
   }
}
