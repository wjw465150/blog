 var frame_url = "http://techbbs.zol.com.cn/frmView.php?frameon=yes&subcatid=60&bookid=565"; 


//var pv_subcatid=60;
zoomstatus = parseInt(1);

//发送短消息
function send_massage(userid){
	var url;
	url = "http://v1.bbs.zol.com.cn/user/send_msg.php?userid=" + userid;
	window.open(url,"站内短消息");
}
function reply_this(nickname,userid,level){
    document.location = '#top_reply';
    var info_str='<img src=3189.gif>对 ';
    if(level){
        info_str+='第'+level+'楼';
    }else{
        info_str+='楼主';
    }
    info_str+=' '+nickname+' 说：';
    document.postform.reply_info.value=info_str;
    document.postform.reply_to_userid.value=userid;
    document.postform.content.focus();
}
//对于匿名发贴网友 回复定位到回复框
function sysauto_reply(){
    document.location = '#top_reply';
    document.postform.content.focus();
}
function showHightFun(name,tag){
    if ('none' == document.getElementById(name).style.display)
    {
	document.getElementById(name).style.display = '';
    }
    else
    {
	document.getElementById(name).style.display = 'none';
    }
}

function addfavorite() 
{ 
   /*switch(getOs()) 
   { 
       case 1:window.external.addfavorite('http://techbbs.zol.com.cn/1/60_565.html','AWK编程实例指南');break; 
       case 2:window.sidebar.addPanel('AWK编程实例指南','http://techbbs.zol.com.cn/1/60_565.html',"");break; 
       case 0:alert("您的浏览器不支持");break; 
   }
   */ 
   collect_book(60,565);
}



