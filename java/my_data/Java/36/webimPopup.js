﻿//WebImForm类和公共属性,方法
function webImForm()
{
    this.title;
    this.content;
    this.divId;
    this.width;
    this.height;
    this.zIndex;
    this.position;
	this.dargOK;
	this.dragXoffset=0;
	this.dragYoffset=0;
	this.dragDiv;
	this.setTimeOutId;
	this.maxHeight;
}
webImForm.renderChat=function(name)
{
    var pageUrl=csdn_im_defaultDomain+'/Messages/'+ name +'.ashx';
	var sidebarUrl=webimPopup.rootUrl+'chatDiagSidebar.aspx?friendUsername='+escape(name);
	var bgImgUrl=csdn_im_defaultDomain+'/app_themes/default/images/chatSidebar/default/bg.png';
	var l=[];
	l.push('<dl class="layer" style="height:450px;" id="'+ webimPopup.chatDivId +'Wrap">');
	l.push('    <dt class="im_popupWindowCaption draggable" id="'+ webimPopup.chatDivId +'Caption">');
	l.push('        <span>');
	l.push('			<img class="im_minimize" onclick="webImForm.minimize(\''+ webimPopup.chatDivId +'\', this)" src="'+ webImForm.rootUrl +'images/webimframe_012.gif" alt="minimize" />');
	l.push('            <img class="im_close" onclick="webImForm.close(\''+ webimPopup.chatDivId +'\')" src="'+ webImForm.rootUrl +'images/webimframe_011.gif" alt="close" />');
	l.push('        </span>');
	l.push('        <strong>\u4e0e '+ name +' \u804a\u5929</strong>');
	l.push('    </dt>');
	l.push('	<table id="im_popupWindow_chatTbl" width="580px" height="424px" cellpadding="0" cellspacing="0" style="background-image:url('+ bgImgUrl +')"><tbody><tr><td vliagn="top" width="448px">');
	l.push('	<iframe id="'+ webimPopup.chatDivId +'Frame" frameborder="0" noresize="noresize" scrolling="no" src=http://blog.csdn.net/"'+ pageUrl +'\" style="width:448px;height:416px;border:0;"></iframe>');
	l.push('	</td><td valign="top" align="center">');
	l.push('		<iframe id="chatSidebar" frameborder="0" noresize="noresize" scrolling="no" src=http://blog.csdn.net/"'+ sidebarUrl +'\" style="border:0;width:129px;height:416px;overflow:hidden;"></iframe>');
	l.push('	</td></tr></tbody></table>');
	l.push('</dl>');
	
	var chatDiv=document.createElement('div');
	chatDiv.id=webimPopup.chatDivId;
	chatDiv.className='im_popupWindow';
	chatDiv.innerHTML=l.join('');
	chatDiv.style.width='580px';
	chatDiv.style.height='450px';
	chatDiv.style.zIndex=webImForm.zIndex[3];
	chatDiv.setAttribute('wistate','max');
	document.body.appendChild(chatDiv);
	webImForm.setToMiddle(chatDiv);
}
webImForm.prototype.show=function()
{
    var me=this;
    var l=[];
	l.push('<dl class="layer" onselectstart="return false;">');
	l.push('    <dt class="im_popupWindowCaption draggable" id="'+ this.divId +'Caption">');
	l.push('        <span>');
	l.push('			<img class="im_minimize" id="'+this.divId+'Minimize" onclick="webImForm.minimize(\''+ this.divId +'\', this)" src="'+ webImForm.rootUrl +'images/webimframe_012.gif" alt="最小化该窗口" />');
	l.push('            <img class="im_close" onclick="webImForm.close(\''+ this.divId +'\')" src="'+ webImForm.rootUrl +'images/webimframe_011.gif" alt="关闭该窗口" />');
	l.push('        </span>');
	l.push('        <strong>'+this.title+'</strong>');
	l.push('    </dt>');
	if(this.divId.indexOf('sys')>0)
	{
	    l.push('    <div class="im_popupWindowContent" id="'+ this.divId +'Content" style="height:240px;width:500px;overflow:auto;max-height:204px;">');
	}
	else
	{
	    l.push('    <div class="im_popupWindowContent" id="'+ this.divId +'Content" style="overflow:auto;max-height:'+ parseInt(this.maxHeight-36,10) +'px;">');
	}
	l.push(this.content);
	l.push('    </div>');
	l.push('</dl>');
	
	var frm=document.createElement("div");
	with(frm)
	{
	    setAttribute("wistate","max");
        id=this.divId;
        className='im_popupWindow';
        style.width=this.width;
        if(this.height){style.height=this.height;}
        innerHTML=l.join('');
        style.zIndex=this.zIndex;
        style.maxHeight=this.maxHeight+'px';
    }
    document.body.appendChild(frm);
    var td=this.divId;
    if(!webImForm.setTimeOutId[this.divId])
    {
        webImForm.setTimeOutId[this.divId]=window.setTimeout(function(){webImForm.minimize(td,document.getElementById(td+"Minimize"))},5*1000);
    }
    frm.onmouseover=function()
    {
        window.clearTimeout(webImForm.setTimeOutId[frm.id]);
    };
}
webImForm.setTimeOutId={};
webImForm.bodyProperty=function()
{
    var bodyST, bodyCH, bodyCW, bodySL;
	if(window.pageYOffset)
	{bodyST=window.pageYOffset;}
	else if(document.documentElement&&document.documentElement.scrollTop){bodyST=document.documentElement.scrollTop;}
	else if(document.body){bodyST=document.body.scrollTop;}
	if(window.innerHeight){bodyCH=window.innerHeight;}
	else if(document.documentElement&&document.documentElement.clientHeight){bodyCH=document.documentElement.clientHeight;}
	else if(document.body){bodyCH=document.body.clientHeight;}
    var w=window, d=document, dd=d.documentElement;
    if(dd&&dd.clientWidth) bodyCW=dd.clientWidth;
    else if(w.innerWidth) bodyCW=w.innerWidth;
    else if(d.body) bodyCW=d.body.clientWidth;
    if(w.pageXOffset) bodySL=w.pageXOffset;
    else if(dd&&dd.scrollLeft) bodySL=dd.scrollLeft;
    else if(d.body) bodySL=d.body.scrollLeft;
    return {"scrollTop":bodyST,"scrollLeft":bodySL,"clientWidth":bodyCW,"clientHeight":bodyCH};
}
//webImForm的静态方法
webImForm.minimize=function(divId, objSender)
{
    var d0=document.getElementById(divId);
    var d1=document.getElementById(divId+'Content');
	if(d1)
	{
		if(d1.style.display=='none')
		{
			d1.style.display='';
			if(divId.indexOf('sys')>0)
			{
			    d0.style.width='510px';
			    d0.style.height='240px';
            }
            if(divId.indexOf('hiMsg')>0)
            {
                d0.style.width='270px';
            }
			if(d0){d0.setAttribute('wistate','max')}
			objSender.src=webImForm.rootUrl+"Images/webimframe_012.gif";
		}
		else
		{
			d1.style.display='none';
			if(d0)
			{
			    d0.setAttribute('wistate','min');
			    d0.style.width='180px';
			    if(divId.indexOf('sys')>0)
			    {
			        d0.style.height='26px';
                }
			}
			objSender.src=webImForm.rootUrl+"Images/webimframe_033.gif";
		}
		webImForm.setToRightCorner(d0);
	}
	else
	{
		var d2=document.getElementById(divId+'Frame');
		if(d2)
		{
			var d3=document.getElementById(divId);
			var d4=document.getElementById(divId+'Wrap');
			var d5=document.getElementById('im_popupWindow_chatTbl');
			if(d3 && d4)
			{
				if(d2.style.display=='none')
				{
					d2.style.display='';
					d5.style.display='';
					d3.style.height='450px';
					d4.style.height='450px';
					d3.style.width='580px';
					d4.style.width='580px';
					objSender.src=webImForm.rootUrl+"Images/webimframe_012.gif";
					d3.setAttribute('wistate','max');
					webImForm.hasChatWindow=false;
				}
				else
				{
					d2.style.display='none';
					d5.style.display='none';
					d3.style.height='26px';
					d4.style.height=d3.style.height;
					d3.style.width='200px';
					d4.style.width=d3.style.width;
					objSender.src=webImForm.rootUrl+"Images/webimframe_033.gif";
					d3.setAttribute('wistate','min');
					webImForm.hasChatWindow=true;
				}
				webImForm.resizeHandler(d3);
				d3.style.zIndex=webImForm.zIndex[5];
			}
		}
	}
}
webImForm.close=function(divId)
{
    if(divId=='im_popupWindow_chat')
        webImForm.hasChatWindow=false;
    webimPopup.dispose(divId);
}
webImForm.resizeHandler=function(divId)
{
    if('string'!=typeof(divId) || 'undefined'==typeof(divId))
    {
        webImForm.setToRightCorner(document.getElementById(webimPopup.senderDivId));
        webImForm.setToRightCorner(document.getElementById(webimPopup.csdnMsgDivId));
        webImForm.setToRightCorner(document.getElementById(webimPopup.sysMsgDivId));
        var cd=document.getElementById(webimPopup.chatDivId)
        //如果chat window是最大化的时候居中,最小化的放在右下角
        if(cd)
        {
            if(cd.getAttribute('wistate')=='max'){webImForm.setToMiddle(cd);}
            else{webImForm.setToRightCorner(cd);}
        }
    }
    else
    {
        webImForm.setToRightCorner(divId);
    }
}
webImForm.setToRightCorner=function(ele)
{
	if(ele)
	{
	    var body=webImForm.bodyProperty();
		ele.style.top=(body.scrollTop+body.clientHeight-ele.offsetHeight-1)+"px";
		ele.style.left=(body.scrollLeft+body.clientWidth-ele.offsetWidth-1)+"px";
	}
}
webImForm.setToMiddle=function(ele)
{
	if(ele)
	{
	    var body=webImForm.bodyProperty();
		ele.style.left=(body.scrollLeft+body.clientWidth-ele.offsetWidth-1)/2+'px';
		ele.style.top=parseInt(body.clientHeight-ele.offsetHeight-1+0.5)/2+body.scrollTop+"px";
	}
}
webImForm.dragHandler=function(e)
{
    var htype='-moz-grabbing';
	if (e == null) { e = window.event; htype='move';} 
	var target = e.target != null ? e.target : e.srcElement;
	var pos;
	if(target.parentNode && target.parentNode.className && target.parentNode.className.lastIndexOf('draggable')>0)
	{
	    target = target.parentNode;
	}
    if(target.className.lastIndexOf('draggable')>0)
    {
		pos=target.id.indexOf('Caption');
		var d=document.getElementById(target.id.substr(0,pos));
		if(d)
		{
			webImForm.setDivTop(d);
			var realDiv=d;
			var dd=document.getElementById('webim_dragFakeDiv');
			if(!dd)
			{
			    dd=document.createElement('div');
			    dd.id='webim_dragFakeDiv';
			    with(dd.style)
			    {
			        borderWidth='2px';
			        borderStyle='solid';
			        borderColor='gray';
			        position='absolute';
			        zIndex="65500";
			    }
			    document.body.appendChild(dd);
			}
			with(dd.style)
			{
			    width=d.clientWidth-2+'px';
			    height=d.clientHeight-2+'px';
			    var intL,intT;
			    try{intL=parseInt(d.style.left,10);intT=parseInt(d.style.top,10);}catch(e){}
			    left=intL-4+'px';
			    top=intT-4+'px';
			    display='';
			}

            this.dragDiv=dd;
			target.style.cursor='move';
			this.dragOK=true;
			var tl=parseInt(this.dragDiv.style.left);
			var tt=parseInt(this.dragDiv.style.top);
			if(isNaN(tl))
			{this.dragXoffset=e.clientX;}
			else{this.dragXoffset=e.clientX-tl;}
			if(isNaN(tt)){this.dragYoffset=e.clientY;}
			else{this.dragYoffset=e.clientY-tt;}

			document.onmousemove=function(e)
			{
				if(e==null){e=window.event}
				if(e.button<=1&&this.dragOK)
				{
				    var ddLeft=e.clientX-this.dragXoffset;
				    var ddTop=e.clientY-this.dragYoffset;
				    //计算位置
				    var body=webImForm.bodyProperty();
		            var maxTop=(body.scrollTop+body.clientHeight-this.dragDiv.offsetHeight-1);
		            var maxLeft=(body.scrollLeft+body.clientWidth-this.dragDiv.offsetWidth-1);

		            if(ddLeft>maxLeft){this.dragDiv.style.left=maxLeft+'px';}
		            else if(ddLeft<1){this.dragDiv.style.left='1px';}
		            else {this.dragDiv.style.left=ddLeft+'px';}
		            
		            if(ddTop>maxTop){this.dragDiv.style.top=maxTop+'px';}
		            else if(ddTop<1){this.dragDiv.style.top='1px';}
		            else {this.dragDiv.style.top=ddTop+'px';}
		            
		            return false;
				}
			};
			
			document.onmouseup=function(e)
			{
	            if (e == null) { e = window.event;} 
				document.onmousemove=null;
				document.onmouseup=null;
				this.dragOK=false;
                realDiv.style.left=this.dragDiv.style.left;
                realDiv.style.top=this.dragDiv.style.top;
				dd.style.display='none';
			};
			
			return false;
        }
    }
}
webImForm.setDivTop=function(div)
{
    webImForm.zIndex[0]=div.style.zIndex;
    var zi=parseInt(webImForm.zIndex[5]);
    if(zi<65000)
    {
        zi++;webImForm.zIndex[5]=zi.toString();
    }
    else
    {
        webImForm.zIndex[0]="30000";zi=30000;
    }
    div.style.zIndex=zi;
}
webImForm.zIndex=new Array(10000,60001,60002,60003,60004,61000);
webImForm.hasChatWindow=false;
webImForm.rootUrl=csdn_im_defaultDomain+'/Web_References/Provide_Services/CSDN/Popup/';



