(function(){
	if(typeof(VUS.Config)=="undefined"){
		VUS.vusbho.JsCall("TsLog", "JsLog: define VUS.Config");
		VUS.Config = {
			version:"4002",
			dealMouseDown:true,
			aFilterWord: ["qvod", "qbid=", "bdplayer.", "\r\n"],
			aProtocolHead:["http", "ftp", "thunder", "ed2k", "magnet", "gvod", "mms", "rtsp"],
			aVideoFormat : ["rmvb", "mp4", "mkv", "3gp", "torrent", "flv", "rm", "avi", "wmv", "mov", "mpg", "tp", "ts", "vob", "mp3"],
			SHOWFLAG:{DEFAULT:0x0, SHOW:0x1, HIDE:0x2, NODETAILDLG:0x4, NOFLOATDLG:0x8},
			GetWebMetaFlag:function(){
				var nFlag = this.SHOWFLAG.DEFAULT;
				var aElem = document.getElementsByName("DAPHELPER");
				if(aElem.length==1){
					if(typeof(aElem[0].CONTENT)=="string"){
						var sValue = aElem[0].CONTENT;
						if(sValue.indeoOf("HIDE")>=0){
							nFlag = this.SHOWFLAG.HIDE;
						}
						if(sValue.indeoOf("SHOW")>=0){
							nFlag = this.SHOWFLAG.SHOW;
						}
						if(sValue.indeoOf("NODETAILDLG")>=0){
							nFlag |= this.SHOWFLAG.NODETAILDLG;
						}
						if(sValue.indeoOf("NOFLOATDLG")>=0){
							nFlag |= this.SHOWFLAG.NOFLOATDLG;
						}
					}
				}
				return nFlag;
			},
			GetUrlFlag:function(){
				var URL = document.URL;
				var bRet = (URL.indexOf("refdapshare")>0 || URL.indexOf("ref_dap_id")>0);
				if(bRet){
					return 1;
				}
				bRet = (URL.indexOf("refsearchnav")>0);
				if(bRet){
					return 2;
				}
				return 0;
			}
		};
	}
})();
