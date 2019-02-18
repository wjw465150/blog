// 登录
function showid(idname){
var isIE = (document.all) ? true : false;
var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
var newbox=document.getElementById(idname);
newbox.style.zIndex="9999";
newbox.style.display="block"
newbox.style.position = !isIE6 ? "fixed" : "absolute";
newbox.style.top =newbox.style.left = "50%";
newbox.style.marginTop = - newbox.offsetHeight / 2 + "px";
newbox.style.marginLeft = - newbox.offsetWidth / 2 + "px";
var layer=document.createElement("div");
layer.id="layer";
layer.style.width=layer.style.height="100%";
layer.style.position= !isIE6 ? "fixed" : "absolute";
layer.style.top=layer.style.left=0;
layer.style.backgroundColor="#000";
layer.style.zIndex="9998";
layer.style.opacity="0.6";
document.body.appendChild(layer);
var sel=document.getElementsByTagName("select");
for(var i=0;i<sel.length;i++){
sel[i].style.visibility="hidden";
}
function layer_iestyle(){
layer.style.width=Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)
+ "px";
layer.style.height= Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) +
"px";
}
function newbox_iestyle(){
newbox.style.marginTop = document.documentElement.scrollTop - newbox.offsetHeight / 2 + "px";
newbox.style.marginLeft = document.documentElement.scrollLeft - newbox.offsetWidth / 2 + "px";
}
if(isIE){layer.style.filter ="alpha(opacity=60)";}
if(isIE6){
layer_iestyle()
newbox_iestyle();
window.attachEvent("onscroll",function(){
newbox_iestyle();
})
window.attachEvent("onresize",layer_iestyle)
}
layer.onclick=function(){newbox.style.display="none";layer.style.display="none";for(var i=0;i<sel.length;i++){
sel[i].style.visibility="visible";
}}
}

// 邮件

function initrequest(url){
	var http_request = false;
	//initialize vars
	var email=document.wr.email.value;
	var name=document.wr.name.value;
	var message=document.wr.message.value;
	var website=document.wr.website.value;
	var hint="";
	var msg="姓名: "+name+" \n网址: "+website+" \n邮箱: "+email+"\n\n"+"\n"+"邮件内容:\n"+message;
   	
	var passData="email="+email+"&name="+name+"&message="+msg;

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!http_request) {
            alert('Error: Unable to initialize class');
            return false;
        }
        http_request.onreadystatechange = function() { sendrequest(http_request); };
        http_request.open('POST', url, true);
       	http_request.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
		if (email && name && message)
		{
			http_request.send(passData);

		}else 
		{
			if (!email)
			{
				hint+="请填写电子邮件地址<br />";			
			}
			if (!name)
			{
				hint+="请填写您的昵称<br />";			
			}
			if (!message)
			{
				hint+="请填写您的留言<br />";			
			}
			
			document.getElementById('hint').innerHTML=hint;	
			
		}
		
}

function sendrequest(http_request) {
		if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				document.getElementById('hint').innerHTML = http_request.responseText;	
				document.getElementById('form_name').value = '';
				document.getElementById('form_email').value = '';
				document.getElementById('form_website').value = '';
				document.getElementById('form_message').value = '';
			} 
			else {
				HideIndicator()
                document.getElementById('hint').innerHTML = '邮件没有发送成功，请稍后再试。谢谢！';
            }
        }
}

