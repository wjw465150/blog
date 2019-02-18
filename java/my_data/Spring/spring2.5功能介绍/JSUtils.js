/**********************************
*           命名空间               *
**********************************/
var CJB = undefined;
if(!CJB)
{
    CJB = {};
}
else if(typeof(CJB != object))
{
    throw new Error('类型错误');
}


/**********************************
*           公共JS类库             *
**********************************/
CJB.Utils = {};
//是否已经加载了某css文件
CJB.Utils.isLoadCss = function (file)
{
    var flag = false;
    for(i = 0; i < document.getElementsByTagName('link').length; i++)
    {
        if(document.getElementsByTagName('link').item(i).href ==  file)
        {
            flag = true;
            break;
        }
    }
    return flag;
}

//加载某CSS文件
//CJB.Utils.loadCss = function(file)
//{
//    CJB.Utils.LoadCss(file, 'loadCss');
//}
CJB.Utils.loadCss = function(file, linkId)
{
    var cssTag = document.getElementById(linkId);
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = file; //"../css/mi_"+file+".css";
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = linkId;
    head.appendChild(css);    
}

//加载某JS文件
//CJB.Utils.loadJs = function(file)
//{
//    CJB.Utils.LoadJs(file, 'loadScript');
//}
CJB.Utils.loadJs = function(file, srciptId)
{
    var scriptTag = document.getElementById(srciptId);
    var head = document.getElementsByTagName('head').item(0);
    if(scriptTag) head.removeChild(scriptTag);
    script = document.createElement('script');
    script.src = file;//"../js/mi_"+file+".js";
    script.type = 'text/javascript';
    script.id = srciptId;
    head.appendChild(script);
}

//字符串拼接
CJB.Utils.StringBuffer = function()
{
    this.__strings__ = new Array;
}
CJB.Utils.StringBuffer.prototype.append = function(str)
{
    this.__strings__.push(str);
}
CJB.Utils.StringBuffer.prototype.toString = function()
{
    return this.__strings__.join("");
}

//解决字符串为JSON对象
CJB.Utils.evalJsonString = function(jsonString)
{
    return eval('(' + jsonString + ')');
}

/**********************************
*           EventUtil             *
**********************************/
CJB.EventUtil = {};
CJB.EventUtil.addEventHandler = function(oTarget, sEventType, fnHandler)
{
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
}
CJB.EventUtil.removeEventHandler = function(oTarget, sEventType, fnHandler) 
{
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};
CJB.EventUtil.formatEvent = function(oEvent) 
{
    var sUserAgent = navigator.userAgent;
    var isOpera = sUserAgent.indexOf("Opera") > -1;
    var isIE = sUserAgent.indexOf("compatible") > -1 
           && sUserAgent.indexOf("MSIE") > -1
           && !isOpera;
           
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");           

    if (isIE && isWin) {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
        oEvent.pageY = oEvent.clientY + document.body.scrollTop;
        oEvent.preventDefault = function () {
            this.returnValue = false;
        };

        if (oEvent.type == "mouseout") {
            oEvent.relatedTarget = oEvent.toElement;
        } else if (oEvent.type == "mouseover") {
            oEvent.relatedTarget = oEvent.fromElement;
        }

        oEvent.stopPropagation = function () {
            this.cancelBubble = true;
        };

        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date).getTime();
    }
    return oEvent;
};
CJB.EventUtil.getEvent = function() 
{
    if (window.event) {
        return this.formatEvent(window.event);
    } else {
        return CJB.EventUtil.getEvent.caller.arguments[0];
    }
};


