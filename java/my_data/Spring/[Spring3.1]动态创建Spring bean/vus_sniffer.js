(function(){
	if(typeof(VUS.Sniffer)=="undefined"){
		VUS.vusbho.JsCall("TsLog", "JsLog: define VUS.Sniffer");
		VUS.Sniffer = {
			version:"2005",
			snifferstatus:0,
			targetelem:null,
			mouseUrl:"",
			Init:function(){
				VUS.MapFunc.AddFunc("ShareUrl", VUS.Sniffer.ShareUrl);
				VUS.MapFunc.AddFunc("StoreWeb", VUS.Sniffer.StoreWeb);
				VUS.MapFunc.AddFunc("OpenSingleUrl", VUS.Sniffer.OpenSingleUrl);
				VUS.MapFunc.AddFunc("GetCmdLine", VUS.Sniffer.GetCmdLine);
				VUS.MapFunc.AddFunc("GetCmdLineSection", VUS.Sniffer.GetCmdLineSection);
			},
			ExecuteSniffer:function(){
				VUS.vusbho.JsCall("TsLog", "JsLog: enter ExecuteSniffer");
				if(typeof(VUS.Utility)=="object" && typeof(VUS.Config)=="object"){
					VUS.vusbho.JsCall("TsLog", "JsLog:  snifferstatus = "+String(VUS.Sniffer.snifferstatus));
					if(VUS.Sniffer.snifferstatus==0){
						VUS.Sniffer.snifferstatus = 1;
						VUS.Sniffer.Deal();
					}
				}
				VUS.vusbho.JsCall("TsLog", "JsLog:  leave ExecuteSniffer snifferstatus = "+String(VUS.Sniffer.snifferstatus));
			},
			StoreWeb:function(param1, param2){
				var URL = document.URL;
				var title = document.title;
				var sCmdLine = "/sstartfrom iemenuaddstoretab /sopenstoretab " + URL + " /stabtitle " + title;
				var dapCtrl = VUS.Utility.GetDapCtrl();
				if(dapCtrl){
					dapCtrl.Put("sxmp4arg", sCmdLine);
					var oParam = {u1:"sniffer", u2:"storepage", u3:URL, u4:title};
					VUS.Utility.SendConvStat(oParam, VUS.Sniffer.version);
				}
			},
			GetCmdLineSection:function(sPlayUrl, param2){
				var sCmdLine = "";
				if(typeof(sPlayUrl)=="string"){
					sCmdLine = " /sstartfrom _sniffer";
					var sDomainName = VUS.Utility.GetDomainName();
					sCmdLine += " /sopenfrom _sniffer_" + sDomainName;
					if(document.domain==="s.weibo.com");
					else{
						sCmdLine += " /srefpage \"" + document.URL + "\"";
					}
					var oUrl = new VUS.VideoUrl(sPlayUrl);
					oUrl.Analyse();
					if(oUrl.sHost=="thunder.ffdy.cc" || 
					(oUrl.sHost=="VIP.gvodfk.com" && oUrl.iPort==8080)){
						sCmdLine += " /cid " + oUrl.aPath[0];
					}
				}
				return sCmdLine;
			},
			GetCmdLine:function(sPlayUrl, nFlag){
				if(typeof(sPlayUrl)=="string" && typeof(nFlag)=="number"){
					var sCmdLine = "";
					if(nFlag & 0x01){
						sCmdLine = "\"" + sPlayUrl + "\" /sstartfrom _sniffer";
					}else{
						if(nFlag & 0x02){
							sCmdLine = "\"" + sPlayUrl + "\" /sstartfrom _sniffer /addtolist";
						}else{
							sCmdLine = "\"" + sPlayUrl + "\" /sstartfrom _sniffer /addtolist /ibringwindowtotop 0";
						}
					}
					var sDomainName = VUS.Utility.GetDomainName();
					sCmdLine += " /sopenfrom _sniffer_" + sDomainName;
					sCmdLine += " /srefpage \"" + document.URL + "\"";
					var oUrl = new VUS.VideoUrl(sPlayUrl);
					oUrl.Analyse();
					if(oUrl.sHost=="thunder.ffdy.cc" || 
					(oUrl.sHost=="VIP.gvodfk.com" && oUrl.iPort==8080)){
						sCmdLine += " /cid " + oUrl.aPath[0];
					}
					return sCmdLine;
				}
				return "";
			},
			OpenSingleUrl:function(sPlayUrl, nFlag){
				var sCmdLine = VUS.Sniffer.GetCmdLine(sPlayUrl, nFlag);
				var dapCtrl = VUS.Utility.GetDapCtrl();
				if(sCmdLine.length>0 && dapCtrl){
					dapCtrl.Put("sxmp4arg", sCmdLine);
				}
				var oParam = {u1:"sniffer", u2:"singleplay", u3:sPlayUrl};
				VUS.Utility.SendConvStat(oParam, VUS.Sniffer.version);
			},
			ShareUrl:function(sPlayUrl ,sCid){
				var sApiUrl = "http://api.t.sina.com.cn/short_url/shorten.json?source=2043051649&url_long=";
				var URL = document.URL;
				var pos = URL.indexOf("refdapshare=");
				if(pos<0){
					pos = URL.indexOf("?");
					if(pos>0){
						URL += "&refdapshare=" + VUS.vusbho.JsCall("GetVUSVersion");
					}else{
						URL += "?refdapshare=" + VUS.vusbho.JsCall("GetVUSVersion");
					}
				}
				sApiUrl += VUS.vusbho.JsCall("EncodeUrl", URL);
				VUS.Utility.DownloadUrl(sApiUrl, function(responseText, status){
					if(status==200){
						if(typeof(responseText)=="string" && responseText.length>0){
							var oJson = eval(responseText);
							var title = document.title + "，详情页：";
							title += oJson[0].url_short;
							title += "，#边下边播分享# 立即播放->";
							
							title = VUS.vusbho.JsCall("EncodeUrl", title);
							var sJumpUrl = VUS.Utility.GetJumpUrl(sPlayUrl, sCid);
							sJumpUrl = VUS.vusbho.JsCall("EncodeUrl", sJumpUrl);
							var sShareUrl = "http://v.t.sina.com.cn/share/share.php?title=" + title + "&url=" + sJumpUrl;
							VUS.vusbho.JsCall("TsLog", "sShareUrl = " + sShareUrl);
							VUS.vusbho.JsCall("BrouserUrl", sShareUrl);
						}
					}
				});
			},
			GetShowFlag:function(){
				var nFlag = VUS.Config.SHOWFLAG.DEFAULT;
				return nFlag;
			},
			GetFloatShowFlag:function(bHaveThunderFlag){
				var nFlag = VUS.Config.SHOWFLAG.DEFAULT;
				var isInXmp = VUS.vusbho.JsCall("IsInXmp");
				if (isInXmp){
					return nFlag;
				}
				if (bHaveThunderFlag){
					var nRet = VUS.Config.GetUrlFlag();
					if (nRet!=1){
						nFlag = VUS.Config.SHOWFLAG.NOFLOATDLG;
					}
				} 
				else{
					nFlag = VUS.Config.showFlag;
				}
				return nFlag;
			},
			IsCanShowFloatWnd:function(elem){
				var bIsThunderLink = VUS.Utility.IsThunderLink(elem);
				var nFlag = this.GetFloatShowFlag(bIsThunderLink);
				if (nFlag & VUS.Config.SHOWFLAG.NOFLOATDLG){
					return false;
				}
				return true;
			},
			Deal:function(){
				if(typeof(VUS.VideoUrl)=="function"){
					var aSnifferUrl = this.SearchVideoUrls();
					if(null!=aSnifferUrl){
						VUS.vusbho.JsCall("TsLog", "JsLog:  SearchVideoUrls have resutl");
						var showFlag = this.GetShowFlag();
						VUS.Sniffer.showFlag = showFlag;
						if(!(showFlag & VUS.Config.SHOWFLAG.NODETAILDLG)){
							VUS.vusbho.JsCall("DestoryWnd", 3);
							VUS.vusbho.JsCall("ShowTipWnd", true, aSnifferUrl);
							VUS.Sniffer.AttachEvent();
						}
						VUS.Sniffer.snifferstatus = 2;
						return;
					}
				}
				VUS.Sniffer.snifferstatus = 0;
				VUS.vusbho.JsCall("TsLog", "JsLog:  SearchVideoUrls no resutl");
			},
			SearchVideoUrl : function(elem){
				if(typeof(elem)!="object" || null==elem){
					return null;
				}
				var tagName = elem.tagName;
				tagName.toUpperCase()
				if(tagName!="A"){
					return null;
				}
			
				var flag = 0;
				var oCheckUrl = new VUS.CheckUrlKit();
				if(document.domain==="s.weibo.com"){
					var url = elem.title;
					if(typeof(url)=="string"){
						url = VUS.Utility.Trim(url);
						flag = oCheckUrl.AnalyseUrl(url, 2);
						if(flag==2){
							return oCheckUrl.videourl;
						}
					}
					return null;
				}
				var url = elem.outerText;
				if(typeof(url)=='string' && url.length>0){
					url = VUS.Utility.Trim(url);
					flag = oCheckUrl.AnalyseUrl(url, 2);
					if(flag==2){
						return oCheckUrl.videourl;
					}else if(flag==1){
						return null;
					}
				}
				url = elem.thunderResTitle;
				if(typeof(url)=='string' && url.length>0){
					url = VUS.Utility.Trim(url);
					flag = oCheckUrl.AnalyseUrl(url, 2);
					if(flag==2){
						return oCheckUrl.videourl;
					}else if(flag==1){
						return null;
					}
				}
				url = elem.thunderHref;
				if(typeof(url)=='string' && url.length>0){
					url = VUS.Utility.Trim(url);
					flag = oCheckUrl.AnalyseUrl(url, 2);
					if(flag==2){
						return oCheckUrl.videourl;
					}else if(flag==1){
						return null;
					}
				}
				url = elem.href;
				if(typeof(url)=='string' && url.length>0){
					url = VUS.Utility.Trim(url);
					flag = oCheckUrl.AnalyseUrl(url, 2);
					if(flag==2){
						return oCheckUrl.videourl;
					}else if(flag==1){
						return null;
					}
				}
				oCheckUrl = null;
				return null;
			},
			SearchVideoUrls : function(){
				var aSnifferUrl = null;
				var aLinks = document.links;
				var num = aLinks.length;
				var bAttachMouseEvent = (document.domain!="s.weibo.com") && VUS.onload && (!VUS.Sniffer.attachmouseevent);
				if(bAttachMouseEvent) VUS.Sniffer.attachmouseevent = true;
				for(var vus_index=0; vus_index<num; vus_index++){
					var oRet = this.SearchVideoUrl(aLinks[vus_index]);
					if(null!=oRet){
						if(null==aSnifferUrl){
							aSnifferUrl = new Array;
						}
						aSnifferUrl.push(oRet.sFullUrl);
						if(bAttachMouseEvent){
							aLinks[vus_index].setAttribute("vr", "", 0);
							this.AttachMouseEvent(aLinks[vus_index], oRet.sFullUrl);
						}
					}
				}
				return aSnifferUrl;
			},
			ElemAttachMouseEvent : function(){
				if(this.snifferstatus==2 && !VUS.Sniffer.attachmouseevent){
					VUS.Sniffer.attachmouseevent = true;
					var aLinks = document.links;
					var num = aLinks.length;
					for(var vus_index=0; vus_index<num; vus_index++){
						var oRet = this.SearchVideoUrl(aLinks[vus_index]);
						if(null!=oRet){
							aLinks[vus_index].setAttribute("vr", "", 0);
							if(document.domain!="s.weibo.com"){
								this.AttachMouseEvent(aLinks[vus_index], oRet.sFullUrl);
							}
						}
					}
				}
			},
			AttachMouseEvent : function(elem, url){
				elem.setAttribute("timer", 0, 0);
				elem.setAttribute("enterobject", false, 0);
				var bCanShow = this.IsCanShowFloatWnd(elem);
				elem.attachEvent("onmouseleave", function(){
					elem.setAttribute("enterobject", false, 0);
					var timer = elem.getAttribute("timer", 0);
					if(timer==0){
						setTimeout(function(){
							var enterobject = elem.getAttribute("enterobject", 0);
							if(!enterobject){
								var nElementHeight = elem.offsetHeight;
								if(typeof(VUS.vusbho)=="object" && VUS.vusbho!=null){
									VUS.vusbho.JsCall("HideFloatWnd", [10, 0, 0, nElementHeight]);
								}
							}
						}, 500);
					}else{
						clearTimeout(timer);
						elem.setAttribute("timer", 0, 0);
					}
				}, false);
				elem.attachEvent("onmouseenter", function(){
					elem.setAttribute("enterobject", true, 0);
					var timer = elem.getAttribute("timer", 0);
					if(timer!=0){
						clearTimeout(timer);
						elem.setAttribute("timer", 0, 0);
					}
					if(bCanShow){
						timer = setTimeout(function(){
							if(typeof(VUS.vusbho)=="object" && VUS.vusbho!=null 
								&& typeof(VUS.Sniffer)=="object"){
								elem.setAttribute("timer", 0, 0);
								var enterobject = elem.getAttribute("enterobject", 0);
								if(enterobject){
									var nElementTop = VUS.Utility.GetElementTop(elem);
									var nScrollTop = 0;
									if(document.URL.indexOf("free.babakiss.com/dy/")>0){
										nScrollTop = document.body.scrollTop;
									}else{
										nScrollTop = document.documentElement.scrollTop;
									}
									var nElementHeight = elem.offsetHeight;
									var aParam = [nElementTop, nScrollTop, nElementHeight];
									VUS.vusbho.JsCall("ShowFloatWnd", aParam, url);
									VUS.Sniffer.mouseUrl = url;
									VUS.Sniffer.targetelem = elem;
								}
							}
						}, 200);
						elem.setAttribute("timer", timer, 0);
					}
				}, false);
				elem.attachEvent("onmousemove", function(){
					if(typeof(VUS.vusbho)!="object" || VUS.vusbho==null || 
						typeof(VUS.Sniffer)!="object"){
						return;
					}
					elem.setAttribute("enterobject", true, 0);
					if(VUS.Sniffer.mouseUrl==url){
						var nElementTop = VUS.Utility.GetElementTop(window.event.srcElement);
						var nScrollTop = 0;
						if(document.URL.indexOf("free.babakiss.com/dy/")>0){
							nScrollTop = document.body.scrollTop;
						}else{
							nScrollTop = document.documentElement.scrollTop;
						}
						var nElementHeight = window.event.srcElement.offsetHeight;
						var aParam = [nElementTop, nScrollTop, nElementHeight];
						VUS.vusbho.JsCall("MoveFloatWnd", aParam);
					}
				}, false);
				elem.attachEvent("onmousedown", function(){
					if(typeof(VUS.vusbho)!="object" || VUS.vusbho==null 
					||typeof(VUS.Sniffer)!="object" || typeof(VUS.Utility)!="object"){
						return;
					}
					var bDeal = false;
					var btnkey = window.event.button;
					if(btnkey===1){
						var isInXmp = VUS.vusbho.JsCall("IsInXmp");
						if (isInXmp){
							bDeal = true;
						}else{
							if(VUS.Config.dealMouseDown){
								var URL = document.URL;
								if(URL.indexOf("refdapshare")>=0 || URL.indexOf("ref_dap_id")>=0){
									bDeal = true;
								}
								else if(document.domain.indexOf("babakiss.com")>=0){
									bDeal = true;
								}
							}
						}
					}
					if(bDeal){
						var bIsXmpExist = VUS.vusbho.JsCall("IsXmpExist");
						if(bIsXmpExist){
							var sDomain = VUS.Utility.GetDomainName();
							var sCmdLine = url + " /sstartfrom _sniffer /sopenfrom _sniffer_link_" + sDomain;
							var dapCtrl = VUS.Utility.GetDapCtrl();
							if(dapCtrl){
								dapCtrl.Put("sxmp4arg", sCmdLine);
								var oParam = {u1:"sniffer", u2:"clicklink", u3:url, u4:document.URL};
								VUS.Utility.SendConvStat(oParam, VUS.Sniffer.version);
							}
						}else{
							alert("您未安装迅雷看看播放器，请安装迅雷看看播放器后进行播放");
							window.open("http://dl.xunlei.com/xmp.html?from=sniffer", "_blank");
						}
					}
				}, false);
			},
			AttachEvent:function(){
				window.attachEvent("onunload", function(){
					if(typeof(VUS.vusbho)=="object" && VUS.vusbho!=null){
						VUS.vusbho.JsCall("DestoryWnd", 3);
					}
				}, false);
				window.attachEvent("onresize", function(){
					if(typeof(VUS.vusbho)=="object" && VUS.vusbho!=null){
						VUS.vusbho.JsCall("ReSizeTipWnd");
					}
				}, false);
				window.attachEvent("onscroll", function(){
					if(typeof(VUS.vusbho)=="object" && VUS.vusbho!=null){
						VUS.vusbho.JsCall("WindowScroll");
						VUS.vusbho.JsCall("HideFloatWnd", [0, 0, 0, 0]);
					}
				}, false);
				document.attachEvent("onmousemove", function(){
					if(typeof(VUS.vusbho)!="object" || VUS.vusbho==null
					 || typeof(VUS.Sniffer)!="object"){
						return;
					}
					var elem = window.event.srcElement;
					var vr = elem.getAttribute("vr", 0);
					if(typeof(vr)!="string"){
						if(VUS.Sniffer.targetelem){
							var nElementHeight = VUS.Sniffer.targetelem.offsetHeight;
							VUS.vusbho.JsCall("HideFloatWnd", [10, 0, 0, nElementHeight]);
						}
					}
				}, false);
			}
		};
	}
	 
	if(typeof(VUS.CheckUrlKit)=="undefined"){
		VUS.vusbho.JsCall("TsLog", "JsLog: define VUS.Sniffer");
		(function(){
			function CheckUrlKit(){
				this.videourl = null;
			}
			CheckUrlKit.prototype = {
				IsVideoFormat : function(videoformat){
					for (var i=0; i<VUS.Config.aVideoFormat.length; i++){
						if(VUS.Config.aVideoFormat[i]==videoformat)
							return true
					}
					return false
				},
				PreDealUrl : function(sUrl){
					if(typeof(sUrl)=="string"){
						if(20<sUrl.length && sUrl.length<2048){
							for (var i=0; i<VUS.Config.aFilterWord.length; i++){
								var pos = sUrl.indexOf(VUS.Config.aFilterWord[i]);
								if(pos>=0){
									return 0;
								}
							}
							return 1;
						}
					}
					return 0;
				},
				CheckUrl : function(videourl){
					if(videourl instanceof VUS.VideoUrl){
						if(videourl.sProtoalHead=="http"){
							var sRet = videourl.sFullUrl.match("[#]");
							if(sRet==null){
								var pos = videourl.sFullUrl.indexOf("http", 7);
								if(pos>=0){
									return 0;
								}
								if(this.IsVideoFormat(videourl.sExtName)){
									sRet = videourl.sHost.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/);
									if(sRet!=null){
										return 2;
									}
									sRet = videourl.sHost.match(/^((([0-9]{3})|(([0-9]{2})|[0-9]))\.){3}(([0-9]{3})|(([0-9]{2})|[0-9]))$/);
									if(sRet!=null){
										return 2;
									}
								}else{
									if(videourl.aParam.length>0){
										return 0;
									}else{
										return 1;
									}
								}
							}
						}else if(videourl.sProtoalHead=="ftp"){
							if(this.IsVideoFormat(videourl.sExtName)){
								if(videourl.iPort!=0){
									var ret = videourl.sHost.match(/:(.+)@(.+)\.(.+)\.(.+)/);
									if(ret!=null){
										return 2;
									}
									sRet = videourl.sHost.match(/(\w+)\.(\w+)\.(\w+)/);
									if(sRet!=null && videourl.iPort!=0){
										return 2;
									}
								}
							}else{
								return 1;
							}
						}else if(videourl.sProtoalHead=="ed2k"){
							if(this.IsVideoFormat(videourl.sExtName)){
								return 2;
							}else{
								return 1;
							}
						}else if(videourl.sProtoalHead=="magnet" || videourl.sProtoalHead=="gvod" 
								|| videourl.sProtoalHead=="mms" || videourl.sProtoalHead=="rtsp"){
							return 2;
						}
						return 0;
					}
				},
				AnalyseUrl : function(sUrl, nDeep){
					nDeep = nDeep?nDeep : 2;
					var flag = this.PreDealUrl(sUrl);
					if(flag==1){
						var oUrl = new VUS.VideoUrl(sUrl);
						oUrl.Analyse();
						if(oUrl.sProtoalHead=="http"){
							flag = this.CheckUrl(oUrl);
							if(flag==2){
								this.videourl = oUrl;
								return 2;
							}else if(flag==1){
								return 1;
							}else if(flag==0){
								for(var i=0; i<oUrl.aParam.length; i++){
									sUrl = VUS.vusbho.JsCall("DecodeUrl", oUrl.aParam[i].value);
									sUrl = VUS.Utility.Trim(sUrl);
									var oCheckUrl = new VUS.CheckUrlKit;
									flag = oCheckUrl.AnalyseUrl(sUrl, nDeep-1);
									if(flag==2){
										this.videourl = oCheckUrl.GetVideoUrl();
										return 2;
									}
								}
							}
						}else if(oUrl.sProtoalHead=="thunder"){
							sUrl = VUS.vusbho.JsCall("ThunderDecode", sUrl);
							sUrl = VUS.vusbho.JsCall("DecodeUrl", sUrl);
							if(typeof(sUrl)=="string"){
								sUrl = VUS.Utility.Trim(sUrl);
								var oCheckUrl = new VUS.CheckUrlKit;
								flag = oCheckUrl.AnalyseUrl(sUrl, 2);
								if(flag==2){
									this.videourl = oCheckUrl.GetVideoUrl();
								}
								return flag;
							}
						}else if(oUrl.sProtoalHead=="ftp" || oUrl.sProtoalHead=="magnet"
								|| oUrl.sProtoalHead=="gvod" || oUrl.sProtoalHead=="ed2k" ||
								oUrl.sProtoalHead=="mms" || oUrl.sProtoalHead=="rtsp"){
							sUrl = VUS.vusbho.JsCall("DecodeUrl", sUrl);
							sUrl = VUS.Utility.Trim(sUrl);
							var oUrl2 = new VUS.VideoUrl(sUrl);
							oUrl2.Analyse();
							flag = this.CheckUrl(oUrl2);
							if(flag==2){
								this.videourl = oUrl2;
							}
							return flag;
						}
					}
					return 0;
				},
				GetVideoUrl : function(){ 
					return this.videourl;
				},
				IsSureVideoUrl : function(videourl){
					if ((videourl.sProtoalHead==TEXT("http") || videourl.sProtoalHead==TEXT("ftp") || videourl.sProtoalHead==TEXT("ed2k")) 
						&& videourl.sExtName!=_T("torrent")){
							return true;
					}
					return false;
				}
			};
			VUS.CheckUrlKit = CheckUrlKit;
		})();
	}
	
	var black = VUS.IsBlack(document.URL);
	if(!black){
		VUS.Sniffer.Init();
		VUS.Sniffer.ExecuteSniffer();
	}
 
 })();
