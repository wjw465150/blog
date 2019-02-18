
var mystat=0;//price select
function myout(){mystat=0;window.setTimeout("mycheck()",5);}
function myin(){mystat=1;}
function mycheck(){if (mystat==0) MM_showHideLayers('price','','hide');}//price select


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}


function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}



Spry.Utils.addLoadListener(function() {

function MM_findObj(n, d) { //v4.01
var p,i,x; if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n); return x;
}



function PConlineLogin()
{
   if (mainform.username.value == "" || mainform.username.value == "guest")
   {
       window.open("http://pass.pconline.com.cn/permit/permit.jsp");
	   return false;
   }

   if (mainform.password.value == "")
   {
		alert("请输入您的密码");
		mainform.password.focus();
		return false;
   }

   if (mainform.username.value != "" &&  mainform.username.value != "guest")
   {
	   LoginUserForm.username.value =mainform.username.value;
	   LoginUserForm.password.value =mainform.password.value;
	   LoginUserForm.submit();	
   }

   return false;
}




function PConlineLogins()
{
   switch(dhtform.online.value){
    case "1":
	articleform.query.value =dhtform.keyword.value;
	articleform.submit();
	break;
    case "2":
	downform.keyword.value =dhtform.keyword.value;
	downform.submit();
        break;
    case "3":
	dcform.product_name.value =dhtform.keyword.value;
	dcform.submit();
        break;
    case "4":
	mobileform.product_name.value =dhtform.keyword.value;
	mobileform.submit();
        break; 
    case "5":
	mp3form.product_name.value =dhtform.keyword.value;
	mp3form.submit();
        break; 
    case "6":
	nbform.product_name.value =dhtform.keyword.value;
	nbform.submit();
        break; }
  return false;
}



   var speed=100
   demo2.innerHTML=demo1.innerHTML
   function Marquee(){
   if(demo2.offsetTop-demo.scrollTop<=0)
   demo.scrollTop-=demo1.offsetHeight
   else{
   demo.scrollTop++
   }
   }
   var MyMar=setInterval(Marquee,speed)
   demo.onmouseover=function() {clearInterval(MyMar)}
   demo.onmouseout=function() {MyMar=setInterval(Marquee,speed)}

_comment_script_.src="http://cmt.pconline.com.cn/?";


   var speed=100
   demoo2.innerHTML=demoo1.innerHTML
   function Marquee(){
   if(demoo2.offsetTop-demoo.scrollTop<=0)
   demoo.scrollTop-=demoo1.offsetHeight
   else{
   demoo.scrollTop++
   }
   }
   var MyMar=setInterval(Marquee,speed)
   demoo.onmouseover=function() {clearInterval(MyMar)}
   demoo.onmouseout=function() {MyMar=setInterval(Marquee,speed)}


menu.innerHTML=span_menu.innerHTML;
span_menu.innerHTML="";



ad_55080.innerHTML=span_ad_55080.innerHTML;
span_ad_55080.innerHTML="";



ad_743_art.innerHTML=span_ad_743_art.innerHTML;
span_ad_743_art.innerHTML="";



zl_550.innerHTML=span_zl_550.innerHTML;
span_zl_550.innerHTML="";



xl_550.innerHTML=span_xl_550.innerHTML;
span_xl_550.innerHTML="";



top12.innerHTML=span_top12.innerHTML;
span_top12.innerHTML="";



ad_150500.innerHTML=span_ad_150500.innerHTML;
span_ad_150500.innerHTML="";


});
