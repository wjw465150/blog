//登陆验证
var now1 =new Date();
StarTime_S=now1.getTime();
function submitlog(sign)
{
	if(sign)
	{
		if(!document.loginForm.user.value)
		{
			alert("中软网站长提示您:请输入您的用户名!");
			document.loginForm.user.focus();
			return false;
		}
		else if(!document.loginForm.pass.value)
		{
			alert("中软网站长提示您:请输入您的密码!");
			document.loginForm.pass.focus();
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{	
	}
}
//menu特效
function HL_Menu(obj,state)
{
switch (state)
{
case 0:
 obj.className="menuover"
 break;
case 1:
 obj.className="menuup"
 break;
}
 }
function mouseovertd (o)
{
   o.style.backgroundColor="#eeeeee";	
}
function mouseouttd (o){
	o.style.backgroundColor="";	
}
function download(url)
{ 
hWnd=window.open(url,"changeuser","toolbar=no,scrollbars=no,menubar=no,width=400,height=300,left="+(window.screen.width-400)/2+",top="+(window.screen.height-300)/2+",location=no,scrollbars=no,menubars=no,toolbars=no,resizable=no,center=yes")
}
function CfsNum(fid){
	var AlowNum=Alow.innerText;
	var UsedNum=fid.value.length;
	var LeavNum=Leav.innerText;
	
	Used.innerText=UsedNum;
	Leav.innerText=AlowNum-UsedNum;
	
	if(UsedNum>AlowNum){
		alert("字数超过 " + AlowNum + " 的限制，将进行一些剪切！");
		fid.value=fid.value.substring(AlowNum, 0)
		Used.innerText=UsedNum;
		Leav.innerText=AlowNum-UsedNum;
		return false;
	}else{
		return true;
	}
}
//题目鼠标特效
//more javascript from http://www.smallrain.net
var offsetfromcursorX=12 //Customize x offset of tooltip
var offsetfromcursorY=10 //Customize y offset of tooltip

var offsetdivfrompointerX=10 //Customize x offset of tooltip DIV relative to pointer image
var offsetdivfrompointerY=14 //Customize y offset of tooltip DIV relative to pointer image. Tip: Set it to (height_of_pointer_image-1).

document.write('<div id="dhtmltooltip"></div>') //write out tooltip DIV
document.write('<img id="dhtmlpointer" src="arrow2.gif">') //write out pointer image

var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false
if (ie||ns6)
var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""

var pointerobj=document.all? document.all["dhtmlpointer"] : document.getElementById? document.getElementById("dhtmlpointer") : ""

function ietruebody(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ddrivetip(thetext, thewidth, thecolor){
if (ns6||ie){
if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
tipobj.innerHTML=thetext
enabletip=true
return false
}
}

function positiontip(e){
if (enabletip){
var nondefaultpos=false
var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
//Find out how close the mouse is to the corner of the window
var winwidth=ie&&!window.opera? ietruebody().clientWidth : window.innerWidth-20
var winheight=ie&&!window.opera? ietruebody().clientHeight : window.innerHeight-20

var rightedge=ie&&!window.opera? winwidth-event.clientX-offsetfromcursorX : winwidth-e.clientX-offsetfromcursorX
var bottomedge=ie&&!window.opera? winheight-event.clientY-offsetfromcursorY : winheight-e.clientY-offsetfromcursorY

var leftedge=(offsetfromcursorX<0)? offsetfromcursorX*(-1) : -1000

//if the horizontal distance isn't enough to accomodate the width of the context menu
if (rightedge<tipobj.offsetWidth){
//move the horizontal position of the menu to the left by it's width
tipobj.style.left=curX-tipobj.offsetWidth+"px"
nondefaultpos=true
}
else if (curX<leftedge)
tipobj.style.left="5px"
else{
//position the horizontal position of the menu where the mouse is positioned
tipobj.style.left=curX+offsetfromcursorX-offsetdivfrompointerX+"px"
pointerobj.style.left=curX+offsetfromcursorX+"px"
}

//same concept with the vertical position
if (bottomedge<tipobj.offsetHeight){
tipobj.style.top=curY-tipobj.offsetHeight-offsetfromcursorY+"px"
nondefaultpos=true
}
else{
tipobj.style.top=curY+offsetfromcursorY+offsetdivfrompointerY+"px"
pointerobj.style.top=curY+offsetfromcursorY+"px"
}
tipobj.style.visibility="visible"
if (!nondefaultpos)
pointerobj.style.visibility="visible"
else
pointerobj.style.visibility="hidden"
}
}

function hideddrivetip(){
if (ns6||ie){
enabletip=false
tipobj.style.visibility="hidden"
pointerobj.style.visibility="hidden"
tipobj.style.left="-100px"
tipobj.style.backgroundColor=''
tipobj.style.width=''
}
}
document.onmousemove=positiontip
//右键菜单
//window.onresize = new Function("window.location.reload()");
TableColor='#0072BC';//设置左边竖条的颜色
function DrawMouseMenu(){
        DivH=2;
        oSelection = document.selection;
        var HrStr="<tr><td align=center valign=middle height=2><TABLE border=0 cellpadding=0 cellspacing=0 width=128 height=2><tr><td height=1 bgcolor=buttonshadow><\/td><\/tr><tr><td height=1 bgcolor=buttonhighlight><\/td><\/tr><\/TABLE><\/td><\/tr>";
        var MenuStr1="<tr><td align=center valign=middle height=20><TABLE border=0 cellpadding=0 cellspacing=0 width=132><tr><td valign=middle height=16 class=Mout onMouseOver=this.className='Mover'; onMouseOut=this.className='Mout'; onclick=\"";
        var MenuStr2="<\/td><\/tr><\/TABLE><\/td><\/tr>";
        var XiciMenu=["window.history.back()\">后退","window.history.forward()\">前进"];
        var //SysMenu=["document.execCommand('SelectAll')\">全选","MouseMenu.style.visibility='hidden';document.execCommand('SaveAs','true')\">另存为…","location.replace('view-source:'+location.href)\">查看源文件","window.print()\">打印","window.location.reload()\">刷新"];
        SysMenu=["document.execCommand('SelectAll')\">全选","MouseMenu.style.visibility='hidden';document.execCommand('SaveAs','true')\">另存为…","window.print()\">打印","window.location.reload()\">刷新","window.close()\">关闭"];

        var MenuStr="";
        for(i=0;i<XiciMenu.length;i++){
                MenuStr+=MenuStr1+XiciMenu[i]+MenuStr2;
                DivH+=20;
        }
        MenuStr+=HrStr;
        for(i=0;i<arguments.length;i++){
                MenuStr+=MenuStr1+arguments[i]+MenuStr2;
                DivH+=20;
        }
        if(arguments.length>0){
                MenuStr+=HrStr;
                DivH+=2;
        }
        for(i=0;i<SysMenu.length;i++){
                MenuStr+=MenuStr1+SysMenu[i]+MenuStr2;
                DivH+=20;
        }
        var DivStr1="<DIV id=MouseMenu class=div1 style=\"position:absolute; left:0px; top:0px; width=150;height="+DivH+"; z-index:1; visibility:hidden;\"><TABLE border=0 cellpadding=0 cellspacing=0 class=div2><tr><td bgcolor="+TableColor+" width=10 valign=bottom align=center  bgcolor=buttonface><img id=menugif src=menu.jpg width=18 height=160><\/td><td bgcolor=buttonface><TABLE border=0 cellpadding=0 cellspacing=0>";
        var DivStr2="<\/TABLE><\/td><\/tr><\/TABLE><\/DIV>";
        document.write(DivStr1+MenuStr+DivStr2);
        document.body.oncontextmenu=new Function("return ShowMouseMenu();");
        document.body.onclick=new Function("MouseMenu.style.visibility='hidden';");
        document.body.onscroll=new Function("MouseMenu.style.visibility='hidden';");
        document.body.onselectstart=new Function("MouseMenu.style.visibility='hidden';");
        window.onresizestart=new Function("MouseMenu.style.visibility='hidden';");
}
function ShowMouseMenu(){
        if(MouseMenu.style.visibility=='visible')MouseMenu.style.visibility='hidden';
        if(event.srcElement.tagName=="IMG"&&event.srcElement.id!="menugif"||event.srcElement.tagName=="A"||event.srcElement.tagName=="TEXTAREA"||event.srcElement.tagName=="INPUT"||oSelection.type!="None")
                return true;
        else{
                if(event.clientX+150 > document.body.clientWidth)MouseMenu.style.left=event.clientX+document.body.scrollLeft-150;
                else MouseMenu.style.left=event.clientX+document.body.scrollLeft;
                if(event.clientY+DivH > document.body.clientHeight)MouseMenu.style.top=event.clientY+document.body.scrollTop-DivH;
                else MouseMenu.style.top=event.clientY+document.body.scrollTop;
                MouseMenu.style.visibility='visible';
        }
        return false;
}
DrawMouseMenu(
"window.open('http://www.cnsdn.com.cn');\">&nbsp;&nbsp;中软网欢迎您",
"window.open('mailto:cnsdn@163.com?subject=中软网负责人:我想......');\">&nbsp;&nbsp;给我写信",
"window.open('http://huicui.cnsdn.com.cn');\">&nbsp;&nbsp;荟粹频道",
"window.open('http://myjs.cnsdn.com.cn');\">&nbsp;&nbsp;Myjs频道",
"window.open('http://forum.cnsdn.com.cn');\">&nbsp;&nbsp;社区频道"
);