/********************************************************/
//webimPopup类,共有属性,方法
//var webimPopup=new Object();
var webimPopup=function(){}

webimPopup.divPrefix='im_popupWindow_';
webimPopup.scriptId="webIM_popup_js";
webimPopup.rootUrl=csdn_im_defaultDomain+'/Web_References/Provide_Services/CSDN/Popup/';
webimPopup.requestUrl=webimPopup.rootUrl+'PopupMessages.aspx';
webimPopup.sysMsgDivId=webimPopup.divPrefix + 'sysMsg';
webimPopup.senderDivId=webimPopup.divPrefix + 'sender';
webimPopup.csdnMsgDivId=webimPopup.divPrefix + 'csdnMsg';
webimPopup.chatDivId=webimPopup.divPrefix + 'chat';
webimPopup.hiMsgDivId=webimPopup.divPrefix+'hiMsg';
webimPopup.hiMsgScriptUrl='http://notify.hi.csdn.net/NotifySummary.ashx?UserName=';
webimPopup.senderItemCount=-1;

webimPopup.dispose=function(eleID)
{
	var eleObj=document.getElementById(eleID);
	if(eleObj&&eleObj.parentNode)
	{
		eleObj.parentNode.removeChild(eleObj);
	}
}
webimPopup.render=function(jsonMsg)///该方法被加载的script自动调用
{
    if(jsonMsg)
	{
		webimPopup.renderWindow(jsonMsg);
	    //加载hi的新鲜事
	    if(!webim$username){return;}
	    //this.loadScript(this.hiMsgScriptUrl+webim$username, this.renderHiMsg);
	    
		webImForm.resizeHandler();
	    document.onmousedown=webImForm.dragHandler;
	    window["onresize"]=webImForm.resizeHandler;
	    window["onscroll"]=webImForm.resizeHandler;
    		
		var pv=document.createElement('img');
		pv.src='http://counter.csdn.net/pv.aspx?id=227';
		pv.alt='';
		pv.style.display='none';
		document.body.appendChild(pv);
	}
}
webimPopup.renderWindow=function(json)
{
    var f;
    if(json.sysMsg&&json.sysMsg.Content&&json.sysMsg.Content.length>0)//全站消息
    {
        f=new webImForm();
        f.title='系统消息';
        f.content=json.sysMsg.Content;
        f.divId=this.sysMsgDivId;
        f.width='510px';
        f.height='240px';
        f.position=false;
        f.zIndex=webImForm.zIndex[3];
        f.maxHeight='240';
        f.show();
    }
    if(json.csdnMsg)//csdn帐号的消息
    {
        f=new webImForm();
        f.title='csdn的未读消息';
        f.content=webimPopup.getCsdnMsg(json.csdnMsg);
        f.divId=this.csdnMsgDivId;
        f.width='180px';
        f.position=true;
        f.zIndex=webImForm.zIndex[2];
        f.maxHeight='126';
        f.show();
    }
    if(json.sender)//用户消息
    {
        f=new webImForm();
        f.title='未读消息';
        f.content=webimPopup.getSender(json.sender);
        f.divId=this.senderDivId;
        f.width='180px';
        f.position=true;
        f.zIndex=webImForm.zIndex[1];
        f.maxHeight='126';
        f.show();
    }
}
webimPopup.renderHiMsg=function()
{
	return;
    if('undefined'==typeof notifySummary){return;}
    if(notifySummary)
    {
        f=new webImForm();
        f.title='我的新鲜事';
        f.content=notifySummary.replace(/&amp;/g,'&').replace(/&quot;/g,'\"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
        f.divId=webimPopup.hiMsgDivId;
        f.width='270px';
        f.position=true;
        f.zIndex=webImForm.zIndex[1];
        f.maxHeight='126';
        f.show();
        webImForm.setToRightCorner(document.getElementById(webimPopup.hiMsgDivId));
    }
}
//入口函数->
webimPopup.request=function()
{
    //if(!this.checkRepeatLoad()) return;
    if(!this.checkShowSettings()) return;
    if(!this.checkUrl()) return;
	this.loadScript(this.requestUrl,null);
}
webimPopup.loadScript=function(scriptUrl,callback)
{
    var scp=document.createElement("script");
	scp.type="text/javascript";
	scp.id=this.scriptId+new Date().getMilliseconds();
	scp.src=scriptUrl;
	document.getElementsByTagName("head")[0].appendChild(scp);
	
	if(scp.readyState)
	{
		scp.onreadystatechange=function()
		{
			if(scp.readyState=="loaded")
			{
			    if(callback && 'function'==typeof callback)callback();
				webimPopup.dispose(scp.id);
			}
		}
	}	
	else
	{
		scp.onload=function()
		{
			if(callback && 'function'==typeof callback)callback();
            webimPopup.dispose(scp.id);
		}
	}
}
webimPopup.getCsdnMsg=function(arr)
{
    if(arr && arr.length && arr.length>0)
    {
        var l=[];
        for(var i=0;i<arr.length;i++)
	    {
		    l.push('.&nbsp;'+ arr[i] +'<br/>');
	    }
	    return l.join('');
    }
}
webimPopup.getSender=function(arr)
{
    if(arr && arr.length && arr.length>0)
    {
        var l=[];
        for(var i=0;i<arr.length;i++)
	    {
	        l.push('<div id="sdr_'+i+'" style="padding:1px;"><a href="http://hi.csdn.net/'+escape(arr[i])+'" target="_blank"><img class="userAvatar" src="http://profile.csdn.net/'+ escape(arr[i]) +'/picture/4.jpg" alt=""/></a>');
	        //fanwx 081030 修改
		    //l.push('&nbsp;<a href="http://blog.csdn.net/lldwolf/archive/2008/04/14/2290788.aspx#" onclick="webimPopup.showChat(\''+ arr[i] +'\');return false;">'+ arr[i] +'</a><br/>');
            l.push('&nbsp;<a href="'http://blog.csdn.net/lldwolf/archive/2008/04/14/+csdn_im_defaultDomain+'/messages/'+escape(arr[i])+'.ashx" target="_blank" onclick="webimPopup.hideItem(\''+i+'\')">'+ arr[i] +'</a></div>');
	    }
	    webimPopup.senderItemCount=i-1;
	    return l.join('');
    }
}
webimPopup.hideItem=function(id)
{
    var d=document.getElementById('sdr_'+id);
    if(!d) return;
    d.style.display='none';
    var k=document.getElementById(this.senderDivId);
    if(k) 
    {
        if(webimPopup.senderItemCount>0){webImForm.setToRightCorner(k);webimPopup.senderItemCount--;}
        else{k.style.display='none';}
    }
}
webimPopup.showChat=function(name)
{
//    if(webImForm.hasChatWindow)
//    {
//        if(confirm("该操作将关闭当前聊天窗口,打开新窗口,您确定吗?"))
//        {
//            webImForm.close(this.chatDivId);
//            webImForm.renderChat(name);
//	          webImForm.hasChatWindow=true;
//	    }
//    }
//    else
//    {
//	    webImForm.renderChat(name);
//	    webImForm.hasChatWindow=true;
//	}
}
//如果调用方页面显示声明变量WEBIM_IS_DISPLAY=false,则不显示
webimPopup.checkShowSettings=function()
{
    if(typeof(WEBIM_POPUP_IS_DISPLAY)!='undefined' && WEBIM_POPUP_IS_DISPLAY==false) {return false;}
    else return true;
}
webimPopup.checkUrl=function()
{
    var currentUrl=window.location.href;
    if(currentUrl.indexOf('http://')!=0)
    {
        currentUrl+='http://';
    }
    for(var i=0;i<this.nullityUrlArray.length;i++)
    {
        if(currentUrl.indexOf(this.nullityUrlArray[i])==0) return false;
    }
    return true;
}
webimPopup.checkRepeatLoad=function()
{
    if('undefined'==typeof window.webim_repeat_load_flag)
    {
        window.webim_repeat_load_flag='ok';
        return false;
    }
    else
    {
        return true;
    }
}
webimPopup.nullityUrlArray=new Array("http://passport.csdn.net/", "http://webim.csdn.net/MessageList/IFrame/", "http://webim-local.csdn.net/MessageList/IFrame/");

//run314
webimPopup.request();
