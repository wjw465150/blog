//创建帖子好评ajax类
var vote_http_request	= create_obj();
//给帖子投票
function change_vote(subcatid,bookid,vote){
	if( !subcatid || !bookid || !vote ){
		alert('对不起，参数错误！');
		return false;
	}
	
	var url="/tips/book_vote.php?subcatid="+subcatid+"&bookid="+bookid+"&vote="+vote+"&xx="+Math.random();
	vote_http_request.open("GET", url, true);//这里的true代表是异步请求
	vote_http_request.onreadystatechange = vote_callback;
	vote_http_request.send(null);
}
function vote_callback(){

   if (vote_http_request.readyState == 4) {
     if (vote_http_request.status == 200) { 	
		var response 	= vote_http_request.responseText;
		var re_arr		=response.split('|');
		if( re_arr[0]==0 ){
			//成功
			var div_handle	= document.getElementById('vote_content');
			div_handle.className	= 'art2';
			div_handle.innerHTML	= re_arr[1];
			alert('谢谢您的投票！');
		}else{
			//失败
			alert(re_arr[1]);
		}
     }
   }
}