/**********************************
*           AsyncTooltip          *
**********************************/
CJB.AsyncTooltip = {};
CJB.AsyncTooltip.ApplictionPath = function()//布署必须按实现修改
{
    return "http://blog.csdn.net/";
    //return "/";
    //return "";
}
CJB.AsyncTooltip.asyncInvokePath = function()//布署必须按实现修改
{
    //针对会员中以的异步调用路径
    //return "/";
    //return "http://my2.csdn.net/";
    return "http://blog.csdn.net/";
}
CJB.AsyncTooltip.getCssPath = function(cssFile)
{
    return CJB.AsyncTooltip.ApplictionPath() + 'script/Tooltip/css/' + cssFile;
    //return "css/AsyncTooltip.css";//Debug状态，真实布署时必须修改
}
//根据_requestUrl的URL获取请求的JSON对像，以供动态加载内容显示
CJB.AsyncTooltip.requestContent = function(requestUrl, targetId)
{
    if(requestUrl != null)
    {
        var srciptId = targetId + '_Script';
        CJB.Utils.loadJs(requestUrl, srciptId);//动态加载内容JSON
    }
}
CJB.AsyncTooltip.init = function(options, text)
{
    //加载样式表(布署时需改变路径)
    if(!CJB.Utils.isLoadCss(CJB.AsyncTooltip.getCssPath('AsyncTooltip.css')))
    {
        CJB.Utils.loadCss(CJB.AsyncTooltip.getCssPath('AsyncTooltip.css'), 'AsyncTooltip_css');
    }
    
    var _popupId = options.PopupId != null ? options.PopupId : 'cjb_pid' + Math.round(Math.random()*100000000);//如果连弹出框Id也没有指定，则创建一个随机的
    var _text = text;
    var _direction = options.Direction != null ? options.Direction : 'right';
    var _targetId = options.TargetId;
    var _offsetY = options.OffsetY != null ? options.OffsetY : -20;
    var _offsetX = options.OffsetX != null ? options.OffsetX : (_direction == 'right') ? 0 : 0;//15;//针对个人中心的调整
    var _requestUrl = options.RequestUrl;
    var _formater = options.Formater;
    var _async = options.Async != null ? options.Async : false;
    var _contentCssClass = options.ContentCssClass != null ? options.ContentCssClass : 'cjb_AsyncTooltip_ContentCssClass';
    
    //异步加载的内容，放置到CJB.AsyncTooltip.showTooltip进行
    
    //动态创建弹出框
    if(document.getElementById(_popupId) == null)
    {
       var theDiv = document.createElement("div");
       theDiv.setAttribute("id", _popupId);
       theDiv.setAttribute("className", (_direction == "right") ? "tipRightPanel2" : "tipLeftPanel2");
       theDiv.setAttribute("class", (_direction == "right") ? "tipRightPanel2" : "tipLeftPanel2");
       theDiv.setAttribute("style", "display:none;");
       theDiv.style.cssText = "display:none;";
       theDiv.style.cssText = "display:none;z-index:9999;";
       
       //把创建的动态div加载为body下的第一个元素
       document.body.insertBefore(theDiv, document.body.childNodes[0]);
    }
    
    //创建圆角边框
    CJB.AsyncTooltip.createAngledRoundPanel(_direction, _popupId, _text, _contentCssClass);
    
    //添加隐藏事件
    CJB.EventUtil.addEventHandler(document, "mouseover", function()
        {
            CJB.AsyncTooltip.hideTooltip(_popupId);
        });
        
    //为popupId元素添加onmouseover事件，不需要客户端添加
    CJB.EventUtil.addEventHandler(document.getElementById(_popupId), "mouseover", function()
        {
            CJB.AsyncTooltip.mouseoverPanel(CJB.EventUtil.getEvent());
        });
        
    //为targetId元素添加onmouseover事件，不需要客房端添加
    CJB.EventUtil.addEventHandler(document.getElementById(_targetId), "mouseover", function()
        {
            var tar = document.getElementById(_targetId);
            CJB.AsyncTooltip.showTooltip(tar, CJB.EventUtil.getEvent(), _popupId, _direction, _offsetX, _offsetY, _async, _formater, _requestUrl);
            //CJB.AsyncTooltip.mouseoverPanel(CJB.EventUtil.getEvent());
        });          
        
}
//初始化论坛专家分
CJB.AsyncTooltip.initForumExpertInfo = function(options)
{
    options.Async = true;
    options.RequestUrl = CJB.AsyncTooltip.asyncInvokePath() + "JSForumExpertInfo.aspx?UserName=" + options.UserName;
    options.Formater = "CJB.AsyncTooltip.formatForumExpertInfo('" + options.UserName +"')";
    options.ContentCssClass = "cjb_AsyncTooltip_ForumExpertInfo";
    
    CJB.AsyncTooltip.init(options, null);
}
CJB.AsyncTooltip.formatForumExpertInfo = function(userName)
{
    var jsonObj = null;
    try{ jsonObj = eval('forumExpertInfo_'+userName); }catch(exception){ return null; }

    var sb = new CJB.Utils.StringBuffer();
    sb.append(jsonObj.Content);

    return sb.toString();
}
//初始化博客访问量
CJB.AsyncTooltip.initBlogCommentInfo = function(options)
{
    options.Async = true;
    options.RequestUrl = CJB.AsyncTooltip.asyncInvokePath() + "JSBlogCommentInfo.aspx?UserName=" + options.UserName;
    options.Formater = "CJB.AsyncTooltip.formatBlogCommentInfo('" + options.UserName +"')";
    options.ContentCssClass = "cjb_AsyncTooltip_BlogCommentInfo";
    
    CJB.AsyncTooltip.init(options, null);
}
CJB.AsyncTooltip.formatBlogCommentInfo = function(userName)
{
    var jsonObj = null;
    try{ jsonObj = eval('blogCommentInfo_'+userName); }catch(exception){ return null; }
    
    var sb = new CJB.Utils.StringBuffer();
    sb.append(jsonObj.Content);
    
    return sb.toString();
}
//初始化个人信息
CJB.AsyncTooltip.initProfileInfo = function(options)
{
    options.Async = true;
    options.RequestUrl = CJB.AsyncTooltip.asyncInvokePath() + "JSProfileInfo.aspx?UserName=" + options.UserName;
    options.Formater = "CJB.AsyncTooltip.formatProfileInfo('" + options.UserName +"')";
    options.ContentCssClass = "cjb_AsyncTooltip_ProfileInfo";
    
    CJB.AsyncTooltip.init(options, null);
}
CJB.AsyncTooltip.formatProfileInfo = function(userName)
{
    var jsonObj = null;
    try{ jsonObj = eval('profileInfo_'+userName); }catch(exception){ return null; }
    
    var sb = new CJB.Utils.StringBuffer();
    sb.append(jsonObj.Content);
    
    return sb.toString();
}
//初始化资源积分
CJB.AsyncTooltip.initResourceInfo = function(options)
{
    options.Async = true;
    options.RequestUrl = CJB.AsyncTooltip.asyncInvokePath() + "JSResourceInfo.aspx?UserName=" + options.UserName;
    options.Formater = "CJB.AsyncTooltip.formatResourceInfo('" + options.UserName +"')";
    options.ContentCssClass = "cjb_AsyncTooltip_formatResourceInfo";
    
    CJB.AsyncTooltip.init(options, null);
}
CJB.AsyncTooltip.formatResourceInfo = function(userName)
{
    var jsonObj = null;
    try{ jsonObj = eval('ResourceInfo_'+userName); }catch(exception){ return null; }

    var sb = new CJB.Utils.StringBuffer();
    sb.append(jsonObj.Content);

    return sb.toString();
}
//初始化博客小贴士内容 by venjiang 2007/11/22
CJB.AsyncTooltip.initBlogElf = function(options)
{
    options.Async = true;
    options.RequestUrl = CJB.AsyncTooltip.asyncInvokePath() + "BlogShowme.ashx?UserName=" + options.UserName;
    options.Formater = "CJB.AsyncTooltip.formatBlogElf('" + options.UserName +"')";
    options.ContentCssClass = "cjb_AsyncTooltip_BlogElf";
    
    CJB.AsyncTooltip.init(options, null);
}
CJB.AsyncTooltip.formatBlogElf = function(userName)
{
    var jsonObj = null;
    try{ jsonObj = eval('blogElf_'+userName); }catch(exception){ return null; }
    
    var sb = new CJB.Utils.StringBuffer();
    sb.append(jsonObj.Content);
    
    return sb.toString();
}
//获取页面某标签元素的TipJson数组
CJB.AsyncTooltip.getTipJsonsByTag = function(tag)
{
    var tipJsons = new Array();
    
    var items = document.body.getElementsByTagName(tag);
    for(i=0; i<items.length; i++)
    {
        if(items[i].getAttribute("tipJson") != null)
        {
            //如果没有设置id，则动态分配一个
            if(!items[i].id)
            {
                items[i].id = 'cjb_tid' + Math.round(Math.random()*100000000);
            }
            
            var tipJson = CJB.Utils.evalJsonString(items[i].getAttribute("tipJson"));
            tipJson.TargetId = items[i].id;//把当前节点的id赋值到TargetId
            tipJsons.push(tipJson);
        }
    }
    
    return tipJsons;
}
//初始化异步调用
CJB.AsyncTooltip.initAsync = function()
{
    var tipJsons = CJB.AsyncTooltip.getTipJsonsByTag("a");
    var imgJsons = CJB.AsyncTooltip.getTipJsonsByTag("img");
    for(i=0;i<imgJsons.length;i++)
    {
        tipJsons.push(imgJsons[i]);
    }
    
    //测试输出
    //for(i=0;i<tipJsons.length;i++)
    //{
    //    document.write(tipJsons[i].TargetId+'<br/>');
    //}
        
    for(var i=0; i<tipJsons.length; i++)
    {
        try
        {
            switch(tipJsons[i].Method)
            {
                case "initForumExpertInfo":
                    CJB.AsyncTooltip.initForumExpertInfo(tipJsons[i]);
                    break;
                case "initBlogCommentInfo":
                    CJB.AsyncTooltip.initBlogCommentInfo(tipJsons[i]);
                    break;
                case "initBlogElf":
                    CJB.AsyncTooltip.initBlogElf(tipJsons[i]);
                    break;
                case "initProfileInfo":
                    CJB.AsyncTooltip.initProfileInfo(tipJsons[i]);
                    break;
                case "initResourceInfo":
                    CJB.AsyncTooltip.initResourceInfo(tipJsons[i]);
                    break;
            }
        }
        catch(ex)
        {
            //alert(ex.message);//test
        }
    }

}
//获取内容容器的Id
CJB.AsyncTooltip.getContentId = function(popupId)
{
    return popupId + '_ContentId';
}
//创建带尖角的圆框
CJB.AsyncTooltip.createAngledRoundPanel = function(direction, popupId, text, contentCssClass)
{
    var result = new String();
    
    var content = new String();
    content += '<div id="' + CJB.AsyncTooltip.getContentId(popupId) + '" class="' + contentCssClass +'">';
    content += text;
    content += '</div>';
    
    if(direction == 'right')
    {
        result += '<table class="cjhBorder2" border="0" cellpadding="0" cellspacing="0">';
        result += '<tbody>';
        result += '<tr class="cjhBorder2_trT">';
        result += '<td class="cjhBorder2TL1"></td>';
        result += '<td class="cjhBorder2TC"></td>';
        result += '<td class="cjhBorder2TR1"></td>';
        result += '</tr>';
        result += '<td valign="top" class="cjhBorder2CL1">';
        result += '<img src="'+CJB.AsyncTooltip.ApplictionPath()+'/script/Tooltip/images/AsyncToolTip/CJHBorder_CLCornu.gif" alt="" />';
        result += '</td>';
        result += '<td class="cjhBorder2CC">';
        result += content;
        result += '</td>';
        result += '<td class="cjhBorder2CR1">';
        result += '</td>';
        result += '</tr>';
        result += '<tr>';
        result += '<td class="cjhBorder2BL1"></td>';
        result += '<td class="cjhBorder2BC"></td>';
        result += '<td class="cjhBorder2BR1"></td>';
        result += '</tr>';
        result += '</tbody>';
        result += '</table>';
        //alert(result.toString());
    }
    else if(direction == 'left')
    {
        result += '<table class="cjhBorder2" border="0" cellpadding="0" cellspacing="0">';
        result += '<tr class="cjhBorder2_trT">';
        result += '<td class="cjhBorder2TL2"></td>';
        result += '<td class="cjhBorder2TC"></td>';
        result += '<td class="cjhBorder2TR2"></td>';
        result += '</tr>';
        result += '<tr>';
        result += '<td valign="top" class="cjhBorder2CL2">';
        result += '</td>';
        result += '<td class="cjhBorder2CC">';
        result += content;
        result += '</td>';
        result += '<td valign="top" class="cjhBorder2CR2">';
        result += '<img src="'+CJB.AsyncTooltip.ApplictionPath()+'/script/Tooltip//images/AsyncToolTip/CJHBorder_CRCornu.gif" alt=""  />';
        result += '</td>';
        result += '</tr>';
        result += '<tr>';
        result += '<td class="cjhBorder2BL2"></td>';
        result += '<td class="cjhBorder2BC"></td>';
        result += '<td class="cjhBorder2BR2"></td>';
        result += '</tr>';
        result += '</table>';
        //alert(result.toString());
    }
    
    var container = document.getElementById(popupId);
    container.innerHTML = result.toString();
}
//获取无素的位置作息(返回JSON)
CJB.AsyncTooltip.getAbsoluteLocation = function(element)
{
    if ( arguments.length != 1 || element == null )
    {
        return null;
    }
    var elmt = element;
    var offsetTop = elmt.offsetTop;
    var offsetLeft = elmt.offsetLeft;
    var offsetWidth = elmt.offsetWidth;
    var offsetHeight = elmt.offsetHeight;
    var scrollWidth = elmt.scrollWidth;//滚动条宽度
    
    while( elmt = elmt.offsetParent )
    {
          // add this judge
        if ( elmt.style.position == 'absolute' || elmt.style.position == 'relative' 
            || ( elmt.style.overflow != 'visible' && elmt.style.overflow != '' ) )
        {
            break;
        } 
        offsetTop += elmt.offsetTop;
        offsetLeft += elmt.offsetLeft;
    }
    return { absoluteTop: offsetTop, absoluteLeft: offsetLeft,
        offsetWidth: offsetWidth, offsetHeight: offsetHeight, scrollWidth: scrollWidth };
}
//获取正在加载的图片路径
CJB.AsyncTooltip.loadImagePath = function()
{
    return '<img style="border:0;" src="'+CJB.AsyncTooltip.ApplictionPath()+'/script/Tooltip/images/AsyncToolTip/loading.gif" />';
}
//显示提示信息
CJB.AsyncTooltip.showTooltip = function(source, event, popupId, direction, offsetX, offsetY, async, formater, requestUrl)
{
    rect = CJB.AsyncTooltip.getAbsoluteLocation(source);
    //alert(rect.absoluteTop);
    t = document.getElementById(popupId);
    //alert(t.innerHTML);//测试,打开这里可以看到数据结构
    
    t.style.top = rect.absoluteTop + offsetY + 'px';//-20表示上移20px量 例如：offsetY = -20
    
    if(direction == 'right')
    {
        t.style.left = rect.absoluteLeft + rect.offsetWidth + offsetX  + 'px';
    }
    else
    {
        //元素右边界坐标 = 可视宽度 - 元素左边界坐标 + 偏移值  (向左显示)
        t.style.right = document.body.scrollWidth - rect.absoluteLeft + offsetX  + 'px';
    }
    
    if (t.style.display == "none") t.style.display = "";
    (window.event || event).cancelBubble=true;  
    
    //根据_requestUrl的URL获取请求的JSON对像，以供动态加载内容显示
    CJB.AsyncTooltip.requestContent(requestUrl, source.id);
    
    //获取弹出框容器对象，以用于把动态加载的内容加载到此容器中
    var contentObj = document.getElementById(CJB.AsyncTooltip.getContentId(popupId));
    if(async)
    {
        //异步读取JSON数据并进行格式化
        var asyncText = eval(formater);
        if(asyncText == null)
        {
            contentObj.innerHTML = CJB.AsyncTooltip.loadImagePath();
            
            //等待一秒钟，以便数据加载完毕后，再去读取数据
//            setTimeout(function(){
//                asyncText = eval(formater);
//                if(asyncText != null)
//                    contentObj.innerHTML = asyncText;
//                else
//                    contentObj.innerHTML = "数据加载缓慢，请稍后再试....";
//                },1000);


            setTimeout(function(){
                CJB.AsyncTooltip.parseFormater(formater, contentObj, 0);
                },500);

        }
        else
        {
            contentObj.innerHTML = asyncText;
        }
    }
}
//隐藏提示信息
CJB.AsyncTooltip.hideTooltip = function(popupId)
{
    var tar = document.getElementById(popupId);
    tar.style.display = "none";   
}
//阻止鼠标移动事件的冒泡
CJB.AsyncTooltip.mouseoverPanel = function(event)
{
    (window.event || event).cancelBubble=true;
}
//循环解析Json数据
CJB.AsyncTooltip.parseFormater = function(formater, contentObj, i)
{
    i++;
    asyncText = eval(formater);
    if(asyncText != null)
        contentObj.innerHTML = asyncText;
    else
        if(i<10)
        {
        setTimeout(function(){
            CJB.AsyncTooltip.parseFormater(formater, contentObj, i);
            },500);
        }
        else
        {
        contentObj.innerHTML = "数据加载缓慢，请稍后再试....";
        }
}
