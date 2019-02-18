
function MM_jumpMenu(targ,selObj,restore)
{ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function zoomImg(o)
{
  var zoom=parseInt(o.style.zoom, 10)||100;zoom+=event.wheelDelta/12;if (zoom>0) o.style.zoom=zoom+'%';
  return false;
}

function forRecommend(infoID)
 {
    var url ="http://www.it-waibao.com/info/jsp/rec"+"ommend.jsp?infoID="+infoID;
    window.open(url,"");
 }

 function forPrint(infoID)
 {
   var url  = "http://www.it-waibao.com/info/jsp/pri"+"nt.jsp?infoID="+infoID;
   window.open(url,"");
 }

 function forEdit(infoID)
 {
   var url = "http://www.it-waibao.com/info/jsp/edi"+"tInfo.jsp?infoID="+infoID;
   window.open(url,"");
 }

 function forRemark(infoID)
 {
    var url = "http://www.it-waibao.com/info/jsp/rem"+"ark.jsp?infoID="+infoID;
    window.open(url,"");
 }

 function forViewRemark(infoID)
 {
   var url = "http://www.it-waibao.com/info/jsp/rev"+"iew.jsp?infoID="+infoID;
   window.open(url,"");
 }

 var leftTimeInSecond = 6;//看了5秒后才计算.
 function fontZoom(size)
 {
    document.getElementById('fontzoom').style.fontSize=size+'px';
 }

  
   function infoAccessHistory()
   {
     leftTimeInSecond--;

     if(leftTimeInSecond>0)  //看了5秒后才计算.
     {
       window.setTimeout("infoAccessHistory()",1000);
     }
     else
     {
       var url0 = "htt";
       var url1 = "p://www.it-waibao.com/counter/jsp/recordClientVie";//
       var url2 = "wedInfo.j";
       document.imageThatCanNotBeSeen.src = url0+url1+url2+"sp?infoID="+19427;
	   getInfoPeopleVisitedCountValueFromServer('19427');
     }
   }

  function init()
   {
       infoAccessHistory();
   }


 var http_request = false;
	function send_request(url)
         {//初始化、指定处理函数、发送请求的函数
		http_request = false;
		//开始初始化XMLHttpRequest对象
		if(window.XMLHttpRequest)
                { //Mozilla 浏览器
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType)
                         {//设置MiME类别
				http_request.overrideMimeType("text/xml");
			}
		 }
		else if (window.ActiveXObject)
             { // IE浏览器
		    try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
		        } catch (e)
                        {
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request)
                { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		http_request.onreadystatechange = processRequest;
		// 确定发送请求的方式和URL以及是否同步执行下段代码
		http_request.open("GET", url, true);
		http_request.send(null);
	}
		// 处理返回信息的函数
    function processRequest()
    {

        if (http_request.readyState == 4)
         { // 判断对象状态
            if (http_request.status == 200)
                { // 信息已经成功返回，开始处理信息
                   var msgTxt = http_request.responseText;
		           var data  = formatText(msgTxt); //处理信息的方法.

		            //更新被查看的次数
					var pp   = document.getElementById('InfoPeopleVisitedCountValue');
		            pp.value = data;
                }
              else
              { //页面不正常
                alert("您所请求的页面有异常。");
               }
        }
    }

	//主动调用Ajax技术获取必要的数据.
	function getInfoPeopleVisitedCountValueFromServer(infoID)
 {
    var url="http://www.it-waibao.com/counter/jsp/showIn"+"foViewedCounter.jsp?infoID="+infoID;
    send_request(url);
 }

 function formatText(str)
 {
    if(str==null) return null;
	//InfoPeopleVisitedCountValue:["+viewedCount+"]  这是标志符号
	if(str.indexOf("InfoPeopleVisitedCountValue:[")<0) return null;

	from = str.indexOf("[");
	to   = str.indexOf("]",from);
	var visitedCount;
	if(from>0 && to>from)
	{
	   visitedCount = str.substring(from+1,to);
	}
	return visitedCount;
 }

 


Spry.Utils.addLoadListener(function() {

On Error Resume Next
Sub LR_Flash_FSCommand(ByVal command, ByVal args)
	Call LR_Flash_DoFSCommand(command, args)
End Sub


});
