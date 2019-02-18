function InitAjax()
{
  var ajax=false; 
  try { 
    ajax = new ActiveXObject("Msxml2.XMLHTTP.3.0"); 
  } catch (e) { 
    try { 
      ajax = new ActiveXObject("Microsoft.XMLHTTP.3.0"); 
    } catch (E) { 
      ajax = false; 
    } 
  }
  if (!ajax && typeof XMLHttpRequest!='undefined') { 
    ajax = new XMLHttpRequest(); 
  } 
  return ajax;
} 
String.prototype.trim = function(){return this.replace(/(^[ |　]*)|([ |　]*$)/g, "");}
function $(s){return document.getElementById(s);}
function $$(s){return document.frames?document.frames[s]:$(s).contentWindow;}
function $c(s){return document.createElement(s);}
function initSendTime(){
	SENDTIME = new Date();
}
var err=0;
function commentSubmit(theform){
	
	var smsg =theform.msg.value;
	var spassword = theform.password.value;
	var susername = theform.username.value;
	var snouser = theform.nouser.checked;
	var sauthnum = theform.authnum.value;
	var sartID = theform.artID.value;
	

	
	
	var sDialog = new dialog();
	sDialog.init();
	if(smsg == ''){
		sDialog.event('请输入评论内容!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	if(spassword == '' && susername == '' && snouser == false){
		sDialog.event('请您登陆或选择匿名发表!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}	
	if(sauthnum == ''){
		sDialog.event('请输入验证码!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	if(sartID == ''){
		sDialog.event('非法提交,错误号#001','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}

	
	var url = "/php/checkform.php?nouser="+snouser+"&authnum="+sauthnum+"&username="+susername+"&password="+spassword;
//	var i=0;
//	var ajax = InitAjax();
//    ajax.open("GET", url, true);
//	ajax.send();
//	ajax.onreadystatechange = function() { 
//		if (ajax.readyState == 4 && ajax.status == 200) { 
//			i = ajax.responseText;
//			err=i;
//					
//		} 
//		
//  	}
//	ajax.send(null);
var ajax = new ActiveXObject("MSXML2.XMLHTTP.3.0");
ajax.open("GET", url, false);
ajax.send();
err=ajax.responseText;
if(err == 0)
	{
	var ajax = new new XMLHttpRequest();
	ajax.open("GET", url, false);
	ajax.send();
	err=ajax.responseText;
	}


if(err == 2){
		sDialog.event('非法提交,错误号#002','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;	
		}
if(err == 1){
		sDialog.event('验证码输入错误!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
		}


	//initSendTime();
	//$("src_title").value = $("commentText").innerHTML;
	//$("src_uname").value = $('feedback').submit();

}
