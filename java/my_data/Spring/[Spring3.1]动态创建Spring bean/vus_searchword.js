(function(){
	if(typeof(VUS.SearchWord)=="undefined"){
		VUS.vusbho.JsCall("TsLog", "JsLog: define VUS.SearchWord");
		VUS.SearchWord = {
			version:"20002",
			EM:"<EM vus_zhaokan=\"KEYWORD\" style=\"color:#ff0000;font-style:normal\">KEYWORD</EM>",
			EMU:"<EM style=\"color:#ff0000;font-style:normal;cursor:hand;text-decoration:underline\" \
				onclick = \"VUS.SearchWord.OnEmMouseDown(this)\" vus_zhaokan=\"KEYWORD\">KEYWORD</EM>",
			FilterSite:[
				"youku.com", "tudou.com", "qiyi.com", "xunlei.com", "iqiyi.com", "tv.sohu.com", "v.qq.com",
				"letv.com", "ku6.com", "56.com", "pptv.com", "v.pps.tv", "cntv.com", "video.sina.com.cn",
				"kankan.com", "sandai.net"
			],
			IsBlackSite:function(){
				for(var i=0; i<this.FilterSite.length; i++){
					if(document.URL.indexOf(this.FilterSite[i])>=0){
						return true;
					}
				}
				return false;
			},
			OnEmMouseDown:function(elem){
				var keyword = elem.getAttribute("vus_zhaokan", 0);
				if(typeof(keyword)=="string"){
					this.SearchWrodInXmp(keyword, 1);
					window.event.cancelBubble = true;
					window.event.returnValue = false;
				}
			},
			SearchWrodInXmp:function(keyword, mousedown){
				var sCmdLine = "/sstartfrom iesearchword /skeyword " + keyword;
				var bIsXmpExist = VUS.vusbho.JsCall("IsXmpExist");
				if(bIsXmpExist){
					var dapCtrl = VUS.Utility.GetDapCtrl();
					if(dapCtrl){
						dapCtrl.Put("sxmp4arg", sCmdLine);
					}
					var sType = String(this.searchLevel) + String(mousedown);
					var oParam = {u1:"searchword", u2:"clickword", u3:keyword, u4:document.URL, u5:sType};
					VUS.Utility.SendConvStat(oParam, VUS.SearchWord.version);
				}else{
					alert("您未安装迅雷看看播放器，请安装迅雷看看播放器后进行搜索播放");
					window.open("http://dl.xunlei.com/xmp.html?from=sniffer", "_blank");
					var sType = String(this.searchLevel) + String(mousedown);
					var oParam = {u1:"searchword", u2:"exception", u3:"missingxmp", u4:sType};
					VUS.Utility.SendConvStat(oParam, VUS.SearchWord.version);
				}
			},
			SearchKeyWord:function(){
				VUS.vusbho.JsCall("TsLog", "JsLog: enter SearchKeyWord");
				var aTargetElems = new Array();
				var aAll = document.body.all;
				for(var i=0; i<aAll.length; i++){
					var elem = aAll[i];
					var bDealElem = this.IsDealElem(elem);
					if(bDealElem){
						if(elem.outerText.length>0){
							var aRet = elem.outerText.match(VUS.SearchWord.sRegKeyWord);
							if(aRet){
								aTargetElems.push({targetelem:elem, keyword:aRet[0]});
							}
						}
					}
				}
				VUS.vusbho.JsCall("TsLog", "JsLog: aTargetElems.lenght = " + String(aTargetElems.length));
				var bRet = this.DealKeyWordElem(aTargetElems);
				aTargetElems = null;
				VUS.vusbho.JsCall("TsLog", "JsLog: leave SearchKeyWord");
				return bRet;
			},
			IsDealElem:function(elem){
				if(elem.style.visibility!="hidden" && elem.style.display!="none"){
					var aChildren = elem.children;
					if(aChildren.length==0){
						return true;
					}else{
						for(var c=0; c<aChildren.length; c++){
							var cElem = aChildren[c];
							if(cElem.tagName==="!"){}
							else{
								return false;
							}
						}
						return true;
					}
				}
				return false;
			},
			DealKeyWordElem:function(aTargetElems){
				if(aTargetElems.length>0){
					var oParam = {u1:"searchword", u2:"hitword", u3:String(aTargetElems.length), u4:document.URL, u5:String(this.searchLevel)};
					VUS.Utility.SendConvStat(oParam, VUS.SearchWord.version);
					for(var index=0; index<aTargetElems.length; index++){
						var elem = aTargetElems[index].targetelem;
						var sReplace = "";
						if(this.searchLevel==1){
							sReplace = this.EM;
						}else if(this.searchLevel==2){
							sReplace = this.EM;
						}
						var keywrod = aTargetElems[index].keyword;
						var rKeyWord = sReplace.replace(/KEYWORD/g, keywrod);
						var innerHTML = elem.innerHTML.replace(keywrod, rKeyWord);
						elem.innerHTML = innerHTML;
					}
					return true;
				}
				return false;
			},
			IsAOrUOrUnderline:function(elem){
				var tagName = elem.tagName;
				tagName.toUpperCase();
				while(tagName!="BODY"){
					if(tagName==="A" || tagName==="U" ||
						elem.style.textDecorationUnderline){
						return true;
					}
					elem = elem.parentElement;
					tagName = elem.tagName;
					tagName.toUpperCase();
				}
				return false;
			},
			CreateFloatDiv:function(){
				var oDiv = document.createElement("div");
				oDiv.id = "vud_div";
				oDiv.style.width = "81px"
				oDiv.style.height = "24px"
				oDiv.style.position = "absolute"
				oDiv.style.zIndex = "1999999"
				oDiv.style.backgroundColor = "transparent";
				oDiv.style.visibility = "hidden";
				oDiv.style.cursor = "hand";
				oDiv.innerHTML= "<img id=vus_searchword_img src= 'normal.png'>";
				oDiv.onclick = function(){
					VUS.SearchWord.SearchWrodInXmp(this.keyword, 0);
				};
				oDiv.onmouseover = function(){
					var oImg = document.getElementById("vus_searchword_img");
					if(oImg){
						oImg.src = "http://conf.xmp.xunlei.com/vus/js2/normal.png";
					}
				};
				oDiv.onmouseout = function(){
					var oImg = document.getElementById("vus_searchword_img");
					if(oImg){
						oImg.src = "http://conf.xmp.xunlei.com/vus/js2/hover.png";
					}
				};
				document.body.appendChild(oDiv);
			},
			AttachEvent:function(){
				document.attachEvent("onmouseover", function(){
					if(typeof(VUS.SearchWord)!="object"){
						return;
					}
					var elem = window.event.srcElement;
					var hasdiv=document.getElementById("vud_div");
					var zhaokan = elem.getAttribute("vus_zhaokan", 0);
					if(typeof(zhaokan)=="string"){
						if(hasdiv!=null){
							var x = VUS.Utility.GetElementLeft(elem)-(hasdiv.offsetWidth-elem.offsetWidth)/2;
							var y = VUS.Utility.GetElementTop(elem)-hasdiv.offsetHeight;
							hasdiv.style.visibility = "visible";
							hasdiv.style.left =  x +"px";
							hasdiv.style.top = y + "px"; 
							hasdiv.x = x;
							hasdiv.y = y;
							hasdiv.keyword = zhaokan;
						}
					}else{
						if(hasdiv!=null){
							if(hasdiv.style.visibility != "hidden"){
								var x1 = hasdiv.x;
								var y1 = hasdiv.y;
								var x2 = x1 + hasdiv.offsetWidth;
								var y2 = y1 + hasdiv.offsetHeight+5;
								var cursorX = window.event.clientX;
								var cursorY = window.event.clientY+document.documentElement.scrollTop;
								var bShow = (x1<=cursorX && cursorX<=x2) && (y1<=cursorY && cursorY<=y2);
								if(!bShow){
									hasdiv.style.visibility = "hidden";
								}
							}
						}
					}
				}, false);
			},
			IsPreDeal:function(){
				var sXmpVersion = VUS.vusbho.JsCall("GetXmpVersion");
				var aRet = sXmpVersion.split(".");
				if(Number(aRet[0])>=4 && Number(aRet[1])>=9)
				{
					if(Number(aRet[0])==4 && Number(aRet[1])==9 && Number(aRet[2])==0){
						var sPath = VUS.vusbho.JsCall("GetAppDataPath", "Thunder Network\\XMP4\\xar\\plugins\\searchwordplugin.xar");
						var bRet = VUS.vusbho.JsCall("PathFileExists", sPath);
						return bRet;
					}
					return true;
				}else{
					var sPath = VUS.vusbho.JsCall("GetAppDataPath", "Thunder Network\\XMP4\\xar\\plugins\\searchwordplugin");
					var bRet = VUS.vusbho.JsCall("PathFileExists", sPath);
					return bRet;
				}
			},
			GetKeyWordUrl:function(){
				var keywordurl = "";
				var date = new Date();
				if(VUS.Utility.AreaInfo.areano==1){
					keywordurl = "http://images.client.xunlei.com/huaci_title.js?rd="+date.getHours();
				}else{
					keywordurl = "http://images.client.xunlei.com/huaci_title_full.js?rd="+date.getHours();
				}
				return keywordurl;
			},
			LoadKeyWords:function(){
				var keywordurl = this.GetKeyWordUrl();
				VUS.Utility.DownloadUrl(keywordurl, function(responseText, status){
					if(status==200){
						if(typeof(responseText)=="string" && responseText.length>0){
							window.execScript(responseText);
							if(typeof(huaci_title)=="object"){
								VUS.SearchWord.KeyWord = huaci_title;
								VUS.SearchWord.KeyWord.unshift(VUS.SearchWord.KeyWord[0]);
								var lastone = VUS.SearchWord.KeyWord[VUS.SearchWord.KeyWord.length-1];
								VUS.SearchWord.KeyWord.push(lastone);
								VUS.SearchWord.sRegKeyWord = "/" + VUS.SearchWord.KeyWord.join("|") + "/g";
								huaci_title = null;
								var bRet = VUS.SearchWord.SearchKeyWord();
								if(bRet){
									VUS.SearchWord.CreateFloatDiv();
									VUS.SearchWord.AttachEvent();
								}
							}
						}
					}
				});
			},
			SearchWord:function(){
				var bPreDeal = this.IsPreDeal();
				var bIsBlack = this.IsBlackSite();
				if(!bPreDeal || bIsBlack) return;
				VUS.vusbho.JsCall("TsLog", "JsLog: bPreDeal = " + String(bPreDeal) + " bIsBlack = " + String(bIsBlack));
				VUS.Utility.GetAreaInfo(function(){
					var searchLevel = ( new Date().getTime())%2 + 1;
					VUS.SearchWord.searchLevel = searchLevel;
					VUS.vusbho.JsCall("TsLog", "JsLog: searchLevel = " + String(searchLevel));
					VUS.SearchWord.LoadKeyWords();
				});

				document.attachEvent("onmouseup", function(){
					var text = document.selection.createRange().text;
					if(typeof(text)=="string"){
						if(2<=text.length && text.length<=50){
							var key = "VUS-SearchWordJs-" + VUS.SearchWord.version + "-SelectWord";
							var oParam = {u1:"searchword", u2:"selectedtext", u3:text, u4:document.URL};
							if(typeof(VUS.Utility)=="object"){
								VUS.Utility.SendConvStat(oParam, VUS.SearchWord.version);
							}
						}
					}
				}, false);
			}
		};
	}
	VUS.SearchWord.SearchWord();
})();
