(function(){
	if(typeof(VUS.Utility)=="undefined"){
		VUS.vusbho.JsCall("TsLog", "JsLog: define VUS.Utility");
		VUS.Utility = {
			version:"3002",
			DapCtrl:null,
			GetElementTop:function(elem){
				var nTop = 0;
				var elemc = elem;
				while(elemc){
					nTop += elemc.offsetTop;
					elemc = elem.offsetParent;
					elem = elemc;
				}
				return nTop;
			},
			GetElementLeft:function(elem){
				var nLeft = 0;
				var elemc = elem;
				while(elemc){
					nLeft += elemc.offsetLeft;
					elemc = elem.offsetParent;
					elem = elemc;
				}
				return nLeft;
			},
			GetDapCtrl:function(){
				if(null == this.DapCtrl) {
					this.DapCtrl = new ActiveXObject("DapCtrl.DapCtrl");
				}
				return this.DapCtrl;
			},
			DownloadUrl:function(url, fun){
				var xmlHttp = VUS.vusbho.JsCall("CreateXmlHttpRequest");
				if(xmlHttp){
					xmlHttp.open("GET", url, true);
					xmlHttp.onreadystatechange = function(){
						if(xmlHttp){
							if(xmlHttp.readyState == 4) {
								fun(xmlHttp.responseText, xmlHttp.status);
								xmlHttp = null;
							}
						}
					};
					xmlHttp.send(null);
				}
			},
			SendConvStat:function(oParam, sJsVer){
				var url = "http://user.stat.xmp.xunlei.com/?u=vus";
				for(var key in oParam){
					var sU = "&"+key+"="+String(oParam[key]);
					url += sU;
				}
				var peerid = VUS.vusbho.JsCall("GetXmpPeerID");
				var vusversion = VUS.vusbho.JsCall("GetVUSVersion");
				url += "&u7=" + sJsVer;
				url += "&u8=" + vusversion;
				url += "&u9=" + peerid;
				url += "&ct=" + new Date().getTime();
				var img = new Image();  
				img.src = url;
			},
			IsThunderLink:function(elem){
				if(typeof(elem.thunderHref)!="undefined"){
					return true;
				}
				if(typeof(elem.thunderResTitle)!="undefined"){
					return true;
				}
				return false;
			},
			GetDomainName:function(){
				var sDomain = document.domain;
				var pos = sDomain.lastIndexOf(".");
				if(pos>=0){
					var posFix = sDomain.substring(pos+1);
					var sLeft = sDomain.substring(0, pos);
					if(posFix=="cn"){
						pos = sLeft.lastIndexOf(".");
						if(pos>=0){
							sLeft = sLeft.substring(0, pos);
							pos = sLeft.lastIndexOf(".");
							if(pos>=0){
								var sRet = sDomain.substring(pos+1);
								return sRet;
							}
						}
						return sDomain;
					}else{
						pos = sLeft.lastIndexOf(".");
						if(pos>=0){
							var sRet = sDomain.substring(pos+1);
							return sRet;
						}
						return sDomain;
					}
				}
				return "unknown";
			},
			GetAreaInfo:function(fun){
				if(typeof(this.AreaInfo)=="object"){
					fun();
				}else{
					this.DownloadUrl("http://zone.xmp.kankan.xunlei.com/find_area_js.fcg", function(responseText, status){
						if(status==200){
							if(typeof(responseText)=="string" && responseText.length>0){
								window.execScript(responseText);
								if(typeof(areaInfo)=="object"){
									VUS.Utility.AreaInfo = areaInfo;
									areaInfo = null;
									fun();
								}
							}
						}
					});
				}
			},
			TrimLeft:function(sValue) {
				var pattern = new RegExp("^[\\s]+","gi");
				return sValue.replace(pattern,"");
			},
			TrimRight:function(sValue) {
				var pattern = new RegExp("[\\s]+$","gi");
				return sValue.replace(pattern,"");
			},
			Trim:function(sValue) {
				return this.TrimRight(this.TrimLeft(sValue));
			},
			GetJumpUrl:function(sPlayUrl, sCid){
				var oVideoUrl = new VUS.VideoUrl(sPlayUrl);
				oVideoUrl.Analyse();
				var sJumpUrl = "http://jump2.n0808.com/share.html?";
				sJumpUrl += "ibuildnum=" + VUS.vusbho.JsCall("GetXmpVersion").split(".")[3];
				sJumpUrl += "&sname=" + VUS.vusbho.JsCall("EncodeUrl", oVideoUrl.sFileName);
				sJumpUrl += "&sopenfrom=" + VUS.vusbho.JsCall("EncodeUrl", "weibo_sina");
				if(typeof(sCid)=="string" && sCid.length>0){
					sJumpUrl += "&scid=" + sCid;
				}
				sJumpUrl += "&sext=" + VUS.vusbho.JsCall("EncodeUrl", "."+oVideoUrl.sExtName);
				sJumpUrl += "&surl=" + VUS.vusbho.JsCall("EncodeUrl", sPlayUrl);
				return sJumpUrl;
			}
		};
	}
	
	if(typeof(VUS.VideoUrl)=="undefined"){
		VUS.vusbho.JsCall("TsLog", "JsLog: define VUS.VideoUrl");
		(function(){
			function VideoUrl(url){
				this.sFullUrl = url;
				this.sProtoalHead = "";
				this.sHost = "";
				this.iPort = 0;
				this.aPath = new Array;
				this.sFileName = "";
				this.sExtName = "";
				this.aParam = new Array;
			}
			
			VideoUrl.prototype = {
				Analyse : function(){
					if(typeof(this.sFullUrl)!="string"){
						return;
					}
					var pos = this.sFullUrl.indexOf(":");
					if(pos>=0){
						this.sProtoalHead = this.sFullUrl.substring(0, pos);
						if(this.sFullUrl.length>(pos+3) && this.sFullUrl.charAt(pos+1)=="/" 
							&& this.sFullUrl.charAt(pos+2)=="/"){
							this.AnalyseProtocol();
						}
					}
				},
				AnalyseProtocol : function(){
					if(this.sProtoalHead=="http" || this.sProtoalHead=="ftp"){
						var pos = this.sFullUrl.indexOf("/", this.sProtoalHead.length+3)
						if(pos>=0){
							this.sHost = this.sFullUrl.substring(this.sProtoalHead.length+3, pos);
							var pos2 = this.sFullUrl.indexOf("?", pos+1);
							var sPath = "";
							if(pos2>=0){
								sPath = this.sFullUrl.substring(pos+1, pos2);
								var sParam = this.sFullUrl.substring(pos2+1);
								var aParam = sParam.split("&");
								for(var i=0; i<aParam.length; i++){
									var arrTemp = aParam[i].split("=");
									this.aParam.push({"key":arrTemp[0], "value":arrTemp[1]});
								}
							}else{
								sPath = this.sFullUrl.substring(pos+1);
							}
							this.aPath = sPath.split("/");
							this.sFileName = this.aPath[this.aPath.length-1];
							pos = this.sFileName.lastIndexOf(".");
							if(pos>=0){
								this.sExtName = this.sFileName.substring(pos+1);
							}
							pos = this.sHost.lastIndexOf(":");
							if(pos>=0){
								var sHost = this.sHost;
								this.iPort = parseInt(sHost.substring(pos+1));
								this.sHost = sHost.substring(0, pos);
							}
						}
					}
					else if(this.sProtoalHead=="ed2k"){
						var sFind = "ed2k://|file|";
						var pos = this.sFullUrl.indexOf(sFind);
						if(pos>=0){
							var pos2 = this.sFullUrl.indexOf("|", pos+sFind.length);
							if(pos2>=0){
								this.sFileName = this.sFullUrl.substring(pos+sFind.length, pos2);
								pos = this.sFileName.lastIndexOf(".");
								if(pos>=0){
									this.sExtName = this.sFileName.substring(pos+1);
								}
							}
							sFind = "sources,";
							pos = this.sFullUrl.indexOf(sFind);
							if(pos>=0){
								pos2 = this.sFullUrl.indexOf("|", pos+1);
								if(pos2>=0){
									this.sHost = this.sFullUrl.substring(pos+sFind.length, pos2);
									pos = this.sHost.lastIndexOf(":");
									if(pos>=0){
										var sHost = this.sHost;
										this.iPort = parseInt(sHost.substring(pos+1));
										this.sHost = sHost.substring(0, pos);
									}
								}
							}
						}
					}
				}
			};
			VUS.VideoUrl = VideoUrl;
		})();
	}
})();

