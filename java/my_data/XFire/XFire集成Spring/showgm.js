// JScript File
if(typeof(gms) != 'undefined')
{
	var outhtml='<div id="csdn_ad" class="postTitle">特别推荐：<div style="display: inline; margin-left: 300px;"><a href="http://adtag.csdn.net/" target="_blank">想在这里投放广告？点击查看详情</a> </div><img src="ad_close.gif" alt="关闭" onclick="display(csdn_ad);" style="cursor:hand;" width="14" height="14"  border="0"><ul class="postText">';
	for (var k in gms)
	 {
		if(typeof(gms[k].title)=='undefined') continue;
		outhtml+='<li><a href="'http://blog.csdn.net/smallnest/archive/2006/04/24/+gms%5Bk%5D.link+'" target="_blank">'+gms[k].title+'</a>';
		outhtml+='<br />'+gms[k].desc1+'  '+gms[k].desc2+'  ';
		outhtml+=' <a href="http://tag.csdn.net/tag/'+gms[k].tag+'" target="_blank">'+gms[k].tag+'</a></li>';
    }
	outhtml+='</ul></div>';
	document.getElementById("csdn_zhaig_ad_yahoo").innerHTML=outhtml;
}
