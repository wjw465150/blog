;(function(global){
	global.Ta=global.Ta||{};
	Ta.hack=function(){
		return {params:'',
			conf:{sid:9945280,pf:2,hot:{}}		};
	};
})(this);

(function(g,t){function y(d){return(d=document.cookie.match(RegExp("(?:^|;\\s)"+d+"=(.*?)(?:;\\s|$)")))?d[1]:""}function z(d,a,b){d=d+"="+a+";path=/;domain=";a=window.location.host;var c={"com.cn":1,"net.cn":1,"gov.cn":1,"com.hk":1},e=a.split(".");2<e.length&&(a=(c[e.slice(-2).join(".")]?e.slice(-3):e.slice(-2)).join("."));document.cookie=d+a+(b?";expires="+b:"")}function u(d){var a,b,c,e={};void 0===d?(c=window.location,d=c.host,a=c.pathname,b=c.search.substr(1),c=c.hash):(c=d.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i)||
[],d=c[1],a=c[2],b=c[3],c=c[4]);if(b)for(var g=b.split("&"),l=0,q=g.length;l<q;l++)if(-1!=g[l].indexOf("=")){var n=g[l].indexOf("="),p=g[l].slice(0,n),n=g[l].slice(n+1);e[p]=n}return{host:d,path:a,search:b,hash:c,param:e}}function A(d){return(d||"")+Math.round(2147483647*(Math.random()||0.5))*+new Date%1E10}function B(d,a){var b=document.createElement("script"),c=document.getElementsByTagName("script")[0];b.src=d;b.type="text/javascript";b.onload=b.onerror=b.onreadystatechange=function(){/loaded|complete|undefined/.test(b.readyState)&&
(b.onload=b.onerror=b.onreadystatechange=null,b.parentNode.removeChild(b),b=void 0,a())};c.parentNode.insertBefore(b,c)}function x(d){d=d||{};if(d.conf){var a=d.conf,b;for(b in a)a.hasOwnProperty(b)&&(g[b]=a[b])}if(g.sid&&!Ta[g.sid]){a=[];b=0;var c=u(),c={dm:c.host,pvi:"",si:"",url:c.path,arg:encodeURIComponent(c.search||""),ty:1},e=y("pgv_pvi");e||(c.ty=0,e=A(),z("pgv_pvi",e,"Sun, 18 Jan 2038 00:00:00 GMT;"));c.pvi=e;e=y("pgv_si");e||(e=A("s"),z("pgv_si",e));c.si=e;var e=u(document.referrer),s=u(),
e={rdm:e.host,rurl:e.path,rarg:encodeURIComponent(e.search||""),adt:s.param.ADTAG||s.param.adtag},s={r2:g.sid,r3:"undefined"==typeof _speedMark?"-1":new Date-_speedMark,r4:g.pf||1},l;a:{try{var w=navigator,n=screen||{width:"",height:"",colorDepth:""},p=document.body,t=n.width+"x"+n.height,x=n.colorDepth+"-bit",E=(w.language||w.userLanguage).toLowerCase(),F=w.javaEnabled()?1:0,G=(new Date).getTimezoneOffset()/60,n="";p.addBehavior&&(p.addBehavior("#default#clientCaps"),n=p.connectionType);var p={fl:"",
scr:t,scl:x,lg:E,jv:F,tz:G,ct:n},m,j,f;if((l=w.plugins)&&(m=l.length))for(f=0;f<m;f++){if(j=l[f].description.match(/Shockwave Flash ([\d\.]+) \w*/))p.fl=j[1]}else f=(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version"),p.fl=f.replace(/^.*\s+(\d+)\,(\d+).*$/,"$1.$2")}catch(I){l={};break a}l=p}m={};if("undefined"!=typeof _taadHolders&&0<_taadHolders.length){j=0;f=_taadHolders;for(p=f.length;j<p;j++)m[f[j]]=m[f[j]]?m[f[j]]+1:1}j=[];for(var v in m)m.hasOwnProperty(v)&&j.push(v+
"*"+m[v]);v={ext:"adid="+j.join(":")};var h;m=[];for(h in q)j=y(q[h].c_id),"afs"==h?f=(f=/ssid=([^&]*)/i.exec(u().hash))&&f[1]?f[1]:"":(f=u().param,f=f[q[h].id]?f[q[h].id]:""),f?(m.push("ty="+q[h].key+";ck=0;id="+f),j=new Date,j.setTime(j.getTime()+2592E6),z(q[h].c_id,f,j.toGMTString())):j&&m.push("ty="+q[h].key+";ck=1;id="+j);h={pf:m.join("|")};h=[c,e,s,l,v,h,{random:+new Date}];for(c=h.length;b<c;b++)for(var k in h[b])h[b].hasOwnProperty(k)&&a.push(k+"="+(h[b][k]||""));d.params&&a.push(d.params);
var C=Ta.src=("https:"==document.location.protocol?"https://pingtas":"http://pingtcss")+".qq.com/pingd?"+a.join("&"),r=new Image;Ta[g.sid]=r;r.onload=r.onerror=r.onabort=function(){r=r.onload=r.onerror=r.onabort=null;Ta[g.sid]=!0};r.src=C;if(1*!g.pf||g.hot.isValid){d=window.location;k=d.host+d.pathname;var H=d.pathname,D=function(){B("http://imgcache.qq.com/bossweb/ta/scripts/ping_hotclick_min.js",function(){window.hotclick&&(new hotclick(C)).watchClick()})};if(1*g.pf)RegExp(k).test(g.hot.url)&&D();
else{k=g.sid;d="http://tcss.qq.com/heatmap/"+k%100+"/";k+="";h=k.length;b=0;for(a="";b<h;){c=k.charCodeAt(b++)&255;if(b==h){a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c>>2);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((c&3)<<4);a+="==";break}e=k.charCodeAt(b++);if(b==h){a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c>>2);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((c&3)<<
4|(e&240)>>4);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e&15)<<2);a+="=";break}s=k.charCodeAt(b++);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c>>2);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((c&3)<<4|(e&240)>>4);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e&15)<<2|(s&192)>>6);a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(s&63)}B(d+
a+".js?random="+ +new Date,function(){var a;if(window._Cnf&&(a=window._Cnf.url)){a=a.split("|");for(var b=0;b<a.length;b++)if(a[b]==H){D();break}}})}}g.logo&&255!=g.logo&&(d=g.logo,k={9:"\u817e\u8baf\u5206\u6790",10:"\u7f51\u7ad9\u7edf\u8ba1",df:'<img src="http://tcss.qq.com/icon/toss_'+d+'.gif" border="0" />'},document.write(['<a href="http://ta.qq.com?ADTAG=FROUM.FOOTER.CLICK.ICON" title="\u817e\u8baf\u5206\u6790" target="_blank">',k[d]||k.df,"<a>"].join("")))}}var q={afs:{key:1,id:"ssid",c_id:"pgv_afsid",
fr:"hash"},afc:{key:2,id:"__tacid",c_id:"pgv_afcid",fr:"param"},gdt:{key:11,id:"qz_gdt",c_id:"pgv_gdtid",fr:"param"}};t.pgvSendClick=function(d,a){var b=Ta.src.replace(/ext=[^&]*/,function(){return"ext="+("evtid"==a?"ty=0;evtid=":"adid=")+d}).replace(/r2=([^&]*)/,function(a,b){return"r2=a"+b});(new Image(1,1)).src=b};t.Ta=t.Ta||{};Ta.pgv=x;!Ta.async&&x(Ta.hack?Ta.hack():"")})({sid:"",pf:"",hot:{url:"",isValid:!1}},this);
