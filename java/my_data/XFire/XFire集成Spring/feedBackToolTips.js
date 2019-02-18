function display(ad)
{
	if(ad.style.display=="none")
	{
	 ad.style.display="";
	 }
	 else
	{
	ad.style.display="none";
	}
}
if(!window.attachEvent && window.addEventListener)
{
      Window.prototype.attachEvent = HTMLDocument.prototype.attachEvent=
      HTMLElement.prototype.attachEvent=function(en, func, cancelBubble)
      {
        var cb = cancelBubble ? true : false;
        this.addEventListener(en.toLowerCase().substr(2), func, cb);
      };
}
function scrollPosition()
{
  var L, T, w=window, d=document, dd=d.documentElement;
  if(w.pageXOffset) L=w.pageXOffset;
  else if(dd&&dd.scrollLeft) L=dd.scrollLeft;
  else if(d.body) L=d.body.scrollLeft;

  if(w.pageYOffset) T=w.pageYOffset;
  else if(dd&&dd.scrollTop) T=dd.scrollTop;
  else if(d.body) T=d.body.scrollTop;

  return {"left": L, "top": T};
}  
function CreateWaitElement() 
{
    var loading = document.getElementById('loading');
    if (!loading)
        {
        var str = "<div id='loading' style='color: #000000; \
        background-color: #FFFFAF; \
        padding: 0 3px; font-size: 12px; \
        font-weight: bold;   height: 30px;   width: 160px; \
        position: absolute;  border: #cccccc 1px solid;\
        '>正在处理您的请求...</div>";
        var s = document.createElement("SPAN");
        s.innerHTML = str;
        loading = s.firstChild;
		document.body.insertBefore(loading, document.body.firstChild);
        }
   return loading;  
}
window.attachEvent("onload", function()
{
    var loading = CreateWaitElement();
   loading.style.display = "none"; 
   window.attachEvent("onscroll", function(e)
 {
    var xy = scrollPosition();
   loading.style.top = (xy.top + 10)  +"px";
   loading.style.left = (xy.left + document.body.offsetWidth - 200)  +"px";
 });   
});
function Anthem_PreCallBack() {CreateWaitElement().style.display = ""; }
function Anthem_PostCallBack() {document.getElementById("loading").style.display="none";}

function getObject(objectId)
{
	if(document.getElementById)
	{
		return document.getElementById(objectId)
	}
	else if(document.all&&document.all(objectId))
	{
		return document.all(objectId)
	}
	else
	{
		return false
	}
}

function hideObject(objectId)
{
	var obj=getObject(objectId);
				
	if(obj&&obj.style)
	{
		obj.style.display="none";					
		return true
	}
	return false
}

function showObject(objectId)
{
	var obj=getObject(objectId);
	if(obj&&obj.style)
	{
		obj.style.display="";
		return true
	}
	return false
}

function hideComment(){
	hideObject("commentForm");
	hideObject("commentform");
	return;
}

function showComment(){
	return;
}

