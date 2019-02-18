/*---------------------------------------------------------------------------*\
|  Subject: JavaScript Framework
|  Author:  meizz
|  Created: 2005-02-27
|  Version: 2007-06-06
|-----------------------------------
|  MSN:huangfr@msn.com QQ:112889082 Copyright(c) meizz
|  http://www.meizz.com/jsframework/ MIT-style license
|  The above copyright notice and this permission notice shall be
|  included in all copies or substantial portions of the Software
\*---------------------------------------------------------------------------*/

if(typeof(System)!="function"&&typeof(Using)!="function"){
var S=window.System=function(){this.setHashCode();}

S.debug=false; //false
S.currentVersion="20070606";

S._codebase={};try{
if(window!=parent && parent.System && parent.System._codebase)
  S._codebase=parent.System._codebase;
else if(typeof(opener)!="undefined"&&opener.System&&opener.System._codebase)
  S._codebase=opener.System._codebase;
else if(typeof(dialogArguments)!="undefined" && dialogArguments.System)
  S._codebase=dialogArguments.System._codebase;}catch(ex){}

var t=document.getElementsByTagName("SCRIPT");
t=(S.scriptElement=t[t.length-1]).src.replace(/\\/g,"/");
S.extend=function(d,s){for(var i in s)d[i]=s[i];return d;};
S.path=(t.lastIndexOf("/")<0)?".":t.substring(0, t.lastIndexOf("/"));
S.resourcePath=S.path +"/System/_resource";S.hashCounter=0;
S.NOT_SUPPORTED_XMLHTTP="Your browser do not support XMLHttp";
S.getUniqueId=function(){return "mz_"+(System.hashCounter++).toString(36)}
S.toHashCode=function(e)
{
  if(typeof(e.hashCode)!="undefined")return e.hashCode;
  return (e.hashCode=System.getUniqueId());
};
S.supportsXmlHttp=function()
{
  return "object"==typeof(System.xhr||(System.xhr=new XMLHttpRequest()));
};
S._getPrototype=function(ns, argu)
{
  if(typeof(System._prototypes[ns])=="undefined")return new System();
  for(var a=[],i=0;i<argu.length;i++)a[i]="argu["+i+"]";
  return eval("new (System._prototypes['"+ns+"'])("+a.join(",")+")");
};
S.ie=navigator.userAgent.indexOf("MSIE")>0&&!window.opera;
S.alert=function(msg){if(System.debug)alert(msg);};
S._userdata=(System.ie && !System.debug);S._parseResponse=function(ns,s)
{
  if(s==null||s.charAt(0)=="\uFFFD"){
    System.alert("Maybe file encoding isn't ANSI or UTF-8");return ""}
  if(s.charAt(0)=="\xef")s=s.substr(3); //for firefox
  s=s.replace(/(^|\n)\s*\/\/+\s*((Using|Import|Include)\((\"|\'))/g,"$1$2");
  if(System._userdata)System.saveUserData(ns,s);return s;
};

if(!window.XMLHttpRequest&&window.ActiveXObject)
{
  window.XMLHttpRequest=function(){
  for(var i=0,a=['MSXML3','MSXML2','Microsoft'];i<a.length;i++)
    try{return new ActiveXObject(a[i]+'.XMLHTTP')} catch(ex){}
  System.xhr="mz";throw new Error(System.NOT_SUPPORTED_XMLHTTP);}
}
S.load=function(namespace, path)
{
  var x,ns=namespace,S=System; path=S._mapPath(ns, path);
  if(S._userdata&&/\.js$/i.test(path)&&(x=S.loadUserData(ns)))
    return (S._codebase[ns]="//from userdata\r\n"+ x);
  try
  {
    if(S.supportsXmlHttp()){
      x=S.xhr; x.open("GET",path,false); x.send(null);
    if (x.readyState==4){if(x.status==0||/^file\:/i.test(path))
      return S._parseResponse(ns,x.responseText);
    else if(x.status==200)return S._parseResponse(ns,x.responseText);
    else if(x.status==404)S.alert(ns+"\nFile not found");
    else throw new Error(x.status +": "+ x.statusText);}}
    else S.alert(S.NOT_SUPPORTED_XMLHTTP);
  }
  catch(ex){S.alert(ns+"\n"+ex.message);}return "";
};
S._exist=function(ns, path)
{
  if(typeof(System._existences[ns])=="undefined") return false;
  return System._existences[ns]==System._mapPath(ns,path);
};
S._mapPath = function(ns, path)
{
  if(typeof(path)=="string" && path.length>3) return path;
  var p=System.path +"/"+ ns.replace(/\./g,"/")+".js";
  return p+((typeof(path)=="undefined"||path)?"":"?t="+Math.random());
};

window.Using = function(namespace,path,rename)
{
  var N=namespace,C=N.substr(N.lastIndexOf(".")+1),S=System,i=S._prototypes;
  if(S._exist(N,path)){if(window[C]!=i[N])window[C]=i[N];return}
  if(!/((^|\.)[\w_\$]+)+$/.test(N))throw new Error(N+" nonstandard namespace")

  for(var s,e,c=N+".",i=c.indexOf(".");i>-1;i=c.indexOf(".",i+1)){
  e=c.substring(0,i);s=(e.indexOf(".")==-1)?"window['"+e+"']":e;
  if(e&&typeof(eval(s))=="undefined")
  eval(s+"=function(){return System._getPrototype('"+e+"',arguments)}");}

  if(typeof(S._codebase[N])!="string"&&(s=S.load(N,path))) S._codebase[N]=
    s+";\r\nSystem._prototypes['"+N+"']=window['"+(rename||C)+"']="+C;s="";
  S._existences[N]=S._mapPath(N, path);

  if("string"==typeof (s=System._codebase[N]))try{(new Function(s))()}
  catch(e){System.alert("Syntax error on load "+ N +"\n"+ e.message);}
  //alert(System._codebase[namespace])
};
window.Import=function(namespace,path,rename){Using(namespace,path,rename)};
window.Instance=function(hashCode){return System._instances[hashCode]};
window.Include=function(namespace, path)
{
  var N=namespace,c,S=System,X=S.supportsXmlHttp();if(S._exist(N,path))return;
  if(!/((^|\.)[\w_\$]+)+$/.test(N))throw new Error(N+" nonstandard namespace")

  if(typeof(S._codebase[N])!="string")if(X&&(c=S.load(N,path)))
  S._codebase[N]=c;S._existences[N]=S._mapPath(N,path);

  var B=(typeof(S._codebase[N])=="string");try{
  if(window.execScript&&B)window.execScript(S._codebase[N]);else
  {
    var s=document.createElement("SCRIPT");s.type="text/javascript";
    if(B)s.innerHTML="eval(System._codebase['"+N+"']);";
    else s.src=S._existences[N]=S._mapPath(N,path);
    document.getElementsByTagName("HEAD")[0].appendChild(s);s=null}
  }catch(B){S.alert("Syntax error on include "+N+"\n"+ B.message);}
};

Function.prototype.Extends=function(SuperClass,ClassName)
{
  var op=this.prototype, i, p=this.prototype=new SuperClass();
  if(ClassName)p._className=ClassName; for(i in op)p[i]=op[i];
  if(p.hashCode)delete System._instances[p.hashCode];return p;
};
S._prototypes={"System":S,"System.Object":S,"System.Event":System.Event};
S._existences={"System.Event":S._mapPath("System.Event"),
  "System":S._mapPath("System"),"System.Object":S._mapPath("System.Object")};
var t=System.Extends(Object, "System"); S.Object=S; S._instances={};
t.addEventListener=function(type, handle)
{
  if(typeof(handle)!="function")
    throw new Error(this+" addEventListener: "+handle+" is not a function");
  if(!this._listeners) this._listeners={};
  var id=System.toHashCode(handle), t=this._listeners; 
  if(typeof(t[type])!="object") t[type]={}; t[type][id]=handle;
};
t.removeEventListener=function(type, handle)
{
  if(!this._listeners)this._listeners={};var t=this._listeners;
  if(!t[type]) return; var id=System.toHashCode(handle);
  if( t[type][id])delete t[type][id];if(t[type])delete t[type];
};
t.dispatchEvent=function(evt)
{
  if(!this._listeners)this._listeners={};
  var i, t =this._listeners, p =evt.type;
  evt.target=evt.srcElement=evt.target||evt.srcElement||this;
  evt.currentTarget=this;if(this[p])this[p](evt);
  if(typeof(t[p])=="object") for(i in t[p]) t[p][i].call(null, evt);
  delete evt.target;delete evt.currentTarget;delete evt.srcElement;
  return evt.returnValue;
};
t.dispose=function()
{
  if(this.hashCode) delete System._instances[this.hashCode];
  for(var i in this)if(typeof(this[i])!="function")delete this[i];
};
t.setHashCode=function()
{
  System._instances[(this.hashCode=System.getUniqueId())]=this;
};
t.getHashCode=function()
{
  if(!this.hashCode)this.setHashCode();return this.hashCode;
};
t.decontrol=function(){delete System._instances[this.hashCode];}
t.toString=function(){return "[object "+(this._className||"Object")+"]"};
S.getType=function(e)
{
  if(typeof(e)!="object")return typeof(e);
  if(e=="[object Object]")return "object";
  if(/\[object\s+([^\s\]]+)\]/.test(e))return RegExp.$1;
  else return "object";
};
System.Event=function(type){this.type=type;};
t=System.Event.Extends(System,"System.Event");
t.returnValue=true;t.cancelBubble=false;
t.target=t.currentTarget=t.srcElement=null;

if(System.ie){S.scriptElement.addBehavior("#default#userdata");
S.saveUserData=function(key, value)
{
  try{var d=new Date();d.setDate(d.getDate()+3);//3 day
  var t=System.scriptElement;t.load(key.replace(/\W/g,"_"));
  t.setAttribute("code",value);
  t.setAttribute("version",System.currentVersion);
  t.expires=d.toUTCString(); t.save(key.replace(/\W/g,"_"));
  return t.getAttribute("code");}catch(ex){}
}
S.loadUserData=function(key)
{
  try{var t=System.scriptElement;t.load(key.replace(/\W/g,"_"));
  if(System.currentVersion!=t.getAttribute("version")){
  if(t.getAttribute("code"))System.deleteUserData(key);
  return "";}return t.getAttribute("code");}catch(ex){return ""}
}
S.deleteUserData=function(key)
{
  try{var t=System.scriptElement;t.load(key.replace(/\W/g,"_"));
  t.expires=new Date(315532799000).toUTCString();
  t.save(key.replace(/\W/g, "_"));}catch(ex){}}
} S=t=null;

try
{
  if(window.opera) Include("System.Plugins.Opera");
  Include("System.Global");

  Include("Csdn.Common");
}catch(ex){}}
