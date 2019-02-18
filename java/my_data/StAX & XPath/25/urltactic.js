var undefined;var QUERYPATTERN=/\?/;var TACTICPATTERN=/S_TACT/;var PKGPATTERN=/S_PKG/;var SRCIDPATTERN=/S_SRCID/;var SOURCEPATTERN=/source/;var DEFAULTHERE="S_TACT=105AGX01&S_CMP=LP";var zone_tactic=DEFAULTHERE;function linkQueryAppend(B){if(B.doneOnce!=undefined){return }else{B.doneOnce=true}var F=B.href;var E=new RegExp("\\?.*","g");var C=F.match(E)?F.replace(E,""):F;var D=QUERYPATTERN.test(F)?F.substring(F.indexOf("?")+1):"";var A=buildArgList(D);B.href=C+A}function buildArgList(C){var E="";var A=location.search;
var D=QUERYPATTERN.test(A)?A.substring(A.indexOf("?")+1):"";var B=new Args(C);var G=new Args(D);var F=B.getParams();if(F!=""){E+="?"+F}if(PKGPATTERN.test(C)){E+=(E=="")?"?"+B.getPKG():"&"+B.getPKG()}else{if(PKGPATTERN.test(D)){E+=(E=="")?"?"+G.getPKG():"&"+G.getPKG()}}if(SRCIDPATTERN.test(C)){E+=(E=="")?"?"+B.getSRCID():"&"+B.getSRCID()}else{if(SRCIDPATTERN.test(D)){E+=(E=="")?"?"+G.getSRCID():"&"+G.getSRCID()}}if(SOURCEPATTERN.test(C)){E+=(E=="")?"?"+B.getsource():"&"+B.getsource()}else{if(SOURCEPATTERN.test(D)){E+=(E=="")?"?"+G.getsource():"&"+G.getsource()
}}if(TACTICPATTERN.test(D)){E+=(E=="")?"?"+G.getTactic():"&"+G.getTactic()}else{if(zone_tactic!=""){E+=(E=="")?"?"+zone_tactic:"&"+zone_tactic}}return E}function Args(arglist){this.arglist=arglist==undefined?"":arglist;var args=new Object();var pairs=this.arglist.split("&");for(var i=0;i<pairs.length;i++){var pos=pairs[i].indexOf("=");if(pos==-1){continue}var argname=pairs[i].substring(0,pos);var value=pairs[i].substring(pos+1);args[argname]=value}this.getTactic=function(){var tact=(eval("args.S_TACT")==undefined?"":"S_TACT="+eval("args.S_TACT"));
if(tact!=""){tact+=(eval("args.S_CMP")==undefined?"":"&S_CMP="+eval("args.S_CMP"))}return tact};this.getSRCID=function(){return(eval("args.S_SRCID")==undefined?"":"S_SRCID="+eval("args.S_SRCID"))};this.getPKG=function(){return(eval("args.S_PKG")==undefined?"":"S_PKG="+eval("args.S_PKG"))};this.getsource=function(){return(eval("args.source")==undefined?"":"source="+eval("args.source"))};this.getParams=function(){var re=new RegExp("S_TACT=(.*?&)|(&S_TACT=.[^&]*)|(S_TACT=.*)","gi");var result=this.arglist.replace(re,"");
if(result!=""){re.compile("S_CMP=(.*?&)|(&S_CMP=.[^&]*)|(S_CMP=.*)","gi");result=result.replace(re,"")}if(result!=""){re.compile("S_PKG=(.*?&)|(&S_PKG=.[^&]*)|(S_PKG=.*)","gi");result=result.replace(re,"")}if(result!=""){re.compile("S_SRCID=(.*?&)|(&S_SRCID[^&]*)|(S_SRCID=.*)","gi");result=result.replace(re,"")}if(result!=""){re.compile("source=(.*?&)|(&source=.[^&]*)|(source=.*)","gi");result=result.replace(re,"")}return result}}function setDefaultQuery(zone){var pattern=/[\s]/;if(zone==undefined){return 
}if(pattern.test(zone)||zone==""){return }var tactics={java:"S_TACT=105AGX45&S_CMP=LPJAVA",linux:"S_TACT=105AGX45&S_CMP=LPLINUX",notesdomino:"S_TACT=105AGX13&S_CMP=LPLOTUS",ws:"S_TACT=105AGX45&S_CMP=LPWS",xml:"S_TACT=105AGX45&S_CMP=LPXML",aixlp:"S_TACT=105AGY06&S_CMP=LP",aixart:"S_TACT=105AGY06&S_CMP=ART",aixtut:"S_TACT=105AGY06&S_CMP=TUT",systemslp:"S_TACT=105AGX12&S_CMP=LP",systemsart:"S_TACT=105AGX12&S_CMP=ART",systemstut:"S_TACT=105AGX12&S_CMP=TUT",db2lp:"S_TACT=105AGX11&S_CMP=LP",db2art:"S_TACT=105AGX11&S_CMP=ART",db2tut:"S_TACT=105AGX11&S_CMP=TUT",ibmlp:"S_TACT=105AGX46&S_CMP=LP",ibmart:"S_TACT=105AGX46&S_CMP=ART",ibmtut:"S_TACT=105AGX46&S_CMP=TUT",lotuslp:"S_TACT=105AGX13&S_CMP=LP",lotusart:"S_TACT=105AGX13&S_CMP=ART",lotustut:"S_TACT=105AGX13&S_CMP=TUT",rationallp:"S_TACT=105AGX15&S_CMP=LP",rationalart:"S_TACT=105AGX15&S_CMP=ART",rationaltut:"S_TACT=105AGX15&S_CMP=TUT",edge:"S_TACT=105AGX15&S_CMP=EDGE",tivolilp:"S_TACT=105AGX14&S_CMP=LP",tivoliart:"S_TACT=105AGX14&S_CMP=ART",tivolitut:"S_TACT=105AGX14&S_CMP=TUT",webspherelp:"S_TACT=105AGX10&S_CMP=LP",websphereart:"S_TACT=105AGX10&S_CMP=ART",webspheretut:"S_TACT=105AGX10&S_CMP=TUT",workplacelp:"S_TACT=105AGX10&S_CMP=LP",workplaceart:"S_TACT=105AGX10&S_CMP=ART",workplacetut:"S_TACT=105AGX10&S_CMP=TUT",architecturelp:"S_TACT=105AGX78&S_CMP=LP",architectureart:"S_TACT=105AGX78&S_CMP=ART",architecturetut:"S_TACT=105AGX78&S_CMP=TUT",autonomiclp:"S_TACT=105AGX09&S_CMP=LP",autonomicart:"S_TACT=105AGX09&S_CMP=ART",autonomictut:"S_TACT=105AGX09&S_CMP=TUT",gridlp:"S_TACT=105AGX07&S_CMP=LP",gridart:"S_TACT=105AGX07&S_CMP=ART",gridtut:"S_TACT=105AGX07&S_CMP=TUT",javalp:"S_TACT=105AGX02&S_CMP=LP",javaart:"S_TACT=105AGX02&S_CMP=ART",javatut:"S_TACT=105AGX02&S_CMP=TUT",linuxlp:"S_TACT=105AGX03&S_CMP=LP",linuxart:"S_TACT=105AGX03&S_CMP=ART",linuxtut:"S_TACT=105AGX03&S_CMP=TUT",opensourcelp:"S_TACT=105AGX44&S_CMP=LP",opensourceart:"S_TACT=105AGX44&S_CMP=ART",opensourcetut:"S_TACT=105AGX44&S_CMP=TUT",powerlp:"S_TACT=105AGX16&S_CMP=LP",powerart:"S_TACT=105AGX16&S_CMP=ART",powertut:"S_TACT=105AGX16&S_CMP=TUT",webserviceslp:"S_TACT=105AGX04&S_CMP=LP",webservicesart:"S_TACT=105AGX04&S_CMP=ART",webservicestut:"S_TACT=105AGX04&S_CMP=TUT",weblp:"S_TACT=105AGX08&S_CMP=LP",webart:"S_TACT=105AGX08&S_CMP=ART",webtut:"S_TACT=105AGX08&S_CMP=TUT",wirelesslp:"S_TACT=105AGX05&S_CMP=LP",wirelessart:"S_TACT=105AGX05&S_CMP=ART",wirelesstut:"S_TACT=105AGX05&S_CMP=TUT",xmllp:"S_TACT=105AGX06&S_CMP=LP",xmlart:"S_TACT=105AGX06&S_CMP=ART",xmltut:"S_TACT=105AGX06&S_CMP=TUT",xmlnewto:"S_TACT=105AGX06&S_CMP=NEWTO",xmlstnd:"S_TACT=105AGX06&S_CMP=STND",grnmoart:"S_TACT=105AGX44&S_CMP=GRNMOART",grnmotut:"S_TACT=105AGX44&S_CMP=GRNMOTUT",derbyart:"S_TACT=105AGX44&S_CMP=DERBYART",derbytut:"S_TACT=105AGX44&S_CMP=DERBYTUT",phpart:"S_TACT=105AGX44&S_CMP=PHPART",phptut:"S_TACT=105AGX44&S_CMP=PHPTUT",eclipseart:"S_TACT=105AGX44&S_CMP=GRNMOART",eclipsetut:"S_TACT=105AGX44&S_CMP=GRNMOTUT",europa:"S_TACT=105AGX44&S_CMP=EUROPA",download:"S_TACT=105AGX45&S_CMP=LPDWNL",dlmain:"S_TACT=105AGX28&S_CMP=DLMAIN",lpcd:"S_TACT=105AGX45&S_CMP=LPCD",sekdvd:"S_TACT=105AGX45&S_CMP=SEKDVD",wsdk:"S_TACT=105AGX18&S_CMP=LPWSDK",tchbrf:"S_TACT=107A727W&S_CMP=TCHBRF",execbrf:"S_TACT=107A727W&S_CMP=LPEXECBRF",db2:"S_TACT=105AGX11&S_CMP=LPDB2",db2gsk:"S_TACT=105AGX11&S_CMP=DB2GSK",dco:"S_TACT=105AGX26&S_CMP=LPDCO",lnxss:"S_TACT=105AGX17&S_CMP=LNXSS",lnxssp:"S_TACT=105AGX17&S_CMP=LNXSSP",lnxssz:"S_TACT=105AGX17&S_CMP=LNXSSZ",wsss:"S_TACT=105AGX18&S_CMP=WSSS",dwt:"S_TACT=105AGX19&S_CMP=ZHP",demos:"S_TACT=105AGX19&S_CMP=DEMOS",ondemand:"S_TACT=105AGX40&S_CMP=ZHP",rrctr:"S_TACT=105AGX15&S_CMP=RRCTR",tbcode:"S_TACT=104AHW62&S_CMP=TBCODE",lpemea:"S_TACT=105AGX51&S_CMP=LPEMEA",db2bb:"S_TACT=105AGX64&S_CMP=DB2LPBB",tvbb:"S_TACT=105AGX64&S_CMP=TVLPBB",rbb:"S_TACT=105AGX64&S_CMP=RLPBB",wesbb:"S_TACT=105AGX64&S_CMP=WESLPBB",lsbb:"S_TACT=105AGX64&S_CMP=LSLPBB",linuxbb:"S_TACT=105AGX64&S_CMP=LINUXLPBB",perjasa:"S_TACT=104AHW25&S_CMP=PERJASA",autonomic:"S_TACT=105AGX09&S_CMP=DWNL",webcast:"S_TACT=105AGX45&S_CMP=LPWC",migrate:"S_TACT=105AGX42&S_CMP=MGST",sdp:"S_TACT=105AGX43&S_CMP=SDP",db2cert703:"S_TACT=105AGX45&S_CMP=CERT703",db2cert512:"S_TACT=105AGX45&S_CMP=CERT512",wesdtuts:"S_TACT=105AGX10&S_CMP=LIB",weswbt:"S_TACT=105AGX10&S_CMP=WBT",lxjdk:"S_TACT=105AGX03&S_CMP=LXJDK",rte:"S_TACT=107A727W&S_CMP=RTE",RTE:"S_TACT=107A727W&S_CMP=RTE",tchevt:"S_TACT=107A727W&S_CMP=TCHEVT",lop:"S_TACT=105AGX41&S_CMP=LOP",powerarch:"S_TACT=105AGX16&S_CMP=DWPA",tutredirect:"S_TACT=105AGX45&S_CMP=TUTRDR",jnewto:"S_TACT=105AGX02&S_CMP=NEWTO",ppred:"S_TACT=104AHW21&S_CMP=PPRED",sumpage:"S_TACT=105AGX68&S_CMP=SP",htb:"S_TACT=105AGX71&S_CMP=HTB",db2dl:"S_TACT=105AGX11&S_CMP=DBDL",lsdl:"S_TACT=105AGX13&S_CMP=LSDL",rdl:"S_TACT=105AGX15&S_CMP=RDL",tvdl:"S_TACT=105AGX14&S_CMP=TVDL",wesdl:"S_TACT=105AGX10&S_CMP=WESDL",defaultHere:"S_TACT=105AGX01&S_CMP=LP",archzn:"S_TACT=105AGX78&S_CMP=HP",workplace:"S_TACT=105AGX79&S_CMP=WP",wtpodcast:"S_TACT=105AGX80&S_CMP=WTP",grnmolp:"S_TACT=105AGX44&S_CMP=GRNMOLP",eclipselp:"S_TACT=105AGX44&S_CMP=ECLLP",phplp:"S_TACT=105AGX44&S_CMP=PHPLP",wasce:"S_TACT=105AGX10&S_CMP=WASCE",journal:"S_TACT=105AGX10&S_CMP=JRNL",derbylp:"S_TACT=105AGX44&S_CMP=DERBYLP",simple:"S_TACT=105AGY03&S_CMP=SIMPLELP",dwrussia:"S_TACT=105AGX99&S_CMP=content",dwchina:"S_TACT=105AGX52&S_CMP=content",dwchinalp:"S_TACT=105AGX52&S_CMP=LP",dwjapan:"S_TACT=105AGX90&S_CMP=content",dwkorea:"S_TACT=105AGX55&S_CMP=content",radcert:"S_TACT=105AGY04&S_CMP=RADCERT",soadvd:"S_TACT=105AGX10&S_CMP=SOADVD",viper:"S_TACT=105AGX11&S_CMP=VIPER",tybpf:"S_TACT=105AGY14&S_CMP=TYBLP",eaklp:"S_TACT=105AGY24&S_CMP=KITLP",callisto:"S_TACT=105AGX44&S_CMP=CALLISTO",testkit:"S_TACT=105AGY25&S_CMP=TESTLP",archlp:"S_TACT=105AGX78&S_CMP=ARCHLP",online:"S_TACT=105AGX28&S_CMP=ONLINE",wescert990lp:"S_TACT=105AGX19&S_CMP=wescert990lp",wescert996lp:"S_TACT=105AGX19&S_CMP=wescert996lp",db2certlp:"S_TACT=105AGX19&S_CMP=db2certlp",radcertlp:"S_TACT=105AGX19&S_CMP=radcert",ajaxlp:"S_TACT=105AGY30&S_CMP=ajaxlp",defaultHereCN:"S_TACT=105AGX52&S_CMP=EDU",defaultHereJP:"S_TACT=105AGX90&S_CMP=EDU",defaultHereKR:"S_TACT=105AGX55&S_CMP=EDU",defaultHereRU:"S_TACT=105AGX99&S_CMP=EDU",hwlp:"S_TACT=105AGX19&S_CMP=HWLP",probundle:"S_TACT=105AGY32&S_CMP=PROBUNDLE",soalaunch:"S_TACT=105AGX04&S_CMP=LAUNCH",demos:"S_TACT=105AGY50&S_CMP=DEMOS",moveup:"S_TACT=105AGY51&S_CMP=RADCELP",camtut:"S_TACT=105AGX19&S_CMP=TUT",btmlp:"S_TACT=105AGX44&S_CMP=BTMLP",spaces:"S_TACT=105AGY56&S_CMP=LP",rbdews:"S_TACT=105AGX15&S_CMP=RBDEWS",dtactr:"S_TACT=105AGY55&S_CMP=DTACTR",db2kit:"S_TACT=105AGY58& S_CMP=KITLP",sandbox:"S_TACT=105AGX28&S_CMP=SANDBOX",emsandbox:"S_TACT=105AGX28&S_CMP=EMSAND",alphaworks:"S_TACT=106AH21W&S_CMP=AWLP",webkit:"S_TACT=105AGY62&S_CMP=KITLP",portalkit:"S_TACT=105AGY64&S_CMP=KITLP",ekitlp:"S_TACT=105AGX28&S_CMP=KITLP",spaces:"S_TACT=105AGY56& S_CMP=space",javaspace:"S_TACT=105AGX02&S_CMP=space",linuxspace:"S_TACT=105AGX03&S_CMP=space",aixspace:"S_TACT=105AGY06&S_CMP=space",systemsspace:"S_TACT=105AGX12&S_CMP=space",db2space:"S_TACT=105AGX11&S_CMP=space",lotusspace:"S_TACT=105AGX13&S_CMP=space",rationalspace:"S_TACT=105AGX15&S_CMP=space",tivolispace:"S_TACT=105AGX14&S_CMP=space",webspherespace:"S_TACT=105AGX10&S_CMP=space",workplacespace:"S_TACT=105AGX10&S_CMP=space",architecturespace:"S_TACT=105AGX78&S_CMP=space",autonomicspace:"S_TACT=105AGX09&S_CMP=space",gridspace:"S_TACT=105AGX07&S_CMP=space",ibmspace:"S_TACT=105AGX46&S_CMP=space",opensourcespace:"S_TACT=105AGX44&S_CMP=space",powerspace:"S_TACT=105AGX16&S_CMP=space",webservicesspace:"S_TACT=105AGX04&S_CMP=space",webspace:"S_TACT=105AGX08&S_CMP=space",wirelessspace:"S_TACT=105AGX05&S_CMP=space",xmlspace:"S_TACT=105AGX06&S_CMP=space",jazzdvd:"S_TACT=105AGX28&S_CMP=jazzdvd",archlp:"S_TACT=105AGY24&S_CMP=ARCHLP"};
var parms_xss=document.URL;parms_xss=parms_xss.replace(/\r\n/g,"\n");var utftext="";var striparg=0;var pos_parm=0;pos_parm=document.URL.indexOf("?");for(var n=0;n<parms_xss.length;n++){var c=parms_xss.charCodeAt(n);if(c==34){c=35;striparg=n}if(c<128){utftext+=String.fromCharCode(c)}else{if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)
}}}if(striparg==0){zone_tactic=(eval("tactics."+zone)==undefined?"":eval("tactics."+zone))}else{document.URL=utftext.substring(0,pos_parm)}};
