// JavaScript Document
function mail_process(stringin){ 
var num=email_test(stringin); 
var str=""; 
if (num!=0) 
{
switch (num) 
{
case 1: 
str="首字符必须用字母！或不能为空！请返回重填。"; 
break; 
case 2: 
str="您忘了填写邮件服务器的地址了！请返回重填。"; 
break; 
case 3: 
str="您的帐号太短，不能少于三个字符!请返回重填。"; 
break; 
case 4: 
str="您的帐号太长，不能多于十九个字符!请返回重填。"; 
break; 
case 5: 
str="您使用了非法字符!请返回重填。"; 
break; 
case 6: 
str="您的邮件服务器的地址不合法!请返回重填。"; 
break; 
default: 
str="您的email地址不合法!请返回重填。"; 
} 
alert(str); 
return false;
} 
}
function cmouseover(divName,over,counts,oclass){
	if(signover==1){
		for(var i=0;i<counts;i++){
			var divClassName = document.getElementById(divName+'top_'+i);
			
				divClassName.className = divClassName.className.substr(0,divClassName.className.length-2)+"_b";
		}
		document.getElementById(divName+'top_'+over).className = divClassName.className.substr(0,divClassName.className.length-2)+"_a";
		for(i=0;i<counts;i++){
			document.getElementById(divName+'_'+i).style.display = "none";
		}
		document.getElementById(divName+'_'+over).style.display = "";
	}
	signover = 0;
	return false;
}
function change_con(up,down){
	if(up && down){
		document.getElementById("con_"+up).style.display="";
		document.getElementById("jiantou_"+up).style.display="";
		document.getElementById("con_"+down).style.display="none";
		document.getElementById("jiantou_"+down).style.display="none";
	}
}
function change_read(up,down){
	if(up && down){
		document.getElementById("com_"+up).style.display="";
		document.getElementById("bt_com_"+up).className="right_4_2";
		document.getElementById("com_"+down).style.display="none";
		document.getElementById("bt_com_"+down).className="right_4_3";
	}
}
function change_top(tnum){
	if(tnum){
		for(var i=1;i<5;i++){
			document.getElementById("bt_top_"+i).className="right_4_3";
			document.getElementById("div_top_"+i).style.display="none";
		}
		document.getElementById("bt_top_"+tnum).className="right_4_2";
		document.getElementById("div_top_"+tnum).style.display="";
	}
}
function change_spec(tnum){
	if(tnum){
		for(var i=1;i<4;i++){
			document.getElementById("bt_spec_"+i).className="right_4_3";
			document.getElementById("spec_"+i).style.display="none";
		}
		document.getElementById("bt_spec_"+tnum).className="right_4_2";
		document.getElementById("spec_"+tnum).style.display="";
	}
}
function change_down(tnum){
	for(var i=0;i<3;i++){
		document.getElementById("download_"+i).style.display="none";
	}
	document.getElementById("download_"+tnum).style.display="";
}
function FormMenu(targ,selObj,restore){ 
	window.open(selObj.options[selObj.selectedIndex].value);
	if (restore) selObj.selectedIndex=0;
}
